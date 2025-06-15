
## Product Requirements Document (PRD): AI Financial Assistant - "FinWise Buddy"

### 1. Product Overview

"FinWise Buddy" is an innovative personal financial management app designed to help users effortlessly manage assets and liabilities, track income and expenses, plan savings, and cultivate healthy financial habits through AI technology and gamification. The app will feature a cute yet mischievous AI character that offers financial advice in a playful and somewhat "emotionally blackmailing" manner, making financial management engaging and fun.

---

### 2. Product Goals

- **Long-Term Goal:** To become the go-to personal financial management tool for users, helping them achieve financial freedom and goals, and building user loyalty through its unique AI interaction model.
- **MVP Goal (within 4 hours):**
    - **Core Feature One: Flexible Expense/Income Tracking:** Users can provide their spending or income details via automatic scan, manual photo upload with recognition, or direct manual input. Users can also input future dated transactions with recurring frequencies.
    - **Core Feature Two: AI Financial Assistant "FinWise Buddy" Interaction:** The character can provide real-time, mischievous financial advice based on the user's spending records and answer their financial questions.

---

### 3. Target Users

- **Primary Target Users:** Individuals aged 20-40 who are interested in personal financial management but lack systematic methods, or find traditional budgeting tedious. They are accustomed to using apps for daily tasks and are open to new technologies and interactive experiences.
- **Secondary Target Users:** Homemakers looking to track household expenses more precisely, and individuals with savings goals but lacking motivation.

---

### 4. User Stories

### 4.1 Core Features (MVP User Stories)

- **Expense/Income Tracking (Scan & Manual Input):**
    - As a user, I want to **automatically scan a receipt or invoice** using my device's camera, so the app can **instantly read and record** my transaction details.
    - As a user, I want to **upload a photo of my receipt or invoice** from my gallery, so the app can **recognize and pre-fill** my transaction details.
    - As a user, I want the app to **identify the date, specific items, amounts, and spending/income categories** from scanned or uploaded receipts/invoices, so I don't have to input everything manually.
    - As a user, I want to be able to **review and edit any detected information** after a scan or photo upload, so I can ensure accuracy.
    - As a user, I want to **manually enter my expense or income details** (e.g., date, item, amount, category, merchant) if I don't have a physical receipt or prefer direct entry, so all my transactions can be tracked.
    - As a user, I want to **input expenses or income with a future date**, so I can plan my finances ahead.
    - As a user, I want to **set a frequency (e.g., weekly, monthly, yearly)** when entering future income or expenses, so recurring transactions are automatically accounted for in my financial planning.
    - As a user, I want all my **scanned, photo-recognized, and manually entered transactions (both past and future)** to be saved in my account, so I have a complete and forward-looking record of my money flow.
- **AI Financial Assistant "FinWise Buddy" Interaction:**
    - As a user, I want to **ask FinWise Buddy questions about my finances** (e.g., "How much did I spend this month?", "Can I afford this new gadget?"), so I can get quick and personalized insights.
    - As a user, I want FinWise Buddy to **give me playful, direct, and sometimes "emotionally blackmailing" financial advice** based on my spending and future plans, so I feel motivated (or just the right amount of guilty) to manage my money better.
    - As a user, I want FinWise Buddy to **pop up with contextual reminders or comments** (e.g., when I frequently buy certain items or if a planned future expense is approaching), so I'm more aware of my financial behaviors and upcoming obligations.

---

### 4.2 Planning Stage Features (Post-MVP User Stories)

- **Asset & Liability Consolidation:**
    - As a user, I want to **input all my assets (cash, stocks, property) and liabilities (loans, credit card debt)**, so I have a complete overview of my financial situation.
    - As a user, I want to **see where my assets and liabilities are held** (e.g., specific banks or companies), so I know exactly where my money is.
    - As a user, I want to **view charts showing my net worth over time**, so I can track my financial growth.
- **Income & Expense Budgeting & Planning:**
    - As a user, I want to **set budgets for different spending categories**, so I can control my expenses.
    - As a user, I want the app to **alert me if my actual spending exceeds my budget** or if my planned expenses are projected to outpace my income, so I can adjust my spending proactively.
    - As a user, I want to **simulate my financial balance based on my current records and future planned transactions**, so I can plan for big purchases or savings.
