# Skibookers Software Requirements Specification Document

## System Design

### Overview

Skibookers will be built as a responsive web application with a mobile-first approach, following a hexagonal architecture pattern. This will enable clean separation of concerns and facilitate future AI integration while maintaining high development velocity.

### Architecture Vision

- **Frontend**: Next.js with App Router \+ React \+ TypeScript \+ Tailwind CSS \+ shadcn/ui  
- **Backend**: Serverless API routes (Next.js) \+ Supabase for backend services  
- **Database**: Supabase PostgreSQL for transactional data  
- **Analytics**: Tinybird for real-time analytics and personalization data  
- **Authentication**: Supabase Auth with magic links for frictionless onboarding  
- **Hosting**: Vercel for the web application  
- **Email**: Resend for transactional emails and confirmations

## Architecture Pattern

### Hexagonal Architecture

The application will follow a hexagonal (ports and adapters) architecture with feature slicing to ensure:

1. **Domain Isolation**: Core business logic remains isolated from infrastructure concerns  
2. **Swappable Components**: Easy to replace services as the platform evolves  
3. **Testability**: Business logic can be tested without infrastructure dependencies  
4. **AI Integration**: Clean interfaces for integrating AI services in future phases

### Feature Slices

The application will be organized by vertical feature slices:

- **Resort Selection**  
- **Bundle Management**  
- **Booking**  
- **User Management**  
- **Analytics**

Each slice will have:

- **Domain**: Pure business logic, entities, and rules  
- **Application**: Use cases and interfaces (ports)  
- **Infrastructure**: External adapters (UI, APIs, database)

## State Management

### Client-Side

- Server Components (RSC) for initial rendering where possible  
- React Context for global state (user, preferences)  
- Local component state for UI-specific concerns  
- React Query for server state management and caching

### Server-Side

- Server Components for data fetching  
- Supabase Postgres for persistent state  
- Supabase RLS (Row Level Security) for data access control  
- Cookie-based session management for quiz flow

## Data Flow

### Resort Selection Flow

1. User completes preference quiz (3-5 questions)  
2. Client sends preference data to API route  
3. API processes preferences and queries resort database  
4. Recommendation algorithm selects optimal resort  
5. Result returned to client with bundled options  
6. User preferences stored in cookies and/or Supabase

### Booking Flow

1. User selects bundle package  
2. Bundle details cached in session state  
3. User enters traveler information  
4. Payment processing via Stripe  
5. Booking confirmation triggers:  
   - Database record creation  
   - PDF itinerary generation  
   - Confirmation email via Resend

### Authentication Flow

1. User enters email for booking or account creation  
2. Magic link sent via Resend  
3. User clicks link to authenticate  
4. JWT token stored for session management  
5. User redirected to appropriate step in flow

## Technical Stack

### Frontend

- **Framework**: Next.js 14+ with App Router  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **Components**: shadcn/ui for base components  
- **State Management**: React Context \+ Server Components \+ React Query  
- **Forms**: React Hook Form \+ Zod for validation  
- **PDF Generation**: React-PDF for itinerary creation

### Backend

- **API Routes**: Next.js API routes (Edge runtime where appropriate)  
- **Database**: Supabase PostgreSQL  
- **Authentication**: Supabase Auth  
- **Storage**: Supabase Storage for PDFs and assets  
- **Analytics**: Tinybird for real-time data processing  
- **Email**: Resend for transactional emails

### DevOps

- **Hosting**: Vercel  
- **CI/CD**: Vercel \+ GitHub Actions  
- **Testing**: Jest \+ React Testing Library \+ Playwright for E2E  
- **Monitoring**: Vercel Analytics \+ custom Tinybird dashboards

## Authentication Process

### User Authentication

1. **Registration/Login**:  
   - Magic link authentication via email  
   - No passwords required for frictionless onboarding  
   - Optional social authentication for future phases  

2. **Session Management**:
   - JWT tokens stored in secure, HTTP-only cookies  
   - Automatic token refresh

3. **Authorization**:  
   - Role-based access control  
   - Supabase RLS policies for fine-grained control

### API Authentication
- **Internal APIs**: JWT verification  
- **External Partners**: API keys \+ JWT for secure integration  
- **Third-party Services**: Service account credentials

## Route Design

### Frontend Routes
```text
/                           \# Landing page
/quiz                       \# Preference quiz
/results                    \# Resort recommendations
/resort/:resortId           \# Resort details
/bundle/:bundleId           \# Bundle details and customization
/booking                    \# Booking form
/booking/payment            \# Payment processing
/booking/confirmation/:id   \# Booking confirmation
/account                    \# User account management
/account/trips              \# User's trips
/account/preferences        \# User preferences
```

### API Routes
```text
/api/preferences            \# Store user preferences
/api/resorts                \# Resort data and filtering
/api/bundles                \# Bundle packages
/api/bookings               \# Booking creation and management
/api/payments               \# Payment processing
/api/documents/itinerary    \# PDF generation
```

## API Design

### REST Endpoints

#### Preferences API

- `POST /api/preferences` \- Store user quiz responses  
- `GET /api/preferences` \- Retrieve stored preferences

#### Resorts API

- `GET /api/resorts` \- List all resorts with filtering  
- `GET /api/resorts/:id` \- Get detailed resort information  
- `GET /api/resorts/recommended` \- Get personalized recommendations

#### Bundles API

- `GET /api/bundles?resortId=123` \- Get bundle options for a resort  
- `GET /api/bundles/:id` \- Get detailed bundle information

