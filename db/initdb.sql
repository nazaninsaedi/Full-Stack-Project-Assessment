\c videorec;

DROP TABLE IF EXISTS videos CASCADE;

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    src VARCHAR,
    rating INTEGER

);

INSERT INTO videos (title,src,rating) VALUES ('Never Gonna Give You Up','https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5);
INSERT INTO videos (title,src,rating) VALUES ('The Coding Train','https://www.youtube.com/watch?v=HerCR8bw_GE', 5);
INSERT INTO videos (title,src,rating) VALUES ('Mac & Cheese | Basics with Babish','https://www.youtube.com/watch?v=FUeyrEN14Rk', 5);
INSERT INTO videos (title,src,rating) VALUES ('Videos for Cats to Watch - 8 Hour Bird Bonanza','https://www.youtube.com/watch?v=xbs7FT7dXYc', 5);
INSERT INTO videos (title,src,rating) VALUES ('The Complete London 2012 Opening Ceremony | London 2012 Olympic Games','https://www.youtube.com/watch?v=4As0e4de-rI', 5);
INSERT INTO videos (title,src,rating) VALUES ('Learn Unity - Beginner''s Game Development Course','https://www.youtube.com/watch?v=gB1F9G0JXOo', 5);
INSERT INTO videos (title,src,rating) VALUES ('Cracking Enigma in 2021 - Computerphile','https://www.youtube.com/watch?v=RzWB5jL5RX0', 5);
INSERT INTO videos (title,src,rating) VALUES ('Coding Adventure: Chess AI','https://www.youtube.com/watch?v=U4ogK0MIzqk', 5);
INSERT INTO videos (title,src,rating) VALUES ('Coding Adventure: Ant and Slime Simulations','https://www.youtube.com/watch?v=X-iSQQgOd1A', 5);
INSERT INTO videos (title,src,rating) VALUES ('Why the Tour de France is so brutal','https://www.youtube.com/watch?v=ZacOS8NBK6U', 5);
