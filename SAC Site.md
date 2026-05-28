# **SAC Web Application — Complete Project Proposal**

### **BITS Pilani, Goa Campus · Sports Activities Centre**

---

## **1\. Executive Summary**

This document is a full technical and functional proposal for the **SAC (Sports Activities Centre) Web Application** for BITS Pilani, Goa Campus. The platform serves three tiers of users — **Guests/Visitors**, **Authenticated Students**, and **Admins** — and provides a centralised hub for activity listings, physical stats, galleries, events, achievements, committee info, and third-party fitness app integrations (e.g., Strava).

The stack is a **PERN monolith** (PostgreSQL · Express · React · Node.js), intentionally chosen for simplicity of deployment, relational data integrity, and long-term maintainability by student developers.

---

## **2\. Tech Stack**

| Layer | Technology | Rationale |
| ----- | ----- | ----- |
| Frontend | React 18 \+ Vite | Fast HMR, component ecosystem |
| Routing | React Router v6 | SPA navigation |
| State | Zustand \+ React Query | Lightweight global state \+ server-state caching |
| Styling | Tailwind CSS \+ shadcn/ui | Utility-first; accessible components |
| Charts | Recharts | Heatmaps, bar/line/pie charts |
| Gallery | react-image-gallery | Lightbox \+ grid gallery |
| Backend | Node.js \+ Express.js | Familiar, fast, well-documented |
| Database | PostgreSQL 15 | RDBMS, ACID-compliant, rich query support |
| ORM | Prisma | Type-safe queries, migration tooling |
| Auth | JWT (access \+ refresh) \+ bcrypt | Stateless, secure |
| OAuth | Passport.js (BITS SSO / Google) | Single sign-on via campus credentials |
| File Storage | Multer \+ AWS S3 (or MinIO\[hosting needed\]) | Gallery image uploads |
| Third-party | Strava API (OAuth 2.0) | Physical activity data integration |
| Email | Nodemailer \+ SMTP | Notifications, issue confirmations |
| Deployment | Docker Compose (monolith) | Single repo, single deploy target |
| Reverse Proxy | Nginx | Static file serving \+ API proxying |

---

## **3\. User Roles & Access Matrix**

| Feature | Guest | Student (Authed) | Admin |
| ----- | ----- | ----- | ----- |
| View activity list & timings | ✅ | ✅ | ✅ |
| View activity stats (aggregate) | ✅ | ✅ | ✅ |
| View gallery (per activity \+ events) | ✅ | ✅ | ✅ |
| View committee & in-charge info | ✅ | ✅ | ✅ |
| View achievements | ✅ | ✅ | ✅ |
| View upcoming & star events | ✅ | ✅ | ✅ |
| Contact Us | ✅ | ✅ | ✅ |
| Link Strava / fitness app | ❌ | ✅ | ✅ |
| View personal activity dashboard | ❌ | ✅ | ✅ |
| Report issues | ❌ | ✅ | ✅ |
| Edit activity timings | ❌ | ❌ | ✅ |
| Upload gallery images/events | ❌ | ❌ | ✅ |
| Manage achievements | ❌ | ❌ | ✅ |
| Manage committee / in-charge info | ❌ | ❌ | ✅ |
| Admin panel (CAPEX/OPEX — future) | ❌ | ❌ | ✅ |

---

## **4\. Frontend Architecture**

### **4.1 Project Structure**

