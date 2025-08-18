# Footer Components

This directory contains footer components for the Political Portfolio app.

## Components

### NewFooter
The main footer component that renders both desktop and mobile footers based on screen size.

### DesktopFooter
A comprehensive footer designed for desktop screens with:
- Company information and description
- Social media icons (Facebook, Twitter, Instagram, LinkedIn)
- Quick navigation links
- Contact information with icons
- Copyright and legal links

### MobileFooter
A mobile-optimized footer with:
- Compact company information
- Grid-based quick links with icons
- Contact information in card format
- Social media icons
- Simplified bottom links

## Features

- **Responsive Design**: Automatically switches between desktop and mobile layouts
- **Icons**: Uses Lucide React icons for visual appeal
- **Dummy Data**: Includes sample content for demonstration
- **Hover Effects**: Interactive elements with smooth transitions
- **Accessibility**: Proper ARIA labels and semantic HTML

## Usage

```tsx
import { NewFooter } from '@/Footer'

// In your layout or page component
<NewFooter />
```

Or use individual components:

```tsx
import { DesktopFooter, MobileFooter } from '@/Footer'

// Use specific components
<DesktopFooter />
<MobileFooter />
```

## Dummy Data

The components include sample data for:
- Social media links
- Quick navigation links
- Contact information
- Company description

Replace the dummy data with your actual content when implementing in production.

## Styling

The components use Tailwind CSS classes and include:
- Gradient backgrounds
- Hover effects and transitions
- Responsive grid layouts
- Icon styling with background colors 