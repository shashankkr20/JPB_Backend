const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  candidates: {
    type: [String], 
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
       
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
});


const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
