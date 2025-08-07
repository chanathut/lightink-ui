### **Lightink Fullstack Architecture Document**

#### **Introduction**

This document outlines the complete fullstack architecture for Lightink 1.0, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack. This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for a modern fullstack application where these concerns are increasingly intertwined.

##### **Starter Template or Existing Project**

This is a greenfield project being built from scratch. Based on the PRD's requirements for a responsive web app, a serverless backend, and a monorepo structure, we will use the **T3 Stack (Next.js, TypeScript, Tailwind CSS)** enhanced with **Clerk for authentication** and **Convex for backend services** as our foundational starter template to accelerate development and ensure best practices.

##### **Change Log**

| Date | Version | Description | Author |
| :---- | :---- | :---- | :---- |
| July 29, 2025 | 1.0 | Initial Architecture Draft | Winston (Architect) |
| [Current Date] | 1.1 | Updated to Clerk + Convex Stack | Winston (Architect) |

### **High-Level Architecture**

#### **Technical Summary**

This architecture outlines a modern, serverless fullstack application designed for scalability, type-safety, and rapid development. The system leverages a monorepo structure housing a Next.js frontend with Clerk authentication and Convex as the complete backend solution. Communication between the frontend and backend is handled through Convex's type-safe functions, mutations, and queries with built-in real-time capabilities. The core manuscript analysis is designed as a series of modular, independent services orchestrated by a central pipeline. This approach ensures cost-effective, pay-per-use operation and provides the foundational modularity required to achieve our long-term "Story Co-pilot" vision.

#### **Platform and Infrastructure Choice**

* **Platform:** Vercel for hosting and frontend deployment; Convex for backend services, database, and real-time functionality; Clerk for authentication and user management.
* **Key Services:**  
  * Vercel (for Next.js frontend hosting)  
  * Convex (for database, backend functions, file storage, and real-time subscriptions)  
  * Clerk (for authentication, user management, and billing integration)  
  * An email provider like Resend (for notifications)  
* **Deployment Regions:** US East (e.g., us-east-1)

#### **Repository Structure**

* **Structure:** Monorepo.  
* **Monorepo Tool:** We will use the standard setup provided by the T3 Stack, which leverages npm workspaces.  
* **Package Organization:** The monorepo will contain separate packages for the Next.js web app, Convex backend functions, and shared TypeScript types, ensuring clean separation of concerns.

#### **High-Level Architecture Diagram**

