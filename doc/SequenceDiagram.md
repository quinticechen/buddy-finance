
# Sequence Diagrams for FinWise Buddy

This document outlines the sequence of operations for the core features of the FinWise Buddy application as defined in the PRD. We use Mermaid syntax to represent the diagrams.

---

### 1. Manual Transaction Entry

This diagram shows the process of a user manually adding a new expense or income transaction.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant Backend as "Backend (Supabase)"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Clicks "Add Transaction"
    FrontendApp->>User: Shows "Add Transaction" form
    User->>FrontendApp: Fills out form (details, amount, date, etc.)
    User->>FrontendApp: Clicks "Submit"
    FrontendApp->>Backend: Sends transaction data (e.g., via API call)
    activate Backend
    Backend->>Database: Writes new transaction record
    activate Database
    Database-->>Backend: Confirms write success
    deactivate Database
    Backend-->>FrontendApp: Returns success response
    deactivate Backend
    FrontendApp->>User: Shows success message (e.g., toast)
    FrontendApp->>User: Updates transaction list
```

---

### 2. OCR-Based Transaction Entry (Scan/Upload)

This diagram illustrates the flow when a user scans or uploads a receipt to create a transaction.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant OcrService as "GCP Document/Vision AI"
    participant Backend as "Backend (Supabase)"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Clicks "Scan Receipt" or "Upload Receipt"
    FrontendApp->>User: Opens camera or file selector
    User->>FrontendApp: Scans/selects an image
    FrontendApp->>OcrService: Sends image for processing
    activate OcrService
    OcrService-->>FrontendApp: Returns extracted text/data (date, amount, merchant)
    deactivate OcrService
    FrontendApp->>User: Shows "Add Transaction" form pre-filled with extracted data
    User->>FrontendApp: Reviews and/or edits data
    User->>FrontendApp: Clicks "Submit"
    FrontendApp->>Backend: Sends transaction data
    activate Backend
    Backend->>Database: Writes new transaction record
    activate Database
    Database-->>Backend: Confirms write success
    deactivate Database
    Backend-->>FrontendApp: Returns success response
    deactivate Backend
    FrontendApp->>User: Shows success message
    FrontendApp->>User: Updates transaction list
```

---

### 3. AI Chat Interaction

This diagram shows how the user interacts with the FinWise Buddy AI to ask financial questions.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant Backend as "Backend (Supabase Edge Function)"
    participant AiService as "GCP Gemini API"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Types question in chat (e.g., "How much did I spend?")
    User->>FrontendApp: Clicks "Send"
    FrontendApp->>Backend: Sends user's message
    activate Backend
    Backend->>Database: Queries relevant transaction history
    activate Database
    Database-->>Backend: Returns user's transaction data
    deactivate Database
    Backend->>AiService: Sends prompt (includes character personality, user data, user question)
    activate AiService
    AiService-->>Backend: Returns generated response
    deactivate AiService
    Backend-->>FrontendApp: Forwards AI response
    deactivate Backend
    FrontendApp->>User: Displays FinWise Buddy's response in chat
```

---

### 4. Asset & Liability Consolidation

This diagram shows how a user adds an asset or liability and views their net worth.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant Backend as "Backend (Supabase)"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Clicks "Add Asset/Liability"
    FrontendApp->>User: Shows asset/liability form
    User->>FrontendApp: Fills out and submits form
    FrontendApp->>Backend: Sends asset/liability data
    activate Backend
    Backend->>Database: Writes new asset/liability record
    Database-->>Backend: Confirms write success
    Backend-->>FrontendApp: Returns success response
    deactivate Backend
    FrontendApp->>User: Shows success message and updates list

    loop Periodically
        User->>FrontendApp: Navigates to Overview/Dashboard
        FrontendApp->>Backend: Requests net worth data
        activate Backend
        Backend->>Database: Queries all assets and liabilities over time
        Database-->>Backend: Returns historical data
        Backend-->>FrontendApp: Returns data formatted for chart
        deactivate Backend
        FrontendApp->>User: Displays net worth chart
    end
```

