
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatusBadge, Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';

const Registry = () => {
    const { projects } = useData();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.developer.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout role="Admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Global Carbon Registry</h1>
                    <p className="text-slate-500">Master record of all projects, credits, and verification statuses.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {['All', 'Verified', 'Pending Verification', 'Submitted', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search registry..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <Table headers={["Project ID", "Name", "Developer", "Location", "Credits", "Status", "Action"]}>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{project.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.developer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700">{project.estimatedCredits.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={project.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                            className="text-teal-600 hover:text-teal-800 font-medium hover:underline"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-500">No records found matching your filters.</td>
                            </tr>
                        )}
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Registry;
