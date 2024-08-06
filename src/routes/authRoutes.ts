import { Router } from 'express';
import AuthController from '../controllers/authController';
import { cacheMiddleware, setCache } from './../middlewares/cacheMiddleware';

const router = Router();

// Route with caching
router.get('/roles', cacheMiddleware('roles_cache_key'), async (req, res) => {
  try {
    // Call getRoles with req and res arguments
    const roles = await AuthController.getRoles(req, res);
    
    // Set cache for the response
    setCache(res.locals.key, roles, 3600); // Cache for 1 hour
    
    // Send the response
    res.status(200).json({ roles });
  } catch (error) {
    res.status(400).json({ error: 'An unknown error occurred' });
  }
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