client/  
├── public/  
│   └── assets/                  \# Static logos, icons  
├── src/  
│   ├── main.jsx  
│   ├── App.jsx                  \# Root: router \+ providers  
│   │  
│   ├── routes/                  \# Route definitions (React Router)  
│   │   ├── index.jsx  
│   │   ├── GuestRoutes.jsx  
│   │   ├── ProtectedRoutes.jsx  
│   │   └── AdminRoutes.jsx  
│   │  
│   ├── pages/                   \# One folder per page/module  
│   │   ├── Home/  
│   │   │   ├── index.jsx        \# Landing with hero \+ quick links  
│   │   │   ├── NewToCampus.jsx  \# Module 1  
│   │   │   └── StarEvents.jsx   \# Module 22  
│   │   │  
│   │   ├── Activities/  
│   │   │   ├── index.jsx        \# Module 12: list of all SAC activities  
│   │   │   ├── ActivityCard.jsx  
│   │   │   └── TimingsTable.jsx \# Module 4: SAC timings display  
│   │   │  
│   │   ├── Stats/  
│   │   │   ├── index.jsx        \# Module 13: campus-wide physical activity overview  
│   │   │   ├── SACStats.jsx     \# Module 14: SAC-level stats  
│   │   │   └── ActivityHeatmap.jsx \# Module 15: individual heatmap (future/demo)  
│   │   │  
│   │   ├── Gallery/  
│   │   │   ├── index.jsx        \# Activity gallery selector  
│   │   │   ├── ActivityGallery.jsx  \# Module 16: gallery per activity  
│   │   │   └── EventGallery.jsx     \# Module 17: event gallery \+ info  
│   │   │  
│   │   ├── Events/  
│   │   │   ├── UpcomingEvents.jsx   \# Module 21  
│   │   │   └── EventDetail.jsx  
│   │   │  
│   │   ├── People/  
│   │   │   ├── InCharges.jsx        \# Module 18: SAC in-charges  
│   │   │   └── Committee.jsx        \# Module 19: SAC committee  
│   │   │  
│   │   ├── Achievements/  
│   │   │   └── index.jsx            \# Module 20: student achievements  
│   │   │  
│   │   ├── Dashboard/               \# Auth required  
│   │   │   ├── index.jsx            \# Personal activity dashboard  
│   │   │   ├── StravaConnect.jsx    \# Module: link Strava  
│   │   │   └── PersonalStats.jsx  
│   │   │  
│   │   ├── Auth/  
│   │   │   ├── Login.jsx  
│   │   │   ├── Register.jsx  
│   │   │   └── OAuthCallback.jsx  
│   │   │  
│   │   ├── Admin/                   \# Admin only — Module 6  
│   │   │   ├── index.jsx            \# Admin panel home  
│   │   │   ├── ManageTimings.jsx  
│   │   │   ├── ManageGallery.jsx  
│   │   │   ├── ManageEvents.jsx  
│   │   │   ├── ManageAchievements.jsx  
│   │   │   ├── ManagePeople.jsx  
│   │   │   └── ReportedIssues.jsx  
│   │   │  
│   │   ├── ReportIssue/             \# Auth required  
│   │   │   └── index.jsx  
│   │   │  
│   │   └── Contact/                 \# Module: Contact Us  
│   │       └── index.jsx  
│   │  
│   ├── components/                  \# Reusable UI components  
│   │   ├── layout/  
│   │   │   ├── Navbar.jsx  
│   │   │   ├── Footer.jsx  
│   │   │   ├── Sidebar.jsx          \# Admin sidebar  
│   │   │   └── FloatingActionButton.jsx  \# Module 7  
│   │   ├── ui/                      \# shadcn/ui wrappers  
│   │   ├── charts/  
│   │   │   ├── ActivityBarChart.jsx  
│   │   │   ├── ParticipationPieChart.jsx  
│   │   │   └── HeatmapCalendar.jsx  
│   │   ├── cards/  
│   │   │   ├── EventCard.jsx  
│   │   │   ├── AchievementCard.jsx  
│   │   │   └── PersonCard.jsx  
│   │   └── common/  
│   │       ├── GuestBanner.jsx      \# "Log in for more features"  
│   │       ├── ImageUploader.jsx  
│   │       └── ConfirmDialog.jsx  
│   │  
│   ├── hooks/                       \# Custom React hooks  
│   │   ├── useAuth.js  
│   │   ├── useStrava.js  
│   │   └── useStats.js  
│   │  
│   ├── store/                       \# Zustand stores  
│   │   ├── authStore.js  
│   │   └── uiStore.js  
│   │  
│   ├── api/                         \# React Query \+ Axios API layer  
│   │   ├── axios.js                 \# Axios instance \+ interceptors  
│   │   ├── auth.api.js  
│   │   ├── activities.api.js  
│   │   ├── stats.api.js  
│   │   ├── gallery.api.js  
│   │   ├── events.api.js  
│   │   ├── people.api.js  
│   │   ├── achievements.api.js  
│   │   └── strava.api.js  
│   │  
│   └── utils/  
│       ├── formatters.js  
│       ├── constants.js  
│       └── validators.js

### **4.2 Page / Module Map**

| Route | Module | Auth |
| ----- | ----- | ----- |
| `/` | Home — New to Campus, Star Events | Guest |
| `/activities` | List of Activities \+ Timings | Guest |
| `/stats` | Physical Activity Overview | Guest |
| `/stats/sac` | SAC Activity Statistics | Guest |
| `/gallery` | Gallery Hub | Guest |
| `/gallery/:activityId` | Per-Activity Gallery | Guest |
| `/gallery/events` | Event Gallery \+ Info | Guest |
| `/events` | Upcoming Events | Guest |
| `/people/incharges` | SAC In-Charges | Guest |
| `/people/committee` | SAC Committee | Guest |
| `/achievements` | Student Achievements | Guest |
| `/contact` | Contact Us | Guest |
| `/dashboard` | Personal Activity Dashboard | Student |
| `/dashboard/strava` | Strava Integration | Student |
| `/report` | Report an Issue | Student |
| `/admin` | Admin Panel | Admin |
| `/admin/timings` | Edit Activity Timings | Admin |
| `/admin/gallery` | Manage Gallery | Admin |
| `/admin/events` | Manage Events | Admin |
| `/admin/achievements` | Manage Achievements | Admin |
| `/admin/people` | Manage People | Admin |
| `/admin/issues` | Reported Issues | Admin |

