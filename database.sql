CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products(name, description, price, category, image_url) VALUES
('Growth Analytics Suite', 'Business intelligence dashboard for revenue and engagement.', 299.00, 'Analytics', 'https://picsum.photos/300/180'),
('Customer Success AI', 'Automated support workflow with sentiment detection.', 199.00, 'Support', 'https://picsum.photos/300/181'),
('Checkout Optimizer', 'A/B testing toolkit to improve conversion funnel.', 149.00, 'E-commerce', 'https://picsum.photos/300/182');
