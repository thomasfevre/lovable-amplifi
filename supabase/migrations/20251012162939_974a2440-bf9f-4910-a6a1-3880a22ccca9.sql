-- Drop the foreign key constraint temporarily to insert sample data
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Insert sample profiles
INSERT INTO public.profiles (id, wallet_address, username, display_name, bio, avatar_url, is_creator)
VALUES 
  ('11111111-1111-1111-1111-111111111111'::uuid, '0x1234567890abcdef1234567890abcdef12345678', 'alexandra', 'Alexandra Rivers', 'Digital artist & content creator passionate about blockchain technology', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra', true),
  ('22222222-2222-2222-2222-222222222222'::uuid, '0xabcdef1234567890abcdef1234567890abcdef12', 'michael_tech', 'Michael Chen', 'Tech entrepreneur building the future of creator economy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', true),
  ('33333333-3333-3333-3333-333333333333'::uuid, '0x7890abcdef1234567890abcdef1234567890abcd', 'sarah_creates', 'Sarah Martinez', 'Music producer & NFT enthusiast. Creating exclusive content for token holders', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', true)
ON CONFLICT (id) DO NOTHING;

-- Re-add foreign key constraint but make it not enforce for existing rows
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) 
ON DELETE CASCADE 
NOT VALID;

-- Insert sample creators
INSERT INTO public.creators (profile_id, token_name, token_symbol, banner_url, current_price, market_cap, holder_count, total_supply)
VALUES
  ('11111111-1111-1111-1111-111111111111'::uuid, 'Alexandra Coin', 'ALEX', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', 15.50, 1550000, 1250, 1000000),
  ('22222222-2222-2222-2222-222222222222'::uuid, 'Michael Token', 'MIKE', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop', 8.75, 875000, 890, 1000000),
  ('33333333-3333-3333-3333-333333333333'::uuid, 'Sarah Coin', 'SARAH', 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&auto=format&fit=crop', 22.30, 2230000, 1680, 1000000)
ON CONFLICT DO NOTHING;

-- Insert sample posts
INSERT INTO public.posts (creator_id, content, is_locked, unlock_token_amount, likes_count, comments_count, image_url)
SELECT 
  c.id,
  'Welcome to my creator page! Excited to share exclusive content with my token holders 🚀',
  false,
  0,
  45,
  12,
  NULL
FROM public.creators c
WHERE c.token_symbol = 'ALEX'
ON CONFLICT DO NOTHING;

INSERT INTO public.posts (creator_id, content, is_locked, unlock_token_amount, likes_count, comments_count)
SELECT 
  c.id,
  '🔒 Exclusive alpha for holders: New partnership announcement coming next week!',
  true,
  100,
  23,
  8
FROM public.creators c
WHERE c.token_symbol = 'ALEX'
ON CONFLICT DO NOTHING;

INSERT INTO public.posts (creator_id, content, is_locked, unlock_token_amount, likes_count, comments_count)
SELECT 
  c.id,
  'Just launched my new project! Check it out and let me know what you think 💭',
  false,
  0,
  67,
  19
FROM public.creators c
WHERE c.token_symbol = 'MIKE'
ON CONFLICT DO NOTHING;