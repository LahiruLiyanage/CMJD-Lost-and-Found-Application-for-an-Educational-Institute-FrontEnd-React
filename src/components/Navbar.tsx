import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
    const { user, signOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        signOut();
        navigate('/signin');
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/items', label: 'All Items', icon: '📦' },
        { path: '/items/add', label: 'Report Item', icon: '➕' },
    ];

    return (
        <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
    <Link to="/dashboard" className="flex items-center space-x-2">
    <span className="text-2xl">🔍</span>
    <span className="font-bold text-xl text-gray-800">Lost & Found</span>
        </Link>
        </div>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
                <Link
                    key={link.path}
            to={link.path}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActiveRoute(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
        <span>{link.icon}</span>
        <span>{link.label}</span>
        </Link>
))}
    </div>

    {/* User Menu */}
    <div className="hidden md:flex items-center space-x-4">
    <div className="flex items-center space-x-2 text-sm text-gray-600">
    <span className="font-medium">{user?.name}</span>
    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
        {user?.role}
    </span>
    </div>
    <div className="relative">
    <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
        {user?.name?.charAt(0).toUpperCase()}
    </div>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        </button>

    {/* Dropdown Menu */}
    {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
        <Link
            to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsMenuOpen(false)}
    >
    👤 Profile
    </Link>
    <button
        onClick={handleSignOut}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                    🚪 Sign Out
    </button>
    </div>
    )}
    </div>
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
    <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
    >
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
)}
    </svg>
    </button>
    </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
        <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navLinks.map((link) => (
                    <Link
                        key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveRoute(link.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
        onClick={() => setIsMenuOpen(false)}
    >
        <span>{link.icon}</span>
        <span>{link.label}</span>
        </Link>
    ))}
        <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center px-3 py-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
            {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
        <div className="text-base font-medium text-gray-800">{user?.name}</div>
    <div className="text-sm text-gray-500">{user?.email}</div>
    </div>
    </div>
    <Link
        to="/profile"
        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => setIsMenuOpen(false)}
    >
    👤 Profile
    </Link>
    <button
        onClick={handleSignOut}
        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
                  🚪 Sign Out
    </button>
    </div>
    </div>
    </div>
    )}
    </div>
    </nav>
);
};

export default Navbar;