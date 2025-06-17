
# FinWise Buddy Development Guide

## Document-Driven Test-Driven Development (DTDD) Process

This guide outlines our development methodology for the FinWise Buddy AI Financial Assistant project, following the DTDD approach which combines document-driven development with test-driven development for AI-collaborative software creation.

---

## 1. Project Overview

**Project:** FinWise Buddy - AI Financial Assistant  
**Architecture:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase + GCP AI Services  
**Development Method:** Document-Driven Test-Driven Development (DTDD)

---

## 2. DTDD Development Workflow

### Phase 1: Documentation Foundation ✅
- [x] **PRD (Product Requirements Document)** - `doc/PRD.md`
  - Complete feature specifications
  - User stories and acceptance criteria
  - Technical implementation details
  - Success metrics

- [x] **Sequence Diagrams** - `doc/SequenceDiagram.md`
  - User interaction flows
  - System component interactions
  - API call sequences
  - Data flow patterns

- [x] **Class Diagrams** - `doc/ClassDiagram.md`
  - System architecture
  - Component relationships
  - Data models
  - Service dependencies

### Phase 2: Database Schema & Authentication ✅
- [x] **Database Setup**
  - Transactions table with RLS policies
  - Custom enum types for transaction_type and transaction_frequency
  - User authentication via Supabase Auth

- [x] **Authentication Implementation**
  - Email/password authentication
  - Protected routes
  - Session management

### Phase 3: Feature Development (Current Phase)

#### 3.1 MVP Core Features

**Feature 1: Expense/Income Tracking (In Progress)**
- [ ] Manual transaction entry form
- [ ] Transaction list with real Supabase data
- [ ] Camera scan functionality (OCR)
- [ ] Photo upload with recognition
- [ ] Future-dated and recurring transactions
- [ ] Unit tests for transaction components

**Feature 2: AI Financial Assistant**
- [ ] Chat interface
- [ ] GCP Gemini API integration
- [ ] Personality-driven responses
- [ ] Transaction data analysis
- [ ] Unit tests for AI chat components

---

## 3. Technical Architecture

