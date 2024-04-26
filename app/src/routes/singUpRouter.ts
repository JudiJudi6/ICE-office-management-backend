import express from 'express';
import { register } from '../controllers/singUpController';

const router = express.Router()

router.route("/").post(register);

export default router;

