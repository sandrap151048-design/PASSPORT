import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    programs: 0,
    services: 0,
    countries: 0,
    subscriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [programs, services, countries, subscriptions] = await Promise.all([
        axios.get('http://localhost:5000/api/programs/admin'),
        axios.get('http://localhost:5000/api/services/admin'),
        axios.get('http://localhost:5000/api/countries/admin'),
        axios.get('http://localhost:5000/api/subscriptions')
      ]);
      setStats({
        programs: programs.data.length,
        services: services.data.length,
        countries: countries.data.length,
        subscriptions: subscriptions.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">System Status</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/5 border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Programs</p>
                <p className="text-5xl font-black text-gray-900">
                  {loading ? (
                    <span className="inline-block w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></span>
                  ) : stats.programs}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center transform rotate-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/5 border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Services</p>
                <p className="text-5xl font-black text-gray-900">
                  {loading ? (
                    <span className="inline-block w-8 h-8 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></span>
                  ) : stats.services}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center transform -rotate-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-green-500/5 border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Total Countries</p>
                <p className="text-5xl font-black text-gray-900">
                  {loading ? (
                    <span className="inline-block w-8 h-8 rounded-full border-4 border-gray-200 border-t-green-600 animate-spin"></span>
                  ) : stats.countries}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center transform rotate-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-orange-500/5 border border-gray-100 p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Subscribers</p>
                <p className="text-5xl font-black text-gray-900">
                  {loading ? (
                    <span className="inline-block w-8 h-8 rounded-full border-4 border-gray-200 border-t-orange-600 animate-spin"></span>
                  ) : stats.subscriptions}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center transform -rotate-3">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-widest">Rapid Operations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/admin/programs" className="group flex flex-col gap-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-lg transition-all duration-300 text-center items-center">
              <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-blue-900">Manage Programs</p>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Add or edit records</p>
              </div>
            </Link>

            <Link href="/admin/services" className="group flex flex-col gap-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50/50 hover:shadow-lg transition-all duration-300 text-center items-center">
              <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-purple-900">Manage Services</p>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Add or edit records</p>
              </div>
            </Link>

            <Link href="/admin/countries" className="group flex flex-col gap-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-green-500 hover:bg-green-50/50 hover:shadow-lg transition-all duration-300 text-center items-center">
              <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 group-hover:text-green-900">Manage Countries</p>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Add or edit records</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
