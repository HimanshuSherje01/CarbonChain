import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../Controller/Project.controller.js";

const router = express.Router();

// Create a new project
router.post("/", createProject);

// Get all projects
router.get("/", getAllProjects);

// Get project by ID
router.get("/:id", getProjectById);

// Update project
router.put("/:id", updateProject);

// Delete project
router.delete("/:id", deleteProject);

export default router;
