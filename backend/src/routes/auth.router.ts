import { loginUser, registerUser } from '../controllers/auth.controllers';
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
