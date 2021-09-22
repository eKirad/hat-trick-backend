import { UserController } from '../controllers/userController';
import { generateCRUDRoutes } from './baseRouter';

const path = `user`
const router = generateCRUDRoutes(path, new UserController());

// TODO: Other additional routes
// router
//     .get(`/${path}`, new UserController().getAll)

export default router;