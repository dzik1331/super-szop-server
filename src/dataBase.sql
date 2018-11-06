CREATE TABLE products (
    id          INTEGER       PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (255) NOT NULL,
    price       REAL          NOT NULL,
    tags        TEXT,
    img         TEXT          NOT NULL,
    description TEXT,
    producer    VARCHAR (255)
);
