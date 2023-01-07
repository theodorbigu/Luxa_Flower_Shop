CREATE TYPE roluri AS ENUM('admin', 'moderator', 'comun');

DROP TABLE IF EXISTS utilizatori cascade;

CREATE TABLE IF NOT EXISTS utilizatori (
   id serial PRIMARY KEY,
   username VARCHAR(50) UNIQUE NOT NULL,
   nume VARCHAR(100) NOT NULL,
   prenume VARCHAR(100) NOT NULL,
   parola VARCHAR(100) NOT NULL,
   rol roluri NOT NULL DEFAULT 'comun',
   email VARCHAR(100) NOT NULL,
   culoare_chat VARCHAR(50),
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   problema_vedere BOOLEAN,
   fotografie VARCHAR(300),
   cod VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS accesari (
   id serial PRIMARY KEY,
   ip VARCHAR(100) NOT NULL,
   user_id INT NULL REFERENCES utilizatori(id),
   pagina VARCHAR(100) NOT NULL,
   data_accesare TIMESTAMP DEFAULT current_timestamp
);