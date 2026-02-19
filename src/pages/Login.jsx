import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LayoutDashboard, Receipt, FileText, ShieldCheck, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would call the API here
        // For now, we'll simulate a successful login
        onLogin({ email, role: 'admin' });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
            {/* Left side - Information Branding */}
            <div className="hidden md:flex md:w-1/2 bg-[#0052cc] p-12 lg:p-20 flex-col justify-between text-white relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                            <LayoutDashboard size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">LIGHTWEB</span>
                    </div>

                    <div className="max-w-md">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Finance System<br />Organisasi Lightweb
                        </h1>
                        <p className="text-white/80 text-lg mb-12">
                            Kelola iuran, pengeluaran, dan laporan keuangan organisasi Anda dengan mudah dan aman.
                        </p>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                                    <Receipt size={20} className="text-white" />
                                </div>
                                <h3 className="font-bold mb-1">Pembayaran Iuran</h3>
                                <p className="text-xs text-white/60">Catat & pantau iuran anggota</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                                    <FileText size={20} className="text-white" />
                                </div>
                                <h3 className="font-bold mb-1">Laporan Otomatis</h3>
                                <p className="text-xs text-white/60">PDF laporan bulanan auto</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                                    <FileText size={20} className="text-white" />
                                </div>
                                <h3 className="font-bold mb-1">Bukti Bayar PDF</h3>
                                <p className="text-xs text-white/60">Generate otomatis setiap transaksi</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                                    <ShieldCheck size={20} className="text-white" />
                                </div>
                                <h3 className="font-bold mb-1">RLS Security</h3>
                                <p className="text-xs text-white/60">Data terlindungi & aman</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-white/40 text-sm">
                    © 2026 Organisasi Lightweb. All rights reserved.
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h2>
                        <p className="text-slate-500">Masukkan email dan password Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0052cc] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0052cc]/20 focus:border-[#0052cc] transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="email@lightweb.app"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0052cc] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0052cc]/20 focus:border-[#0052cc] transition-all text-slate-900 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-sm font-medium text-[#0052cc] hover:underline">
                                Lupa password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#0052cc] hover:bg-[#0047b3] text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            Masuk
                        </button>
                    </form>

                    <p className="mt-10 text-center text-slate-600">
                        Belum punya akun?{' '}
                        <button className="text-[#0052cc] font-bold hover:underline">
                            Daftar sekarang
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
