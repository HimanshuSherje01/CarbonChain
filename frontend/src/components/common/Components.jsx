
import React from 'react';

export const StatusBadge = ({ status }) => {
    const styles = {
        Verified: "bg-green-100 text-green-800 border-green-200",
        "Pending Verification": "bg-amber-100 text-amber-800 border-amber-200",
        Submitted: "bg-blue-100 text-blue-800 border-blue-200",
        Rejected: "bg-red-100 text-red-800 border-red-200",
    };

    const defaultStyle = "bg-gray-100 text-gray-800 border-gray-200";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
            {status}
        </span>
    );
};

export const StatCard = ({ label, value, subtext }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</h3>
            <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            {subtext && <p className="mt-1 text-sm text-slate-400">{subtext}</p>}
        </div>
    );
};

export const Table = ({ headers, children }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {children}
                </tbody>
            </table>
        </div>
    );
};
