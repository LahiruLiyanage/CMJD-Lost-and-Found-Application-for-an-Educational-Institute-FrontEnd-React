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

interface DashboardStats {
    totalItems: number;
    lostItems: number;
    foundItems: number;
    myItems: number;
    resolvedItems: number;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [recentItems, setRecentItems] = useState<Item[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalItems: 0,
        lostItems: 0,
        foundItems: 0,
        myItems: 0,
        resolvedItems: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - replace with actual API calls
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock stats data
            setStats({
                totalItems: 156,
                lostItems: 89,
                foundItems: 67,
                myItems: user?.role === 'student' ? 3 : 8,
                resolvedItems: 45,
            });

            // Mock recent items data
            const mockRecentItems: Item[] = [
                {
                    id: '1',
                    title: 'iPhone 13 Pro Max',
                    description: 'Black iPhone 13 Pro Max with cracked screen protector',
                    category: 'Electronics',
                    type: 'lost',
                    location: 'Library - 2nd Floor',
                    dateReported: '2025-06-04',
                    reportedBy: 'John Doe',
                    status: 'active',
                    contactInfo: 'john.doe@university.edu'
                },
                {
                    id: '2',
                    title: 'Blue Backpack',
                    description: 'Navy blue Jansport backpack with math textbooks inside',
                    category: 'Bags',
                    type: 'found',
                    location: 'Engineering Building - Room 201',
                    dateReported: '2025-06-03',
                    reportedBy: 'Jane Smith',
                    status: 'active',
                    contactInfo: 'jane.smith@university.edu'
                },
                {
                    id: '3',
                    title: 'Silver Watch',
                    description: 'Casio silver digital watch with metal band',
                    category: 'Accessories',
                    type: 'lost',
                    location: 'Sports Complex - Gym',
                    dateReported: '2025-06-02',
                    reportedBy: 'Mike Johnson',
                    status: 'resolved',
                    contactInfo: 'mike.johnson@university.edu'
                },
                {
                    id: '4',
                    title: 'Red Notebook',
                    description: 'Red spiral notebook with chemistry notes',
                    category: 'Books',
                    type: 'found',
                    location: 'Chemistry Lab - Building A',
                    dateReported: '2025-06-01',
                    reportedBy: 'Sarah Wilson',
                    status: 'active',
                    contactInfo: 'sarah.wilson@university.edu'
                },
                {
                    id: '5',
                    title: 'AirPods Pro',
                    description: 'White AirPods Pro with charging case',
                    category: 'Electronics',
                    type: 'lost',
                    location: 'Cafeteria - Main Hall',
                    dateReported: '2025-05-31',
                    reportedBy: 'David Brown',
                    status: 'active',
                    contactInfo: 'david.brown@university.edu'
                }
            ];

            setRecentItems(mockRecentItems);
            setIsLoading(false);
        };

        fetchDashboardData();
    }, [user]);

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Here's what's happening with lost and found items today.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/items/add"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md transition-colors group"
                        >
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">Report an Item</h3>
                                    <p className="text-blue-100">Lost or found something?</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/items"
                            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md transition-colors group"
                        >
                            <div className="flex items-center">
                                <div className="p-3 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">Browse Items</h3>
                                    <p className="text-green-100">Search for lost items</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/profile"
                            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-md transition-colors group"
                        >
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-500 rounded-full group-hover:bg-purple-600 transition-colors">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">My Profile</h3>
                                    <p className="text-purple-100">Manage your account</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <span className="text-2xl">❌</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Lost Items</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.lostItems}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Found Items</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.foundItems}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">My Items</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.myItems}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <span className="text-2xl">🎉</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.resolvedItems}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Items */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Items</h2>
                        <Link
                            to="/items"
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                            View all items →
                        </Link>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {recentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.dateReported).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                to={`/items/${item.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <span className="text-3xl mb-2 block">📋</span>
                            <h3 className="font-medium text-gray-900 mb-2">How to Report</h3>
                            <p className="text-sm text-gray-600">
                                Learn how to report lost or found items effectively
                            </p>
                        </div>
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <span className="text-3xl mb-2 block">🔍</span>
                            <h3 className="font-medium text-gray-900 mb-2">Search Tips</h3>
                            <p className="text-sm text-gray-600">
                                Get better results when searching for your lost items
                            </p>
                        </div>
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <span className="text-3xl mb-2 block">📞</span>
                            <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
                            <p className="text-sm text-gray-600">
                                Need help? Contact our support team for assistance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;