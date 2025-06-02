# Skibookers

A guided ski trip booking platform with personalized resort and bundle recommendations.

## Overview

Skibookers helps users find and book their perfect ski trip through a personalized quiz-based recommendation system. The platform offers complete packages including resort selection, accommodation, ski passes, and transfers.

### Key Features

- Personalized resort recommendations based on user preferences
- Interactive quiz for gathering user preferences
- Bundle selection with customizable components
- Seamless booking flow with secure payment processing
- User accounts for saving preferences and managing bookings

## Technical Stack

### Frontend
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Fonts: Montserrat (headings) & Inter (body text)

### Backend & Infrastructure
- Supabase for:
  - Authentication
  - PostgreSQL Database
  - Storage
- Tinybird for analytics
- Resend for transactional emails
- Vercel for hosting

### Architecture
- Hexagonal architecture with feature slicing
- Server Components by default
- API Routes for backend functionality
- Responsive, mobile-first design

### UI Components: shadcn/ui

- [shadcn/ui](https://ui.shadcn.com/) is used for high-quality, accessible, and customizable React UI components.
- Components are added and managed via the shadcn CLI (`npx shadcn@latest add <component>`).
- All shadcn/ui components are local to the project and can be customized as needed.
- See the [shadcn/ui documentation](https://ui.shadcn.com/docs) for available components and usage examples.

## Getting Started

### Prerequisites
- Node.js v20.11.1 (LTS)
- pnpm >=10.11.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ski-bookers.git
cd ski-bookers/webapp
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. Run the development server:
```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```txt
webapp/
├── src/
│   ├── app/                 # Next.js App Router structure (routes, layouts, API, etc.)
│   ├── features/            # Feature-specific code (auth, booking, personalization, etc.)
│   ├── shared/              # Shared utilities, adapters, types, layouts, navigation, providers
│   │   ├── adapters/
│   │   └── types/
│   └── assets               # (if used for static assets)
├── public/                  # Static assets (images, icons, etc.)
├── test/                    # Test files
│   ├── e2e/                 # End-to-end tests
│   └── unit/                # Unit tests
└── middleware.ts            # Next.js middleware
```

## Development Status

Currently implemented:
- Project setup with Next.js, TypeScript, and Tailwind
- shadcn/ui integration
- Authentication with Supabase
- Base layout and routing structure
- Font optimization with next/font

## Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

## Adding shadcn/ui Components

To add a new UI component from shadcn/ui, run:

```bash
npx shadcn@latest add <component>
```

For example, to add a Button component:

```bash
npx shadcn@latest add button
```

This will generate the component in the appropriate directory (e.g., `src/components/ui/`).

Refer to the [shadcn/ui documentation](https://ui.shadcn.com/docs/components) for more details and customization options.
