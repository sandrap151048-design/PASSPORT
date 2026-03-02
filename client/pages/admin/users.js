import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../utils/api';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-700';
            case 'agent': return 'bg-blue-100 text-blue-700';
            default: return 'bg-green-100 text-green-700';
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Registered Users</h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium">All users who have signed up or logged in via the portal</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                            {users.length} Total
                        </div>
                        <button
                            onClick={fetchUsers}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 font-bold text-xs uppercase tracking-widest transition-all"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">#</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">User</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Organization</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map((user, i) => (
                                        <tr key={user._id} className="hover:bg-gray-50/60 transition-colors group">
                                            <td className="px-8 py-5 text-sm text-gray-400 font-bold">{i + 1}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-black text-sm">
                                                        {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{user.name || '—'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                                                {user.phone && <p className="text-xs text-gray-400 font-bold mt-0.5">{user.phone}</p>}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getRoleColor(user.role)}`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                                {user.organization || '—'}
                                            </td>
                                            <td className="px-8 py-5 text-sm text-gray-400 font-medium whitespace-nowrap">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                }) : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
