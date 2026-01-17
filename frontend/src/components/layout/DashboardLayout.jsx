
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const navigate = useNavigate();

    const links = {
        ngo: [
            { name: 'Dashboard', path: '/ngo' },
            { name: 'My Projects', path: '/ngo/projects' },
            { name: 'Submit New', path: '/ngo/submit' },
        ],
        verifier: [
            { name: 'Dashboard', path: '/verifier' },
            { name: 'Pending Reviews', path: '/verifier/reviews' },
        ],
        corporate: [
            { name: 'Dashboard', path: '/corporate' },
            { name: 'Marketplace', path: '/corporate/market' },
            { name: 'My Offsets', path: '/corporate/portfolio' },
        ],
        admin: [
            { name: 'Overview', path: '/admin' },
            { name: 'Registry', path: '/admin/registry' },
            { name: 'Audit Log', path: '/admin/audit' },
            { name: 'Users', path: '/admin/users' },
        ]
    };

    const roleLinks = links[role.toLowerCase()] || [];

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    CarbonChain
                </h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{role} Portal</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {roleLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                        end={link.path !== '/' + role.toLowerCase()} // Only exact match for root dashboard unless subpath
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => navigate('/')}
                    className="w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md text-left transition-colors flex items-center gap-2"
                >
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export const DashboardLayout = ({ children, role }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar role={role} />
            <div className="pl-64">
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                            {role[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
