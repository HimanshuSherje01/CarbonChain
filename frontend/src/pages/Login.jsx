
import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const roles = [
    { id: 'ngo', label: 'NGO / Project Developer', desc: 'Submit and manage projects', color: 'bg-emerald-600' },
    { id: 'verifier', label: 'Verifier / Auditor', desc: 'Validate project submissions', color: 'bg-blue-600' },
    { id: 'corporate', label: 'Corporate Buyer', desc: 'Purchase carbon credits', color: 'bg-indigo-600' },
    { id: 'admin', label: 'Registry Admin', desc: 'System oversight', color: 'bg-slate-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Brand */}
        <div className="md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-between relative">
          {/* Abstract Pattern overlay could go here */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              CarbonChain
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              The official Blue Carbon Registry & MRV Platform. verifying transparency from eco-system to credit.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Safe</span>
              <span>•</span>
              <span>Transparent</span>
              <span>•</span>
              <span>Auditable</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Options */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Select your role to login to the demo portal.</p>

          <div className="grid gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => navigate(`/${role.id}`)}
                className="group flex items-center p-4 border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-full ${role.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {role.label[0]}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">{role.label}</h3>
                  <p className="text-xs text-slate-500">{role.desc}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-teal-600">
                  →
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2024 CarbonChain Registry. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