### **4.3 Component Design Principles**

* **Role-aware rendering**: Components check `authStore` role and conditionally render edit/admin controls inline.  
* **Skeleton loaders**: All data-fetching pages use skeleton states via React Query `isLoading`.  
* **Responsive**: Mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`).  
* **Floating Action Button (Module 7\)**: Fixed-position button linking to Contact / Report Issue; visible on all pages.

---

## **5\. Backend Architecture**

### **5.1 Project Structure**

server/  
├── src/  
│   ├── index.js                 \# Entry point: Express app bootstrap  
│   ├── app.js                   \# Express config, middleware registration  
│   │  
│   ├── config/  
│   │   ├── db.js                \# Prisma client singleton  
│   │   ├── env.js               \# Environment variable validation (zod)  
│   │   ├── passport.js          \# Passport strategies (JWT, Google/SSO)  
│   │   └── s3.js                \# AWS S3 / MinIO config  
│   │  
│   ├── routes/                  \# Express routers (grouped by domain)  
│   │   ├── index.js             \# Master router: mounts all sub-routers  
│   │   ├── auth.routes.js  
│   │   ├── activities.routes.js  
│   │   ├── stats.routes.js  
│   │   ├── gallery.routes.js  
│   │   ├── events.routes.js  
│   │   ├── people.routes.js  
│   │   ├── achievements.routes.js  
│   │   ├── strava.routes.js  
│   │   ├── issues.routes.js  
│   │   ├── contact.routes.js  
│   │   └── admin.routes.js  
│   │  
│   ├── controllers/             \# Request handlers (thin — delegate to services)  
│   │   ├── auth.controller.js  
│   │   ├── activities.controller.js  
│   │   ├── stats.controller.js  
│   │   ├── gallery.controller.js  
│   │   ├── events.controller.js  
│   │   ├── people.controller.js  
│   │   ├── achievements.controller.js  
│   │   ├── strava.controller.js  
│   │   ├── issues.controller.js  
│   │   └── contact.controller.js  
│   │  
│   ├── services/                \# Business logic  
│   │   ├── auth.service.js      \# JWT issue/verify, bcrypt, refresh tokens  
│   │   ├── activities.service.js  
│   │   ├── stats.service.js     \# Aggregate queries, Strava data merge  
│   │   ├── gallery.service.js   \# S3 upload orchestration  
│   │   ├── events.service.js  
│   │   ├── people.service.js  
│   │   ├── achievements.service.js  
│   │   ├── strava.service.js    \# OAuth 2.0 token exchange, data pull  
│   │   ├── issues.service.js  
│   │   └── email.service.js     \# Nodemailer  
│   │  
│   ├── middleware/  
│   │   ├── authenticate.js      \# Verify JWT — populates req.user  
│   │   ├── authorize.js         \# Role check (STUDENT / ADMIN)  
│   │   ├── upload.js            \# Multer config (S3 multipart)  
│   │   ├── validate.js          \# Zod schema validation wrapper  
│   │   ├── errorHandler.js      \# Global error handler  
│   │   └── rateLimiter.js       \# express-rate-limit  
│   │  
│   ├── validators/              \# Zod schemas for request bodies  
│   │   ├── auth.validator.js  
│   │   ├── activity.validator.js  
│   │   ├── event.validator.js  
│   │   └── issue.validator.js  
│   │  
│   └── utils/  
│       ├── ApiError.js          \# Custom error class  
│       ├── ApiResponse.js       \# Standardised response wrapper  
│       ├── pagination.js        \# Cursor/offset pagination helpers  
│       └── stravaHelpers.js     \# Unit conversion, data normalisation  
│  
├── prisma/  
│   ├── schema.prisma            \# Full data model  
│   └── migrations/              \# Auto-generated migration files  
│  
├── .env  
├── Dockerfile  
└── package.json

### **5.2 Middleware Stack (per request)**

Incoming Request  
      ↓  
  rateLimiter          (all routes)  
      ↓  
  cors \+ helmet        (security headers)  
      ↓  
  express.json()       (body parsing)  
      ↓  
  morgan               (request logging)  
      ↓  
  \[route matched\]  
      ↓  
  authenticate.js      (JWT verify — optional on public routes)  
      ↓  
  authorize.js         (role check — guarded routes only)  
      ↓  
  validate.js          (zod schema check on body/params/query)  
      ↓  
  controller           (delegates to service)  
      ↓  
  service              (business logic \+ Prisma queries)  
      ↓  
  ApiResponse.send()   (standardised JSON response)  
      ↓  
  errorHandler.js      (catches thrown ApiError or unexpected errors)

---

## **6\. Database Schema (PostgreSQL / Prisma)**

// prisma/schema.prisma

generator client {  
  provider \= "prisma-client-js"  
}

datasource db {  
  provider \= "postgresql"  
  url      \= env("DATABASE\_URL")  
}

// ─────────────────────────────────────────────  
// ENUMS  
// ─────────────────────────────────────────────

enum Role {  
  STUDENT  
  ADMIN  
}

enum IssueStatus {  
  OPEN  
  IN\_PROGRESS  
  RESOLVED  
  CLOSED  
}

enum EventType {  
  REGULAR  
  STAR         // highlighted / featured event  
}

// ─────────────────────────────────────────────  
// AUTH & USER  
// ─────────────────────────────────────────────

model User {  
  id              Int              @id @default(autoincrement())  
  bitsId          String           @unique        // e.g., "2022A7PS0001G"  
  name            String  
  email           String           @unique  
  passwordHash    String?                         // null if SSO-only  
  role            Role             @default(STUDENT)  
  avatarUrl       String?  
  createdAt       DateTime         @default(now())  
  updatedAt       DateTime         @updatedAt

  refreshTokens   RefreshToken\[\]  
  stravaAccount   StravaAccount?  
  activityLogs    ActivityLog\[\]  
  issues          Issue\[\]

  @@index(\[bitsId\])  
}

model RefreshToken {  
  id          Int      @id @default(autoincrement())  
  token       String   @unique  
  userId      Int  
  user        User     @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  expiresAt   DateTime  
  createdAt   DateTime @default(now())  
}

// ─────────────────────────────────────────────  
// STRAVA INTEGRATION  
// ─────────────────────────────────────────────

model StravaAccount {  
  id              Int       @id @default(autoincrement())  
  userId          Int       @unique  
  user            User      @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  stravaAthleteId String    @unique  
  accessToken     String  
  refreshToken    String  
  tokenExpiresAt  DateTime  
  connectedAt     DateTime  @default(now())  
  lastSyncedAt    DateTime?

  activityLogs    ActivityLog\[\]  
}

model ActivityLog {  
  id              Int           @id @default(autoincrement())  
  userId          Int  
  user            User          @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  stravaAccountId Int?  
  stravaAccount   StravaAccount? @relation(fields: \[stravaAccountId\], references: \[id\])  
  stravaActivityId String?      @unique             // Strava's own ID for deduplication  
  activityType    String                             // "Run", "Ride", "WeightTraining", etc.  
  durationSeconds Int  
  distanceMeters  Float?  
  caloriesBurned  Float?  
  startedAt       DateTime  
  endDate         DateTime?  
  source          String        @default("MANUAL")  // "STRAVA" | "MANUAL"  
  createdAt       DateTime      @default(now())

  @@index(\[userId, startedAt\])  
  @@index(\[activityType\])  
}

// ─────────────────────────────────────────────  
// SAC ACTIVITIES (SPORTS / FACILITIES)  
// ─────────────────────────────────────────────

model SACActivity {  
  id              Int              @id @default(autoincrement())  
  name            String           @unique         // "Gym", "Basketball", "Swimming"  
  slug            String           @unique         // "gym", "basketball"  
  description     String?  
  iconUrl         String?  
  coverImageUrl   String?  
  category        String?                          // "Sports", "Fitness", "Recreation"  
  isActive        Boolean          @default(true)  
  displayOrder    Int              @default(0)  
  createdAt       DateTime         @default(now())  
  updatedAt       DateTime         @updatedAt

  timings         ActivityTiming\[\]  
  galleryImages   GalleryImage\[\]  
  stats           SACActivityStat\[\]  
}

model ActivityTiming {  
  id              Int          @id @default(autoincrement())  
  sacActivityId   Int  
  sacActivity     SACActivity  @relation(fields: \[sacActivityId\], references: \[id\], onDelete: Cascade)  
  dayOfWeek       Int                              // 0=Sun … 6=Sat; \-1 \= special/holiday  
  openTime        String                           // "06:00" (HH:mm)  
  closeTime       String                           // "22:00"  
  label           String?                          // e.g., "Morning Batch", "Evening Session"  
  isHoliday       Boolean      @default(false)  
  effectiveFrom   DateTime?  
  effectiveTo     DateTime?  
  updatedAt       DateTime     @updatedAt  
  updatedById     Int?                             // Admin user who last edited

  @@index(\[sacActivityId, dayOfWeek\])  
}

// ─────────────────────────────────────────────  
// STATS  
// ─────────────────────────────────────────────

model SACActivityStat {  
  id              Int         @id @default(autoincrement())  
  sacActivityId   Int  
  sacActivity     SACActivity @relation(fields: \[sacActivityId\], references: \[id\], onDelete: Cascade)  
  period          String                            // "2024-W12", "2024-04" (week/month)  
  participantCount Int        @default(0)  
  totalSessions   Int         @default(0)  
  avgDurationMin  Float?  
  computedAt      DateTime    @default(now())

  @@unique(\[sacActivityId, period\])  
  @@index(\[period\])  
}

// Aggregated campus-wide physical activity snapshot (pre-computed for performance)  
model CampusStatSnapshot {  
  id                  Int      @id @default(autoincrement())  
  period              String   @unique              // "2024-04"  
  totalActiveStudents Int      @default(0)  
  totalActivityHours  Float    @default(0)  
  mostPopularActivity String?  
  avgSessionsPerStudent Float?  
  computedAt          DateTime @default(now())  
}

// ─────────────────────────────────────────────  
// GALLERY  
// ─────────────────────────────────────────────

model GalleryImage {  
  id              Int          @id @default(autoincrement())  
  sacActivityId   Int?  
  sacActivity     SACActivity? @relation(fields: \[sacActivityId\], references: \[id\], onDelete: SetNull)  
  eventId         Int?  
  event           Event?       @relation(fields: \[eventId\], references: \[id\], onDelete: SetNull)  
  imageUrl        String  
  thumbnailUrl    String?  
  caption         String?  
  takenAt         DateTime?  
  uploadedById    Int?  
  createdAt       DateTime     @default(now())

  @@index(\[sacActivityId\])  
  @@index(\[eventId\])  
}

// ─────────────────────────────────────────────  
// EVENTS  
// ─────────────────────────────────────────────

model Event {  
  id              Int          @id @default(autoincrement())  
  title           String  
  slug            String       @unique  
  description     String?  
  eventType       EventType    @default(REGULAR)  
  startDate       DateTime  
  endDate         DateTime?  
  venue           String?  
  registrationUrl String?  
  isFeatured      Boolean      @default(false)     // star event  
  coverImageUrl   String?  
  createdAt       DateTime     @default(now())  
  updatedAt       DateTime     @updatedAt

  galleryImages   GalleryImage\[\]

  @@index(\[startDate\])  
  @@index(\[isFeatured\])  
}

// ─────────────────────────────────────────────  
// PEOPLE  
// ─────────────────────────────────────────────

enum PersonRole {  
  INCHARGE  
  COMMITTEE  
}

model Person {  
  id              Int        @id @default(autoincrement())  
  name            String  
  personRole      PersonRole  
  designation     String?                           // "Faculty In-Charge", "Sports Secretary"  
  department      String?  
  email           String?  
  phone           String?  
  photoUrl        String?  
  bio             String?  
  displayOrder    Int        @default(0)  
  isActive        Boolean    @default(true)  
  createdAt       DateTime   @default(now())  
  updatedAt       DateTime   @updatedAt  
}

// ─────────────────────────────────────────────  
// ACHIEVEMENTS  
// ─────────────────────────────────────────────

model Achievement {  
  id              Int      @id @default(autoincrement())  
  studentName     String  
  bitsId          String?  
  activityName    String                            // e.g., "Badminton"  
  sacActivityId   Int?                              // optional FK to SACActivity  
  title           String                            // "Gold Medal — Inter-NIT 2024"  
  description     String?  
  level           String?                           // "National", "State", "Inter-NIT"  
  achievedAt      DateTime  
  imageUrl        String?  
  createdAt       DateTime @default(now())

  @@index(\[achievedAt\])  
}

// ─────────────────────────────────────────────  
// ISSUES / REPORTS  
// ─────────────────────────────────────────────

model Issue {  
  id              Int         @id @default(autoincrement())  
  userId          Int  
  user            User        @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  title           String  
  description     String  
  category        String?                           // "Equipment", "Timings", "Safety", "Other"  
  status          IssueStatus @default(OPEN)  
  adminNote       String?  
  createdAt       DateTime    @default(now())  
  updatedAt       DateTime    @updatedAt

  @@index(\[status\])  
  @@index(\[userId\])  
}

// ─────────────────────────────────────────────  
// CONTACT MESSAGES (guest contact form)  
// ─────────────────────────────────────────────

model ContactMessage {  
  id          Int      @id @default(autoincrement())  
  name        String  
  email       String  
  subject     String?  
  message     String  
  createdAt   DateTime @default(now())  
  isRead      Boolean  @default(false)  
}

---

## **7\. API Design**

All endpoints follow the convention: `/api/v1/<resource>`

Responses use a standard envelope:

{ "success": true, "data": {}, "message": "OK" }  
{ "success": false, "error": "Validation failed", "details": \[\] }

### **7.1 Auth**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | `/api/v1/auth/register` | Public | Register with BITS ID \+ password |
| POST | `/api/v1/auth/login` | Public | Login → access \+ refresh tokens |
| POST | `/api/v1/auth/refresh` | Public | Rotate refresh token |
| POST | `/api/v1/auth/logout` | Student | Invalidate refresh token |
| GET | `/api/v1/auth/me` | Student | Get current user profile |
| GET | `/api/v1/auth/google` | Public | Google OAuth redirect |
| GET | `/api/v1/auth/google/callback` | Public | Google OAuth callback |

### **7.2 Activities**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/activities` | Public | List all SAC activities |
| GET | `/api/v1/activities/:slug` | Public | Single activity detail \+ timings |
| PUT | `/api/v1/activities/:id/timings` | Admin | Update activity timings |
| POST | `/api/v1/activities` | Admin | Create new activity |
| PATCH | `/api/v1/activities/:id` | Admin | Update activity info |

