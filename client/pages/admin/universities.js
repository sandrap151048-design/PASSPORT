import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';

export default function AdminUniversities() {
    const [universities, setUniversities] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        country: '',
        websiteUrl: '',
        isActive: true
    });

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/universities/admin');
            setUniversities(res.data);
        } catch (error) {
            console.error('Error fetching universities:', error);
            alert('Error loading universities. Please check if the server is running.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/universities/${editingId}`, formData);
                alert('University updated successfully!');
            } else {
                await axios.post('http://localhost:5000/api/universities', formData);
                alert('University created successfully!');
            }
            fetchUniversities();
            resetForm();
        } catch (error) {
            console.error('Error saving university:', error);
            alert('Error saving university: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (uni) => {
        setFormData(uni);
        setEditingId(uni._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this university?')) {
            try {
                await axios.delete(`http://localhost:5000/api/universities/${id}`);
                fetchUniversities();
            } catch (error) {
                console.error('Error deleting university:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', logoUrl: '', country: '', websiteUrl: '', isActive: true });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 animate-slide-in-left">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Universities Management</h1>
                        <p className="text-gray-600 mt-1">Manage partner universities and institutions</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2 ${showForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-brand-blue hover:bg-brand-blue/90'} text-white`}
                    >
                        {showForm ? 'Cancel' : 'Add University'}
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 animate-zoom-in border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                            {editingId ? 'Edit University' : 'Add New University'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">University Name *</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="e.g., USA, UK" />
                            </div>
                            <div className="col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 text-brand-blue rounded" />
                                <label className="text-sm font-semibold text-gray-700">Active (visible on public pages)</label>
                            </div>
                            <div className="col-span-2 flex gap-3 pt-4">
                                <button type="submit" className="flex-1 bg-brand-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-blue/90 shadow-md">
                                    Save University
                                </button>
                                <button type="button" onClick={resetForm} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-in-right border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">University</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Country</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {universities.map((uni) => (
                                    <tr key={uni._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">{uni.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{uni.country}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${uni.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {uni.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button onClick={() => handleEdit(uni)} className="text-blue-600 hover:text-blue-900 font-semibold mr-4">Edit</button>
                                            <button onClick={() => handleDelete(uni._id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
