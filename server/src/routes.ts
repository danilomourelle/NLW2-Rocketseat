import express from 'express';
import ClassesController from './controller/ClassesController';
import ConnectionController from './controller/ConnectiosController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();

routes.post('/classes', classesController.create)
routes.post('/connections', connectionsController.create)

routes.get('/classes', classesController.index)
routes.get('/connections', connectionsController.index)


export default routes