### **7.3 Stats**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/stats/campus` | Public | Campus-wide physical activity overview |
| GET | `/api/v1/stats/sac` | Public | SAC-level aggregate stats |
| GET | `/api/v1/stats/sac/:activityId` | Public | Stats for a specific activity |
| GET | `/api/v1/stats/me` | Student | Personal activity stats |
| GET | `/api/v1/stats/me/heatmap` | Student | Daily activity heatmap data |

### **7.4 Gallery**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/gallery/activities/:slug` | Public | Images for a SAC activity |
| GET | `/api/v1/gallery/events` | Public | All event galleries |
| GET | `/api/v1/gallery/events/:eventId` | Public | Images for a specific event |
| POST | `/api/v1/gallery/upload` | Admin | Upload image (multipart/form-data) |
| DELETE | `/api/v1/gallery/:imageId` | Admin | Delete image |

### **7.5 Events**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/events` | Public | All events (filterable: upcoming, featured) |
| GET | `/api/v1/events/upcoming` | Public | Next N upcoming events |
| GET | `/api/v1/events/featured` | Public | Star/featured events |
| GET | `/api/v1/events/:slug` | Public | Single event detail |
| POST | `/api/v1/events` | Admin | Create event |
| PATCH | `/api/v1/events/:id` | Admin | Update event |
| DELETE | `/api/v1/events/:id` | Admin | Delete event |

