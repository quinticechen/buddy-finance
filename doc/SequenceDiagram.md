
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

