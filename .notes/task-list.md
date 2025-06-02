# Skibookers Phase 1 (MVP) Task List — Walking Skeleton First

**General Principles:**
- Always build end-to-end vertical slices (walking skeleton) before deepening features.
- Prioritize core flows: quiz → recommendation → bundle selection → booking → confirmation.
- Use placeholder/mock data where backend is not ready, but wire up real API calls as soon as possible.
- Ensure authentication is integrated into all flows where required.

---

## 1. Project Setup & Skeleton

- [X] Set up Next.js App Router project with TypeScript, Tailwind, shadcn/ui.
- [X] Configure Supabase integration (auth, database, storage).
- [X] Set up CI/CD (Vercel, GitHub Actions).
- [X] Implement protected route logic (redirect unauthenticated users).
- [X] Implement base layout: header, navigation, responsive container.
---

## 2. Core Route & Navigation Skeleton

- [X] Implement all core routes as empty pages:
  - `/` (Landing)
  - `/quiz`
  - `/results`
  - `/resort/[resortId]`
  - `/bundle/[bundleId]`
  - `/booking`
  - `/booking/payment`
  - `/booking/confirmation/[id]`
  - `/account`
- [X] Add navigation (bottom for mobile, top for desktop).
- [X] Add persistent header with logo and profile/account access.

---

## 3. Resort Recommendation

- [X] Implement `/results` page:
  - Fetch recommended resort(s) from `/api/resorts/recommended`.
    - Results should come from a mocked list for now (hard-coded in the API [or externalized into a JSON file])
  - Display resort hero card, match %, and "View Bundle Options" CTA.
- [X] Implement `/resort/[resortId]` page:
  - Show resort details, stats, amenities, reviews, weather (mocked if needed).

---

## 4. Bundle Selection

- [X] Implement `/bundle/[bundleId]` page:
  - Fetch bundle options for selected resort.
  - Show package overview, price breakdown, hotel/skipass/transfer cards.
  - "Book This Package" CTA.

---

## 5. Booking Flow

- [X] Implement `/booking` page:
  - Booking form (guest info, dates, minimal fields).
  - Validate with React Hook Form + Zod.
- [X] Implement `/booking/payment` page:
  - Integrate Stripe for payment (test mode).
  - Show loading/processing state.

---

## 6. Booking Confirmation

- [X] Implement `/booking/confirmation/[id]` page:
  - Show success animation, confirmation number, trip summary.
  - "Download PDF" (mocked, then real via `/api/documents/itinerary`).
  - "Share trip" option (optional for skeleton).

---

## 7. Quiz Flow (Preference Collection)

- [X] Implement quiz UI (3-5 questions, one per card, progress indicator).
- [X] Store quiz state in React Context.
- [X] Redirect to `/results`.

---

## 8. Session & State Management

- [ ] Store quiz and booking state in cookies/session/localStorage as fallback.
- [ ] Ensure user can refresh and not lose progress (MVP: minimal persistence).

---

## 9. API Endpoints (Walking Skeleton)

- [ ] Implement stubbed Next.js API routes for:
  - `/api/preferences` (POST/GET)
  - `/api/resorts/recommended` (GET)
  - `/api/bundles` (GET)
  - `/api/bookings` (POST/GET)
  - `/api/documents/itinerary` (GET, returns placeholder PDF)
- [ ] Wire up frontend to call these endpoints.

---

## 10. Analytics (Tinybird)

- [ ] Integrate Tinybird event tracking for quiz completion, booking, etc. (can be stubbed).

---

## 11. Testing & QA

- [ ] Add Playwright E2E test for the full walking skeleton (quiz → booking confirmation).
- [ ] Add unit tests for core components (Jest + React Testing Library).

---

## 12. Polish & Accessibility

- [ ] Apply core UI styles (color, typography, spacing).
- [ ] Ensure mobile-first responsiveness.
- [ ] Add accessibility basics (labels, alt text, focus states).

---

**After walking skeleton is working:**
- Deepen each feature (real data, error handling, edge cases, PDF generation, analytics, etc.).
- Expand on user account management, booking modification, and preference storage as time allows.

---

**Summary:**  
Build a thin, end-to-end slice for the entire core flow, using placeholder data where needed, then iterate to deepen functionality and polish. Always keep the app in a working, demoable state.
