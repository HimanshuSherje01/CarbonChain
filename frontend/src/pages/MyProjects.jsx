
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusBadge, Table } from '../components/common/Components';
import { useData } from '../context/DataContext';

const MyProjects = () => {
    const navigate = useNavigate();
    const { projects } = useData();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredProjects = projects.filter(p => {
        const matchesStatus = filter === 'All' || p.status === filter;
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <DashboardLayout role="NGO">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Projects</h1>
                        <p className="text-slate-500">Manage your complete project portfolio.</p>
                    </div>
                    <button
                        onClick={() => navigate('/ngo/submit')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
                    >
                        + Submit New Project
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                        {['All', 'Verified', 'Pending Verification', 'Submitted', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${filter === status
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
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <Table headers={["Project ID", "Project Name", "Location", "Est. Credits", "Status", "Action"]}>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{project.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-semibold">{project.estimatedCredits}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={project.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 hover:text-teal-800 cursor-pointer font-medium"
                                    onClick={() => navigate(`/projects/${project.id}`)}>
                                    Manage
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                <p className="text-lg font-medium mb-1">No projects found</p>
                                <p className="text-xs">Try adjusting your search or filters.</p>
                            </td>
                        </tr>
                    )}
                </Table>
            </div>
        </DashboardLayout>
    );
};

export default MyProjects;
