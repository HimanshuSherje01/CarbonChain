
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusBadge } from '../components/common/Components';
import { useData } from '../context/DataContext';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = useData(); // Load from context

    // Find project safely
    const project = projects.find(p => p.id === id);

    if (!project) {
        return (
            <DashboardLayout role="NGO">
                <div className="p-12 text-center text-slate-500">
                    <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
                    <button onClick={() => navigate(-1)} className="text-teal-600 hover:underline">Go Back</button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="NGO"> {/* Role could be dynamic, defaulting to NGO for this flow */}
            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">{project.id}</span>
                            <StatusBadge status={project.status} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
                        <p className="text-slate-500">{project.developer} • {project.location}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Back
                        </button>
                        {/* Mock Edit Button - only if needed */}
                        {project.status === 'Submitted' && (
                            <button className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                                Edit Project
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN - Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Details Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Project Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</h4>
                                    <p className="text-slate-700 leading-relaxed text-sm">{project.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Project Type</h4>
                                        <p className="font-medium text-slate-900">{project.type}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Methodology</h4>
                                        <p className="font-medium text-slate-900">{project.methodology}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Evidence */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Evidence & Documents</h3>
                            {project.evidence && project.evidence.length > 0 ? (
                                <ul className="space-y-3">
                                    {project.evidence.map((doc, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-teal-200 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {doc.type}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm group-hover:text-teal-700">{doc.name}</p>
                                                    <p className="text-xs text-slate-500">Uploaded {doc.date}</p>
                                                </div>
                                            </div>
                                            <span className="text-slate-400 group-hover:text-teal-600">↓</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 italic text-sm">No documents uploaded yet.</p>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN - Stats & Timeline */}
                    <div className="space-y-6">

                        {/* Key Stats */}
                        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Impact Potential</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-3xl font-bold text-teal-400">{project.estimatedCredits.toLocaleString()}</p>
                                    <p className="text-sm text-slate-400">Estimated Carbon Credits</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{project.area}</p>
                                    <p className="text-sm text-slate-400">Total Project Area</p>
                                </div>
                            </div>
                        </div>

                        {/* Blockchain Info */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Blockchain Record</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">IPFS CID</p>
                                    <a
                                        href={`https://ipfs.io/ipfs/${project.ipfsCid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-teal-600 break-all bg-slate-50 p-2 rounded border border-slate-100 mt-1 block hover:bg-slate-100 hover:underline"
                                    >
                                        {project.ipfsCid} ↗
                                    </a>
                                </div>
                                {/* Only show contract if verified strictly speaking, but showing mock for layout */}
                                {project.status === 'Verified' && (
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Token Contract</p>
                                        <a
                                            href="https://etherscan.io/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono text-xs text-teal-600 break-all bg-teal-50 p-2 rounded border border-teal-100 mt-1 block hover:bg-teal-100 hover:underline"
                                        >
                                            0x71C7656EC7ab88b098defB751B7401B5f6d8976F ↗
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Verification Timeline</h3>
                            <div className="relative border-l-2 border-slate-100 ml-2 space-y-6">
                                {project.timeline && project.timeline.map((event, idx) => (
                                    <div key={idx} className="ml-6 relative">
                                        {/* Dot */}
                                        <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-teal-500' : 'bg-slate-300'}`}></div>

                                        <p className="text-sm font-bold text-slate-900">{event.status}</p>
                                        <p className="text-xs text-slate-500 mb-1">{event.date}</p>
                                        <p className="text-xs text-slate-600">{event.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default ProjectDetail;