- **Savings Goals & Supervision:**
    - As a user, I want to **set specific savings goals** (e.g., a down payment for a house, a travel fund), so I have a clear target to work towards.
    - As a user, I want to **see my progress towards my savings goals visually** (e.g., a percentage bar), so I stay motivated.
    - As a user, I want FinWise Buddy to **regularly remind and encourage me** about my savings goals, sometimes with a playful nudge, so I stay on track.
- **Socialized Saving (Invite Friends):**
    - As a user, I want to **invite friends to join a shared savings goal**, so we can support each other.
    - As a user, I want to **see my friends' savings progress (as a percentage)** without knowing their exact amounts, so we can mutually encourage without compromising privacy.

---

### 5. Functional Requirements

Below is the complete list of "FinWise Buddy" features, with an indication of what will be included in the MVP phase.

### 5.1 Core Features (Included in MVP)

- **Expense/Income Tracking (Scan & Manual Input):**
    - **Description:** Users can provide transaction details through three methods: automatic live camera scan, manual upload of a photo for recognition, or direct manual input. The system will automatically identify key data from scanned/uploaded images (date, item, amount, category), and users can edit this pre-filled information. Users can also input future-dated transactions and set recurrence frequencies.
    - **Functionality:**
        - **Automatic Scan Recognition:** Live camera feed for instant OCR.
        - **Photo Upload Recognition:** Upload image from device for OCR.
        - **Manual Input Form:** Fields for Date, Item/Description, Amount, Category (e.g., Food, Transport, Rent), Merchant/Source.
        - **Editable Recognition Results:** Pre-filled fields from scans are editable.
        - **Future Date Input:** Allow selecting dates in the future.
        - **Frequency Setting:** Options for "One-time," "Daily," "Weekly," "Bi-weekly," "Monthly," "Quarterly," "Yearly" for future entries.
    - **Technical Implementation:** Integration with **GCP Document AI** (ideal for accurate invoice parsing) or **GCP Vision AI** (general text detection) for OCR. Manual input will utilize standard form fields.
    - **Data Storage:** All recognized and manually entered expense/income records are stored in the user's personal database (**Supabase PostgreSQL**).
- **AI Financial Assistant "FinWise Buddy" Interaction:**
    - **Description:** The app features a cute, mischievous, and somewhat "emotionally blackmailing" AI character that interacts with the user.
    - **Functionality:**
        - **Instant Consultation:** Text-based chat interface for user queries about their finances.
        - **Smart & Personalized Advice:** FinWise Buddy combines user spending/income data (from scanned/manual entries in MVP) to provide personalized, humorous, and persuasive financial advice. Advice tone is defined by character prompt.
        - **Contextual Triggers/Notifications:** AI character can proactively offer comments or reminders based on detected user spending patterns or upcoming financial dates.
    - **Technical Implementation:** Integration with **GCP Gemini API** (core for conversation generation), **GCP Natural Language AI** (sentiment analysis for nuanced responses, optional), **GCP Text-to-Speech** (for voice output, optional).
    - **Personality Setting:** The character's unique personality, tone, and "level of emotional blackmail" are defined and maintained through carefully designed **Prompts** passed to the Gemini API.

### 5.2 Planned Features (Post-MVP Development)

- **Asset & Liability Consolidation:**
    - **Description:** Users can manually input or connect via API (considering security and complexity) various assets (cash, savings, stocks, bonds, real estate, insurance, etc.) and liabilities (loans, credit card debt).
    - **Functionality:**
        - **Overview Dashboard:** Displays net worth, asset/liability allocation ratios.
        - **Detailed Records:** Clearly lists the associated bank or company for each asset/liability.
        - **Asset Trend Chart:** Visualizes changes in assets and liabilities over time.
- **Income & Expense Budgeting and Planning:**
    - **Description:** Users can pre-set future recurring or anticipated income and expense items.
    - **Functionality:**
        - **Income/Expense Entry:** Configurable for recurring (monthly, quarterly) or one-time entries.
        - **Budget Alerts:** The app provides warnings when projected expenses exceed the budget or income.
        - **Financial Scenario Simulation:** Estimates future financial balance based on projected income and expenses.
- **Savings Goals & Supervision:**
    - **Description:** Users can set specific savings goals (e.g., down payment for a house, a travel fund).
    - **Functionality:**
        - **Goal Setting:** Define amount and deadline.
        - **Progress Tracking:** Visual progress bar showing percentage achieved.
        - **FinWise Buddy Supervision:** FinWise Buddy will regularly provide encouragement or "emotionally blackmailing" reminders based on user spending habits and savings progress.