#### Bookings API

- `POST /api/bookings` \- Create a new booking  
- `GET /api/bookings/:id` \- Get booking details  
- `GET /api/bookings` \- List user's bookings  
- `PATCH /api/bookings/:id` \- Update booking information

#### Documents API

- `GET /api/documents/itinerary/:bookingId` \- Generate PDF itinerary

### API Response Format
```typescript
interface ApiResponse\<T\> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page: number;
    pageSize: number;
    totalCount: number;
  };
}
```

## Database Design

### Supabase PostgreSQL Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  first\_name TEXT,
  last\_name TEXT,
  preferences JSONB,
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Regions Table
```sql
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  image\_url TEXT
);
```
#### Resorts Table
```sql
CREATE TABLE resorts (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  region\_id UUID REFERENCES regions(id),
  name TEXT NOT NULL,
  description TEXT,
  elevation\_base INT,
  elevation\_peak INT,
  total\_lifts INT,
  total\_runs INT,
  difficulty\_breakdown JSONB,
  amenities TEXT\[\],
  image\_url TEXT,
  attributes JSONB,
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
#### Hotels Table

```sql
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  resort\_id UUID REFERENCES resorts(id),
  name TEXT NOT NULL,
  description TEXT,
  rating SMALLINT,
  amenities TEXT\[\],
  image\_url TEXT,
  location POINT,
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Skipasses Table
```sql
CREATE TABLE skipasses (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  resort\_id UUID REFERENCES resorts(id),
  name TEXT NOT NULL,
  description TEXT,
  days INT,
  price DECIMAL(10,2),
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Transfers Table
```sql
CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  resort\_id UUID REFERENCES resorts(id),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT,
  price DECIMAL(10,2),
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Bundles Table
```sql
CREATE TABLE bundles (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  resort\_id UUID REFERENCES resorts(id),
  name TEXT NOT NULL,
  description TEXT,
  base\_price DECIMAL(10,2),
  hotel\_options UUID\[\] REFERENCES hotels(id),
  skipass\_options UUID\[\] REFERENCES skipasses(id),
  transfer\_options UUID\[\] REFERENCES transfers(id),
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  user\_id UUID REFERENCES users(id),
  bundle\_id UUID REFERENCES bundles(id),
  hotel\_id UUID REFERENCES hotels(id),
  skipass\_id UUID REFERENCES skipasses(id),
  transfer\_id UUID REFERENCES transfers(id),
  start\_date DATE NOT NULL,
  end\_date DATE NOT NULL,
  total\_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  payment\_id TEXT,
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### UserPreferences Table
```sql
CREATE TABLE user\_preferences (
  id UUID PRIMARY KEY DEFAULT uuid\_generate\_v4(),
  user\_id UUID REFERENCES users(id),
  preference\_data JSONB NOT NULL,
  session\_id TEXT,
  created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tinybird Schema (Analytics)

#### User Events
```sql
CREATE TABLE user\_events (
  timestamp DateTime,
  session\_id String,
  user\_id String,
  event\_type String,
  page String,
  component String,
  properties String, \-- JSON
  resort\_id String,
  bundle\_id String
) ENGINE \= MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, session\_id, event\_type)
```

#### Preference Analytics
```sql
CREATE TABLE preference\_analytics (
  timestamp DateTime,
  session\_id String,
  user\_id String,
  region String,
  budget\_min Float32,
  budget\_max Float32,
  vibe String,
  group\_type String,
  skill\_level String,
  resort\_recommended String,
  resort\_selected String
) ENGINE \= MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, session\_id)
```

#### Booking Analytics
```sql
CREATE TABLE booking\_analytics (
  timestamp DateTime,
  session\_id String,
  user\_id String,
  resort\_id String,
  bundle\_id String,
  hotel\_id String,
  skipass\_id String,
  transfer\_id String,
  total\_price Float32,
  booking\_completed Boolean,
  days\_to\_conversion Int32,
  utm\_source String,
  utm\_medium String,
  utm\_campaign String
) ENGINE \= MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, session\_id)
```

## Future AI Integration Strategy
### GPT Integration Points

1. **Preference Analysis**:    
   - Convert quiz responses to complex preference profiles  
   - Identify user intent beyond explicit preferences

2. **Resort Recommendations**:
   - Generate personalized resort descriptions  
   - Explain why specific resorts match user preferences

3. **Concierge Chat**:
   - Natural language assistance throughout booking process  
   - Contextual awareness of user preferences and booking stage

4. **Personalization Layer**:
   - Progressive learning from user interactions  
   - Adaptation to changing preferences over time

### AI Architecture Components

- **Embeddings Database**: Vector storage for semantic resort matching  
- **Prompt Engineering Service**: Template management for GPT interactions  
- **Context Manager**: Session tracking for coherent interactions  
- **Feedback Loop**: Learning from user responses and choices

## Implementation Phasing

### Phase 1: Core MVP (3 months)

- Basic quiz UI with 3-5 questions  
- Resort recommendation based on preferences  
- Bundle selection and booking flow  
- PDF itinerary generation  
- Simple analytics tracking

### Phase 2: Enhanced Experience (6 months)

- User accounts with preference storage  
- Improved recommendation algorithm  
- Additional filtering and customization options  
- Email notifications and reminders  
- Basic post-booking support

### Phase 3: AI Concierge (12 months)

- Natural language chat interface  
- Personalized recommendations based on historical data  
- Advanced customization options  
- Group booking coordination  
- Lifestyle upsells (gear, lessons, experiences)