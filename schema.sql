CREATE TABLE users(
    id serial PRIMARY KEY,
    name text,
    userName text UNIQUE,
    pwhash text,
    avatar text
);

CREATE TABLE categories(
    id serial primary key,
    category_type text,
    level boolean,
    theuser_id integer references users (id)
);

CREATE TABLE timers(
    id serial primary key,
    time timestamp,
    level text,
    category_id integer references categories (id),
    theuser_id integer references users (id)
);

CREATE TABLE questions(
    id serial primary key,
    level text,
    question text,
    answer text,
    category_id integer references categories (id)
);

CREATE TABLE results(
    id serial primary key,
    correct boolean,
    time timestamp,
    theuser_id integer references users (id),
    question_id integer references questions (id)
);