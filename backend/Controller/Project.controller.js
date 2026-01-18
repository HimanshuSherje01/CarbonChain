import Project from "../models/project.js";

// Generate a random Project ID (Helper)
const generateProjectId = async () => {
    const count = await Project.countDocuments();
    const sequence = String(count + 1).padStart(3, '0');
    return `CC-2024-${sequence}`;
};

// Create a new Project
export const createProject = async (req, res) => {
    try {
        const { name, type, methodology, description, location, latitude, longitude, area, developer } = req.body;

        const projectId = await generateProjectId();
        const estimatedCredits = Math.floor(area * 50); // Simple calculation logic

        // Initialize timeline
        const timeline = [
            {
                date: new Date().toISOString().split('T')[0],
                status: "Submitted",
                note: "Project submitted via Portal."
            }
        ];

        const newProject = new Project({
            projectId,
            name,
            type,
            methodology,
            description,
            location,
            latitude,
            longitude,
            area,
            developer: developer || "GreenEarth NGO",
            estimatedCredits,
            status: "Submitted",
            timeline,
            evidence: [],
            ipfsCid: "QmHash...", // Placeholder or generate real one if IPFS integrated
            owner: req.mongoUser._id
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: savedProject
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        let query = {};

        // If not admin/verifier, only show own projects
        // Assuming req.mongoUser is populated by middleware
        if (req.mongoUser && !['admin', 'verifier'].includes(req.mongoUser.role)) {
            query.owner = req.mongoUser._id;
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: projects.length, projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get single project by ID (either MongoDB _id or custom projectId)
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        // Try to find by custom projectId first, then by _id
        let project = await Project.findOne({ projectId: id });
        if (!project) {
            // Validate if it is a valid ObjectId before querying
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                project = await Project.findById(id);
            }
        }

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        // Prevent updating immutable fields if necessary, or just allow full update for now
        // Assuming we look up by custom projectId mostly
        let project = await Project.findOne({ projectId: id });

        if (!project && id.match(/^[0-9a-fA-F]{24}$/)) {
            project = await Project.findById(id);
        }

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // If status is changing, handle timeline and action log
        if (updateData.status && updateData.status !== project.status) {
            updateData.actionOn = new Date();
            // In a real app, we'd get the user ID from req.user
            // updateData.actionBy = req.user.id; 

            // Add to timeline
            const newTimelineEvent = {
                date: new Date().toISOString().split('T')[0],
                status: updateData.status,
                note: `Status updated to ${updateData.status}`
            };

            // Push to existing timeline (if it exists, otherwise init)
            if (!updateData.timeline) {
                // We don't want to overwrite the whole timeline if client didn't send it.
                // We should push to the DB array.
                // Using findOneAndUpdate with $push would be better but we are using mongoose document for now
                // Let's use $push operator in update
                delete updateData.timeline; // Ensure we don't accidentally overwrite

                await Project.updateOne(
                    { _id: project._id },
                    {
                        $push: { timeline: newTimelineEvent },
                        $set: updateData
                    }
                );

                // Fetch updated for response
                const updated = await Project.findById(project._id);
                return res.status(200).json({ success: true, message: "Project updated", project: updated });
            }
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: project._id },
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, message: "Project updated", project: updatedProject });

    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        let project = await Project.findOne({ projectId: id });

        if (!project && id.match(/^[0-9a-fA-F]{24}$/)) {
            project = await Project.findById(id);
        }

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        await project.deleteOne();

        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
