-- ============================================================
-- LEKHA JOKHA - Database Schema
-- Constituency-level manifesto promise tracker
-- Koshi Province, Morang District, Area 4
-- ============================================================

-- ============================================================
-- 1. ENUMS
-- ============================================================

CREATE TYPE election_type_enum AS ENUM (
  'federal',
  'provincial',
  'local'
);

CREATE TYPE promise_category AS ENUM (
  'infrastructure',
  'education',
  'health',
  'agriculture',
  'employment',
  'governance',
  'environment',
  'social_welfare',
  'economy',
  'other'
);

CREATE TYPE source_type AS ENUM (
  'official_document',
  'news_article',
  'government_gazette',
  'press_release',
  'social_media',
  'other'
);

CREATE TYPE verification_status AS ENUM (
  'unverified',
  'multiple_reports'
);

-- ============================================================
-- 2. TABLES
-- ============================================================

-- Constituencies
CREATE TABLE constituencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_np TEXT,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  area_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Elections
CREATE TABLE elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_year TEXT NOT NULL,
  election_type election_type_enum NOT NULL,
  constituency_id UUID NOT NULL REFERENCES constituencies(id),
  election_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Candidates
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  full_name_np TEXT,
  party_name TEXT,
  party_name_np TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Election Results
CREATE TABLE election_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES elections(id),
  candidate_id UUID NOT NULL REFERENCES candidates(id),
  constituency_id UUID NOT NULL REFERENCES constituencies(id),
  is_winner BOOLEAN DEFAULT FALSE,
  votes_received INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Promises (NO progress or completion columns)
