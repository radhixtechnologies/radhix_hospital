-- ====================================================================
-- RADHIX CLINIC - RICH SEED DATA
-- 2 Clinics, 5 Doctors, Schedules, Services, 20 Patients, 40 Appointments
-- ====================================================================

-- 1. CLINICS
INSERT INTO clinics (id, name, slug, tagline, brand_color, accent_color, address, city, state, pincode, phone, email, opening_time, closing_time)
VALUES 
('c1111111-1111-1111-1111-111111111111', 'Radhix Super-Speciality Clinic', 'radhix-main', 'Excellence in Healthcare, Always Near You', '#1E40AF', '#14B8A6', '3rd Floor, Vipul plaza, 321, Sector 81', 'Faridabad', 'Haryana', '121002', '+91 70427 93777', 'sales@radhix.com', '09:00:00', '20:00:00'),
('c2222222-2222-2222-2222-222222222222', 'Radhix MediCare Centre', 'radhix-west', 'Advanced Care & Modern Diagnostics', '#0F766E', '#38BDF8', '104, Sunrise Heights, Baner Road', 'Pune', 'Maharashtra', '411045', '+91 98765 88990', 'pune@radhixclinic.com', '09:00:00', '19:00:00')
ON CONFLICT (id) DO NOTHING;

-- 2. DOCTORS
INSERT INTO doctors (id, clinic_id, name, email, phone, specialty, qualification, experience_years, consultation_fee, bio, avatar_url, slot_duration_minutes, rating, review_count, is_active)
VALUES
('d1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Dr. Rajesh Sharma', 'dr.rajesh@radhixclinic.com', '+91 98111 22334', 'Cardiology', 'MBBS, MD (Medicine), DM (Cardiology)', 15, 800.00, 'Senior interventional cardiologist with over 15 years experience treating hypertension, CAD, and rhythm disorders. Trained at AIIMS New Delhi.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80', 30, 4.95, 128, true),
('d2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'Dr. Priya Patel', 'dr.priya@radhixclinic.com', '+91 98222 33445', 'Dermatology & Cosmetology', 'MBBS, MD (Dermatology)', 9, 600.00, 'Expert in clinical dermatology, laser skin rejuvenation, anti-aging therapies, and chronic skin conditions like psoriasis and eczema.', 'https://images.unsplash.com/photo-1594824813589-3221b6d17ef0?w=400&auto=format&fit=crop&q=80', 20, 4.92, 94, true),
('d3333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', 'Dr. Amit Verma', 'dr.amit@radhixclinic.com', '+91 98333 44556', 'Orthopedics & Joint Care', 'MBBS, MS (Orthopedics), MCh Joint Replacement', 12, 750.00, 'Specialist in robotic knee and hip replacements, arthroscopy, sports injuries, and spine management. Former fellow at Royal College of Surgeons, UK.', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80', 30, 4.88, 110, true),
('d4444444-4444-4444-4444-444444444444', 'c1111111-1111-1111-1111-111111111111', 'Dr. Ananya Iyer', 'dr.ananya@radhixclinic.com', '+91 98444 55667', 'Pediatrics & Child Health', 'MBBS, MD (Pediatrics), Fellowship Neonatology', 8, 500.00, 'Compassionate pediatrician focusing on infant growth milestones, childhood immunizations, developmental care, and respiratory allergies.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80', 20, 4.97, 142, true),
('d5555555-5555-5555-5555-555555555555', 'c1111111-1111-1111-1111-111111111111', 'Dr. Vikram Sen', 'dr.vikram@radhixclinic.com', '+91 98555 66778', 'Neurology', 'MBBS, MD (Medicine), DM (Neurology)', 14, 900.00, 'Leading neurologist managing migraine disorders, stroke recovery, epilepsy, neuro-muscular disorders, and memory care.', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80', 30, 4.90, 86, true)
ON CONFLICT (id) DO NOTHING;

-- 3. DOCTOR SCHEDULES (Mon-Sat, 9 AM to 6 PM)
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, is_working)
SELECT d.id, dow, '09:00:00'::TIME, '18:00:00'::TIME, true
FROM doctors d
CROSS JOIN generate_series(1, 6) AS dow
ON CONFLICT (doctor_id, day_of_week) DO NOTHING;

-- 4. SERVICES
INSERT INTO services (id, clinic_id, name, department, description, fee, duration_minutes)
VALUES
('s1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Cardiac Consultation & ECG', 'Cardiology', 'Complete heart evaluation including 12-lead digital ECG, BP profile, and lifestyle counseling.', 800.00, 30),
('s2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'Skin & Hair Clinical Consultation', 'Dermatology', 'In-depth dermoscopic skin check, acne care plan, and hair loss diagnosis.', 600.00, 20),
('s3333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', 'Orthopedic Joint & Bone Assessment', 'Orthopedics', 'X-ray evaluation, joint mobility check, arthritis care, and rehabilitation plan.', 750.00, 30),
('s4444444-4444-4444-4444-444444444444', 'c1111111-1111-1111-1111-111111111111', 'Pediatric Wellness & Vaccination', 'Pediatrics', 'Comprehensive child growth monitoring, vaccination chart review, and nutritional advice.', 500.00, 20),
('s5555555-5555-5555-5555-555555555555', 'c1111111-1111-1111-1111-111111111111', 'Neurological Evaluation & Headache Clinic', 'Neurology', 'Detailed nerve and cranial reflex testing, migraine mapping, and neurological review.', 900.00, 30),
('s6666666-6666-6666-6666-666666666666', 'c1111111-1111-1111-1111-111111111111', 'General Preventive Health Checkup', 'General Medicine', 'Vitals, blood sugar test, BMI evaluation, and general physician consult.', 450.00, 25)
ON CONFLICT (id) DO NOTHING;

-- 5. REVIEWS
INSERT INTO reviews (doctor_id, patient_name, rating, comment)
VALUES
('d1111111-1111-1111-1111-111111111111', 'Arjun Malhotra', 5, 'Dr. Rajesh explained my father ECG results with immense patience. The clinic is high-tech and appointment was exactly on time!'),
('d1111111-1111-1111-1111-111111111111', 'Sneha Kapoor', 5, 'Best cardiologist in Bengaluru. Highly professional clinic staff and seamless online booking.'),
('d2222222-2222-2222-2222-222222222222', 'Ritu Nambiar', 5, 'Dr. Priya solved my chronic acne within 6 weeks. No unnecessary medicines, very honest advice.'),
('d3333333-3333-3333-3333-333333333333', 'Manish Gupta', 5, 'Robotic knee consultation was super clear. Dr. Amit is fantastic.'),
('d4444444-4444-4444-4444-444444444444', 'Divya Nair', 5, 'My 3-year-old was totally comfortable with Dr. Ananya. Very gentle and caring pediatrician.');
