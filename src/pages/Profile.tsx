import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'staff' | 'admin';
    studentId?: string;
    employeeId?: string;
    department: string;
    phone: string;
    avatar?: string;
    joinedDate: string;
    lastLogin: string;
    isActive: boolean;
    preferences: {
        emailNotifications: boolean;
        smsNotifications: boolean;
        publicProfile: boolean;
        darkMode: boolean;
    };
    stats: {
        itemsReported: number;
        itemsFound: number;
        itemsResolved: number;
        helpfulReports: number;
    };
}

interface UserActivity {
    id: string;
    type: 'reported' | 'found' | 'resolved' | 'claimed';
    itemTitle: string;
    date: string;
    status: string;
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [recentActivity, setRecentActivity] = useState<UserActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'activity'>('overview');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        department: '',
        preferences: {
            emailNotifications: true,
            smsNotifications: false,
            publicProfile: true,
            darkMode: false,
        }
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Mock data - replace with actual API calls
    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockProfile: UserProfile = {
                id: user?.id || '1',
                name: user?.name || 'John Doe',
                email: user?.email || 'john.doe@university.edu',
                role: user?.role as 'student' | 'staff' | 'admin' || 'student',
                studentId: user?.role === 'student' ? 'STU2024001' : undefined,
                employeeId: user?.role === 'staff' ? 'EMP2024001' : undefined,
                department: 'Computer Science',
                phone: '+1 (555) 123-4567',
                joinedDate: '2024-01-15',
                lastLogin: '2025-06-05T08:30:00Z',
                isActive: true,
                preferences: {
                    emailNotifications: true,
                    smsNotifications: false,
                    publicProfile: true,
                    darkMode: false,
                },
                stats: {
                    itemsReported: 12,
                    itemsFound: 8,
                    itemsResolved: 15,
                    helpfulReports: 23,
                }
            };

            const mockActivity: UserActivity[] = [
                {
                    id: '1',
                    type: 'reported',
                    itemTitle: 'iPhone 13 Pro Max',
                    date: '2025-06-04',
                    status: 'active'
                },
                {
                    id: '2',
                    type: 'found',
                    itemTitle: 'Blue Backpack',
                    date: '2025-06-03',
                    status: 'claimed'
                },
                {
                    id: '3',
                    type: 'resolved',
                    itemTitle: 'Silver Watch',
                    date: '2025-06-02',
                    status: 'resolved'
                },
                {
                    id: '4',
                    type: 'reported',
                    itemTitle: 'Chemistry Textbook',
                    date: '2025-06-01',
                    status: 'active'
                },
                {
                    id: '5',
                    type: 'found',
                    itemTitle: 'Red Notebook',
                    date: '2025-05-31',
                    status: 'active'
                }
            ];