### **7.6 People**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/people/incharges` | Public | SAC faculty in-charges |
| GET | `/api/v1/people/committee` | Public | SAC student committee |
| POST | `/api/v1/people` | Admin | Add person |
| PATCH | `/api/v1/people/:id` | Admin | Update person |
| DELETE | `/api/v1/people/:id` | Admin | Remove person |

### **7.7 Achievements**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/achievements` | Public | List all (filterable by activity, year) |
| POST | `/api/v1/achievements` | Admin | Add achievement |
| PATCH | `/api/v1/achievements/:id` | Admin | Update achievement |
| DELETE | `/api/v1/achievements/:id` | Admin | Delete achievement |

### **7.8 Strava Integration**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | `/api/v1/strava/connect` | Student | Redirect to Strava OAuth |
| GET | `/api/v1/strava/callback` | Student | Handle Strava token exchange |
| POST | `/api/v1/strava/sync` | Student | Manually trigger activity sync |
| DELETE | `/api/v1/strava/disconnect` | Student | Unlink Strava account |

### **7.9 Issues**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | `/api/v1/issues` | Student | Submit an issue report |
| GET | `/api/v1/issues/mine` | Student | Student's own reported issues |
| GET | `/api/v1/issues` | Admin | All issues (filterable by status) |
| PATCH | `/api/v1/issues/:id/status` | Admin | Update issue status \+ admin note |

