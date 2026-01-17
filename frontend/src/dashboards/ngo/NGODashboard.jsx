
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, StatusBadge, Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';
import { WalletConnect } from '../../components/common/WalletConnect';

const NGODashboard = () => {
  const navigate = useNavigate();
  const { projects, stats } = useData();
  const myStats = stats.ngo;
  const myProjects = projects; // Filter if needed, showing all for now

  return (
    <DashboardLayout role="NGO">
      <div className="space-y-6">
        {/* Intro */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Project Overview</h1>
            <p className="text-slate-500">Manage and track your blue carbon projects.</p>
          </div>
          <WalletConnect />
        </div>

        {/* Stats Grid - Using static stats for now, could calculate dynamic too */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Projects" value={myProjects.length} subtext="Tracked in Registry" />
          <StatCard label="Pending Approval" value={myProjects.filter(p => p.status === 'Submitted' || p.status === 'Pending Verification').length} />
          <StatCard label="Credits Generated" value="12,500" />
        </div>

        {/* Action Header */}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-xl font-bold text-slate-800">My Projects</h2>
          <button
            onClick={() => navigate('/ngo/submit')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm flex items-center gap-2"
          >
            <span>+</span> Submit New Project
          </button>
        </div>

        {/* Projects Table */}
        <Table headers={["Project ID", "Project Name", "Location", "Est. Credits", "Submitted On", "Status", "Action"]}>
          {myProjects.length > 0 ? (
            myProjects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-semibold">{project.estimatedCredits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{project.submissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={project.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                  onClick={() => navigate(`/projects/${project.id}`)}>
                  View Details
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                No projects found. Submit your first project to get started.
              </td>
            </tr>
          )}
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default NGODashboard;