            setProfile(mockProfile);
            setRecentActivity(mockActivity);
            setFormData({
                name: mockProfile.name,
                phone: mockProfile.phone,
                department: mockProfile.department,
                preferences: mockProfile.preferences
            });
            setIsLoading(false);
        };

        fetchProfileData();
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name.startsWith('preferences.')) {
            const prefKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                preferences: {
                    ...prev.preferences,
                    [prefKey]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update profile
            if (profile) {
                const updatedProfile = {
                    ...profile,
                    name: formData.name,
                    phone: formData.phone,
                    department: formData.department,
                    preferences: formData.preferences
                };
                setProfile(updatedProfile);
            }

            // Update auth context if needed
            if (updateUser) {
                updateUser({
                    ...user,
                    name: formData.name
                });
            }

            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                name: profile.name,
                phone: profile.phone,
                department: profile.department,
                preferences: profile.preferences
            });
        }
        setErrors({});
        setIsEditing(false);
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'reported':
                return '📝';
            case 'found':
                return '🔍';
            case 'resolved':
                return '✅';
            case 'claimed':
                return '🎉';
            default:
                return '📋';
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'reported':
                return 'text-blue-800 bg-blue-100';
            case 'found':
                return 'text-green-800 bg-green-100';
            case 'resolved':
                return 'text-purple-800 bg-purple-100';
            case 'claimed':
                return 'text-yellow-800 bg-yellow-100';
            default:
                return 'text-gray-800 bg-gray-100';
        }
    };

    if (isLoading && !profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
                {saveSuccess && (
                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">Profile updated successfully!</span>
                    </div>
                )}

                {/* Profile Header */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-6 text-white">
                                <h1 className="text-3xl font-bold">{profile.name}</h1>
                                <p className="text-blue-100 text-lg capitalize">{profile.role}</p>
                                <p className="text-blue-100">{profile.email}</p>
                                {profile.studentId && (
                                    <p className="text-blue-100">Student ID: {profile.studentId}</p>
                                )}
                                {profile.employeeId && (
                                    <p className="text-blue-100">Employee ID: {profile.employeeId}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{profile.stats.itemsReported}</p>
                                <p className="text-blue-100 text-sm">Items Reported</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{profile.stats.itemsFound}</p>
                                <p className="text-blue-100 text-sm">Items Found</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{profile.stats.itemsResolved}</p>
                                <p className="text-blue-100 text-sm">Items Resolved</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{profile.stats.helpfulReports}</p>
                                <p className="text-blue-100 text-sm">Helpful Reports</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'overview'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'settings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'activity'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Recent Activity
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Personal Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="space-x-2">
                                            <button
                                                onClick={handleSave}
                                                disabled={isLoading}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                                            >
                                                {isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-gray-900">{profile.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <p className="text-gray-900">{profile.email}</p>
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                                        errors.phone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-gray-900">{profile.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department
                                        </label>
                                        {isEditing ? (
                                            <div>
                                                <select
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                                        errors.department ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Engineering">Engineering</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Mathematics">Mathematics</option>
                                                    <option value="Physics">Physics</option>
                                                    <option value="Chemistry">Chemistry</option>
                                                    <option value="Biology">Biology</option>
                                                    <option value="Literature">Literature</option>
                                                    <option value="History">History</option>
                                                    <option value="Psychology">Psychology</option>
                                                    <option value="Administration">Administration</option>
                                                    <option value="Maintenance">Maintenance</option>
                                                    <option value="Security">Security</option>
                                                </select>
                                                {errors.department && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-gray-900">{profile.department}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <p className="text-gray-900 capitalize">{profile.role}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Member Since
                                        </label>
                                        <p className="text-gray-900">
                                            {new Date(profile.joinedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="space-y-6">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Account Status</span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            profile.isActive ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                                        }`}>
                                            {profile.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Last Login</span>
                                        <span className="text-sm text-gray-900">
                                            {new Date(profile.lastLogin).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Profile Visibility</span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            profile.preferences.publicProfile ? 'text-blue-800 bg-blue-100' : 'text-gray-800 bg-gray-100'
                                        }`}>
                                            {profile.preferences.publicProfile ? 'Public' : 'Private'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Success Rate</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {Math.round((profile.stats.itemsResolved / profile.stats.itemsReported) * 100)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Community Helpful</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {profile.stats.helpfulReports} reports
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Contributions</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {profile.stats.itemsReported + profile.stats.itemsFound} items
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                        <p className="text-sm text-gray-500">Receive updates about your items via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="preferences.emailNotifications"
                                            checked={formData.preferences.emailNotifications}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                                        <p className="text-sm text-gray-500">Receive urgent updates via SMS</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="preferences.smsNotifications"
                                            checked={formData.preferences.smsNotifications}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Public Profile</h3>
                                        <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="preferences.publicProfile"
                                            checked={formData.preferences.publicProfile}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                                        <p className="text-sm text-gray-500">Use dark theme (coming soon)</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="preferences.darkMode"
                                            checked={formData.preferences.darkMode}
                                            onChange={handleInputChange}
                                            disabled
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600 opacity-50 cursor-not-allowed"></div>
                                    </label>
                                </div>

                                <div className="pt-4 border-t">
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
                                    >
                                        {isLoading ? 'Saving Settings...' : 'Save Settings'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {activity.type === 'reported' && `Reported: ${activity.itemTitle}`}
                                                        {activity.type === 'found' && `Found: ${activity.itemTitle}`}
                                                        {activity.type === 'resolved' && `Resolved: ${activity.itemTitle}`}
                                                        {activity.type === 'claimed' && `Claimed: ${activity.itemTitle}`}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(activity.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getActivityColor(activity.type)}`}>
                                                    {activity.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {recentActivity.length === 0 && (
                            <div className="px-6 py-12 text-center">
                                <span className="text-4xl mb-4 block">📋</span>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h3>
                                <p className="text-gray-500">Your recent activities will appear here.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;