### **7.10 Contact**

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | `/api/v1/contact` | Public | Submit contact form message |
| GET | `/api/v1/contact` | Admin | View all contact messages |
| PATCH | `/api/v1/contact/:id/read` | Admin | Mark as read |

---

## **8\. Third-Party Integration: Strava**

### **Flow**

Student clicks "Connect Strava"  
        ↓  
Backend redirects → Strava OAuth 2.0 authorization URL  
        ↓  
Student authorises on Strava.com  
        ↓  
Strava redirects to /api/v1/strava/callback?code=...  
        ↓  
Backend exchanges code → { access\_token, refresh\_token, athlete }  
        ↓  
Store tokens in StravaAccount table (encrypted at rest)  
        ↓  
Background sync job pulls recent activities via Strava API  
        ↓  
ActivityLog rows inserted / upserted (stravaActivityId deduplicates)  
        ↓  
Stats queries now include Strava data in aggregate

### **Token Refresh Strategy**

Before any Strava API call, the service checks `tokenExpiresAt`. If expired (or within 5 min), it calls Strava's token refresh endpoint and updates the stored tokens.

### **Data Points Pulled per Activity**

* `type` (Run, Ride, WeightTraining, etc.)  
* `elapsed_time` (seconds)  
* `distance` (meters)  
* `start_date`  
* `kilojoules` → converted to kcal

---

## **9\. Key Modules — Implementation Notes**

### **Module 13 & 14 — Stats Overview**

Stats are pre-aggregated nightly by a cron job (`node-cron`) that:

1. Groups `ActivityLog` by period and type.  
2. Writes results to `SACActivityStat` and `CampusStatSnapshot`.  
3. Clears React Query cache via a cache-busting timestamp endpoint.

The frontend displays:

* Campus overview: total active students this month, total hours logged, top activity.  
* SAC stats: bar chart per activity, line chart over time, pie chart by category.

### **Module 15 — Individual Activity Heatmap (Future/Demo)**

