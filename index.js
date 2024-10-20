const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors')
const emailOtpRoutes = require('./routers/emailOtpRoute');
const mobileOtpRoutes = require('./routers/mobileOtpRoute');
const verifyRoute=require('./routers/verifyUserRouter')
const authRouter = require('./routers/authRouter');
const interviewRoute=require('./routers/interviewRoute')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: ['https://jpb-frontendnew.onrender.com/', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
  };
  

  app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRouter);
app.use('/api/email-otp', emailOtpRoutes);
app.use('/api/mobile-otp', mobileOtpRoutes);
app.use('/api/verifyuser', verifyRoute)
app.use('/api/interview',interviewRoute)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
