import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'staff' | 'admin';
    studentId?: string;
    department?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'student' | 'staff';
    studentId?: string;
    department?: string;
}

export interface AuthContextType extends AuthState {
    signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
    signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
    updateUser: (userData: Partial<User>) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    const user = JSON.parse(storedUser);
                    setAuthState({
                        user,
                        token: storedToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    setAuthState(prev => ({ ...prev, isLoading: false }));
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        };

        initializeAuth();
    }, []);

    // Mock API call - replace with actual API integration
    const mockApiCall = async (endpoint: string, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (endpoint === 'signin') {
                    // Mock successful sign in
                    if (data.email && data.password) {
                        const mockUser: User = {
                            id: '1',
                            email: data.email,
                            name: data.email.split('@')[0],
                            role: data.email.includes('admin') ? 'admin' : 'student',
                            studentId: 'ST001',
                            department: 'Computer Science',
                        };
                        resolve({
                            user: mockUser,
                            token: 'mock-jwt-token-' + Date.now(),
                        });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                } else if (endpoint === 'signup') {
                    // Mock successful sign up
                    const mockUser: User = {
                        id: Date.now().toString(),
                        email: data.email,
                        name: data.name,
                        role: data.role,
                        studentId: data.studentId,
                        department: data.department,
                    };
                    resolve({
                        user: mockUser,
                        token: 'mock-jwt-token-' + Date.now(),
                    });
                }
            }, 1000); // Simulate network delay
        });
    };

    const signIn = async (data: SignInData): Promise<{ success: boolean; error?: string }> => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true }));

            const response = await mockApiCall('signin', data);

            // Store in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            setAuthState({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Sign in failed'
            };
        }
    };

    const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
        try {
            // Validation
            if (data.password !== data.confirmPassword) {
                return { success: false, error: 'Passwords do not match' };
            }

            setAuthState(prev => ({ ...prev, isLoading: true }));

            const response = await mockApiCall('signup', data);

            // Store in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            setAuthState({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Sign up failed'
            };
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    const updateUser = (userData: Partial<User>) => {
        if (authState.user) {
            const updatedUser = { ...authState.user, ...userData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setAuthState(prev => ({
                ...prev,
                user: updatedUser,
            }));
        }
    };

    const value: AuthContextType = {
        ...authState,
        signIn,
        signUp,
        signOut,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};