--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2021-11-22 15:09:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3321 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16394)
-- Name: Luxa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Luxa" (
    id integer NOT NULL
);


ALTER TABLE public."Luxa" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16401)
-- Name: Test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Test" (
    id integer NOT NULL,
    nume character varying(100) NOT NULL,
    pret integer NOT NULL,
    online boolean DEFAULT true NOT NULL
);

-- CREATE TABLE public."Buchete" (
--     id integer NOT NULL,
--     nume character varying(100) NOT NULL,
--     pret integer NOT NULL,
-- );


ALTER TABLE public."Test" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16404)
-- Name: Test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Test" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Test_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3313 (class 0 OID 16394)
-- Dependencies: 210
-- Data for Name: Luxa; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3314 (class 0 OID 16401)
-- Dependencies: 211
-- Data for Name: Test; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Test" (id, nume, pret, online) OVERRIDING SYSTEM VALUE VALUES (1, 'Abc', 100, true);
-- INSERT INTO public."Buchete" (id, nume, pret) OVERRIDING SYSTEM VALUE VALUES (1, 'Buchet trandafiri', 100),(2, 'Buchet lalele', 120),(3, 'Buchet crizanteme', 90);



--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 212
-- Name: Test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Test_id_seq"', 1, true);


--
-- TOC entry 3171 (class 2606 OID 16398)
-- Name: Luxa Luxa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Luxa"
    ADD CONSTRAINT "Luxa_pkey" PRIMARY KEY (id);


--
-- TOC entry 3173 (class 2606 OID 16410)
-- Name: Test Test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);


--
-- TOC entry 3322 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE "Luxa"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Luxa" TO theo;
GRANT ALL ON TABLE public."Luxa" TO theodorbigu;


--
-- TOC entry 3323 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE "Test"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Test" TO theodorbigu;


--
-- TOC entry 3324 (class 0 OID 0)
-- Dependencies: 212
-- Name: SEQUENCE "Test_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Test_id_seq" TO theodorbigu;


-- Completed on 2021-11-22 15:09:53

--
-- PostgreSQL database dump complete
--

