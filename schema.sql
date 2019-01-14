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
    levels boolean,
    id_user integer references users (id)
);

CREATE TABLE timers(
    id serial primary key,
    time timestamp,
    level text,
    id_category integer references categories (id),
    id_user integer references users (id)
);

CREATE TABLE questions(
    id serial primary key,
    level text,
    question text,
    answer text,
    id_category integer references categories (id)
);

CREATE TABLE resultsets(
    id serial primary key,
    time timestamp,
    id_user integer references users (id),
    score integer
);

CREATE TABLE results(
    id serial primary key,
    id_resultset integer references resultsets (id),
    id_question integer references questions (id),
    correct boolean
);

CREATE TABLE avatars (
    id serial primary key,
    id_user integer references users (id),
    name text,
    img text
);