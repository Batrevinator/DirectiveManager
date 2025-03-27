DROP TABLE IF EXISTS card CASCADE;
DROP TABLE IF EXISTS directive CASCADE;

CREATE TABLE directive (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'low',
    link VARCHAR(50) DEFAULT 'Please provide a link',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT priorityLoc CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

CREATE TABLE card(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_modified_time BEFORE UPDATE ON card FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_modified_time BEFORE UPDATE ON directive FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
