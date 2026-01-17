
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard, StatusBadge, Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';

const CorporateDashboard = () => {
  const { transactions } = useData();
  const navigate = useNavigate();

  // Dynamic Stats
  const totalCredits = transactions.reduce((sum, tx) => sum + tx.credits, 0);
  const totalInvested = transactions.length; // Simply count for now, or parse amounts string

  const stats = [
    { label: "Credits Purchased", value: totalCredits.toLocaleString() },
    { label: "Offset Impact", value: `${totalCredits} Tons` }, // Assuming 1 credit = 1 ton
    { label: "Certificates", value: transactions.length },
  ];

  return (
    <DashboardLayout role="Corporate">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Corporate Sustainability</h1>
          <p className="text-slate-500">Track your carbon offset portfolio and purchase new credits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} />
          ))}
        </div>

        {/* Marketplace Section Idea */}
        <div className="mt-8 bg-gradient-to-r from-teal-900 to-slate-900 rounded-xl p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Buy High-Quality Blue Carbon Credits</h2>
            <p className="text-slate-300 mb-6 max-w-2xl">Support verified mangrove restoration and seagrass conservation projects directly from the source.</p>
            <button
              onClick={() => navigate('/corporate/market')}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-teal-500/20"
            >
              Browse Marketplace
            </button>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-teal-500/10 transform skew-x-12 translate-x-12"></div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
            <button onClick={() => navigate('/corporate/portfolio')} className="text-teal-600 font-medium hover:underline text-sm">View All</button>
          </div>
          <Table headers={["Tx ID", "Project Name", "Date", "Credits Purchased", "Amount", "Certificate"]}>
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{tx.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{tx.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-700">+{tx.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">Download</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No recent transactions.</td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
