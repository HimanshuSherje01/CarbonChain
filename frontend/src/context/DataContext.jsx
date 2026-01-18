
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStats, mockTransactions } from '../data/mockData';
import { fetchProjects, createProject as apiCreateProject, updateProject as apiUpdateProject } from '../../Service/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // --- State Initialization ---

    // Projects: Load from backend
    const [projects, setProjects] = useState([]);

    // Wallet State
    const [wallet, setWallet] = useState({
        connected: false,
        address: null,
        balance: 0,
    });

    // Fetch projects on mount
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                if (data.success) {
                    setProjects(data.projects);
                }
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };
        loadProjects();
    }, []);

    // Transactions State - keep mock for now or implement later
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('cc_transactions');
        return saved ? JSON.parse(saved) : mockTransactions;
    });

    // Persist transactions
    useEffect(() => {
        localStorage.setItem('cc_transactions', JSON.stringify(transactions));
    }, [transactions]);

    // --- Actions ---

    const connectWallet = () => {
        // Simulate connection delay
        setTimeout(() => {
            setWallet({
                connected: true,
                address: "0x71C...8976F",
                balance: 1250, // Mock balance
            });
        }, 800);
    };

    const addProject = async (newProject) => {
        try {
            const data = await apiCreateProject(newProject);
            if (data.success) {
                setProjects(prev => [data.project, ...prev]);
                return data.project.projectId;
            }
        } catch (error) {
            console.error("Failed to add project:", error);
            throw error;
        }
    };

    const updateProjectStatus = async (id, newStatus, comment = "") => {
        try {
            // Optimistic update (optional, but skipping for simplicity)
            // or fetch fresh data. Let's find local project first to update UI immediately
            // But we need to call API
            const projectToUpdate = projects.find(p => p.projectId === id || p._id === id); // Handle both ID types
            if (!projectToUpdate) return;

            // Create update payload
            const updatePayload = {
                status: newStatus,
                note: comment
            };
            // If we had comments/timeline in backend, we'd add them here. 
            // For now just status.

            const data = await apiUpdateProject(projectToUpdate.projectId || projectToUpdate._id, updatePayload);

            if (data.success) {
                setProjects(prev => prev.map(p =>
                    (p.projectId === id || p._id === id) ? data.project : p
                ));
            }

        } catch (error) {
            console.error("Failed to update project status:", error);
        }
    };

    const purchaseCredits = (project, amount, totalCost) => {
        const newTx = {
            id: `TX-${String(transactions.length + 1000)}`,
            project: project.name,
            credits: parseInt(amount),
            date: new Date().toISOString().split('T')[0],
            amount: `$${totalCost.toLocaleString()}`,
            projectId: project.id
        };
        setTransactions([newTx, ...transactions]);
        return newTx;
    };

    // --- Context Value ---
    const value = {
        projects,
        stats: mockStats, // Keep stats static for now or calculate dynamically if needed
        transactions,
        wallet,
        connectWallet,
        addProject,
        updateProjectStatus,
        purchaseCredits
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
