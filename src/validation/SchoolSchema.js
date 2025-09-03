import { z } from 'zod';

export const schoolSchema = z.object({
    name: z.string().min(1, 'School name is required').min(3, 'School name must be at least 3 characters'),
    address: z.string().min(1, 'Address is required').min(10, 'Address must be at least 10 characters'),
    city: z.string().min(1, 'City is required').min(2, 'City must be at least 2 characters'),
    state: z.string().min(1, 'State is required').min(2, 'State must be at least 2 characters'),
    contact: z.string()
        .min(1, 'Contact number is required')
        .regex(/^\d{10}$/, 'Contact must be exactly 10 digits'),
    email_id: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    image: z.any().refine(
        (files) => files?.length > 0,
        'School image is required'
    ).refine(
        (files) => files?.[0]?.size <= 5000000,
        'File size should be less than 5MB'
    ).refine(
        (files) => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .gif formats are supported'
    )
});