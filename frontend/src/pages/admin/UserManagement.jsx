
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Table } from '../../components/common/Components';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('users');

    // Mock Users
    const [users, setUsers] = useState([
        { id: "U-001", name: "GreenEarth NGO", role: "NGO", status: "Active", joined: "2023-11-01" },
        { id: "U-002", name: "OceanBlue Foundation", role: "NGO", status: "Active", joined: "2024-01-15" },
        { id: "U-003", name: "Global Verify Corp", role: "Verifier", status: "Active", joined: "2023-10-20" },
        { id: "U-004", name: "EcoCorp Industries", role: "Corporate", status: "Active", joined: "2024-02-05" },
        { id: "U-005", name: "Wetlands Watch", role: "NGO", status: "Suspended", joined: "2024-03-01" },
    ]);

    // Mock Requests
    const [requests, setRequests] = useState([
        { id: "REQ-001", name: "Coastal Audit Services", type: "Verifier", email: "contact@coastalaudit.com", submitted: "2024-03-10" },
        { id: "REQ-002", name: "Marine Bio Labs", type: "Verifier", email: "admin@marinebiolabs.org", submitted: "2024-03-12" },
    ]);

    const handleApprove = (id) => {
        const request = requests.find(r => r.id === id);
        if (request) {
            const newUser = {
                id: `U-${Date.now().toString().slice(-4)}`,
                name: request.name,
                role: "Verifier",
                status: "Active",
                joined: new Date().toISOString().split('T')[0]
            };
            setUsers([...users, newUser]);
            setRequests(requests.filter(r => r.id !== id));
            alert(`Approved ${request.name} as a Verifier.`);
        }
    };

    const handleReject = (id) => {
        if (window.confirm("Are you sure you want to reject this request?")) {
            setRequests(requests.filter(r => r.id !== id));
        }
    };

    const handleRevoke = (id) => {
        if (window.confirm("Are you sure you want to revoke accessing for this user? This action cannot be undone.")) {
            setUsers(users.map(u => u.id === id ? { ...u, status: "Suspended" } : u));
        }
    };

    return (
        <DashboardLayout role="Admin">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                        <p className="text-slate-500">Manage platform access and registration requests.</p>
                    </div>
                    <button onClick={() => alert("Add User modal placeholder")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                        + Add New User
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'users'
                            ? 'border-teal-500 text-teal-700'
                            : 'border-transparent text-slate-600 hover:text-slate-800'
                            }`}
                    >
                        Active Users
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'requests'
                            ? 'border-teal-500 text-teal-700'
                            : 'border-transparent text-slate-600 hover:text-slate-800'
                            }`}
                    >
                        Verifier Requests
                        {requests.length > 0 && (
                            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{requests.length}</span>
                        )}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                    {activeTab === 'users' ? (
                        <Table headers={["User ID", "Organization Name", "Role", "Joined Date", "Status", "Action"]}>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.joined}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button onClick={() => alert(`Editing user ${user.name}`)} className="text-blue-600 hover:text-blue-800 font-medium hover:underline mr-3">Edit</button>
                                        <button onClick={() => handleRevoke(user.id)} className="text-red-500 hover:text-red-700 font-medium hover:underline">Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    ) : (
                        <div>
                            {requests.length > 0 ? (
                                <Table headers={["Request ID", "Organization", "Type", "Email", "Date", "Decision"]}>
                                    {requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{req.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{req.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{req.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{req.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{req.submitted}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-3">
                                                <button
                                                    onClick={() => handleApprove(req.id)}
                                                    className="bg-teal-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-teal-700 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(req.id)}
                                                    className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs font-bold hover:bg-slate-300 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </Table>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-500 text-lg">No pending requests.</p>
                                    <p className="text-slate-400 text-sm">All verifier applications have been processed.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserManagement;
