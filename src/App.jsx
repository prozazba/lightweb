import { useState } from 'react'
import { LayoutDashboard, Wallet, Receipt, Users, LogOut, Menu, X } from 'lucide-react'
import './App.css'

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    { label: 'Current Balance', value: 'Rp 12.500.000', icon: Wallet, color: 'text-emerald-400' },
    { label: 'Income This Month', value: 'Rp 3.200.000', icon: Receipt, color: 'text-blue-400' },
    { label: 'Active Members', value: '142', icon: Users, color: 'text-purple-400' },
  ]

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-200">
      {/* Sidebar */}
      <aside className={`glass fixed lg:relative z-50 h-[96vh] m-[2vh] transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-72' : 'w-20'} overflow-hidden`}>
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <span className={`font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Lightweb
          </span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {['Dashboard', 'Payments', 'Expenses', 'Members', 'Reports'].map((item) => (
            <button key={item} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-10 h-10 flex items-center justify-center opacity-70 group-hover:opacity-100">
                {item === 'Dashboard' && <LayoutDashboard size={22} />}
                {item === 'Payments' && <Receipt size={22} />}
                {item === 'Expenses' && <Wallet size={22} />}
                {item === 'Members' && <Users size={22} />}
                {item === 'Reports' && <Receipt size={22} />}
              </div>
              <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                {item}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors group">
            <div className="w-10 h-10 flex items-center justify-center">
              <LogOut size={22} />
            </div>
            <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Dashboard Overview
            </h1>
            <p className="text-slate-400">Welcome back, Administrator</p>
          </div>

          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-3 glass rounded-xl hover:bg-white/5 transition-all"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-8 group hover:border-white/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Updates</span>
              </div>
              <h3 className="text-slate-400 font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold tracking-tight text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for Recent Activity */}
        <div className="glass p-8 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
            <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-4">
            <div className="p-4 rounded-full bg-white/5">
              <Receipt size={40} />
            </div>
            <p>No recent activity found. Connect your database to start tracking.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
