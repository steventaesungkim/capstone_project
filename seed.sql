INSERT INTO users
    (name, userName, passWord, avatar)
VALUES
    ('stan', 'stan', 'stan', 'stanIMG'),
    ('greg', 'greg', 'greg', 'gregIMG'),
    ('kim', 'kim', 'kim', 'kimIMG');

INSERT INTO categories
    (category_type, level, theuser_id)
VALUES
    ('arithemic', true, 1),
    ('sequence', true, 2);

INSERT INTO timers
    (time, level, category_id, theuser_id)
VALUES
    ('Jan 2 2019 09:33:34', '1', 1, 1),
    ('Jan 3 2019 09:12:35', '2', 2, 2);

INSERT INTO questions
    (level, question, answer, category_id)
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
    ('2', 'A Z B Y C', 'X', 2);


INSERT INTO results
    (correct, time, theuser_id, question_id)
VALUES
    (true, 'Jan 2 2019 09:33:34', 1, 1),
    (true, 'Jan 3 2019 09:12:35', 2, 2);