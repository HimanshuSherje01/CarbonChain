
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusBadge } from '../components/common/Components';
import { useData } from '../context/DataContext';

const VerificationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects, updateProjectStatus } = useData();
    const project = projects.find(p => p.id === id);

    const [comment, setComment] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    if (!project) return <div>Project not found</div>;

    const handleAction = (status) => {
        if (!comment && status === 'Rejected') {
            alert("Please provide a reason for rejection.");
            return;
        }
        updateProjectStatus(id, status, comment);
        navigate('/verifier');
    };

    const runAiAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setAiResult({
                score: 94,
                match: "High",
                density: "0.85 (Healthy)",
                anomalies: "None detected",
                confidence: "High",
                notes: "Satellite imagery confirms mangrove density consistent with reporting."
            });
        }, 2000);
    };

    return (
        <DashboardLayout role="Verifier">
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <button onClick={() => navigate('/verifier')} className="text-slate-400 hover:text-slate-600 text-sm">← Back to Dashboard</button>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Verify Project: {project.name}</h1>
                        <p className="text-slate-500">{project.id} • {project.developer}</p>
                    </div>
                    <StatusBadge status={project.status} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* LEFT: Project Info & Evidence */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Project Data</h3>
                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-slate-500 uppercase text-xs font-bold">Location</span>
                                        <span className="text-slate-900">{project.location}</span>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500 uppercase text-xs font-bold">Area</span>
                                        <span className="text-slate-900">{project.area} Ha</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-slate-500 uppercase text-xs font-bold mb-1">Description</span>
                                    <p className="text-slate-700">{project.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Evidence Locker</h3>
                            <div className="space-y-2">
                                {/* Simulated Evidence List */}
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500">📄</span>
                                        <span className="text-sm font-medium text-slate-700">Project_Design_Doc.pdf</span>
                                    </div>
                                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">View</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">🖼️</span>
                                        <span className="text-sm font-medium text-slate-700">Drone_Map_Mar24.png</span>
                                    </div>
                                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">View</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">🖼️</span>
                                        <span className="text-sm font-medium text-slate-700">Site_Photo_01.jpg</span>
                                    </div>
                                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">View</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: AI & Actions */}
                    <div className="space-y-6">

                        {/* AI Module */}
                        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            </div>

                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-teal-400">⚡</span> AI Verification Module
                            </h3>

                            {!aiResult ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-400 mb-6 text-sm">Run simulated satellite analysis to verify vegetation density and land-use claims.</p>
                                    <button
                                        onClick={runAiAnalysis}
                                        disabled={analyzing}
                                        className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-6 py-3 rounded-lg w-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {analyzing ? 'Scanning Satellite Data...' : 'Run AI Analysis'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                                        <span className="text-slate-400 text-sm">Confidence Score</span>
                                        <span className="text-2xl font-bold text-teal-400">{aiResult.score}%</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase">Satellite Match</span>
                                            <span className="text-white font-medium">{aiResult.match}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase">Bio-Density</span>
                                            <span className="text-white font-medium">{aiResult.density}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded border border-slate-700 text-sm text-slate-300">
                                        <span className="text-teal-400 font-bold">AI Insight:</span> {aiResult.notes}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Module */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Verifier Decision</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Review Comments</label>
                                <textarea
                                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                    rows="4"
                                    placeholder="Enter your verification notes here..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleAction('Verified')}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    Approve Project
                                </button>
                                <button
                                    onClick={() => handleAction('Rejected')}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                                >
                                    Reject Project
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default VerificationDetail;
