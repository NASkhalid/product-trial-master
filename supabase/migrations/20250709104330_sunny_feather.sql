-- Insert sample products
INSERT INTO products (code, name, description, image, category, price, quantity, internal_reference, shell_id, inventory_status, rating, created_at, updated_at) VALUES
('f230fh0g3', 'Bamboo Watch', 'Product Description', 'bamboo-watch.jpg', 'Accessories', 65.0, 24, 'REF-123-456', 15, 'INSTOCK', 5, 1718114215761, 1718114215761),
('nvklal433', 'Black Watch', 'Product Description', 'black-watch.jpg', 'Accessories', 72.0, 61, 'REF-123-456', 15, 'INSTOCK', 4, 1718114215761, 1718114215761),
('zz21cz3c1', 'Blue Band', 'Product Description', 'blue-band.jpg', 'Fitness', 79.0, 2, 'REF-123-456', 15, 'LOWSTOCK', 3, 1718114215761, 1718114215761),
('244wgerg2', 'Blue T-Shirt', 'Product Description', 'blue-t-shirt.jpg', 'Clothing', 29.0, 25, 'REF-123-456', 15, 'INSTOCK', 5, 1718114215761, 1718114215761),
('h456wer53', 'Bracelet', 'Product Description', 'bracelet.jpg', 'Accessories', 15.0, 73, 'REF-123-456', 15, 'INSTOCK', 4, 1718114215761, 1718114215761),
('av2231fwg', 'Brown Purse', 'Product Description', 'brown-purse.jpg', 'Accessories', 120.0, 0, 'REF-123-456', 15, 'OUTOFSTOCK', 4, 1718114215761, 1718114215761),
('bib36pfvm', 'Chakra Bracelet', 'Product Description', 'chakra-bracelet.jpg', 'Accessories', 32.0, 5, 'REF-123-456', 15, 'LOWSTOCK', 3, 1718114215761, 1718114215761),
('mbvjkgip5', 'Galaxy Earrings', 'Product Description', 'galaxy-earrings.jpg', 'Accessories', 34.0, 23, 'REF-123-456', 15, 'INSTOCK', 5, 1718114215761, 1718114215761),
('vbb124btr', 'Game Controller', 'Product Description', 'game-controller.jpg', 'Electronics', 99.0, 2, 'REF-123-456', 15, 'LOWSTOCK', 4, 1718114215761, 1718114215761),
('cm230f032', 'Gaming Set', 'Product Description', 'gaming-set.jpg', 'Electronics', 299.0, 63, 'REF-123-456', 15, 'INSTOCK', 3, 1718114215761, 1718114215761);

-- Insert admin user (password: admin123)
INSERT INTO users (username, firstname, email, password, created_at) VALUES
('admin', 'Admin', 'admin@admin.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 1718114215761);

-- Insert regular user (password: user123)  
INSERT INTO users (username, firstname, email, password, created_at) VALUES
('user', 'John', 'user@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 1718114215761);