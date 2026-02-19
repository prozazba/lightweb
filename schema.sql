-- LIGHTWEB FINANCE SYSTEM DATABASE SCHEMA (Neon/PostgreSQL)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'member');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'member' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: members
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    monthly_fee DECIMAL(15,2) DEFAULT 0 NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL, -- Format: LIGHTWEB-YYYYMM-XXXX
    member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    period_year INTEGER NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    method TEXT NOT NULL,
    proof_url TEXT,
    receipt_pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_payment_period UNIQUE (member_id, period_month, period_year)
);

-- Table: expenses
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_date DATE DEFAULT CURRENT_DATE NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(15,2) NOT NULL,
    proof_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: monthly_reports
CREATE TABLE IF NOT EXISTS monthly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL,
    total_income DECIMAL(15,2) DEFAULT 0 NOT NULL,
    total_expense DECIMAL(15,2) DEFAULT 0 NOT NULL,
    opening_balance DECIMAL(15,2) DEFAULT 0 NOT NULL,
    closing_balance DECIMAL(15,2) DEFAULT 0 NOT NULL,
    report_url TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(month, year)
);

-- 4. FUNCTIONS & TRIGGERS

-- Automatically generate invoice number: LIGHTWEB-YYYYMM-XXXX
CREATE OR REPLACE FUNCTION generate_lightweb_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
    year_month TEXT;
    seq_val TEXT;
    prefix TEXT := 'LIGHTWEB-';
BEGIN
    year_month := TO_CHAR(CURRENT_DATE, 'YYYYMM');
    
    -- Using a count for the sequence part within the month
    SELECT LPAD((COUNT(*) + 1)::TEXT, 4, '0') INTO seq_val 
    FROM payments 
    WHERE TO_CHAR(payment_date, 'YYYYMM') = year_month;
    
    NEW.invoice_number := prefix || year_month || '-' || seq_val;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_invoice
BEFORE INSERT ON payments
FOR EACH ROW
WHEN (NEW.invoice_number IS NULL)
EXECUTE FUNCTION generate_lightweb_invoice_number();

-- 5. VIEWS for Dashboard Calculations

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COALESCE(SUM(amount), 0) FROM payments) - (SELECT COALESCE(SUM(amount), 0) FROM expenses) as current_balance,
    (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)) as income_this_month,
    (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE EXTRACT(MONTH FROM expense_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM expense_date) = EXTRACT(YEAR FROM CURRENT_DATE)) as expense_this_month,
    (SELECT COUNT(*) FROM members WHERE status = 'active') as total_active_members;
