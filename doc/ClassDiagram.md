
# Class Diagrams for FinWise Buddy

This document provides class diagrams that describe the program architecture for FinWise Buddy, including its components, services, data models, and their relationships. The diagrams are based on the PRD and Sequence Diagrams.

---

### 1. High-Level System Architecture

This diagram shows the main architectural components and their interactions at a high level.

```mermaid
classDiagram
    direction LR
    package "Frontend (React + Vite)" {
        class FrontendApp {
            +UI Components
            +State Management
            +API Client
        }
    }
    package "Backend (Supabase)" {
        class EdgeFunctions {
            +TransactionService
            +AiChatService
            +OcrService
            +...
        }
        class Database {
            +PostgreSQL Tables
            +User Data
            +Transaction Data
        }
    }
    package "External Services (GCP)" {
        class GcpAiServices {
            +Document AI
            +Gemini API
            +Vision AI
        }
    }

    FrontendApp --|> EdgeFunctions : (HTTPS/API Calls)
    EdgeFunctions --|> Database : (CRUD Operations)
    EdgeFunctions --|> GcpAiServices : (API Calls)
```

---

### 2. Transaction Management (MVP)

This diagram details the classes involved in tracking expenses and income, including manual and OCR-based entry.

```mermaid
classDiagram
    class TransactionsPage {
        +transactions: Transaction[]
        +isSheetOpen: boolean
        +openAddTransactionSheet()
        +fetchTransactions()
    }
    class AddTransactionSheet {
        +isOpen: boolean
        +formData: object
        +handleInputChange()
        +handleSubmit()
        +handleScanReceipt()
    }
    class TransactionService {
        <<Backend Service>>
        +addTransaction(data): Promise~Transaction~
        +getTransactions(userId): Promise~Transaction[]~
    }
    class OcrService {
        <<Backend Service>>
        +processReceipt(image): Promise~ExtractedData~
    }
    class GcpDocumentAi {
        <<External API>>
        +processDocument(image): Promise~any~
    }

    TransactionsPage "1" ..> "1" AddTransactionSheet : opens
    AddTransactionSheet "1" ..> "1" TransactionService : submits to
    AddTransactionSheet "1" ..> "1" OcrService : sends image to
    OcrService "1" ..> "1" GcpDocumentAi : calls
    TransactionService "1" ..> "1" Database : Manages Transaction records
```

---

### 3. AI Chat Interaction (MVP)

This diagram shows the classes for the AI financial assistant feature.

```mermaid
classDiagram
    class ChatPage {
        +messages: Message[]
        +currentInput: string
        +sendMessage()
    }
    class AiChatService {
        <<Backend Service>>
        +generateResponse(userId, message): Promise~string~
        -fetchUserTransactions(userId)
        -constructPrompt(transactions, message)
    }
    class GcpGeminiApi {
        <<External API>>
        +generateContent(prompt): Promise~any~
    }

    ChatPage "1" ..> "1" AiChatService : sends message to
    AiChatService "1" ..> "1" GcpGeminiApi : calls
    AiChatService "1" ..> "1" Database : Queries Transaction data
```

---

### 4. Asset & Liability Consolidation (Post-MVP)

This diagram outlines the classes for managing a user's net worth.

```mermaid
classDiagram
    class NetWorthPage {
        +assets: Asset[]
        +liabilities: Liability[]
        +netWorthHistory: object[]
        +addAsset(data)
        +addLiability(data)
    }
    class NetWorthService {
        <<Backend Service>>
        +addAsset(userId, data): Promise~Asset~
        +addLiability(userId, data): Promise~Liability~
        +getNetWorthData(userId): Promise~object[]~
    }

    NetWorthPage "1" ..> "1" NetWorthService : calls
    NetWorthService "1" ..> "1" Database : Manages Asset & Liability records
```

---

### 5. Income & Expense Budgeting (Post-MVP)

This diagram shows the classes related to setting and monitoring budgets.

```mermaid
classDiagram
    class BudgetPage {
        +budgets: Budget[]
        +createBudget(data)
    }
    class BudgetService {
        <<Backend Service>>
        +createBudget(userId, data): Promise~Budget~
        +checkBudgets(userId, transaction): Promise~Notification~
    }
    
    BudgetPage "1" ..> "1" BudgetService : calls
    BudgetService "1" ..> "1" Database : Manages Budgets & queries Transactions
```

---

### 6. Savings Goals & AI Supervision (Post-MVP)

This diagram shows the classes for creating and supervising savings goals.

```mermaid
classDiagram
    class SavingsGoalPage {
        +goals: SavingsGoal[]
        +createGoal(data)
    }
    class SavingsGoalService {
        <<Backend Service>>
        +createGoal(userId, data): Promise~SavingsGoal~
        +getGoals(userId): Promise~SavingsGoal[]~
        +superviseGoals(userId): Promise~string~
    }
    class GcpGeminiApi {
        <<External API>>
    }

    SavingsGoalPage "1" ..> "1" SavingsGoalService : calls
    SavingsGoalService "1" ..> "1" Database : Manages SavingsGoal records
    SavingsGoalService "1" ..> "1" GcpGeminiApi : calls for supervision messages
```

---

### 7. Socialized Saving (Post-MVP)

This diagram outlines the classes for the shared savings goal feature.

```mermaid
classDiagram
    class SharedGoalPage {
        +goal: SavingsGoal
        +participantsProgress: object[]
        +inviteFriend(friendId)
    }
    class InvitationService {
        <<Backend Service>>
        +sendInvite(goalId, inviterId, inviteeId): Promise~GoalInvitation~
        +acceptInvite(invitationId): Promise~boolean~
        +getSharedGoalProgress(goalId): Promise~object[]~
    }

    SharedGoalPage "1" ..> "1" InvitationService : calls
    InvitationService "1" ..> "1" Database : Manages GoalInvitation records
```

---

### 8. Data Models

This diagram shows the core data entities and their relationships within the database.

```mermaid
classDiagram
    class User {
        +id: UUID
        +email: string
    }
    class Transaction {
        +id: UUID
        +userId: UUID
        +date: Date
        +description: string
        +amount: number
        +type: 'income' | 'expense'
        +category: string
    }
    class Asset {
        +id: UUID
        +userId: UUID
        +name: string
        +value: number
    }
    class Liability {
        +id: UUID
        +userId: UUID
        +name: string
        +value: number
    }
    class Budget {
        +id: UUID
        +userId: UUID
        +category: string
        +amount: number
    }
    class SavingsGoal {
        +id: UUID
        +name: string
        +targetAmount: number
        +deadline: Date
    }
    class GoalParticipant {
        +goalId: UUID
        +userId: UUID
        +role: 'owner' | 'participant'
        +currentAmount: number
    }
    class GoalInvitation {
        +id: UUID
        +goalId: UUID
        +inviterId: UUID
        +inviteeId: UUID
        +status: 'pending' | 'accepted' | 'declined'
    }

    User "1" -- "0..*" Transaction : has
    User "1" -- "0..*" Asset : has
    User "1" -- "0..*" Liability : has
    User "1" -- "0..*" Budget : sets
    User "1" -- "0..*" GoalParticipant : participates_in
    SavingsGoal "1" -- "1..*" GoalParticipant : has
    SavingsGoal "1" -- "0..*" GoalInvitation : has
```