Inspired by GitHub's contribution graph. Uses `ActivityLog` grouped by `startedAt::date`. Rendered as an SVG calendar heatmap via `recharts` or a custom D3 component. Only visible to the authenticated student for their own data.

### **Module 16 & 17 — Gallery**

Images uploaded via admin panel → Multer streams to S3 → URL stored in `GalleryImage`. Thumbnails auto-generated server-side using `sharp`. Frontend uses `react-image-gallery` with lightbox support.

### **Module 21 & 22 — Upcoming / Star Events**

`Event` rows with `startDate >= NOW()` are "upcoming." Rows with `isFeatured = true` are "star events." The homepage hero section renders star events in a carousel (embla-carousel-react). A dedicated `/events` page shows the full upcoming list with search/filter.

### **Floating Action Button (Module 7\)**

A fixed-position button in the bottom-right corner. On hover/click, it expands to show:

* 📩 Contact Us  
* 🐛 Report an Issue (visible only when logged in)  
* 📞 Quick Contacts (phone numbers of SAC in-charges)

### **Admin Panel (Module 6\)**

Protected behind `ADMIN` role. Uses a sidebar layout separate from the public site. Admins can:

* Edit activity timings (time-picker UI → `PUT /api/v1/activities/:id/timings`)  
* Bulk-upload gallery images with captions  
* Create/edit/delete events and mark them as featured  
* Manage people (photos, bio, contact)  
* Add student achievements  
* View and triage reported issues

---

## **10\. Security Considerations**

| Concern | Mitigation |
| ----- | ----- |
| Auth token storage | `httpOnly` cookie for refresh token; short-lived access token in memory |
| SQL Injection | Prisma parameterised queries (no raw SQL exposed) |
| XSS | React escapes by default; CSP headers via Helmet |
| File upload abuse | Multer limits (10 MB per image); MIME-type whitelist |
| Rate limiting | `express-rate-limit` on auth routes (5 req/min) and contact (10 req/hour) |
| Strava tokens | Stored encrypted in DB (`pgcrypto`); never exposed to frontend |
| CORS | Strict origin allowlist (only campus domain) |
| Admin route leak | Role check in middleware AND double-checked in service layer |

---

## **11\. Deployment Architecture (Docker Compose)**

\# docker-compose.yml (simplified)  
services:  
  postgres:  
    image: postgres:15  
    volumes:  
      \- pgdata:/var/lib/postgresql/data  
    env\_file: .env

  server:  
    build: ./server  
    depends\_on: \[postgres\]  
    env\_file: .env  
    ports:  
      \- "5000:5000"

  client:  
    build: ./client  
    ports:  
      \- "3000:80"    \# Nginx serves built React app

  nginx:  
    image: nginx:alpine  
    volumes:  
      \- ./nginx.conf:/etc/nginx/conf.d/default.conf  
    ports:  
      \- "80:80"  
    depends\_on: \[server, client\]

volumes:  
  pgdata:

Nginx reverse-proxies `/api/*` to the Express server and serves the React SPA for all other routes.

---

## **12\. Future Improvements (Roadmap)**

| Feature | Notes |
| ----- | ----- |
| **CAPEX/OPEX Budget Backend** | Admin panel section for managing SAC budget line items |
| **SAC Collaboration Section** | Module for cross-club collaborations, joint events |
| **SAC Info/Account Section** | Module 3: official SAC social handles, announcements |
| **Individual Heatmap (Live)** | Move from demo to live Strava data per student |
| **Push Notifications** | Notify students of upcoming events (Web Push API) |
| **Leaderboard** | Most active students by month (opt-in) |
| **Other App Integrations** | Apple Health, Garmin Connect, Google Fit via webhooks |
| **Multilingual Support** | i18n for Hindi/Konkani alongside English |
| **Progressive Web App** | Offline support, home screen install |
| **Analytics Dashboard** | Admin view of web traffic \+ engagement |

---

## **13\. Folder Structure Summary (Monorepo)**

sac-webapp/  
├── client/          \# React \+ Vite frontend (see §4.1)  
├── server/          \# Node.js \+ Express backend (see §5.1)  
├── prisma/          \# Database schema \+ migrations  
├── docker-compose.yml  
├── nginx.conf  
├── .env.example  
└── README.md

---

## **14\. Development Phases**

| Phase | Scope | Target |
| ----- | ----- | ----- |
| **Phase 0** | Project setup, DB schema, auth, CI pipeline | Week 1–2 |
| **Phase 1** | Guest-facing pages: Activities, Timings, Events, People, Achievements, Gallery, Contact | Week 3–6 |
| **Phase 2** | Auth system, Student dashboard, Strava integration, Issue reporting | Week 7–10 |
| **Phase 3** | Admin panel: Timings editor, Gallery manager, Event manager, People manager | Week 11–13 |
| **Phase 4** | Stats engine (cron jobs, charts), Heatmap (demo), Star Events carousel | Week 14–16 |
| **Phase 5** | Polish, accessibility audit, performance optimisation, deployment | Week 17–18 |
| **Phase 6+** | Future: Budget module, leaderboard, PWA | Post-launch |

