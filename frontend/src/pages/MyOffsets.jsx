
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Table } from '../components/common/Components';
import { useData } from '../context/DataContext';

const MyOffsets = () => {
    const { transactions } = useData();

    // Calculate dynamic portfolio stats
    const totalCredits = transactions.reduce((sum, tx) => sum + tx.credits, 0);
    const carbonOffset = totalCredits; // 1 credit = 1 ton usually

    return (
        <DashboardLayout role="Corporate">
            <div className="space-y-8">

                {/* Header */}
                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 p-4">
                        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 12 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">My Green Portfolio</h1>
                        <p className="text-slate-400 mb-8">Track your sustainable impact and carbon neutrality progress.</p>

                        <div className="flex gap-12">
                            <div>
                                <span className="block text-sm uppercase text-teal-400 font-bold tracking-wider mb-1">Total Offset</span>
                                <span className="text-4xl font-bold">{carbonOffset.toLocaleString()} <span className="text-lg font-normal text-slate-400">Tons</span></span>
                            </div>
                            <div>
                                <span className="block text-sm uppercase text-blue-400 font-bold tracking-wider mb-1">Active Projects</span>
                                <span className="text-4xl font-bold">{new Set(transactions.map(t => t.projectId)).size}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-bold text-slate-800">Transaction History</h2>
                        <button className="text-teal-600 text-sm font-medium hover:underline">Download Annual Report</button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <Table headers={["Tx ID", "Project Name", "Purchase Date", "Credits", "Amount", "Certificate"]}>
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{tx.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{tx.project}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{tx.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">+{tx.credits} Tons</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{tx.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => alert(`Downloading Certificate for Traceability #${tx.id}...`)}
                                                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded border border-slate-200 transition-colors"
                                            >
                                                Download PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">No transactions found. <br /><a href="/corporate/market" className="text-teal-600 hover:underline">Go to Marketplace</a></td>
                                </tr>
                            )}
                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyOffsets;
