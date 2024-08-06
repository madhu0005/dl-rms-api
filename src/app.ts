import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import passport from './config/passport';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import redisClient from './config/redis';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => console.error('Error synchronizing the database:', err));

// Example Redis test route
app.get('/redis-test', async (req, res) => {
  try {
    await redisClient.set('test_key', 'test_value');
    const value = await redisClient.get('test_key');
    res.status(200).json({ value });
  } catch (error) {
    res.status(500).json({ error: 'Redis error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
