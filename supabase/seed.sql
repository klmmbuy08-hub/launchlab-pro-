-- ============================================
-- SEED DATA FOR DEVELOPMENT/TESTING
-- ============================================

-- Note: Replace with your actual user UUID from Supabase Auth
-- Get it from: Dashboard > Authentication > Users

-- Example user UUID (replace with yours)
DO $$
DECLARE
  test_user_id UUID := 'YOUR_USER_UUID_HERE';
  test_account_id UUID;
BEGIN

  -- Insert test business profile
  INSERT INTO public.business_profiles (user_id, business_type, niche, product_name, product_price, monthly_revenue_goal, monthly_leads_goal)
  VALUES (test_user_id, 'fitness_coach', 'Weight Loss', 'Transformation Program', 497.00, 15000, 400)
  ON CONFLICT (user_id) DO NOTHING;

  -- Insert test Instagram account
  INSERT INTO public.accounts (user_id, platform, platform_user_id, username, access_token, profile_data)
  VALUES (
    test_user_id, 
    'instagram', 
    'test123', 
    'fitness_coach_demo',
    'test_token',
    '{"followers": 12458, "following": 890, "posts": 342}'::jsonb
  )
  ON CONFLICT (user_id, platform) DO NOTHING
  RETURNING id INTO test_account_id;

  -- Insert sample content
  INSERT INTO public.content_analysis (user_id, account_id, platform_content_id, content_type, caption, likes, comments, shares, saves, engagement_rate, revenue_attributed, leads_generated)
  VALUES
    (test_user_id, test_account_id, 'post_1', 'reel', 'How I got my first 10 clients in 30 days', 1240, 89, 34, 156, 12.4, 240, 5),
    (test_user_id, test_account_id, 'post_2', 'carousel', '5 mistakes fitness coaches make', 980, 67, 28, 124, 9.7, 180, 3),
    (test_user_id, test_account_id, 'post_3', 'post', 'Client transformation story', 756, 45, 12, 89, 8.3, 120, 2);

  -- Insert sample business metrics
  INSERT INTO public.business_metrics (user_id, metric_date, revenue, leads, conversions, revenue_organic, revenue_paid_ads)
  VALUES
    (test_user_id, CURRENT_DATE, 427, 12, 2, 300, 127),
    (test_user_id, CURRENT_DATE - 1, 380, 15, 1, 280, 100),
    (test_user_id, CURRENT_DATE - 2, 520, 18, 3, 400, 120);

END $$;
