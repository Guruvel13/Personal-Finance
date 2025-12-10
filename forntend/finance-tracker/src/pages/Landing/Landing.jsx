import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaWallet, FaShieldAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-violet-100 selection:text-violet-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="FinTrack Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-violet-500/30" />
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              FinTrack
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
                <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => navigate('/signup')} 
                    className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Start Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" 
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          // Calculate stylized parallax offset
          const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
          const y = (clientY / window.innerHeight - 0.5) * 20; 
          
          // Use CSS variables for performance if possible, or direct state style
          const root = document.documentElement;
          root.style.setProperty('--mouse-x', `${x}px`);
          root.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        {/* Abstract Background Elements with Parallax */}
        <div 
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 rounded-full blur-[100px] -z-10 transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: 'translate(calc(var(--mouse-x, 0px) * -2), calc(var(--mouse-y, 0px) * -2))' }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-50/50 to-blue-50/50 rounded-full blur-[100px] -z-10 transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: 'translate(calc(var(--mouse-x, 0px) * 2), calc(var(--mouse-y, 0px) * 2))' }}
        ></div>

        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            #1 Finance Management App
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
            Master your money with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">
              clarity and confidence.
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience a new way to track your finances. Beautifully designed, intuitive to use, and packed with powerful insights to help you grow your wealth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} 
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'} <FaArrowRight className="text-sm" />
            </button>

          </div>

          {/* Hero Visual with Tilt Parallax */}
          <div 
             className="relative max-w-5xl mx-auto mt-12 perspective-1000"
             style={{ 
               transform: 'translateY(calc(var(--mouse-y, 0px) * -0.5)) rotateX(calc(var(--mouse-y, 0px) * 0.05deg)) rotateY(calc(var(--mouse-x, 0px) * 0.05deg))',
               transition: 'transform 0.1s ease-out'
             }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
            
            <div className="bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 p-3 md:p-6 transition-transform duration-500 hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.12)]">
               <div className="bg-slate-50/50 rounded-2xl overflow-hidden aspect-[16/9] relative flex flex-col border border-slate-50 text-left">
                  {/* Dashboard Header Mock */}
                  <div className="h-14 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm flex items-center justify-between px-6">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                       <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                       <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                    </div>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Mock */}
                    <div className="w-16 border-r border-slate-200/60 bg-white/50 hidden md:flex flex-col items-center py-6 gap-6">
                       {[1,2,3,4].map(i => (
                         <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i===1 ? 'bg-violet-100 text-violet-600' : 'text-slate-300'}`}>
                           {i===1 && <FaChartLine />}
                         </div>
                       ))}
                    </div>

                    {/* Dashboard Content Mock */}
                    <div className="flex-1 p-6 md:p-8 bg-slate-50/30 overflow-hidden flex flex-col gap-6">
                       {/* Stats Row */}
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaWallet className="text-4xl text-violet-600"/>
                             </div>
                             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Balance</p>
                             <h3 className="text-2xl font-bold text-slate-900">$24,562.00</h3>
                             <p className="text-xs text-emerald-500 flex items-center gap-1 mt-2 font-medium">+2.5% <span className="text-slate-400 font-normal">from last month</span></p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Monthly Income</p>
                             <h3 className="text-2xl font-bold text-slate-900">$8,240.00</h3>
                             <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                               <div className="h-full w-3/4 bg-emerald-400 rounded-full"></div>
                             </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Expenses</p>
                             <h3 className="text-2xl font-bold text-slate-900">$3,120.00</h3>
                             <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                               <div className="h-full w-1/3 bg-rose-400 rounded-full"></div>
                             </div>
                          </div>
                       </div>

                       <div className="flex-1 flex gap-6 min-h-0">
                          {/* Main Chart Area */}
                          <div className="flex-[2] bg-white rounded-xl border border-slate-100 shadow-sm p-4 hidden md:flex flex-col">
                             <div className="flex justify-between items-center mb-4">
                               <h4 className="font-bold text-slate-800 text-sm">Analytics</h4>
                               <div className="flex gap-2">
                                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                               </div>
                             </div>
                             <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={[
                                    { name: 'M', uv: 4000, pv: 2400 },
                                    { name: 'T', uv: 3000, pv: 1398 },
                                    { name: 'W', uv: 2000, pv: 9800 },
                                    { name: 'T', uv: 2780, pv: 3908 },
                                    { name: 'F', uv: 1890, pv: 4800 },
                                    { name: 'S', uv: 2390, pv: 3800 },
                                    { name: 'S', uv: 3490, pv: 4300 },
                                  ]}>
                                    <defs>
                                      <linearGradient id="colorUvMock" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="uv" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorUvMock)" />
                                    <Area type="monotone" dataKey="pv" stroke="#6366f1" strokeWidth={2} fillOpacity={0} fill="transparent" strokeDasharray="5 5"/>
                                  </AreaChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                          
                          {/* Recent Activity List */}
                          <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
                             <h4 className="font-bold text-slate-800 text-sm mb-1">Recent Activity</h4>
                             {[1,2,3].map(i => (
                               <div key={i} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i%2===0 ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                       <FaWallet />
                                     </div>
                                     <div className="flex flex-col">
                                       <span className="font-semibold text-slate-700">Payment Received</span>
                                       <span className="text-slate-400 text-[10px]">Today, 10:24 AM</span>
                                     </div>
                                  </div>
                                  <span className="font-bold text-emerald-600">+$240.00</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
            
            {/* Decorative blurs behind the image */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[60%] bg-violet-600/10 blur-[80px] -z-10 rounded-full opacity-40 transition-transform duration-300"
              style={{ transform: 'translate(calc(-50% + var(--mouse-x, 0px) * 0.5), calc(-50% + var(--mouse-y, 0px) * 0.5))' }}
            ></div>
          </div>
        </div>
      </header>



      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything needed to perform.</h2>
             <p className="text-lg text-slate-500">Powerful features wrapped in a stunningly simple interface. We've removed the clutter so you can focus on clarity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard 
                icon={<FaChartLine className="text-2xl text-violet-600"/>}
                title="Real-time Analytics"
                desc="Visualize your cash flow with interactive charts and real-time data updates."
            />
            <FeatureCard 
                icon={<FaWallet className="text-2xl text-indigo-600"/>}
                title="Smart Budgeting"
                desc="Create custom budgets for different categories and get notified when you're close to limits."
            />
            <FeatureCard 
                icon={<FaShieldAlt className="text-2xl text-emerald-600"/>}
                title="Bank-grade Security"
                desc="Your data is encrypted with AES-256 protocols, ensuring your financial information stays private."
            />
          </div>
        </div>
      </section>

      {/* Analytics Showcase Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-6">
                    <FaChartLine />
                    <span>Deep Insights</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    Visualize your financial<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">growth and stability.</span>
                  </h2>
                  <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                    Stop guessing where your money goes. Our interactive charts give you a crystal-clear view of your income, expenses, and savings trends over time.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Income vs Expense", desc: "Track your cash flow month by month." },
                      { title: "Category Breakdown", desc: "See exactly which categories consume your budget." },
                      { title: "Savings Goals", desc: "Monitor your progress towards your financial targets." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-violet-600 shadow-sm shrink-0">
                          <FaCheckCircle className="text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="lg:w-1/2 w-full relative">
                 {/* Decorative background blob */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 rounded-full blur-3xl -z-10"></div>
                 
                 <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                       <div>
                         <h3 className="text-lg font-bold text-slate-900">Cash Flow</h3>
                         <p className="text-sm text-slate-400">Past 6 Months</p>
                       </div>
                       <div className="flex gap-2">
                          <span className="w-3 h-3 rounded-full bg-violet-500"></span>
                          <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                       </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'Jan', income: 4000, expense: 2400 },
                          { name: 'Feb', income: 3000, expense: 1398 },
                          { name: 'Mar', income: 2000, expense: 9800 },
                          { name: 'Apr', income: 2780, expense: 3908 },
                          { name: 'May', income: 1890, expense: 4800 },
                          { name: 'Jun', income: 2390, expense: 3800 },
                        ]}>
                          <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#34d399" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                          />
                          <Area type="monotone" dataKey="income" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                          <Area type="monotone" dataKey="expense" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Ready to take control?</h2>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Join FinTrack today and see the difference a professional tool can make in your financial life.
            </p>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 hover:shadow-2xl transition-all active:scale-95"
            >
              Start Your Free Trial
            </button>
         </div>
      </section>


    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
