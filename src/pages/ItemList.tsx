import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    status: 'active' | 'resolved' | 'claimed';
    imageUrl?: string;
    contactInfo: string;
}

const ItemsList: React.FC = () => {
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const categories = ['Electronics', 'Bags', 'Accessories', 'Books', 'Clothing', 'Keys', 'Documents', 'Other'];

    // Mock data - replace with actual API calls
    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockItems: Item[] = [
                {
                    id: '1',
                    title: 'iPhone 13 Pro Max',
                    description: 'Black iPhone 13 Pro Max with cracked screen protector. Has a blue case.',
                    category: 'Electronics',
                    type: 'lost',
                    location: 'Library - 2nd Floor',
                    dateReported: '2025-06-04',
                    reportedBy: 'John Doe',
                    status: 'active',
                    contactInfo: 'john.doe@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=iPhone'
                },
                {
                    id: '2',
                    title: 'Blue Backpack',
                    description: 'Navy blue Jansport backpack with math textbooks inside. Has keychain attached.',
                    category: 'Bags',
                    type: 'found',
                    location: 'Engineering Building - Room 201',
                    dateReported: '2025-06-03',
                    reportedBy: 'Jane Smith',
                    status: 'active',
                    contactInfo: 'jane.smith@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Backpack'
                },
                {
                    id: '3',
                    title: 'Silver Watch',
                    description: 'Casio silver digital watch with metal band. Slightly scratched.',
                    category: 'Accessories',
                    type: 'lost',
                    location: 'Sports Complex - Gym',
                    dateReported: '2025-06-02',
                    reportedBy: 'Mike Johnson',
                    status: 'resolved',
                    contactInfo: 'mike.johnson@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Watch'
                },
                {
                    id: '4',
                    title: 'Red Notebook',
                    description: 'Red spiral notebook with chemistry notes. Owner name on cover.',
                    category: 'Books',
                    type: 'found',
                    location: 'Chemistry Lab - Building A',
                    dateReported: '2025-06-01',
                    reportedBy: 'Sarah Wilson',
                    status: 'active',
                    contactInfo: 'sarah.wilson@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Notebook'
                },
                {
                    id: '5',
                    title: 'AirPods Pro',
                    description: 'White AirPods Pro with charging case. Case has small dent.',
                    category: 'Electronics',
                    type: 'lost',
                    location: 'Cafeteria - Main Hall',
                    dateReported: '2025-05-31',
                    reportedBy: 'David Brown',
                    status: 'active',
                    contactInfo: 'david.brown@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=AirPods'
                },
                {
                    id: '6',
                    title: 'Black Wallet',
                    description: 'Black leather wallet with student ID inside.',
                    category: 'Accessories',
                    type: 'found',
                    location: 'Student Center - Food Court',
                    dateReported: '2025-05-30',
                    reportedBy: 'Emily Davis',
                    status: 'claimed',
                    contactInfo: 'emily.davis@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Wallet'
                },
                {
                    id: '7',
                    title: 'House Keys',
                    description: 'Set of house keys with Toyota keychain.',
                    category: 'Keys',
                    type: 'lost',
                    location: 'Parking Lot B',
                    dateReported: '2025-05-29',
                    reportedBy: 'Alex Thompson',
                    status: 'active',
                    contactInfo: 'alex.thompson@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Keys'
                },
                {
                    id: '8',
                    title: 'Blue Hoodie',
                    description: 'University blue hoodie, size Medium.',
                    category: 'Clothing',
                    type: 'found',
                    location: 'Lecture Hall C',
                    dateReported: '2025-05-28',
                    reportedBy: 'Lisa Chen',
                    status: 'active',
                    contactInfo: 'lisa.chen@university.edu',
                    imageUrl: 'https://via.placeholder.com/150x150?text=Hoodie'
                }
            ];

            setItems(mockItems);
            setFilteredItems(mockItems);
            setIsLoading(false);
        };

        fetchItems();
    }, []);

    // Filter items based on search criteria
    useEffect(() => {
        let filtered = items;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(item => item.status === selectedStatus);
        }

        setFilteredItems(filtered);
    }, [items, searchTerm, selectedCategory, selectedType, selectedStatus]);

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

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedType('all');
        setSelectedStatus('all');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Lost & Found Items</h1>
                            <p className="mt-2 text-gray-600">
                                Browse through {filteredItems.length} items
                            </p>
                        </div>
                        <Link
                            to="/items/add"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Report Item
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Items
                            </label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search by title, description, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                Type
                            </label>
                            <select
                                id="type"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="resolved">Resolved</option>
                                <option value="claimed">Claimed</option>
                            </select>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                            Clear all filters
                        </button>
                    </div>
                </div>

                {/* Items Grid */}
                {filteredItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <span className="text-6xl mb-4 block">🔍</span>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search criteria or clear the filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Item Image */}
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-4xl">📦</span>
                                    )}
                                </div>

                                {/* Item Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {item.title}
                                        </h3>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeColor(item.type)}`}>
                                            {item.type}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <span className="font-medium">📍 Location:</span>
                                            <span className="ml-1">{item.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium">📅 Date:</span>
                                            <span className="ml-1">{new Date(item.dateReported).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium">🏷️ Category:</span>
                                            <span className="ml-1">{item.category}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                        <Link
                                            to={`/items/${item.id}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsList;