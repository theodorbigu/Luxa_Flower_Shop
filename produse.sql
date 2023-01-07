--GRANT ALL PRIVILEGES ON DATABASE Luxa_Flower_Shop TO theodorbigu ;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO theodorbigu;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO theodorbigu;

DROP TYPE IF EXISTS culoare CASCADE;
DROP TYPE IF EXISTS tipuri_produse CASCADE;
DROP TYPE IF EXISTS tip_flori CASCADE;

CREATE TYPE culoare AS ENUM('alb', 'portocaliu', 'roz', 'verde', 'rosu','mov','galben');
CREATE TYPE tip_flori AS ENUM('mixt', 'trandafiri', 'garoafe', 'lalele', 'orhidee','matthiola' ,'planta');
CREATE TYPE tipuri_produse AS ENUM('buchet', 'aranjament', 'planta');

DROP TABLE IF EXISTS produse CASCADE;

CREATE TABLE IF NOT EXISTS public.produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   imagine VARCHAR(300),
   tip_produs tipuri_produse DEFAULT 'buchet',
   tip_flori tip_flori DEFAULT 'mixt',
   pret NUMERIC(8,2) NOT NULL,
   nr_fire INT CHECK (nr_fire>0), 
   culoare culoare DEFAULT 'alb',
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   livrare BOOLEAN NOT NULL DEFAULT TRUE
);


INSERT INTO public.produse(
	id, nume, descriere, imagine, tip_produs, tip_flori, pret, nr_fire, culoare, livrare)
	VALUES 
	(1, 'Cutie 9 trandafiri albi', 'etc', 'aranjament-trandafiri-albi-9-cutie.jpg', 'aranjament', 'trandafiri', 70, 9, 'alb', True),
	(2, 'Cutie 15 trandafiri albi', 'etc', 'aranjament-trandafiri-albi-15-cutie.jpg', 'aranjament', 'trandafiri', 120, 15, 'alb', True),
	(3, 'Cutie 9 trandafiri galbeni', 'etc', 'aranjament-trandafiri-galbeni-9-cutie.jpg', 'aranjament', 'trandafiri', 70, 9, 'galben', True),
	(4, 'Cutie 15 trandafiri galbeni', 'etc', 'aranjament-trandafiri-galbeni-15-cutie.jpg', 'aranjament', 'trandafiri', 120, 15, 'galben', True),
	(5, 'Cutie 15 trandafiri rosii', 'etc', 'aranjament-trandafiri-rosii-15-cutie.jpg', 'aranjament', 'trandafiri', 120, 15, 'rosu', True),
	(6, 'Buchet 19 trandafiri rosii', 'etc', 'buchet-trandafiri-rosii-19.jpg', 'buchet', 'trandafiri', 100, 19, 'rosu', True),
	(7, 'Buchet 19 trandafiri portocalii', 'etc', 'buchet-trandafiri-portocalii-19.jpg', 'buchet', 'trandafiri', 100, 19, 'portocaliu', True),
	(8, 'Buchet 19 trandafiri albi', 'etc', 'buchet-trandafiri-albi-19.jpg', 'buchet', 'trandafiri', 100, 19, 'alb', True),
	(9, 'Lamai 80 cm', 'etc', 'planta-lamai.jpg', 'planta', 'planta', 140, 1, 'galben', True),
	(10, 'Maslin 100 cm', 'etc', 'planta-maslin.jpg', 'planta', 'planta', 170, 1, 'verde', True);