---

*Document prepared for BITS Pilani Goa — SAC Web Application Project* *Stack: PostgreSQL · Express · React · Node.js (PERN) — Monolith Architecture*

# **SAC DEMO SITE**

### **SAC Demo Sprint Plan — May 26–31 (5 days)**

**Core strategy:** Frontend-first with mock data. Build a fully navigable React app — no real backend needed for the demo. The mock data layer means all API hooks exist in the right shape, so wiring to a real Express/PostgreSQL backend post-demo is clean and mechanical.

---

#### **Day 1 — May 26 (today): Scaffold \+ Design System**

* Vite \+ React \+ Tailwind CSS \+ React Router \+ shadcn/ui installed, folder structure matching the final architecture  
* Navbar (all nav links), Footer, FloatingActionButton stub wired to `/contact`  
* Create all mock data files: `mockActivities.js`, `mockEvents.js`, `mockPeople.js`, `mockStats.js`, `mockGallery.js`  
* BITS Goa brand colors locked in Tailwind config, global typography set

**End of day:** App boots, every route renders a shell, mock data accessible everywhere.

---

#### **Day 2 — May 27 (Tue): Home page \+ Activities \+ Timings**

* **Home:** Hero section with BITS Goa imagery \+ tagline, "New to Campus" info strip, Star Events carousel, quick-links grid to all sections  
* **`/activities`:** Activity cards grid — cover image, name, category badge, timing summary, category filter (Sports / Fitness / Recreation)  
* **`/activities/:slug`:** Detail page with description, weekly timings table, gallery preview strip, breadcrumb nav

**End of day:** Home → Activities → Detail flow fully navigable.

---

#### **Day 3 — May 28 (Wed): Stats Dashboard \+ Gallery**

This is the most visually impressive section — prioritise polish here.

* **`/stats` campus overview:** 4 KPI metric cards (active students, total hours, top activity, avg sessions/week). Bar chart per activity (Recharts). Pie chart by category.  
* **`/stats/sac`:** Line chart (participation over months). Per-activity stat cards. Month/semester toggle.  
* **Heatmap demo (Module 15):** GitHub-style calendar heatmap — fake "Your Activity" data with a mock "Strava synced" badge to demonstrate the integration concept  
* **`/gallery/:activityId`:** Masonry grid with lightbox on click  
* **`/gallery/events`:** Event gallery cards → click → event detail \+ image grid

**End of day:** Stats and Gallery fully rendered and polished.

---

#### **Day 4 — May 29 (Thu): Events · People · Achievements · Contact**

* **`/events`:** Timeline-style list, event cards (title, date, venue, type badge), click → detail with description \+ gallery preview  
* **`/people/incharges` \+ `/people/committee`:** Person card grid — photo, name, designation, department, email/phone  
* **`/achievements`:** Card grid with year \+ activity filters. Cards show student name, title, level badge (National / State / Inter-NIT), date  
* **`/contact`:** Contact form \+ SAC address / phone / social links \+ FAB link

**End of day:** Zero dead links anywhere in the app.

---

#### **Days 5–6 — May 30–31 (Fri–Sat): Polish, Mock Auth, Deploy**

* **Mock auth toggle** — "Login as Student" button sets a Zustand flag → reveals personal dashboard, heatmap, and Strava connect UI. "Switch to Admin" reveals an Edit Timings button inline on the activity page. Three full role views, zero real backend.  
* **Responsive audit** at 375px, 768px, 1280px  
* **Accessibility pass** — alt text, ARIA labels, keyboard-navigable lightbox  
* **Deploy to Vercel/Netlify** — GitHub push → connect project → live URL in under 10 minutes  
* **Short README** explaining what's mock vs what's planned for production (sets correct expectations for reviewers)

---

#### **What the demo covers vs what comes after**

| In the Demo (mock data) | Post-Demo (Phase 2+) |
| ----- | ----- |
| Home \+ hero \+ star events | Real PostgreSQL backend |
| Activities \+ timings table | JWT auth \+ BITS SSO |
| Stats charts (campus \+ SAC) | Strava OAuth integration |
| Heatmap (fake demo data) | Real stats from ActivityLog |
| Activity \+ event galleries | Admin panel (full CRUD) |
| Upcoming events | Image upload to S3 |
| In-charges \+ committee | Issue reporting |
| Achievements | Cron-based stat snapshots |
| Contact Us | Docker \+ Nginx deployment |
| 3-role mock auth toggle | Budget module (future) |

---

**Team split tip** — if you have 2+ people: one person takes Stats \+ Gallery (Day 3), another takes Events \+ People \+ Achievements \+ Contact (Day 4). Both pull from the same mock data files. Merge and polish together on Day 5\.

