INSERT INTO users
    (name, userName, pwhash, avatar)
VALUES
    ('stan', 'stan', 'stan', 'stanIMG'),
    ('greg', 'greg', 'greg', 'gregIMG'),
    ('kim', 'kim', 'kim', 'kimIMG');

INSERT INTO categories
    (category_type, levels, id_user)
VALUES
    ('Arithemic', true, 1),
    ('Sequence', true, 2),
    ('Flash Cards', false, 3);

INSERT INTO timers
    (time, level, id_category, id_user)
VALUES
    ('Jan 2 2019 09:33:34', '1', 1, 1),
    ('Jan 3 2019 09:12:35', '2', 2, 2);

INSERT INTO questions
    (level, question, answer, id_category)
VALUES
    ('1', '1+1', '2', 1),
    ('1', '11 22 33 44 55', '66', 2),
    ('1','2 4 9 11 16', '18', 2),
    ('1', '30 28 25 21 16', '10', 2),
    ('1', '61 52 43 34 25', '16', 2),
    ('1', '1 2 4 8 16', '32', 2),
    ('1', '1 2 10 20 100', '200', 2),
    ('1', '1 1 2 3 5', '8', 2),
    ('1', '0 1 4 9 16', '25', 2),
    ('1', '1 4 7 10 13', '16', 2),
    ('1', '3 8 13 18 23', '28', 2),
    ('1', '1 3 6 10 15', '21', 2),
    ('1', '1 10 100 1000 10000', '100000', 2),
    ('1', '636 545 454 363 272', '181', 2),
    ('1', '1432 3654 5876 7098', '9210', 2),
    ('2', 'A D G J M', 'P', 2),
    ('2', 'A C E G I', 'K', 2),
    ('2', 'Z Y X W V', 'U', 2),
    ('2', 'E C A Y W', 'U', 2),
    ('2', 'Z A Y B X', 'C', 2),
    ('2', 'I J K L M', 'N', 2),
    ('2', 'B D F G I', 'J', 2),
    ('2', 'BH CI DJ EK FL', 'GM', 2),
    ('2', 'A Z B Y C', 'X', 2),
    ('Physics', 'What is the formula for Force?', 'F = m * a', 3),
    ('Physics', 'What is the formula for Ohms Law?', 'I = R * V', 3),
    ('Physics', 'What is the acceleration of gravity on Earth?', '9.8 m/s^2', 3),
    ('Physics', 'What is the formula for momentum?', 'p = m * v', 3),
    ('Biology', 'What phenomenon relates to sunlight being converted to energy?', 'photosynthesis', 3),
    ('Biology', 'What is the green pigment in plants that is affected by photosynthesis?', 'chlorophyll', 3),
    ('Biology', 'Name a byproduct of photosynthesis in plants.', 'oxygen', 3);


INSERT INTO results
    (time, id_user, id_question, correct)
VALUES
    ('Jan 2 2019 09:33:00', 1, 2, true),
    ('Jan 2 2019 09:33:00', 1, 3, true),
    ('Jan 2 2019 09:33:00', 1, 4, true),
    ('Jan 3 2019 09:12:00', 1, 3, true),
    ('Jan 3 2019 09:12:00', 1, 4, false),
    ('Jan 3 2019 09:12:00', 1, 5, true),
    ('Jan 3 2019 09:12:00', 1, 6, true),
    ('Jan 4 2019 07:15:00', 3, 25, true),
    ('Jan 4 2019 07:15:00', 3, 26, true),
    ('Jan 4 2019 07:15:00', 3, 27, true);