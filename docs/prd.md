### **Lightink Product Requirements Document (PRD)**

#### **Goals and Background Context**

##### **Goals**

* Establish Market Entry by successfully launching the Lightink MVP.  
* Achieve Revenue Validation by generating $75,000 within six months post-launch.  
* Validate the effectiveness of the tiered "Free Analysis", "Pro Analysis", and "Premium Workshop" subscription pricing model.  
* Prove Technological Adaptability by generating a Proof of Concept analysis for one B2B vertical.

##### **Background Context**

Lightink 1.0 is a web-based manuscript diagnostic tool designed to solve the "analysis paralysis" that "Serious Authors" face. The current market offers a difficult choice between prohibitively expensive human editors and unreliable beta readers. Lightink bridges this gap by providing the clarity of a professional developmental editor through an actionable, data-driven "Revision Roadmap" at an accessible price, empowering authors to elevate their work with confidence.

##### **Change Log**

| Date | Version | Description | Author |
| :---- | :---- | :---- | :---- |
| July 29, 2025 | 1.0 | Initial PRD Draft | John (PM) |

### **Requirements (Revised)**

#### **Functional**

1. **FR1:** The system must allow a user to securely upload a manuscript in .docx format.  
2. **FR2:** Upon file selection, the system must perform a client-side "pre-flight check" to display the manuscript's word count before final upload.  
3. **FR3:** The manuscript analysis process must run asynchronously in the background.  
4. **FR4:** The system must collect a user's email address before starting the analysis.  
5. **FR5:** The system must offer three distinct analysis tiers: a free "Free Analysis" tier, a "Pro Analysis" subscription tier, and a "Premium Workshop" subscription tier.  
6. **FR6:** The system must securely process payments before initiating the analysis scan.  
7. **FR7:** The system must generate an interactive, web-based dashboard to display the analysis results.  
8. **FR8:** Upon analysis completion, the system must send an email to the user containing a secure, time-limited link to their report dashboard.  
9. **FR9:** The dashboard must include visualizations for Pacing (Heatmap), Character Interactions (Web), Prose & Dialogue patterns, and Thematic Resonance.  
10. **FR10:** The system must use an external LLM to generate a prioritized, actionable "Revision Roadmap" based on the full analysis.  
11. **FR11:** The system must allow the user to export the complete analysis report and Revision Roadmap as a single, formatted PDF document.

#### **Non-Functional**

1. **NFR1:** The application must be a responsive web app, providing a usable report-viewing experience on both desktop and mobile devices.  
2. **NFR2:** The analysis for a standard 80,000-word manuscript must be completed in under 10 minutes.  
3. **NFR3:** All user data, especially the manuscript content, must be handled with end-to-end encryption and be permanently deleted from servers after the analysis is complete and the report has been delivered.  
4. **NFR4:** All API calls to the external LLM must be optimized to ensure cost-efficiency.  
5. **NFR5:** The MVP will be session-based; it will not require or support user accounts or the server-side storage of user reports beyond the secure link's expiry.  
6. **NFR6:** The backend architecture must be modular to support the long-term vision of a real-time "Story Co-pilot."

### **User Interface Design Goals**

#### **Overall UX Vision**

The user experience must feel professional, secure, and empowering, transforming the anxiety of revision into a process of discovery. The design theme is "The Digital Athenaeum"—a modern, clean, and focused digital library or data visualization studio. The UI should prioritize clarity and reduce cognitive load at every step.

#### **Key Interaction Paradigms**

* **The Handshake:** The upload process will be a guided, reassuring experience that builds trust through clear communication and visual feedback (e.g., the "vault" animation).  
* **The Case File:** The analysis dashboard will be an interactive, non-judgmental discovery tool. Data is presented as "evidence" and "clues" for the author to investigate, not as errors to be fixed.  
* **The Game Plan:** The Revision Roadmap will be presented as a strategic, goal-oriented plan from an expert coach, focusing on enhancement and empowerment.

#### **Core Screens and Views**

* Upload Screen  
* Payment Modal  
* Analysis In-Progress Screen  
* Report Dashboard (Tabbed Interface)  
* Revision Roadmap View

#### **Accessibility**

* **Accessibility:** WCAG 2.1 AA

#### **Branding**

