import { UserController } from '../controllers/userController';
import { generateBaseRoutes } from './baseRouter';

const path = `user`
const router = generateBaseRoutes(path, new UserController());

// TODO: Other additional routes
// router
//     .get(`/${path}`, new UserController().getAll)

export default router;