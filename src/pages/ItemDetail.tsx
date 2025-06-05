import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Item {
    id: string;
    title: string;
    description: string;
    category: string;
    type: 'lost' | 'found';
    location: string;
    dateReported: string;
    reportedBy: string;
    reportedByEmail: string;
    status: 'active' | 'resolved' | 'claimed';
    imageUrl?: string;
    contactInfo: string;
    additionalNotes?: string;
}

const ItemDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [item, setItem] = useState<Item | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            setIsLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock data - replace with actual API call
            const mockItems: { [key: string]: Item } = {
                '1': {
                    id: '1',
                    title: 'iPhone 13 Pro Max',
                    description: 'Black iPhone 13 Pro Max with cracked screen protector. Has a blue case with a university sticker on the back. Phone was last seen in the library on the 2nd floor near the study desks.',
                    category: 'Electronics',
                    type: 'lost',
                    location: 'Library - 2nd Floor',
                    dateReported: '2025-06-04',
                    reportedBy: 'John Doe',
                    reportedByEmail: 'john.doe@university.edu',
                    status: 'active',
                    contactInfo: 'john.doe@university.edu',
                    additionalNotes: 'This phone contains important family photos and work documents. Reward offered for safe return.',
                    imageUrl: 'https://via.placeholder.com/400x300?text=iPhone+13+Pro+Max'
                },
                '2': {
                    id: '2',
                    title: 'Blue Backpack',
                    description: 'Navy blue Jansport backpack with math textbooks inside. Has a small tear on the front pocket and several keychains attached to the main zipper.',
                    category: 'Bags',
                    type: 'found',
                    location: 'Engineering Building - Room 201',
                    dateReported: '2025-06-03',
                    reportedBy: 'Jane Smith',
                    reportedByEmail: 'jane.smith@university.edu',
                    status: 'active',
                    contactInfo: 'jane.smith@university.edu',
                    additionalNotes: 'Found this backpack after lecture. Contains what appears to be calculus textbooks and notebooks.',
                    imageUrl: 'https://via.placeholder.com/400x300?text=Blue+Backpack'
                },
                '3': {
                    id: '3',
                    title: 'Silver Watch',
                    description: 'Casio silver digital watch with metal band. Watch face shows some scratches from regular use.',
                    category: 'Accessories',
                    type: 'lost',
                    location: 'Sports Complex - Gym',
                    dateReported: '2025-06-02',
                    reportedBy: 'Mike Johnson',
                    reportedByEmail: 'mike.johnson@university.edu',
                    status: 'resolved',
                    contactInfo: 'mike.johnson@university.edu',
                    additionalNotes: 'Lost during basketball practice. This watch has sentimental value as it was a graduation gift.',
                    imageUrl: 'https://via.placeholder.com/400x300?text=Silver+Watch'
                }
            };

            const foundItem = mockItems[id || ''];
            setItem(foundItem || null);
            setIsLoading(false);
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    const handleContactClick = () => {
        setShowContactInfo(true);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would typically send the message via API
        console.log('Sending message:', {
            itemId: item?.id,
            from: user?.email,
            to: item?.reportedByEmail,
            message: message
        });

        alert('Message sent successfully!');
        setMessage('');
        setShowMessageForm(false);
        setIsSubmitting(false);
    };

    const handleMarkAsResolved = async () => {
        if (!item) return;

        const confirmResolve = window.confirm('Are you sure you want to mark this item as resolved?');
        if (!confirmResolve) return;

        // Simulate API call
        setItem(prev => prev ? { ...prev, status: 'resolved' } : null);
        alert('Item marked as resolved!');
    };

    const handleDeleteItem = async () => {
        if (!item) return;

        const confirmDelete = window.confirm('Are you sure you want to delete this item? This action cannot be undone.');
        if (!confirmDelete) return;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        alert('Item deleted successfully!');
        navigate('/items');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-800 bg-green-100';
            case 'resolved':
                return 'text-blue-800 bg-blue-100';
            case 'claimed':
                return 'text-purple-800 bg-purple-100';
            default:
                return 'text-gray-800 bg-gray-100';
        }
    };

    const getTypeColor = (type: string) => {
        return type === 'lost' ? 'text-red-800 bg-red-100' : 'text-green-800 bg-green-100';
    };

    const isOwner = user?.email === item?.reportedByEmail;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading item details...</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
                    <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
                    <Link
                        to="/items"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        ← Back to Items
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation */}
                <div className="mb-6">
                    <Link
                        to="/items"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Items
                    </Link>
                </div>

                {/* Main Content */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full capitalize ${getTypeColor(item.type)}`}>
                                        {item.type}
                                    </span>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                    <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full text-gray-700 bg-gray-100">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            {isOwner && (
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/items/${item.id}/edit`}
                                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    {item.status === 'active' && (
                                        <button
                                            onClick={handleMarkAsResolved}
                                            className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                    <button
                                        onClick={handleDeleteItem}
                                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Image Section */}
                        <div>
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-6xl text-gray-400">📷</span>
                                        <p className="mt-2 text-gray-500">No image available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                                    <p className="text-gray-700 flex items-center">
                                        <span className="mr-2">📍</span>
                                        {item.location}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Date Reported</h4>
                                    <p className="text-gray-700 flex items-center">
                                        <span className="mr-2">📅</span>
                                        {new Date(item.dateReported).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 mb-1">Reported By</h4>
                                <p className="text-gray-700">{item.reportedBy}</p>
                            </div>

                            {item.additionalNotes && (
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Additional Notes</h4>
                                    <p className="text-gray-700 italic">{item.additionalNotes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Section */}
                    {!isOwner && item.status === 'active' && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

                            {!showContactInfo ? (
                                <button
                                    onClick={handleContactClick}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Show Contact Information
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-md border">
                                        <p className="text-gray-700">
                                            <strong>Email:</strong> {item.contactInfo}
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => setShowMessageForm(!showMessageForm)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            Send Message
                                        </button>
                                    </div>

                                    {showMessageForm && (
                                        <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-md border">
                                            <div className="mb-4">
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Write your message here..."
                                                    required
                                                />
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowMessageForm(false)}
                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Resolved Status Message */}
                    {item.status === 'resolved' && (
                        <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-900">Item Resolved</h3>
                                    <p className="text-blue-700">This item has been marked as resolved and is no longer available for contact.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;