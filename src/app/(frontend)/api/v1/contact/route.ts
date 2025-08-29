import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { contactFormSchema } from '@/components/ContactForm/schema'
import configPromise from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the form data using Zod
    const validatedData = contactFormSchema.parse(body)

    // Get Payload instance
    const payload = await getPayload({ config: configPromise })

    // Get client IP and user agent
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create the contact form submission
    const contactForm = await payload.create({
      collection: 'contact-forms',
      data: {
        ...validatedData,
        ipAddress,
        userAgent,
        status: 'new',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: contactForm.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact form submission error:', error)

    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: JSON.parse(error.message),
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