### 3.1 Frontend Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AddTransactionSheet.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── pages/
│   ├── Index.tsx        # Dashboard
│   ├── Transactions.tsx # Transaction management
│   ├── Chat.tsx         # AI assistant
│   ├── Auth.tsx         # Authentication
│   └── NotFound.tsx
├── integrations/
│   └── supabase/        # Supabase client & types
├── hooks/               # Custom React hooks
└── lib/                # Utility functions
```

### 3.2 Backend Structure (Supabase)
```
supabase/
├── migrations/          # Database schema changes
└── config.toml         # Project configuration
```

### 3.3 Data Models

**Transactions Table:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `date` (Timestamp)
- `description` (Text)
- `amount` (Numeric)
- `category` (Text)
- `type` (Enum: income/expense)
- `frequency` (Enum: one-time/daily/weekly/bi-weekly/monthly/quarterly/yearly)
- `end_date` (Timestamp, for recurring transactions)

---

## 4. Development Standards

### 4.1 Code Organization
- **Components:** Small, focused components (≤50 lines)
- **Separation of Concerns:** Business logic in custom hooks
- **File Naming:** PascalCase for components, camelCase for utilities
- **Type Safety:** Strict TypeScript, no `any` types

### 4.2 Testing Strategy
Following DTDD principles:
1. **Documentation Review:** Ensure understanding of requirements
2. **Test Writing:** Create tests based on class diagrams and sequence diagrams
3. **Implementation:** Write code to pass tests
4. **Refactoring:** Improve code while maintaining test coverage

### 4.3 Security Requirements
- **RLS Policies:** All user data protected at database level
- **Authentication:** Required for all financial data access
- **Data Validation:** Input sanitization and validation
- **API Security:** Secure handling of GCP API keys

---

## 5. Current Implementation Status

### ✅ Completed
- Database schema with RLS policies
- Authentication system (email/password)
- Basic app structure with protected routes
- Transaction table structure

### 🚧 In Progress
- Transaction CRUD operations
- Real data integration in Transactions page
- AddTransactionSheet component functionality

### 📋 Next Steps
1. **Connect Transactions page to Supabase**
   - Fetch user transactions
   - Display real data instead of sample data
   
2. **Enhance AddTransactionSheet**
   - Form validation
   - Supabase integration
   - Camera access for OCR
   - Photo upload functionality
   
3. **Implement OCR Services**
   - GCP Document AI integration
   - Image processing edge functions
   - Text extraction and parsing

4. **AI Chat Implementation**
   - GCP Gemini API integration
   - Transaction data analysis
   - Personality-driven responses

---

## 6. Feature Implementation Guidelines

### 6.1 Transaction Management
**Reference Documents:**
- PRD.md: Section 5.1 Core Features
- SequenceDiagram.md: Manual & OCR Transaction Entry
- ClassDiagram.md: Transaction Management components

**Implementation Steps:**
1. Create transaction service layer
2. Implement CRUD operations with error handling
3. Add form validation and user feedback
4. Integrate OCR functionality
5. Write comprehensive tests

### 6.2 AI Assistant
**Reference Documents:**
- PRD.md: Section 5.1 AI Financial Assistant
- SequenceDiagram.md: AI Chat Interaction
- ClassDiagram.md: AI Chat components

**Implementation Steps:**
1. Set up GCP Gemini API edge function
2. Create chat interface components
3. Implement personality system via prompts
4. Add transaction data context
5. Write interaction tests

---

## 7. Quality Assurance

### 7.1 Pre-Implementation Checklist
- [ ] Requirements clearly understood from documentation
- [ ] Sequence diagram reviewed for interaction flow
- [ ] Class diagram consulted for component structure
- [ ] Test cases planned based on acceptance criteria

### 7.2 Implementation Checklist
- [ ] Components follow single responsibility principle
- [ ] TypeScript types properly defined
- [ ] Error handling implemented
- [ ] Loading states managed
- [ ] User feedback provided (toasts, etc.)

### 7.3 Post-Implementation Checklist
- [ ] Tests written and passing
- [ ] Documentation updated if needed
- [ ] Security review completed
- [ ] Performance considerations addressed

---

## 8. Collaboration Guidelines

### 8.1 AI-Human Collaboration
- **Clear Requests:** Reference specific documentation sections
- **Incremental Development:** Break large features into small steps
- **Documentation Updates:** Keep docs in sync with implementation
- **Review Process:** Human review of AI-generated code

### 8.2 Communication Standards
- **Feature Requests:** Include PRD reference and acceptance criteria
- **Bug Reports:** Include steps to reproduce and expected behavior
- **Technical Discussions:** Reference relevant diagrams and documentation

---

## 9. Deployment Strategy

### 9.1 Environment Setup
- **Development:** Local with Supabase connection
- **Staging:** Vercel deployment with Supabase staging
- **Production:** Vercel deployment with Supabase production

### 9.2 CI/CD Pipeline
- **Code Quality:** ESLint, TypeScript checks
- **Testing:** Automated test execution
- **Security:** Dependency vulnerability scanning
- **Deployment:** Automated deployment on main branch

---

## 10. Success Metrics & Monitoring

### 10.1 MVP Success Criteria (from PRD)
- Invoice scanning accuracy > 80%
- Manual input completion rate > 90%
- AI response time < 3 seconds
- User satisfaction with AI conversations

### 10.2 Development Metrics
- Test coverage > 80%
- Component reusability
- Code maintainability scores
- Documentation completeness

---

This development guide serves as our north star for building FinWise Buddy following DTDD principles. All team members and AI assistants should reference this document when working on the project to ensure consistency and quality.

Last Updated: 2025-06-17
