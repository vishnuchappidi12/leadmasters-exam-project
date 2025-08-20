const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String], 
        required: true,
        validate: [val => val.length >= 2, 'A question must have at least 2 options.']
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('question', QuestionSchema);