
-- Create a custom type for transaction types
CREATE TYPE public.transaction_type AS ENUM ('income', 'expense');

-- Create a custom type for transaction frequency
CREATE TYPE public.transaction_frequency AS ENUM ('one-time', 'daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'yearly');

-- Create the transactions table
CREATE TABLE public.transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    date timestamp with time zone NOT NULL,
    description text,
    amount numeric NOT NULL,
    category text,
    type public.transaction_type NOT NULL,
    frequency public.transaction_frequency NOT NULL DEFAULT 'one-time',
    end_date timestamp with time zone
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.transactions IS 'Stores user transaction records, including recurring ones.';
COMMENT ON COLUMN public.transactions.user_id IS 'Links to the authenticated user ID from auth.users.';
COMMENT ON COLUMN public.transactions.date IS 'The date of the transaction, or start date for recurring ones.';
COMMENT ON COLUMN public.transactions.description IS 'A description of the transaction.';
COMMENT ON COLUMN public.transactions.amount IS 'The transaction amount (always positive).';
COMMENT ON COLUMN public.transactions.category IS 'The category of the transaction.';
COMMENT ON COLUMN public.transactions.type IS 'The type of transaction (income or expense).';
COMMENT ON COLUMN public.transactions.frequency IS 'The frequency of the transaction (for recurring entries).';
COMMENT ON COLUMN public.transactions.end_date IS 'The end date for recurring transactions.';

-- Enable Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for users to insert their own transactions
CREATE POLICY "Users can insert their own transactions"
ON public.transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own transactions
CREATE POLICY "Users can update their own transactions"
ON public.transactions FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy for users to delete their own transactions
CREATE POLICY "Users can delete their own transactions"
ON public.transactions FOR DELETE
USING (auth.uid() = user_id);