---

### 5. Income & Expense Budgeting

This diagram shows how a user sets a budget and gets alerted.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant Backend as "Backend (Supabase)"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Clicks "Create Budget"
    FrontendApp->>User: Shows budget form (category, amount)
    User->>FrontendApp: Fills out and submits form
    FrontendApp->>Backend: Sends new budget data
    activate Backend
    Backend->>Database: Writes new budget record
    Database-->>Backend: Confirms write success
    Backend-->>FrontendApp: Returns success response
    deactivate Backend
    FrontendApp->>User: Shows success message

    Note over Backend, Database: On a new transaction or scheduled check...
    Backend->>Backend: Compares expenses against budgets
    alt Spending exceeds budget
        Backend->>FrontendApp: Sends budget alert notification
        FrontendApp->>User: Displays alert (e.g., "You've overspent on Food!")
    end
```

---

### 6. Savings Goals & AI Supervision

This diagram shows how a user creates a savings goal and how FinWise Buddy supervises it.

```mermaid
sequenceDiagram
    participant User
    participant FrontendApp as "FinWise Buddy UI"
    participant Backend as "Backend (Supabase Edge Function)"
    participant AiService as "GCP Gemini API"
    participant Database as "DB (PostgreSQL)"

    User->>FrontendApp: Clicks "Create Savings Goal"
    FrontendApp->>User: Shows savings goal form
    User->>FrontendApp: Fills out and submits form (name, amount, deadline)
    FrontendApp->>Backend: Sends new goal data
    activate Backend
    Backend->>Database: Writes new savings goal record
    Database-->>Backend: Confirms write success
    Backend-->>FrontendApp: Returns success response
    deactivate Backend
    FrontendApp->>User: Shows new goal with progress bar

    Note over Backend, AiService: On a trigger (e.g., login, weekly check)...
    Backend->>Database: Fetches savings goals & recent transactions
    activate Backend
    Database-->>Backend: Returns user data
    Backend->>AiService: Sends prompt (goal progress, spending data, character personality)
    activate AiService
    AiService-->>Backend: Returns generated playful/supervisory message
    deactivate AiService
    Backend-->>FrontendApp: Forwards AI message
    deactivate Backend
    FrontendApp->>User: Displays FinWise Buddy's encouragement/nudge
```

---

### 7. Socialized Saving (Invite Friends)

This diagram illustrates the process of inviting a friend to a shared savings goal.

```mermaid
sequenceDiagram
    participant UserA as "Initiator"
    participant FrontendAppA as "UserA's UI"
    participant Backend as "Backend (Supabase)"
    participant Database as "DB (PostgreSQL)"
    participant FrontendAppB as "UserB's UI"
    participant UserB as "Invitee"

    UserA->>FrontendAppA: Clicks "Invite to Goal" on a savings goal
    FrontendAppA->>Backend: Sends invitation request (goalId, inviteeId)
    activate Backend
    Backend->>Database: Creates invitation record (status: pending)
    Backend->>FrontendAppB: Sends notification to UserB
    deactivate Backend

    UserB->>FrontendAppB: Clicks on invitation
    FrontendAppB->>UserB: Shows shared goal details
    UserB->>FrontendAppB: Clicks "Accept"
    FrontendAppB->>Backend: Sends acceptance
    activate Backend
    Backend->>Database: Updates invitation (status: accepted), links UserB to goal
    deactivate Backend

    loop Later
        UserA->>FrontendAppA: Views shared goal
        FrontendAppA->>Backend: Requests shared goal progress
        activate Backend
        Backend->>Database: Queries progress for all participants
        Database-->>Backend: Returns ANONYMIZED progress percentages
        Backend-->>FrontendAppA: Sends progress data (e.g., {user: 'You', ...}, {user: 'UserB', ...})
        deactivate Backend
        FrontendAppA->>UserA: Displays progress for all members
    end
```
