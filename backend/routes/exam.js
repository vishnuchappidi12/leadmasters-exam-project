const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Question = require('../models/Question'); 

router.get('/questions', auth, async (req, res) => {
  try {
    
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/submit', auth, async (req, res) => {
    const { answers } = req.body; 
    
    try {
        const questionIds = Object.keys(answers);
        const correctQuestions = await Question.find({ '_id': { $in: questionIds } });

        let score = 0;
        correctQuestions.forEach(question => {
            
            if (question.correctAnswer === answers[question._id]) {
                score++;
            }
        });

        res.json({ score, total: correctQuestions.length });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;