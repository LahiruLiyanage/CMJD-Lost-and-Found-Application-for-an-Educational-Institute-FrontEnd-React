import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navbar from '@/components/Navbar.tsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ItemsList from './pages/ItemsList';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({
                                                                                            children,
                                                                                            requiredRole
                                                                                        }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            {isAuthenticated && <Navbar />}
            <main className={isAuthenticated ? 'pt-16' : ''}>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/signin"
                        element={
                            <PublicRoute>
                                <SignIn />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/items"
                        element={
                            <ProtectedRoute>
                                <ItemsList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/items/add"
                        element={
                            <ProtectedRoute>
                                <AddItem />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/items/:id"
                        element={
                            <ProtectedRoute>
                                <ItemDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default Route */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* 404 Route */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;