-- Delete existing admin user if exists
DELETE FROM admin_users WHERE email = 'admin@calculatorhub.com';

-- Insert admin user with a simple hash for testing
-- This hash is for password 'admin123'
INSERT INTO admin_users (email, password_hash, name, avatar_url) 
VALUES (
  'admin@calculatorhub.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Admin User',
  '/placeholder.svg?height=40&width=40'
);
