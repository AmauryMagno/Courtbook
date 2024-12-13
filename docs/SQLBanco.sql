CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)  
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT,
    date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,,
    idCourt INTEGER REFERENCES courts(id) NOT NULL,
    idUser INTEGER REFERENCES users(id) NOT NULL,
    price VARCHAR(255) NOT NULL NOT NULL,
    PRIMARY KEY (id)  
);

CREATE TABLE courts (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)  
);