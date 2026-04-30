-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT, -- Nullable for OAuth users
    image TEXT,
    email_verified TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts Table (for OAuth)
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, provider_account_id)
);

-- Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Verification Tokens Table
CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goal_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_value INTEGER, -- Optional: if set, it's a numeric goal; otherwise it's a checkbox
    unit TEXT DEFAULT 'units', -- 'units' or 'minutes'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Daily Logs Table
CREATE TABLE IF NOT EXISTS daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    UNIQUE(user_id, date)
);

-- Action Logs Table
CREATE TABLE IF NOT EXISTS action_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_log_id UUID NOT NULL REFERENCES daily_logs(id) ON DELETE CASCADE,
    action_id UUID NOT NULL REFERENCES goal_actions(id) ON DELETE CASCADE,
    completed_value INTEGER DEFAULT 0,
    UNIQUE(daily_log_id, action_id)
);

-- Journal Entries Table
CREATE TABLE IF NOT EXISTS journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Avoid Items Table
CREATE TABLE IF NOT EXISTS avoid_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Avoid Logs Table
CREATE TABLE IF NOT EXISTS avoid_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    avoid_item_id UUID NOT NULL REFERENCES avoid_items(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    avoided BOOLEAN DEFAULT TRUE,
    UNIQUE(user_id, avoid_item_id, date)
);
