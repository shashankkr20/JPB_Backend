const Interview = require('../models/Interview');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.EMAIL_PASS,
    },
});

const createInterview = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate, userMail } = req.body;

  try {
    const interview = new Interview({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      userMail,
    });

    const savedInterview = await interview.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInterviews = async (req, res) => {
    try {
      const { userMail } = req.body;

      if (!userMail) {
        return res.status(404).json({ message: 'Not Found: userMail is required.' });
      }

      const interviews = await Interview.find({ userMail });

      if (interviews.length === 0) {
        return res.status(404).json({ message: 'Not Found: No interviews found for this userMail.' });
      }

      res.status(200).json(interviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const notifyCandidates = async (interview) => {
  const mail = `Dear Candidate,\nWe are pleased to inform you that you have been scheduled for an interview for the position of **${interview.jobTitle}**. Below are the details of your interview:\n---\n**Job Title:** ${interview.jobTitle}  \n**Job Description:** ${interview.jobDescription}  \n**Experience Level:** ${interview.experienceLevel}  \n**Interview Date:** ${interview.endDate} \n---\nPlease make sure to review the job description and prepare any questions you may have. We look forward to meeting with you.\nIf you have any questions or if you need to reschedule, please feel free to reach out to us at [Your Email Address].\nBest of luck!\nRegards, \nCuvette`;

  interview.candidates.map(async (candidate) => {
      const mailOptions = {
        from: 'skm8581033@gmail.com',
        to: candidate,
        subject: `Job Posting Information`,
        text: mail
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error(`Failed to send email to ${candidate}:`, error.message);
      }
    });
};

const sendNotification = async (req, res) => {
    try {
      const { _id } = req.body;

      if (!_id) {
        return res.status(404).json({ message: 'Not Found: userMail is required.' });
      }

      const interviews = await Interview.find({ _id });

      if (interviews.length === 0) {
        return res.status(404).json({ message: 'Not Found: No interviews found for this userMail.' });
      }

      notifyCandidates(interviews[0]);
      res.status(200).json({ message: "Candidates Notified successfully" });
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createInterview,
  getInterviews,
  sendNotification
};
