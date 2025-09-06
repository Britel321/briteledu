# BriteEducation 🎓

A comprehensive educational platform built with Next.js and PayloadCMS, designed to connect students with universities, courses, and educational opportunities worldwide.

## 🌟 Features

### 🎯 Core Functionality
- **University Directory**: Comprehensive database of universities with detailed profiles, locations, and programs
- **Course Catalog**: Extensive course offerings across multiple categories including language proficiency, test preparation, and academic skills
- **Educational Content Management**: Dynamic blog posts and educational articles
- **Consultation Services**: Appointment booking system for educational counseling
- **Multi-language Support**: Built-in language translation capabilities
- **Search & Filtering**: Advanced search functionality for courses and universities

### 🏗️ Technical Features
- **Headless CMS**: Powered by PayloadCMS for flexible content management
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful, modern interface
- **SEO Optimized**: Built-in SEO tools and meta tag management
- **Live Preview**: Real-time content preview in admin panel
- **Image Optimization**: Integrated with UploadThing for media management
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive E2E and integration testing with Playwright and Vitest

## 🚀 Quick Start

### Prerequisites
- Node.js 18.20.2+ or 20.9.0+
- pnpm 9+ or 10+
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd briteledu
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URI=mongodb://localhost:27017/briteledu
   PAYLOAD_SECRET=your-secret-key-here
   UPLOADTHING_TOKEN=your-uploadthing-token
   CRON_SECRET=your-cron-secret
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Using Docker

```bash
docker-compose up
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public-facing pages
│   └── (payload)/         # Admin panel routes
├── blocks/                # Reusable content blocks
├── collections/           # PayloadCMS collections
│   ├── Universities/      # University data management
│   ├── Courses/          # Course catalog
│   ├── Posts/            # Blog posts
│   └── ...
├── components/           # React components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── providers/           # App providers
└── utilities/           # Helper functions
```

## 🎨 Key Collections

### Universities
- University profiles with detailed information
- Location, founding year, student count
- Course offerings and programs
- Rich media support

### Courses
- Comprehensive course catalog
- Categories: Language Proficiency, Test Preparation, Graduate Tests, etc.
- Pricing, duration, and difficulty levels
- Prerequisites and learning outcomes

### Educational Content
- Blog posts and articles
- SEO-optimized content
- Category-based organization
- Rich text editing with Lexical

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run E2E tests
pnpm test:int         # Run integration tests

# PayloadCMS
pnpm payload          # Access Payload CLI
pnpm generate:types   # Generate TypeScript types
```

## 🔧 Configuration

### PayloadCMS Admin Panel
- Custom dashboard with educational metrics
- Role-based access control
- Live preview functionality
- Custom branding and theming

### Content Management
The platform includes several content types:
- **Pages**: Dynamic page creation with flexible layouts
- **Posts**: Blog articles and educational content
- **Media**: Centralized media management
- **Site Settings**: Global configuration options

## 🌐 Deployment

### Environment Variables
```env
# Database
DATABASE_URI=your-mongodb-connection-string

# PayloadCMS
PAYLOAD_SECRET=your-payload-secret

# File Storage
UPLOADTHING_TOKEN=your-uploadthing-token

# Security
CRON_SECRET=your-cron-secret

# Optional: Custom domain
VERCEL_PROJECT_PRODUCTION_URL=your-domain.com
```

### Build Process
```bash
pnpm build
pnpm start
```

The build process includes:
- Next.js optimization
- Sitemap generation
- Type checking
- Asset optimization

## 🧪 Testing

### E2E Testing
```bash
pnpm test:e2e
```
Tests cover:
- Homepage functionality
- Navigation
- Content rendering
- Form submissions

### Integration Testing
```bash
pnpm test:int
```
Tests include:
- API endpoints
- Database operations
- Authentication flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure responsive design
- Maintain accessibility standards

## 📚 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Backend & CMS
- **PayloadCMS 3.52** - Headless CMS
- **MongoDB** - Database with Mongoose adapter
- **UploadThing** - File storage and management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - E2E testing
- **Vitest** - Unit testing
- **Docker** - Containerization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

Built with ❤️ for education by the BriteEducation team.