graph TD  
    subgraph User  
        A\[Author's Browser\]  
    end

    subgraph Vercel Platform  
        B\[Next.js Frontend\]  
    end

    subgraph Clerk Platform  
        C\[Authentication & User Management\]  
        D\[Billing & Subscriptions\]  
    end

    subgraph Convex Platform  
        E\[Database (PostgreSQL)\]  
        F\[Backend Functions\]  
        G\[File Storage\]  
        H\[Real-time Subscriptions\]  
    end

    subgraph Third-Party Services  
        I\[External LLM API \<br/\>(e.g., OpenAI/Anthropic/gemini)\]  
        J\[Email Service \<br/\>(Resend)\]  
    end

    A \-- HTTPS Request \--\> B  
    B \-- Auth Check \--\> C  
    B \-- Payment Processing \--\> D  
    B \-- Convex Functions \--\> F  
    F \-- Database Operations \--\> E  
    F \-- File Operations \--\> G  
    F \-- Real-time Updates \--\> H  
    F \-- LLM Analysis \--\> I  
    F \-- Notifications \--\> J  
    H \-- Live Updates \--\> B

#### **Architectural Patterns**

* **Serverless Architecture:** Using Vercel for frontend hosting and Convex for serverless backend functions.  
  * **Rationale:** Highly cost-effective and automatically scalable for our workload.  
* **Real-time First Design:** Leveraging Convex's built-in real-time capabilities for live job status updates and progress tracking.  
  * **Rationale:** Provides immediate feedback to users during analysis processing.  
* **Modular Service Design:** The analysis engine will be built as independent Convex functions (Pacing, Character, etc.).  
  * **Rationale:** Critical for supporting our long-term "Story Co-pilot" vision.  
* **Type-Safe API Layer (Convex):** Using Convex functions for all frontend-to-backend communication.  
  * **Rationale:** Eliminates an entire class of bugs and accelerates development with automatic type generation.  
* **Repository Pattern (via Convex):** Using Convex's data layer to abstract all database interactions.  
  * **Rationale:** Provides a clean, type-safe interface for all data operations, making business logic more readable and testable.

### **Tech Stack**

#### **Technology Stack Table**

| Category | Technology | Version | Purpose | Rationale |
| :---- | :---- | :---- | :---- | :---- |
| **Frontend Language** | TypeScript | \~5.3.3 | Primary development language | Provides strong typing to reduce errors and improve AI agent accuracy. |
| **Frontend Framework** | Next.js | \~14.1.0 | React framework for web app | Enables server-side rendering, static site generation, and optimal performance on Vercel. |
| **UI Component Lib** | Shadcn/UI | \~0.8.0 | Headless component library | Offers accessible, unstyled components that we can fully customize to our "Digital Athenaeum" theme. |
| **State Management** | Zustand | \~4.5.2 | Minimalist state management | Simple, powerful, and avoids the boilerplate of more complex state managers for our MVP needs. |
| **Backend Language** | TypeScript | \~5.3.3 | Primary development language | Ensures end-to-end type safety when combined with the frontend and Convex. |
| **Backend Platform** | Convex | Latest | Complete backend solution | Provides database, functions, real-time subscriptions, and file storage in one platform. |
| **Database** | Convex (PostgreSQL) | Latest | Database & Backend Services | Offers a robust, scalable PostgreSQL database with integrated real-time capabilities and file storage. |
| **File Storage** | Convex Storage | Latest | Manuscript storage | Secure, integrated object storage that works seamlessly with our database and auth provider. |
| **Authentication** | Clerk | Latest | Authentication & User Management | Modern, feature-rich auth with pre-built components, social logins, and enterprise-grade security. |
| **Payment Gateway** | Clerk Billing | Latest | Subscription management | Integrated billing solution that works seamlessly with Clerk's user management. |
| **Email Service** | Resend | \~3.2.0 | Transactional email delivery | Simple, modern API for sending email notifications (e.g., "Your report is ready"). |
| **Styling** | Tailwind CSS | \~3.4.1 | Utility-first CSS framework | Allows for rapid, consistent, and customizable styling to achieve our specific branding goals. |
| **Testing** | Vitest | \~1.3.1 | Unit and integration testing | A modern, fast, and Jest-compatible testing framework that works seamlessly with Vite and Next.js. |

### **Data Models**

#### **AnalysisJob**

* **Purpose:** To track the status and metadata of a single manuscript analysis request from start to finish.  
* **Convex Schema:**  
  export interface AnalysisJob {
    _id: Id<"analysisJobs">;
    _creationTime: number;
    status: AnalysisStatus;
    tier: AnalysisTier;
    userEmail: string;
    userId: string;
    secureLinkToken: string;
    linkExpiry: number;
    completedAt: number | null;
    progress: number;
    currentModule: string;
    errorMessage: string;
    paymentStatus: PaymentStatus;
    paymentAmount: number;
    selectedTier: string;
  }

  export enum AnalysisStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
  }

  export enum AnalysisTier {
    FREE = 'FREE',
    PRO = 'PRO',
    PREMIUM = 'PREMIUM',
  }

  export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
  }

* **Relationships:** Has one Manuscript, Has one Report.

#### **Manuscript**

* **Purpose:** To store the metadata and location of the user's uploaded document.  
* **Convex Schema:**  
  export interface Manuscript {
    _id: Id<"manuscripts">;
    _creationTime: number;
    title: string;
    author: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    wordCount: number;
    storagePath: string;
    fileHash: string;
    analysisJobId: Id<"analysisJobs">;
  }

* **Relationships:** Belongs to one AnalysisJob.

#### **Report**

