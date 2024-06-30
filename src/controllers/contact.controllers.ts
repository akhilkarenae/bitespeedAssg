import { Request, Response } from 'express';

import ContactServices from "../services/contact.services";


class ContactControllers{
    static async customersIdentity(req:Request,res:Response){
        const {email,phoneNumber}= req.body;
        try{
            const contact = await ContactServices.identifyCustomer(email,phoneNumber);
            return res.status(200).json({contact})
        }catch(err){
            console.log(err);
            return res.status(500).json({message:"Internal error occured or test case failed"})
        }
    }

    static async getAllContacts(req:Request,res:Response){
        try{
            const contacts = await ContactServices.allContacts();
            return res.status(200).json(contacts);
        }catch(err){
            console.log(err);
            return res.status(500).json({message:err})
        }
    }
}

export default ContactControllers