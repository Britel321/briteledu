import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),

  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/\s/g, '')), {
      message: 'Please enter a valid phone number',
    }),

  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
