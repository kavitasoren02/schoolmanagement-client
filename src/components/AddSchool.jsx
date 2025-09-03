import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolSchema } from '../validation/SchoolSchema';

const AddSchool = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: zodResolver(schoolSchema),
        mode: 'onChange'
    });

    const watchedImage = watch('image');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('contact', data.contact);
            formData.append('email_id', data.email_id);
            formData.append('image', data.image[0]);

            const response = await fetch('https://schoolmanagement-server.onrender.com/api/schools', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitSuccess('School added successfully!');
                reset();
                setTimeout(() => {
                    onSuccess && onSuccess();
                }, 2000);
            } else {
                setSubmitError(result.message || 'Error adding school');
            }
        } catch (error) {
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New School</h2>
                <p className="text-gray-600">Fill in the details to add a new school to the database</p>
            </div>

            {submitSuccess && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">{submitSuccess}</p>
                        </div>
                    </div>
                </div>
            )}

            {submitError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* School Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        School Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter school name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="address"
                        rows="3"
                        {...register('address')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.address ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter complete school address"
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register('city')}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.city ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter city"
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                            State <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="state"
                            {...register('state')}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.state ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter state"
                        />
                        {errors.state && (
                            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                        )}
                    </div>
                </div>

                {/* Contact and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="contact"
                            {...register('contact')}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.contact ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter 10-digit contact number"
                        />
                        {errors.contact && (
                            <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email_id"
                            {...register('email_id')}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.email_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter email address"
                        />
                        {errors.email_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
                        )}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        School Image <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-6 ${errors.image ? 'border-red-500' : 'border-gray-300'
                        }`}>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register('image')}
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-center">
                                <span className="text-blue-600 font-medium">Click to upload</span>
                                <span className="text-gray-500"> or drag and drop</span>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </label>
                        {watchedImage && watchedImage.length > 0 && (
                            <p className="mt-2 text-sm text-green-600">
                                Selected: {watchedImage[0].name}
                            </p>
                        )}
                    </div>
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                    >
                        Reset Form
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding School...
                            </div>
                        ) : (
                            'Add School'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSchool;
