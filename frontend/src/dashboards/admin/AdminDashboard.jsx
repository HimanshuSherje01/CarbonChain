
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, StatusBadge, Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';

const AdminDashboard = () => {
  const { projects, transactions, stats } = useData();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'error', msg: 'Anomalous data detected in Project CC-2024-004 verification.' },
    { id: 2, type: 'info', msg: 'Monthly audit report generated successfully.' },
    { id: 3, type: 'warning', msg: '3 new NGO account requests waiting approval.' }
  ]);

  // Stats Logic
  const totalProjects = projects.length;
  const totalCredits = projects.reduce((sum, p) => sum + (p.estimatedCredits || 0), 0);
  const activeUsers = 850; // Mock

  const adminStats = [
    { label: "Total Projects", value: totalProjects },
    { label: "Total Potential Credits", value: `${(totalCredits / 1000000).toFixed(1)}M` },
    { label: "Active Users", value: activeUsers },
  ];

  return (
    <DashboardLayout role="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">System-wide monitoring and administration.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/registry')} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">View Registry</button>
          <button onClick={() => navigate('/admin/audit')} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">Audit Logs</button>
          <button onClick={() => navigate('/admin/users')} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">User Management</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {adminStats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Recent Registrations */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Recent Projects</h3>
              <button onClick={() => navigate('/admin/registry')} className="text-sm text-teal-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {projects.slice(0, 3).map(p => (
                <div key={p.id} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 hover:bg-slate-50 p-2 rounded transition-colors cursor-pointer" onClick={() => navigate(`/projects/${p.id}`)}>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.developer}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts Example */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">System Alerts</h3>
            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className={`p-3 rounded-md text-sm flex justify-between items-start gap-2 ${alert.type === 'error' ? 'bg-red-50 border border-red-100 text-red-800' :
                    alert.type === 'info' ? 'bg-blue-50 border border-blue-100 text-blue-800' :
                      'bg-amber-50 border border-amber-100 text-amber-800'
                    }`}>
                    <div className="flex gap-2">
                      <span className="font-bold capitalize">{alert.type}:</span> {alert.msg}
                    </div>
                    <button onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))} className="text-current hover:opacity-70 font-bold">×</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm">No active alerts.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
