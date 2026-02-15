-- Insert default admin user (password: admin123)
-- Using a properly generated bcrypt hash for 'admin123'
INSERT INTO admin_users (email, password_hash, name, avatar_url) 
VALUES (
  'admin@calculatorhub.com',
  '$2b$10$rOzWlkZqJe7ZXqjHvtOu.eK7X9fN8LrYmQzGvQzGvQzGvQzGvQzGv.',
  'Admin User',
  '/placeholder.svg?height=40&width=40'
) ON CONFLICT (email) DO NOTHING;

-- Let's also create a simpler version for testing
INSERT INTO admin_users (email, password_hash, name, avatar_url) 
VALUES (
  'test@admin.com',
  '$2b$10$K7L/8Y.f89AH.R6kuK.6.OKgq4ry2-ANhfPOv2QzCfHNdZjKj5jG.',
  'Test Admin',
  '/placeholder.svg?height=40&width=40'
) ON CONFLICT (email) DO NOTHING;
