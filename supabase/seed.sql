-- ============================================================
-- LEKHA JOKHA - Seed Data
-- Koshi Province, Morang District, Area 4
-- Election Year: 2082 BS
-- ============================================================

-- 1. Constituency
INSERT INTO constituencies (id, name, name_np, province, district, area_number)
VALUES (
  'a1b2c3d4-0001-4000-8000-000000000001',
  'Morang Constituency 4',
  'Morang Nirvachan Kshetra 4',
  'Koshi',
  'Morang',
  4
);

-- 2. Election
INSERT INTO elections (id, election_year, election_type, constituency_id, election_date)
VALUES (
  'a1b2c3d4-0002-4000-8000-000000000001',
  '2082',
  'federal',
  'a1b2c3d4-0001-4000-8000-000000000001',
  '2082-01-15'
);

-- 3. Candidate (winner)
INSERT INTO candidates (id, full_name, full_name_np, party_name, party_name_np)
VALUES (
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Sample Candidate',
  'Sample Candidate',
  'Sample Party',
  'Sample Party'
);

-- 4. Election Result
INSERT INTO election_results (id, election_id, candidate_id, constituency_id, is_winner, votes_received)
VALUES (
  'a1b2c3d4-0004-4000-8000-000000000001',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'a1b2c3d4-0001-4000-8000-000000000001',
  TRUE,
  45000
);

-- 5. Promises (8 sample promises across categories)

-- Promise 1: Infrastructure - Road Construction (In Progress)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, source_type, source_label, evidence_url, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000001',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Construct 50km district road network',
  'Jilla sadak network 50km nirman',
  'Build and upgrade 50 kilometers of district-level road connecting rural areas to the district headquarters.',
  'Grameen kshetralaai jilla sadar mukaam sanga jodne 50 kilometer jilla stariya sadak nirman ra star uddhar.',
  'infrastructure',
  'official_document',
  'Election Manifesto 2082',
  'https://example.com/manifesto-2082',
  1
);

-- Promise 2: Education - School Upgrades (Completed)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, source_type, source_label, evidence_url, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000002',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Upgrade 10 community schools to secondary level',
  '10 wota samudayik vidhyalaya madhyamik star ma star uddhar',
  'Upgrade infrastructure and staffing of 10 community schools so they can offer classes up to grade 12.',
  '10 wota samudayik vidhyalayako purvaadhar ra karmachari star uddhar gari kaksha 12 samma padhaune banaaune.',
  'education',
  'press_release',
  'Party Press Release',
  'https://example.com/education-press',
  2
);

-- Promise 3: Health - Health Post Construction (Not Started)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000003',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Establish 5 new health posts in rural wards',
  'Grameen ward ma 5 wota naya swasthya chowki sthapana',
  'Construct and staff 5 new health posts in underserved rural wards to improve healthcare access.',
  'Swasthya sewa napugeko grameen ward ma 5 wota naya swasthya chowki nirman ra karmachari byabastha garnu.',
  'health',
  3
);

-- Promise 4: Agriculture - Irrigation (Stalled)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, is_stalled, stalled_reason, stalled_reason_np, source_type, source_label, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000004',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Build irrigation canal for 2000 hectares',
  '2000 hectare ko lagi sinchai nahar nirman',
  'Construct a new irrigation canal system to provide year-round water supply for 2000 hectares of farmland.',
  'Barsha bhari paani aaapurti ko lagi 2000 hectare krishi bhumi ma naya sinchai nahar pranali nirman garnu.',
  'agriculture',
  TRUE,
  'Land acquisition disputes pending resolution with local authorities. Environmental assessment required.',
  'Sthaniya nikaay sanga bhu-adhigrahan bibaad samadhan bachaaki. Watawaraniya mulyankan aawashyak.',
  'news_article',
  'District Report Q3',
  4
);

-- Promise 5: Employment - Skill Training (In Progress)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, source_type, source_label, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000005',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Launch vocational training for 500 youth annually',
  'Barshik 500 yuva ko lagi byabasayik talim suru',
  'Establish vocational skill training centers offering technical courses for at least 500 youth per year.',
  'Prati barsha kamtima 500 yuva ko lagi prabidhik pathyakram pradaan garne byabasayik sip talim kendra sthapana garnu.',
  'employment',
  'official_document',
  'Budget Speech 2082',
  5
);

