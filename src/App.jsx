import { useState, useEffect } from 'react'
import Login from './pages/Login'
import { LayoutDashboard, Wallet, Receipt, Users, LogOut, Menu, X, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  // Persistent login simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const stats = [
    { label: 'Current Balance', value: 'Rp 12.500.000', icon: Wallet, color: 'text-emerald-400', trend: '+12%', isUp: true },
    { label: 'Income This Month', value: 'Rp 3.200.000', icon: Receipt, color: 'text-blue-400', trend: '+5%', isUp: true },
    { label: 'Active Members', value: '142', icon: Users, color: 'text-purple-400', trend: '0%', isUp: true },
  ]

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-200">
      {/* Sidebar */}
      <aside className={`glass fixed lg:relative z-50 h-[96vh] m-[2vh] transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-72' : 'w-20'} overflow-hidden shadow-2xl shadow-indigo-500/10`}>
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#0052cc] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <span className={`font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Lightweb
          </span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {['Dashboard', 'Payments', 'Expenses', 'Members', 'Reports'].map((item) => (
            <button
              key={item}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${item === 'Dashboard' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                {item === 'Dashboard' && <LayoutDashboard size={22} />}
                {item === 'Payments' && <Receipt size={22} />}
                {item === 'Expenses' && <Wallet size={22} />}
                {item === 'Members' && <Users size={22} />}
                {item === 'Reports' && <FileText size={22} />}
              </div>
              <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}>
                {item}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className={`mb-4 flex items-center gap-3 p-3 rounded-2xl bg-white/5 transition-all ${!isSidebarOpen && 'opacity-0'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0052cc] to-blue-400 flex items-center justify-center font-bold text-white shadow-md">
              {user.full_name?.[0] || user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors group"
          >
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <LogOut size={22} />
            </div>
            <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              Dashboard Overview
            </h1>
            <p className="text-slate-400">Welcome to the Lightweb Finance command center.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Server Status</p>
              <p className="text-emerald-400 text-sm font-medium flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Connection
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-3 glass rounded-xl hover:bg-white/5 hover:scale-105 transition-all active:scale-95"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-8 group hover:border-white/10 transition-all duration-300 relative overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 ${stat.color}`}>
                    <stat.icon size={28} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-white/5 ${stat.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                  </div>
                </div>
                <h3 className="text-slate-400 font-medium tracking-wide mb-1 flex items-center gap-2">
                  {stat.label}
                  <TrendingUp size={14} className="opacity-30" />
                </h3>
                <p className="text-3xl font-bold tracking-tight text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 glass p-8 relative overflow-hidden h-fit">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Recent Transactions
              </h2>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 bg-white/5 rounded-lg transition-colors">
                View Ledger
              </button>
            </div>

            <div className="space-y-4">
              {/* Dummy rows to show aesthetics */}
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Receipt size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Iuran Bulanan - {['Budi Santoso', 'Siti Aminah', 'Andi Wijaya'][i]}</p>
                    <p className="text-xs text-slate-500">Invoice: LW-202602-00{i + 1} • 19 Feb 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">+Rp 250.000</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter italic">Sukses</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center justify-center text-slate-500 gap-4">
              <p className="text-sm">Download full report for this month</p>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0052cc] rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                <FileText size={18} />
                Generate PDF Report
              </button>
            </div>
          </div>

          {/* Side Info / Quick Actions */}
          <div className="space-y-8">
            <div className="glass p-8 bg-gradient-to-br from-[#0052cc]/20 to-transparent">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-all flex items-center justify-between group">
                  <span className="font-medium text-sm">Add New Payment</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Receipt size={18} />
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-all flex items-center justify-between group">
                  <span className="font-medium text-sm">Record Expense</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Wallet size={18} />
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-all flex items-center justify-between group">
                  <span className="font-medium text-sm">Add New Member</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Users size={18} />
                  </div>
                </button>
              </div>
            </div>

            <div className="glass p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck size={120} />
              </div>
              <h2 className="text-xl font-bold mb-2">Systems Secure</h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Row-Level Security (RLS) is active. Your data is isolated and protected at the database tier.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={12} />
                Verified Encrypted
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