* **Purpose:** To store the structured JSON output from the complete analysis pipeline.  
* **Convex Schema:**  
  export interface Report {
    _id: Id<"reports">;
    _creationTime: number;
    analysisJobId: Id<"analysisJobs">;
    summary: string;
    recommendations: any;
    revisionRoadmap: any;
  }

* **Relationships:** Belongs to one AnalysisJob.

### **API Specification**

#### **Convex Function Definitions**

// mutations/analysis.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createAnalysisJob = mutation({
  args: {
    fileName: v.string(),
    wordCount: v.number(),
    userEmail: v.string(),
    tier: v.string(),
    paymentToken: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Logic to process payment, create job, and trigger analysis
    const jobId = await ctx.db.insert("analysisJobs", {
      status: "PENDING",
      tier: args.tier,
      userEmail: args.userEmail,
      userId: args.userId,
      progress: 0,
      currentModule: "",
      paymentStatus: "PENDING",
      paymentAmount: 0,
      selectedTier: args.tier,
      secureLinkToken: generateSecureToken(),
      linkExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      completedAt: null,
      errorMessage: "",
    });
    return { jobId };
  },
});

// queries/analysis.ts
export const getJobStatus = query({
  args: { jobId: v.id("analysisJobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    return { status: job?.status, progress: job?.progress };
  },
});

export const getReportByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const job = await ctx.db
      .query("analysisJobs")
      .withIndex("by_secureLinkToken", (q) => q.eq("secureLinkToken", args.token))
      .first();
    
    if (!job) throw new Error("Invalid token");
    
    const report = await ctx.db
      .query("reports")
      .withIndex("by_analysisJobId", (q) => q.eq("analysisJobId", job._id))
      .first();
    
    return report;
  },
});

### **Unified Project Structure**

lightink-mvp/  
├── apps/  
│   └── web/  
│       ├── public/  
│       ├── src/  
│       │   ├── app/  
│       │   ├── components/  
│       │   ├── lib/  
│       │   ├── styles/  
│       │   └── convex/  
│       │       ├── functions/  
│       │       ├── queries/  
│       │       └── mutations/  
│       └── next.config.js  
├── packages/  
│   └── shared/  
│       └── src/  
│           └── types.ts  
└── package.json

### **Development Workflow**

#### **Local Development Setup**

1. **Prerequisites:** Node.js (20.x+), npm (10.x+), Git, Convex CLI, Clerk CLI.  
2. **Initial Setup:**  
   git clone \<repo-url\>  
   cd lightink-mvp  
   npm install  
   npx convex dev  
   cp apps/web/.env.example apps/web/.env  
   \# Populate .env with Clerk and Convex credentials  
   npm run dev \--workspace=@lightink/web

3. **Development Commands:**  
   \# Start dev server  
   npm run dev \--workspace=@lightink/web  
   \# Start Convex dev server  
   npx convex dev  
   \# Run tests  
   npm test

### **Deployment Architecture**

#### **Deployment Strategy**

* **Platform:** Vercel for Frontend; Convex for Backend; Clerk for Auth.  
* **CI/CD:** GitHub Actions will be used to automate testing and deployments to Vercel and Convex.

#### **Environments**

| Environment | URL | Trigger |
| :---- | :---- | :---- |
| **Development** | http://localhost:3000 | Local machine |
| **Staging** | staging.lightink.com | Push to staging branch |
| **Production** | www.lightink.com | Push to main branch |

### **Migration Strategy**

#### **Phase 1: Authentication Setup**
- Set up Clerk authentication
- Configure user management and billing
- Update frontend to use Clerk components

#### **Phase 2: Database Migration**
- Create Convex schema based on existing Prisma models
- Migrate data structure to Convex format
- Set up indexes and relationships

#### **Phase 3: Backend Functions**
- Convert tRPC endpoints to Convex functions
- Implement real-time subscriptions for job status
- Set up file upload handling with Convex storage

#### **Phase 4: Frontend Integration**
- Update frontend to use Convex queries and mutations
- Implement real-time job status updates
- Add Clerk authentication components

#### **Phase 5: Testing & Optimization**
- Comprehensive testing of all functions
- Performance optimization
- Production deployment