-- Promise 6: Governance - Digital Services (In Progress)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000006',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Digitize ward-level citizen services',
  'Ward stariya nagarik sewa digital banaaune',
  'Implement digital service delivery platforms at all ward offices for birth registration, recommendations, and other citizen services.',
  'Janma darta, sifarish ra anya nagarik sewa ko lagi sabai ward karyaalaya ma digital sewa pradaan manch karyanwayan garnu.',
  'governance',
  6
);

-- Promise 7: Environment - Waste Management (Not Started)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000007',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Establish solid waste management system',
  'Thos fohor byabasthapan pranali sthapana',
  'Set up a systematic solid waste collection and processing system covering all municipal wards.',
  'Sabai nagarpalika ward samatne byawasthit thos fohor sankalan ra prasodhak pranali sthapana garnu.',
  'environment',
  7
);

-- Promise 8: Social Welfare - Elderly Support (Completed)
INSERT INTO promises (id, election_id, candidate_id, title, title_np, description, description_np, category, source_type, source_label, evidence_url, display_order)
VALUES (
  'a1b2c3d4-0005-4000-8000-000000000008',
  'a1b2c3d4-0002-4000-8000-000000000001',
  'a1b2c3d4-0003-4000-8000-000000000001',
  'Expand elderly care allowance program',
  'Jyeshtha nagarik heryaachar bhatta karyakram bistaar',
  'Increase the monthly elderly care allowance and expand eligibility to cover all citizens above 65.',
  '65 barsha maathi ka sabai nagarik laai masik jyeshtha nagarik heryaachar bhatta badhaaune ra yogyataa bistaar garnu.',
  'social_welfare',
  'government_gazette',
  'Gazette Notice 2082/04',
  'https://example.com/gazette-elderly',
  8
);

-- 6. Milestones

-- Promise 1 Milestones (Road - In Progress: 2/4 completed)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000001', 'Survey and feasibility study completed', 'Sarvekshan ra sambhawyata adhyayan sampanna', TRUE, TRUE, '2082-04-15', 1),
('a1b2c3d4-0005-4000-8000-000000000001', 'Budget allocation approved', 'Bajet bikajan swiikrit', TRUE, TRUE, '2082-06-01', 2),
('a1b2c3d4-0005-4000-8000-000000000001', 'Construction contract awarded', 'Nirman thakedaar chuniaeko', TRUE, FALSE, NULL, 3),
('a1b2c3d4-0005-4000-8000-000000000001', '50km road construction completed', '50km sadak nirman sampurna', TRUE, FALSE, NULL, 4);

-- Promise 2 Milestones (Education - All completed)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000002', 'Schools identified for upgrade', 'Star uddhar ko lagi vidhyalaya pahichaan gariyeko', TRUE, TRUE, '2082-03-10', 1),
('a1b2c3d4-0005-4000-8000-000000000002', 'Infrastructure upgrades completed', 'Purvaadhar star uddhar sampanna', TRUE, TRUE, '2082-08-20', 2),
('a1b2c3d4-0005-4000-8000-000000000002', 'Teachers recruited and deployed', 'Shikshaak bharti ra tanaat gariyeko', TRUE, TRUE, '2082-09-15', 3);

-- Promise 3 Milestones (Health - None completed)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000003', 'Site selection for health posts', 'Swasthya chowki ko lagi sthal chayan', TRUE, FALSE, 1),
('a1b2c3d4-0005-4000-8000-000000000003', 'Construction funding secured', 'Nirman kosh surakshit gariyeko', TRUE, FALSE, 2),
('a1b2c3d4-0005-4000-8000-000000000003', 'Buildings constructed', 'Bhawan nirman sampanna', TRUE, FALSE, 3),
('a1b2c3d4-0005-4000-8000-000000000003', 'Staff hired and services operational', 'Karamchaari bharti ra sewa sanchalan', TRUE, FALSE, 4);