## ** Color Palette**
**Primary**: Charcoal (#2D3748) and Payne's Gray (#4A5568) for trust and professionalism
**Warmth**: Vanilla (#FFF4AF) for encouraging, warm backgrounds
**Energy**: Tangerine (#ED8936) for calls-to-action and important highlights
**Clean**: Azure (#F5FFFE) for fresh, uncluttered backgrounds

## **🎨 Visual Style**
- **Sophisticated Cartoon**: Clean, playful elements with professional color usage
- **Delightful Interactions**: Subtle animations that make the experience fun
- **Whimsical Icons**: Lucide React icons with your color palette
- **Smooth Animations**: 300ms ease-out transitions with playful micro-interactions

 **Typography:** A clean font (e.g., Inter) for UI/body, paired with an elegant and minimal and bold serif (e.g., inter) for major headings.

#### **Target Device and Platforms**

* **Target Device and Platforms:** Web Responsive

### **Technical Assumptions**

#### **Repository Structure**

* **Repository Structure:** Monorepo.  
* **Rationale:** To simplify dependency management and code sharing for a small, focused team.

#### **Service Architecture**

* **Service Architecture:** Serverless Functions / Microservices-lite.  
* **Rationale:** To align with the long-term "Story Co-pilot" vision, requiring a modular, scalable, and cost-efficient analysis engine.

#### **Testing Requirements**

* **Testing Requirements:** Unit \+ Integration.  
* **Rationale:** To maintain a rapid development pace for the MVP, focusing on core module and service integration correctness.

#### **Additional Technical Assumptions and Requests**

* The system must include an abstraction layer for the external LLM API to allow for switching providers.  
* The system must include a secure mechanism for handling the user's email address and generating a time-limited, single-use secure link for the report.

### **Epic List**

#### **Epic 1: Core Manuscript Analysis MVP**

**Epic Goal:** To create a functional, end-to-end web application that allows a "Serious Author" to securely upload a manuscript, purchase an analysis, receive a comprehensive report via a secure link, and download that report as a PDF. This epic delivers the complete core value proposition of Lightink 1.0.

### **Epic 1 Details**

#### **Story 1.1: Project Foundation & Core Infrastructure Setup**

As a Developer, I want to set up a new monorepo with the core backend and frontend application structures, so that we have a stable, version-controlled foundation for all future development.  
Acceptance Criteria:

1. A new monorepo is created and initialized with Git.  
2. A basic serverless backend application structure is created.  
3. A basic responsive frontend application structure is created.  
4. A "health check" API endpoint on the backend returns a 200 OK status.  
5. The frontend application can successfully call the health check endpoint.  
6. Core dependencies for both frontend and backend are installed.

#### **Story 1.2: Payment Gateway Integration**

As a Serious Author, I want to securely pay for an analysis using my credit card, so that I can purchase a manuscript scan.  
Acceptance Criteria:

1. A payment processing service (e.g., Stripe) is integrated into the backend.  
2. The frontend displays a simple payment modal to collect credit card information securely.  
3. A successful transaction returns a unique transaction ID to the backend.  
4. A failed transaction returns a clear, user-friendly error message.  
5. The system can process payments for both monthly and yearly subscriptions for "Pro Analysis" and "Premium Workshop" tiers, with the "Free Analysis" tier requiring no payment.

#### **Story 1.3: Secure Manuscript Upload & Notification Service**

As a Serious Author, I want to securely upload my manuscript and provide my email address, so that the system can begin the analysis and notify me when it's complete.  
Acceptance Criteria:

1. The frontend provides a secure interface for uploading a .docx file.  
2. The backend provides a secure endpoint to receive and temporarily store the uploaded file.  
3. The system securely captures the user's email address.  
4. An email service is integrated into the backend.  
5. A placeholder "job complete" email can be successfully sent, containing a unique, secure link.  
6. The uploaded manuscript file is automatically deleted after a short, predefined period.

#### **Story 1.4: Backend Analysis Orchestration**

As a Developer, I want to create an asynchronous pipeline that runs a manuscript through modular analysis services, so that we can process it without blocking the system.  
Acceptance Criteria:

1. An orchestration service manages the analysis job flow.  
2. The orchestrator retrieves the correct manuscript from temporary storage.  
3. Placeholder modules for each analysis service (Pacing, Character, etc.) are created.  
4. The orchestrator calls each analysis module in sequence.  
5. Upon completion, the orchestrator triggers the "job complete" email notification.  
6. The system logs the start, completion, and any errors for each job.

#### **Story 1.5: Core AI Analysis Integration**

As a Developer, I want to integrate the analysis services with the external LLM API, so that we can generate the core data for the reports.  
Acceptance Criteria:

1. A secure service layer manages all calls to the external LLM API.  
2. The Pacing, Character, Prose, and Thematic analysis modules can send text to the LLM and receive structured data back.  
3. The results from all modules are saved in a structured format associated with the job's unique ID.

#### **Story 1.6: Revision Roadmap Generation**

As a Serious Author, I want to receive an actionable, AI-generated Revision Roadmap, so that I have a clear, prioritized plan to improve my manuscript.  
Acceptance Criteria:

1. A new service takes the full, structured analysis data as input.  
2. This service uses a master prompt to send the analysis data to the external LLM.  
3. The LLM returns a structured "Revision Roadmap" with 3-5 prioritized objectives.  
4. The generated roadmap is saved and associated with the job's unique ID.

#### **Story 1.7: Report Dashboard & Data Visualization**

As a Serious Author, I want to view my analysis results in a clear, interactive dashboard, so that I can understand the evidence behind my Revision Roadmap.  
Acceptance Criteria:

1. A secure, unique URL endpoint displays the report dashboard.  
2. The dashboard correctly retrieves and displays the analysis data for that URL.  
3. The Pacing Heatmap and Character Interaction Web are visualized correctly as charts.  
4. The Prose, Dialogue, and Thematic analysis findings are displayed clearly.  
5. The full Revision Roadmap is displayed prominently.

#### **Story 1.8: PDF Report Export**

As a Serious Author, I want to download my complete report as a professional PDF, so that I have a permanent copy to work from.  
Acceptance Criteria:

1. The report dashboard includes a "Download PDF" button.  
2. Clicking the button generates a single, well-formatted PDF document.  
3. The PDF contains all visualizations, analysis data, and the complete Revision Roadmap.  
4. The generated PDF is professional in appearance and easy to read.