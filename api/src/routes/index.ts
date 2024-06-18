import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { getUser, updateUserDetails } from '../controllers/user-controller';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.get('/users/:id', getUser);
router.put('/users/:id', updateUserDetails);

export default router;
