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
    ('1', '1122', '33', 2);

INSERT INTO results
    (correct, time, theuser_id, question_id)
VALUES
    (true, 'Jan 2 2019 09:33:34', 1, 1),
    (true, 'Jan 3 2019 09:12:35', 2, 2);