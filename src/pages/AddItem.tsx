import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FormData {
    title: string;
    description: string;
    category: string;
    type: 'lost' | 'found';
    location: string;
    dateReported: string;
    contactInfo: string;
    imageFile?: File;
}

interface FormErrors {
    title?: string;
    description?: string;
    category?: string;
    type?: string;
    location?: string;
    dateReported?: string;
    contactInfo?: string;
}

const AddItem: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        type: 'lost',
        location: '',
        dateReported: new Date().toISOString().split('T')[0],
        contactInfo: user?.email || '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const categories = [
        'Electronics',
        'Bags',
        'Accessories',
        'Books',
        'Clothing',
        'Keys',
        'Documents',
        'Jewelry',
        'Sports Equipment',
        'Other'
    ];

    const locations = [
        'Library - 1st Floor',
        'Library - 2nd Floor',
        'Library - 3rd Floor',
        'Engineering Building',
        'Science Building',
        'Arts Building',
        'Business Building',
        'Student Center',
        'Cafeteria - Main Hall',
        'Cafeteria - Food Court',
        'Sports Complex - Gym',
        'Sports Complex - Pool',
        'Parking Lot A',
        'Parking Lot B',
        'Parking Lot C',
        'Chemistry Lab - Building A',
        'Chemistry Lab - Building B',
        'Computer Lab',
        'Lecture Hall A',
        'Lecture Hall B',
        'Lecture Hall C',
        'Auditorium',
        'Campus Grounds',
        'Other'
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        } else if (formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.type) {
            newErrors.type = 'Type is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.dateReported) {
            newErrors.dateReported = 'Date is required';
        } else {
            const selectedDate = new Date(formData.dateReported);
            const today = new Date();
            const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            if (selectedDate > today) {
                newErrors.dateReported = 'Date cannot be in the future';
            } else if (selectedDate < thirtyDaysAgo) {
                newErrors.dateReported = 'Date cannot be more than 30 days ago';
            }
        }

        if (!formData.contactInfo.trim()) {
            newErrors.contactInfo = 'Contact information is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo)) {
            newErrors.contactInfo = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image file size must be less than 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            setFormData(prev => ({
                ...prev,
                imageFile: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: undefined
        }));
        setImagePreview(null);

        // Clear file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would typically send the data to your backend
            console.log('Form submitted:', formData);

            // Show success message
            alert('Item reported successfully!');

            // Navigate back to items list
            navigate('/items');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            navigate('/items');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Report Lost or Found Item</h1>
                    <p className="mt-2 text-gray-600">
                        Fill out the form below to report a lost or found item
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Item Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Item Type *
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="lost"
                                                checked={formData.type === 'lost'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <div className="ml-3">
                                                <span className="text-2xl mb-1 block">❌</span>
                                                <span className="font-medium text-gray-900">Lost Item</span>
                                                <p className="text-sm text-gray-500">I lost something</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="found"
                                                checked={formData.type === 'found'}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <div className="ml-3">
                                                <span className="text-2xl mb-1 block">✅</span>
                                                <span className="font-medium text-gray-900">Found Item</span>
                                                <p className="text-sm text-gray-500">I found something</p>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                </div>

                                {/* Item Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Item Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., iPhone 13 Pro Max, Blue Backpack"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.title ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    <p className="mt-1 text-sm text-gray-500">{formData.title.length}/100 characters</p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Provide detailed description including color, brand, distinctive features, etc."
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.description ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    <p className="mt-1 text-sm text-gray-500">{formData.description.length}/500 characters</p>
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.category ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <select
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.location ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select location</option>
                                        {locations.map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                </div>

                                {/* Date Reported */}
                                <div>
                                    <label htmlFor="dateReported" className="block text-sm font-medium text-gray-700 mb-2">
                                        Date {formData.type === 'lost' ? 'Lost' : 'Found'} *
                                    </label>
                                    <input
                                        type="date"
                                        id="dateReported"
                                        name="dateReported"
                                        value={formData.dateReported}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.dateReported ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.dateReported && <p className="mt-1 text-sm text-red-600">{errors.dateReported}</p>}
                                </div>

                                {/* Contact Information */}
                                <div>
                                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="contactInfo"
                                        name="contactInfo"
                                        value={formData.contactInfo}
                                        onChange={handleInputChange}
                                        placeholder="your.email@university.edu"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.contactInfo ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.contactInfo && <p className="mt-1 text-sm text-red-600">{errors.contactInfo}</p>}
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                        Item Image (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        {imagePreview ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                                                />
                                                <div className="space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-4xl mb-4 block">📸</span>
                                                <div className="space-y-2">
                                                    <p className="text-gray-600">Upload an image of the item</p>
                                                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-8 flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Report'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-900 mb-4">💡 Tips for Better Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                        <div>
                            <h4 className="font-semibold mb-2">For Lost Items:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Be as specific as possible in your description</li>
                                <li>Include unique identifying features</li>
                                <li>Mention the approximate time you lost it</li>
                                <li>Check back regularly for updates</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">For Found Items:</h4>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Don't include too many specific details publicly</li>
                                <li>Ask claimants to provide identifying details</li>
                                <li>Keep the item in a safe place</li>
                                <li>Respond promptly to potential owners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItem;