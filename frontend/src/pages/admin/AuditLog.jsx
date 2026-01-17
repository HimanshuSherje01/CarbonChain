
import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Table } from '../../components/common/Components';
import { useData } from '../../context/DataContext';

const AuditLog = () => {
    const { projects, transactions } = useData();

    // Combine all events into a single timeline
    const allEvents = [];

    // 1. Project Timeline Events
    projects.forEach(p => {
        p.timeline.forEach(event => {
            allEvents.push({
                id: `EV-${p.id}-${event.date}`,
                date: event.date,
                type: event.status === 'Submitted' ? 'Submission' : event.status === 'Verified' ? 'Verification' : 'Status Update',
                actor: event.status === 'Submitted' ? p.developer : 'Verifier System', // Simulated actor
                details: `${p.name}: ${event.note}`,
                refId: p.id
            });
        });
    });

    // 2. Transaction Events
    transactions.forEach(tx => {
        allEvents.push({
            id: tx.id,
            date: tx.date,
            type: 'Credit Purchase',
            actor: 'Corporate User', // Simulated
            details: `Purchased ${tx.credits} credits from ${tx.project}`,
            refId: tx.projectId
        });
    });

    // Sort by Date Descending
    const sortedEvents = allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <DashboardLayout role="Admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Audit Log</h1>
                    <p className="text-slate-500">Immutable record of all system activities and state changes.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <Table headers={["Date", "Event Type", "Actor", "Details", "Reference ID"]}>
                        {sortedEvents.map((event, idx) => (
                            <tr key={`${event.id}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{event.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${event.type === 'Verification' ? 'bg-green-100 text-green-700' :
                                            event.type === 'Credit Purchase' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        {event.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">{event.actor}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate" title={event.details}>{event.details}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono">{event.refId}</td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AuditLog;
