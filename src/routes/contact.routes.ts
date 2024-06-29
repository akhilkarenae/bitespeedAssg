import { Router } from 'express'
import ContactControllers from '../controllers/contact.controllers';

const contactRouter = Router();


contactRouter.post('/identify',ContactControllers.customersIdentity);

contactRouter.get('/contacts',ContactControllers.getAllContacts)

export default contactRouter;