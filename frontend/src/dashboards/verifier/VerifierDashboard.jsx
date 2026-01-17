import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, StatusBadge, Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';


const VerifierDashboard = () => {
  const { projects } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');

  // --- Real-time Statistics ---
  const pendingCount = projects.filter(p => p.status === 'Pending Verification' || p.status === 'Submitted').length;
  const verifiedCount = projects.filter(p => p.status === 'Verified').length;
  const rejectedCount = projects.filter(p => p.status === 'Rejected').length;

  const myStats = [
    { label: "Pending Reviews", value: pendingCount },
    { label: "Projects Verified", value: verifiedCount },
    { label: "Rejected", value: rejectedCount }
  ];

  // --- Filtering Logic ---
  const filteredProjects = projects.filter(p => {
    // 1. Filter by Tab
    const isPending = p.status === 'Pending Verification' || p.status === 'Submitted';
    if (activeTab === 'pending' && !isPending) return false;
    if (activeTab === 'history' && isPending) return false;

    // 2. Filter by Search
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  return (
    <DashboardLayout role="Verifier">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Verification Hub</h1>
          <p className="text-slate-500">Review and validate project submissions.</p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myStats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs & Search Header */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pending'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Pending Queue
                {pendingCount > 0 && <span className="ml-2 bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingCount}</span>}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history'
                  ? 'bg-slate-100 text-slate-800 border border-slate-200'
                  : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Verification History
              </button>
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
          <div className="p-4">
            <Table headers={["Project ID", "Project Name", "Developer", "Location", "Status", "Action"]}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.developer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={project.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => navigate(`/verifier/projects/${project.id}`)}
                        className={`px-3 py-1 rounded text-xs font-bold shadow-sm transition-colors ${activeTab === 'pending'
                          ? 'bg-teal-600 text-white hover:bg-teal-700'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-white'
                          }`}
                      >
                        {activeTab === 'pending' ? 'Review Now' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg font-medium mb-1">No projects found</p>
                    <p className="text-xs">
                      {activeTab === 'pending' ? "Good job! You're all caught up." : "No verification history found."}
                    </p>
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VerifierDashboard;