-- Promise 4 Milestones (Irrigation - Stalled, 1/3 done)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000004', 'Feasibility and environmental study', 'Sambhawyata ra watawaraniya adhyayan', TRUE, TRUE, '2082-05-01', 1),
('a1b2c3d4-0005-4000-8000-000000000004', 'Land acquisition completed', 'Bhu adhigrahan sampanna', TRUE, FALSE, NULL, 2),
('a1b2c3d4-0005-4000-8000-000000000004', 'Canal construction completed', 'Nahar nirman sampanna', TRUE, FALSE, NULL, 3);

-- Promise 5 Milestones (Skills - 2/3 done)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000005', 'Training centers established', 'Talim kendra sthapana gariyeko', TRUE, TRUE, '2082-07-01', 1),
('a1b2c3d4-0005-4000-8000-000000000005', 'First batch of 500 trainees enrolled', 'Pahilo batch 500 talimarthi bharti', TRUE, TRUE, '2082-09-01', 2),
('a1b2c3d4-0005-4000-8000-000000000005', 'Job placement rate above 60%', 'Rojgaar star 60% maathi', TRUE, FALSE, NULL, 3);

-- Promise 6 Milestones (Digital - 1/3 done)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000006', 'Digital platform developed', 'Digital manch bikasit', TRUE, TRUE, '2082-08-15', 1),
('a1b2c3d4-0005-4000-8000-000000000006', 'Pilot in 3 ward offices', '3 wota ward karyaalaya ma pilot', TRUE, FALSE, NULL, 2),
('a1b2c3d4-0005-4000-8000-000000000006', 'Rolled out to all wards', 'Sabai ward ma bistaar', TRUE, FALSE, NULL, 3);

-- Promise 7 has no milestones yet (Not Started)

-- Promise 8 Milestones (Elderly - All completed)
INSERT INTO milestones (promise_id, title, title_np, is_required, is_completed, completed_date, display_order) VALUES
('a1b2c3d4-0005-4000-8000-000000000008', 'Policy amendment drafted', 'Niti sanshodhan masyaudaa tayaar', TRUE, TRUE, '2082-02-15', 1),
('a1b2c3d4-0005-4000-8000-000000000008', 'Budget approved for expanded program', 'Bistarit karyakram ko lagi bajet swiikrit', TRUE, TRUE, '2082-04-01', 2),
('a1b2c3d4-0005-4000-8000-000000000008', 'Allowances distributed to all eligible', 'Sabai yogya laai bhatta bitaran', TRUE, TRUE, '2082-06-15', 3);

-- 7. Feedback Types
INSERT INTO feedback_types (id, label, label_np, description, description_np, is_active) VALUES
('a1b2c3d4-0006-4000-8000-000000000001', 'Work not visible on ground', 'Kaam jamiin ma dekhindaina', 'Report that promised work is not visible or verifiable at the stated location.', 'Kaam bataiyeko sthan ma dekhindaina wa pramaanik chaina.', TRUE),
('a1b2c3d4-0006-4000-8000-000000000002', 'Progress seems accurate', 'Pragati sahi dekhinchha', 'Confirm that the reported progress matches what you observe.', 'Pratibedit pragati tapaaile dekhnu bhayeko sanga milchha.', TRUE),
('a1b2c3d4-0006-4000-8000-000000000003', 'Quality concerns', 'Gunasthhar ko chinta', 'Report concerns about the quality of completed work.', 'Sampanna kaam ko gunasthhar baare chinta report garnu.', TRUE),
('a1b2c3d4-0006-4000-8000-000000000004', 'Beneficiaries not reached', 'Labhgrahee pugeko chhaina', 'Report that intended beneficiaries have not received benefits.', 'Lakshit labhgrahee le labha paaeko chhaina.', TRUE),
('a1b2c3d4-0006-4000-8000-000000000005', 'Delay beyond timeline', 'Samaya sima bhanda dhilo', 'Report that work is significantly delayed beyond stated timelines.', 'Kaam bataiyeko samaya sima bhanda dherai dhilo bhayeko.', TRUE);
