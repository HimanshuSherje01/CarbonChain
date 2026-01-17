
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProjects, mockStats, mockTransactions } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // --- State Initialization ---

    // Projects: Load from local storage or fallback to mock data
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('cc_projects_v3');
        return saved ? JSON.parse(saved) : mockProjects;
    });

    // Wallet State
    const [wallet, setWallet] = useState({
        connected: false,
        address: null,
        balance: 0,
    });

    // Persist projects whenever they change
    useEffect(() => {
        localStorage.setItem('cc_projects_v3', JSON.stringify(projects));
    }, [projects]);

    // Transactions State
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

    const addProject = (newProject) => {
        const projectWithId = {
            ...newProject,
            id: `CC-2024-${String(projects.length + 1).padStart(3, '0')}`,
            status: "Submitted",
            submissionDate: new Date().toISOString().split('T')[0],
            estimatedCredits: Math.floor(newProject.area * 50), // Rough calc
            evidence: [],
            timeline: [
                { date: new Date().toISOString().split('T')[0], status: "Submitted", note: "Project submitted via Portal." }
            ]
        };
        setProjects([projectWithId, ...projects]);
        return projectWithId.id;
    };

    const updateProjectStatus = (id, newStatus, comment = "") => {
        setProjects(prev => prev.map(p => {
            if (p.id === id) {
                const note = comment ? `Status: ${newStatus}. Note: ${comment}` : `Status updated to ${newStatus}`;
                const newTimeline = [{ date: new Date().toISOString().split('T')[0], status: newStatus, note: note }, ...p.timeline];
                return { ...p, status: newStatus, timeline: newTimeline };
            }
            return p;
        }));
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
