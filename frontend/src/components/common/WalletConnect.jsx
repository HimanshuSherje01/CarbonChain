
import React from 'react';
import { useData } from '../../context/DataContext';

export const WalletConnect = () => {
    const { wallet, connectWallet } = useData();

    if (wallet.connected) {
        return (
            <div className="flex items-center gap-3 bg-slate-800 rounded-full px-4 py-1.5 border border-slate-700">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-mono text-slate-300">{wallet.address}</span>
                <span className="text-xs font-bold text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {wallet.balance} CC
                </span>
            </div>
        );
    }

    return (
        <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-teal-900/20 transition-all transform hover:scale-105"
        >
            Connect Wallet
        </button>
    );
};
