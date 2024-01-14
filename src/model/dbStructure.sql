CREATE TABLE vendors (
    vendor_id INT PRIMARY KEY,
    vendor_name VARCHAR(255) NOT NULL,
    contact_no: INT,
    email: VARCHAR,
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()

CREATE TABLE apparel (
    apparel_id INT PRIMARY KEY,
    apparel_code VARCHAR(20) UNIQUE NOT NULL, 
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE sizes (
    size_id INT PRIMARY KEY,
    size_name VARCHAR(10) NOT NULL
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE stock (
    stock_id INT PRIMARY KEY,
    vendor_id INT,
    apparel_id INT,
    size_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
    FOREIGN KEY (apparel_id) REFERENCES apparel(apparel_id),
    FOREIGN KEY (size_id) REFERENCES sizes(size_id)
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_details: jsonb[] --[{ apparel_id INT, apparel_code VARCHAR,size_id INT, size_name VARCHAR, quantity INT,}]
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    contact_no: INT,
    email: VARCHAR,
    is_active Boolean DEFAULT TRUE,
	created_at  TIMESTAMPTZ DEFAULT Now(),
	updated_at  TIMESTAMPTZ DEFAULT Now()
);
