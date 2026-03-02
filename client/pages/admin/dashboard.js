import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../utils/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    programs: 0, services: 0, countries: 0,
    subscriptions: 0, partners: 0, users: 0
  });
  const [recentSubs, setRecentSubs] = useState([]);
  const [recentPartners, setRecentPartners] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [programs, services, countries, subscriptions, partners, users] = await Promise.all([
        api.get('/programs/admin'),
        api.get('/services/admin'),
        api.get('/countries/admin'),
        api.get('/subscriptions'),
        api.get('/partners'),
        api.get('/auth/users')
      ]);
      setStats({
        programs: programs.data.length,
        services: services.data.length,
        countries: countries.data.length,
        subscriptions: subscriptions.data.length,
        partners: partners.data.length,
        users: users.data.length
      });
      setRecentSubs(subscriptions.data.slice(0, 5));
      setRecentPartners(partners.data.slice(0, 5));
      setRecentUsers(users.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Programs', value: stats.programs, color: 'blue', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', href: '/admin/programs' },
    { label: 'Services', value: stats.services, color: 'purple', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: '/admin/services' },
    { label: 'Countries', value: stats.countries, color: 'green', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', href: '/admin/countries' },
    { label: 'Subscribers', value: stats.subscriptions, color: 'orange', icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207', href: '/admin/subscriptions' },
    { label: 'Partners', value: stats.partners, color: 'red', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', href: '/admin/partners' },
    { label: 'Users', value: stats.users, color: 'indigo', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '/admin/users' },
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', shadow: 'shadow-blue-500/5' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', shadow: 'shadow-purple-500/5' },
    green: { bg: 'bg-green-50', text: 'text-green-600', shadow: 'shadow-green-500/5' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-500', shadow: 'shadow-orange-500/5' },
    red: { bg: 'bg-red-50', text: 'text-red-600', shadow: 'shadow-red-500/5' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', shadow: 'shadow-indigo-500/5' },
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <button onClick={fetchStats} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 font-bold text-xs uppercase tracking-widest transition-all">
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
          {statCards.map((card) => {
            const c = colorMap[card.color];
            return (
              <Link key={card.label} href={card.href} className={`group bg-white rounded-2xl shadow-xl ${c.shadow} border border-gray-100 p-6 hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}>
                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center`}>
                    <svg className={`w-6 h-6 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{card.label}</p>
                    <p className={`text-4xl font-black ${c.text}`}>
                      {loading ? <span className={`inline-block w-6 h-6 rounded-full border-4 border-gray-200 border-t-current animate-spin`}></span> : card.value}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity - 3 columns */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Recent Subscribers */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Subscribers</h2>
              <Link href="/admin/subscriptions" className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="flex justify-center py-10"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-orange-500 animate-spin"></div></div>
              ) : recentSubs.length === 0 ? (
                <p className="text-center text-gray-400 text-xs uppercase tracking-widest py-10 font-bold">No subscribers yet</p>
              ) : recentSubs.map((sub) => (
                <div key={sub._id} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs shrink-0">
                    {sub.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-700 truncate">{sub.email}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{sub.interest || 'General'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Partner Enquiries */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Partners</h2>
              <Link href="/admin/partners" className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="flex justify-center py-10"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin"></div></div>
              ) : recentPartners.length === 0 ? (
                <p className="text-center text-gray-400 text-xs uppercase tracking-widest py-10 font-bold">No enquiries yet</p>
              ) : recentPartners.map((p) => (
                <div key={p._id} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-black text-xs shrink-0">
                    {(p.name || 'P').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-700 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{p.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Registered Users */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Users</h2>
              <Link href="/admin/users" className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="flex justify-center py-10"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin"></div></div>
              ) : recentUsers.length === 0 ? (
                <p className="text-center text-gray-400 text-xs uppercase tracking-widest py-10 font-bold">No users yet</p>
              ) : recentUsers.map((u) => (
                <div key={u._id} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs shrink-0">
                    {(u.name || u.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-700 truncate">{u.name || 'N/A'}</p>
                    <p className="text-[10px] text-gray-400 font-medium truncate">{u.email}</p>
                  </div>
                  <span className={`ml-auto text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-600'}`}>{u.role || 'user'}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">Quick Navigation</h2>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { href: '/admin/programs', label: 'Programs', color: 'blue' },
              { href: '/admin/services', label: 'Services', color: 'purple' },
              { href: '/admin/countries', label: 'Countries', color: 'green' },
              { href: '/admin/subscriptions', label: 'Subscribers', color: 'orange' },
              { href: '/admin/partners', label: 'Partners', color: 'red' },
              { href: '/admin/users', label: 'Users', color: 'indigo' },
            ].map((item) => {
              const c = colorMap[item.color];
              return (
                <Link key={item.href} href={item.href} className={`group flex flex-col items-center gap-3 p-5 border-2 border-gray-100 rounded-2xl hover:border-current hover:shadow-lg transition-all duration-300 text-center ${c.text}`}>
                  <p className="font-black text-sm">{item.label}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-current transition-colors">Manage</p>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
