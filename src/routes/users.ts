import { Request, Response, Router } from "express";
const router = Router();
import {register} from '../controllers/users/register_controller'
import {login} from '../controllers/users/login_controller'

router.post('/register', async (req: Request, res: Response) => {
  return await register(req, res)
});

router.post('/login', async (req: Request, res: Response) => {
  return await login(req, res)
});

export default router;
