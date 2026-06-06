import express from 'express'
const router = express.Router();
import authController from '../controllers/auth.controller.js'

/**
 * Register Route
 * - Path /api/auth/register
 */

router.post('/register',authController.RegisterController);

/**
 * - Login  Route
 * - Path /api/auth/login
 */

router.post('/login',authController.LoginController);

/**
 * - Login  Route
 * - Path /api/auth/login
 */

router.get('/logout',authController.LogoutController);


export default router