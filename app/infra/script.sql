CREATE SEQUENCE seq_room     
INCREMENT 1     
MINVALUE 1     
MAXVALUE 9223372036854775807     
START 1     
CACHE 1;

CREATE TABLE public.room
(
    id integer NOT NULL,
    name character varying(20)  NOT NULL,
    password character varying(6) NOT NULL,
    CONSTRAINT room_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);