import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'undergraduate',
    duration: '',
    description: '',
    imageUrl: '',
    highlights: [],
    isActive: true
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/programs/admin');
      setPrograms(res.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      alert('Error loading programs. Please check if the server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/programs/${editingId}`, formData);
        alert('Program updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/programs', formData);
        alert('Program created successfully!');
      }
      fetchPrograms();
      resetForm();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Error saving program: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (program) => {
    setFormData(program);
    setEditingId(program._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        await axios.delete(`http://localhost:5000/api/programs/${id}`);
        fetchPrograms();
      } catch (error) {
        console.error('Error deleting program:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'undergraduate', duration: '', description: '', imageUrl: '', highlights: [], isActive: true });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-slide-in-left">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
            <p className="text-gray-600 mt-1">Manage undergraduate, postgraduate, and doctoral programs</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2 ${showForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-900 hover:bg-gray-800'} text-white`}
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Program
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 animate-zoom-in border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
              {editingId ? (
                <>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Program
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Program
                </>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Program Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" placeholder="e.g., Bachelor of Science" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all">
                    <option value="undergraduate">📚 Undergraduate (UG)</option>
                    <option value="postgraduate">🎓 Postgraduate (PG)</option>
                    <option value="doctoral">👨‍🎓 Doctoral</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" placeholder="e.g., 3-4 years" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" rows="4" placeholder="Describe the program..."></textarea>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 text-gray-900 rounded focus:ring-2 focus:ring-gray-900" />
                <label className="text-sm font-semibold text-gray-700">Active (visible on public pages)</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Program
                </button>
                <button type="button" onClick={resetForm} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-in-right border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program, index) => (
                  <tr key={program._id} className="hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${program.type === 'undergraduate' ? 'bg-blue-100 text-blue-800' : program.type === 'postgraduate' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'}`}>
                        📚 {program.type === 'undergraduate' ? 'UG' : program.type === 'postgraduate' ? 'PG' : 'Doctoral'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{program.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${program.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {program.isActive ? '✓ Active' : '✕ Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => handleEdit(program)} className="text-blue-600 hover:text-blue-900 font-semibold mr-4 transition-colors inline-flex items-center gap-1">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(program._id)} className="text-red-600 hover:text-red-900 font-semibold transition-colors inline-flex items-center gap-1">
                        🗑️ Delete
                      </button>
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