- **Socialized Saving (Invite Friends):**
    - **Description:** Users can invite friends to join shared savings goals.
    - **Functionality:**
        - **Goal Sharing:** Friends can see shared savings goals.
        - **Anonymous Progress Display:** Friends only see the percentage of the savings goal achieved by others, not specific amounts, to protect privacy.
        - **Mutual Supervision & Encouragement:** FinWise Buddy might offer group-oriented advice or playful remarks for shared goals.

---

### 6. Non-Functional Requirements

- **Security:**
    - User data encrypted in storage and transit.
    - Compliance with data privacy regulations (e.g., GDPR, CCPA, and relevant Taiwanese regulations).
    - Strict access control for financially sensitive data.
- **Usability:** Intuitive user interface, streamlined operation flow.
- **Performance:**
    - Invoice scanning and AI responses should complete within seconds.
    - Fast app loading and data display.
- **Reliability:** High availability, low failure rate.
- **Scalability:** System architecture designed to support future user growth and new feature expansion.
- **Cross-Platform:** Native apps for iOS and Android (long-term goal). MVP can start as a Web App or Hybrid App.

---

### 7. Technology Stack (Recommended)

- **Cloud Platform:** **Google Cloud Platform (GCP)**
- **AI Services:**
    - GCP Document AI (for invoice recognition)
    - GCP Gemini API (for conversational AI core)
    - GCP Vision AI (backup/assist for image text recognition)
    - GCP Natural Language AI (sentiment analysis, to refine FinWise Buddy's responses)
    - GCP Text-to-Speech (for FinWise Buddy's voice output)
- **Backend:** Python (Flask/FastAPI) or Node.js (Express) on **Supabase Edge Functions**
- **Database:** **Supabase PostgreSQL** for all structured data.
- **Frontend:** **React with TypeScript** using **Vite**, **Tailwind CSS**, and **shadcn/ui**.
- **Deployment:** **Vercel** for frontend, **Supabase Edge Functions** for backend logic, integrated via **GitHub Actions**.

---

### 8. Product Milestones (MVP First)

### **Phase 1: MVP Construction (4-hour Goal)**

- **Goal:** Implement flexible expense/income tracking (scan & manual input) and core AI FinWise Buddy interaction.
- **Tasks:**
    - GCP environment and API Key configuration.
    - Build a simple web interface (camera access for live scan, photo upload option, manual expense/income input form with future date/frequency selectors, chat box).
    - Backend development: Integrate with Document AI for invoice recognition.
    - Backend development: Implement logic for processing manual expense/income entries, including future-dated and recurring transactions, and storing data in Supabase.
    - Backend development: Integrate with Gemini API for FinWise Buddy's conversation logic (Prompt design).
    - Testing and basic deployment.

### **Phase 2: Core Feature Expansion (Post-MVP)**

- Improve invoice recognition accuracy and item categorization.
- Implement manual asset and liability entry and overview.
- Implement income and expense budgeting.
- FinWise Buddy voice output.

### **Phase 3: Advanced Features and User Experience Optimization**

- Automated asset and liability synchronization (if feasible and secure).
- Savings goals and supervision features.
- Socialized saving features.
- APP UI/UX comprehensive optimization.
- Data analytics and reporting features.

---

### 9. Success Metrics

- **MVP Success Metrics:**
    - Invoice scanning key data (date, total amount, merchant) recognition accuracy > 80%.
    - Manual expense/income input completion rate > 90% (users successfully submit valid entries).
    - FinWise Buddy response time < 3 seconds.
    - User satisfaction with FinWise Buddy's conversations (can be gathered via simple voting feature).
- **Long-Term Success Metrics:**
    - User activity (DAU/MAU).
    - User retention rate.
    - Customer acquisition cost.
    - User savings goal achievement rate.

---

### 10. Future Potential & Monetization Models (Long-Term Planning)

- **Advanced AI Services:** More sophisticated financial forecasting, personalized investment advice.
- **Financial Product Recommendations:** Recommending insurance, loans, investment products based on user data (must be compliant).
- **Subscription Model:** Offering ad-free experience, advanced analytics reports, more personalized FinWise Buddy voice packs, etc.
- **Partnerships with Financial Institutions:** Providing data integration and services.

---
