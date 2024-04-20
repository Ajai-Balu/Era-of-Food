-- CREATE SCHEMA IF NOT EXISTS `eof`;

-- CREATE TABLE eof.RECIPE_CMD (
--     comment_id INT AUTO_INCREMENT PRIMARY KEY,
--     recipe_id INT NOT NULL,
--     user_id INT NOT NULL,
--     comments TEXT,
--     is_delete INT DEFAULT 0,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE eof.RECIPE_MASTER (
--     recipe_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     title VARCHAR(40) NOT NULL,
--     category VARCHAR(10) NOT NULL,
--     dish VARCHAR(20) NOT NULL,
--     cuisine VARCHAR(20) NOT NULL,
--     prepare_time INT NOT NULL,
--     cooking_time INT NOT NULL,
--     total_time INT NOT NULL,
--     yield VARCHAR(30) NOT NULL,
--     about TEXT NOT NULL,
--     ingredients TEXT NOT NULL,
--     instructions TEXT NOT NULL,
--     img TEXT NOT NULL,
--     is_delete INT DEFAULT 0,
--     posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME
-- );

-- CREATE TABLE eof.RECIPE_RATING (
--     rating_id INT AUTO_INCREMENT PRIMARY KEY,
--     recipe_id INT NOT NULL,
--     user_id INT NOT NULL,
--     rating INT NOT NULL DEFAULT 0,
--     is_delete INT DEFAULT 0,
--     submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE eof.USER_DATA (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30) NOT NULL,
--     age INT NOT NULL,
--     email VARCHAR(30) NOT NULL,
--     gender VARCHAR(10) NOT NULL,
--     phone_number VARCHAR(20) NOT NULL,
--     likes VARCHAR(10) NOT NULL,
--     password VARCHAR(30) NOT NULL,
--     role VARCHAR(10) DEFAULT 'user',
--     is_delete INT DEFAULT 0,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME
-- );

-- ALTER TABLE eof.USER_DATA AUTO_INCREMENT = 3000;

-- use eof;
-- show tables;

