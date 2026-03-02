import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../utils/api';

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            alert('Error loading inquiries. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 animate-slide-in-left">
                    <h1 className="text-3xl font-bold text-gray-900">Inquiries Dashboard</h1>
                    <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Inquiries Found</h3>
                        <p className="text-gray-500">There are currently no contact form submissions.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 animate-slide-in-right">
                        {contacts.map((contact, i) => (
                            <div key={contact._id || i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {contact.name || 'Anonymous User'}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <a href={`mailto:${contact.email}`} className="hover:text-brand-blue transition-colors">
                                                    {contact.email || 'N/A'}
                                                </a>
                                            </span>
                                            {contact.phone && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <a href={`tel:${contact.phone}`} className="hover:text-brand-blue transition-colors">
                                                        {contact.phone}
                                                    </a>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full w-fit">
                                        {formatDate(contact.createdAt)}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-1">Area of Interest</div>
                                    <p className="text-gray-900 font-medium mb-4">{contact.subject || 'Not Specified'}</p>

                                    <div className="text-sm font-semibold text-gray-700 mb-1">Message</div>
                                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{contact.message || 'No additional details provided.'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
