import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        methodology: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        developer: {
            type: String,
            default: "GreenEarth NGO" // Default for now
        },
        location: {
            type: String, // District, State
            required: true
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        area: {
            type: Number,
            required: true
        },
        estimatedCredits: {
            type: Number,
            required: true
        },
        submittedOn: {
            type: Date,
            default: Date.now
        },
        approvedOn: {
            type: Date
        },
        status: {
            type: String,
            enum: ["Pending", "Verified", "Rejected", "Submitted"],
            default: "Submitted"
        },
        actionBy: {
            type: String
        },
        actionOn: {
            type: Date
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        ipfsCid: {
            type: String,
            default: "Qm..." // Placeholder
        },
        evidence: [{
            type: { type: String }, // e.g. "PDF", "Image"
            name: String,
            date: String,
            url: String
        }],
        timeline: [{
            date: String,
            status: String,
            note: String
        }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for 'id' to be alias of projectId for frontend compatibility
ProjectSchema.virtual('id').get(function () {
    return this.projectId;
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;