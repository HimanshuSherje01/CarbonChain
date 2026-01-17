
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusBadge } from '../components/common/Components';
import { useData } from '../context/DataContext';

const Marketplace = () => {
    const { projects, purchaseCredits } = useData();
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState(null); // For Purchase Modal
    const [purchaseAmount, setPurchaseAmount] = useState(10);

    // Only Verified projects can sell credits
    const verifiedProjects = projects.filter(p =>
        p.status === 'Verified' &&
        (p.name.toLowerCase().includes(search.toLowerCase()) || p.developer.toLowerCase().includes(search.toLowerCase()))
    );

    const handleBuyClick = (project) => {
        setSelectedProject(project);
        setPurchaseAmount(10); // Reset to default
    };

    const confirmPurchase = () => {
        if (!selectedProject) return;
        const pricePerCredit = 25; // hardcoded or dynamic
        const totalCost = purchaseAmount * pricePerCredit;

        purchaseCredits(selectedProject, purchaseAmount, totalCost);

        alert(`Successfully purchased ${purchaseAmount} credits from ${selectedProject.name}!`);
        setSelectedProject(null);
    };

    return (
        <DashboardLayout role="Corporate">
            <div className="space-y-6">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Carbon Marketplace</h1>
                        <p className="text-slate-500">Purchase high-quality blue carbon offsets.</p>
                    </div>
                    <div className="w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search projects or developers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {verifiedProjects.length > 0 ? (
                        verifiedProjects.map(project => (
                            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-slate-200 relative">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                                        <span className="text-4xl">🌿</span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <StatusBadge status={project.status} />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <span className="text-white font-bold text-lg">{project.location}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{project.name}</h3>
                                    <p className="text-sm text-slate-500 mb-4">by {project.developer}</p>

                                    <div className="flex items-center justify-between text-sm mb-6">
                                        <div>
                                            <span className="block text-slate-400 text-xs uppercase">Available</span>
                                            <span className="font-semibold text-slate-800">{project.estimatedCredits} CC</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-slate-400 text-xs uppercase">Price</span>
                                            <span className="font-semibold text-teal-600">$25.00 / Ton</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleBuyClick(project)}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-colors"
                                    >
                                        Purchase Credits
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                            <p className="text-slate-500 font-medium">No verified projects available yet.</p>
                            <p className="text-xs text-slate-400">Check back later once verifiers approve new submissions.</p>
                        </div>
                    )}
                </div>

                {/* Purchase Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Buy Carbon Credits</h2>
                            <p className="text-sm text-slate-500 mb-6">From {selectedProject.name}</p>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (Tons)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={purchaseAmount}
                                        onChange={(e) => setPurchaseAmount(e.target.value)}
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg font-mono focus:ring-2 focus:ring-teal-500 outline-none"
                                    />
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                                    <span className="text-slate-600 font-medium">Total Cost</span>
                                    <span className="text-2xl font-bold text-slate-900">${(purchaseAmount * 25).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPurchase}
                                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-lg shadow-teal-500/30"
                                >
                                    Confirm Purchase
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Marketplace;