CREATE TABLE promises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES elections(id),
  candidate_id UUID NOT NULL REFERENCES candidates(id),
  title TEXT NOT NULL,
  title_np TEXT,
  description TEXT,
  description_np TEXT,
  category promise_category NOT NULL DEFAULT 'other',
  source_type source_type,
  source_label TEXT,
  evidence_url TEXT,
  is_stalled BOOLEAN DEFAULT FALSE,
  stalled_reason TEXT,
  stalled_reason_np TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Milestones
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promise_id UUID NOT NULL REFERENCES promises(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_np TEXT,
  description TEXT,
  description_np TEXT,
  is_required BOOLEAN DEFAULT TRUE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_date DATE,
  deadline DATE,
  source_type source_type,
  source_label TEXT,
  evidence_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback Types
CREATE TABLE feedback_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  label_np TEXT,
  description TEXT,
  description_np TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback Cards (anonymous citizen feedback)
CREATE TABLE feedback_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promise_id UUID NOT NULL REFERENCES promises(id),
  feedback_type_id UUID NOT NULL REFERENCES feedback_types(id),
  verification_status verification_status DEFAULT 'unverified',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. INDEXES
-- ============================================================

CREATE INDEX idx_promises_election ON promises(election_id);
CREATE INDEX idx_promises_candidate ON promises(candidate_id);
CREATE INDEX idx_promises_category ON promises(category);
CREATE INDEX idx_milestones_promise ON milestones(promise_id);
CREATE INDEX idx_feedback_cards_promise ON feedback_cards(promise_id);
CREATE INDEX idx_feedback_cards_type ON feedback_cards(feedback_type_id);
CREATE INDEX idx_election_results_election ON election_results(election_id);

-- ============================================================
-- 4. DERIVED VIEW - promise_status
-- This is the ONLY source for progress, status, and checkbox state
-- ============================================================

CREATE OR REPLACE VIEW promise_status AS
SELECT
  p.id,
  p.title,
  p.title_np,
  p.description,
  p.description_np,
  p.category,
  p.election_id,
  p.candidate_id,
  p.is_stalled,
  p.stalled_reason,
  p.stalled_reason_np,
  p.source_type AS promise_source_type,
  p.source_label AS promise_source_label,
  p.evidence_url AS promise_evidence_url,
  p.display_order,
  p.created_at,
  p.updated_at,
  -- Milestone counts
  COUNT(m.id) FILTER (WHERE m.is_required) AS required_count,
  COUNT(m.id) FILTER (WHERE m.is_required AND m.is_completed) AS completed_count,
  COUNT(m.id) AS total_milestones,
  -- Derived progress percentage (0-100)
  CASE
    WHEN COUNT(m.id) FILTER (WHERE m.is_required) = 0 THEN 0
    ELSE ROUND(
      (COUNT(m.id) FILTER (WHERE m.is_required AND m.is_completed)::NUMERIC
       / NULLIF(COUNT(m.id) FILTER (WHERE m.is_required), 0)::NUMERIC) * 100
    )::INTEGER
  END AS progress_pct,
  -- Derived status label
  CASE
    WHEN p.is_stalled THEN 'Stalled'
    WHEN COUNT(m.id) FILTER (WHERE m.is_required) = 0 THEN 'Not Started'
    WHEN COUNT(m.id) FILTER (WHERE m.is_required AND m.is_completed)
         = COUNT(m.id) FILTER (WHERE m.is_required)
         AND COUNT(m.id) FILTER (WHERE m.is_required) > 0 THEN 'Completed'
    WHEN COUNT(m.id) FILTER (WHERE m.is_required AND m.is_completed) > 0 THEN 'In Progress'
    ELSE 'Not Started'
  END AS status_label,
  -- Checkbox ticked: true ONLY if at least one required milestone AND all required completed
  CASE
    WHEN COUNT(m.id) FILTER (WHERE m.is_required) > 0
         AND COUNT(m.id) FILTER (WHERE m.is_required AND m.is_completed)
             = COUNT(m.id) FILTER (WHERE m.is_required)
    THEN TRUE
    ELSE FALSE
  END AS is_checkbox_ticked
FROM promises p
LEFT JOIN milestones m ON m.promise_id = p.id
GROUP BY p.id, p.title, p.title_np, p.description, p.description_np,
         p.category, p.election_id, p.candidate_id,
         p.is_stalled, p.stalled_reason, p.stalled_reason_np,
         p.source_type, p.source_label, p.evidence_url,
         p.display_order, p.created_at, p.updated_at;

-- ============================================================
-- 5. FUNCTION & TRIGGER - Auto-elevate feedback verification
-- ============================================================

CREATE OR REPLACE FUNCTION refresh_feedback_verification()
RETURNS TRIGGER AS $$
DECLARE
  report_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO report_count
  FROM feedback_cards
  WHERE promise_id = NEW.promise_id
    AND feedback_type_id = NEW.feedback_type_id;

  IF report_count >= 3 THEN
    UPDATE feedback_cards
    SET verification_status = 'multiple_reports'
    WHERE promise_id = NEW.promise_id
      AND feedback_type_id = NEW.feedback_type_id
      AND verification_status = 'unverified';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_feedback_verification
AFTER INSERT ON feedback_cards
FOR EACH ROW
EXECUTE FUNCTION refresh_feedback_verification();

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE constituencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE election_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_cards ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (anon role)
CREATE POLICY "Public read constituencies" ON constituencies FOR SELECT TO anon USING (true);
CREATE POLICY "Public read elections" ON elections FOR SELECT TO anon USING (true);
CREATE POLICY "Public read candidates" ON candidates FOR SELECT TO anon USING (true);
CREATE POLICY "Public read election_results" ON election_results FOR SELECT TO anon USING (true);
CREATE POLICY "Public read promises" ON promises FOR SELECT TO anon USING (true);
CREATE POLICY "Public read milestones" ON milestones FOR SELECT TO anon USING (true);
CREATE POLICY "Public read feedback_types" ON feedback_types FOR SELECT TO anon USING (true);
CREATE POLICY "Public read feedback_cards" ON feedback_cards FOR SELECT TO anon USING (true);

-- Public insert for feedback_cards only (anonymous feedback)
CREATE POLICY "Public insert feedback" ON feedback_cards FOR INSERT TO anon
WITH CHECK (true);
