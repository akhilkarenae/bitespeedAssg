import { Sequelize, Op } from "sequelize";
import Contact from "../db/models/contacts.models";




class ContactRepository {
    static async findContacts(email: string | undefined, phoneNumber: string | undefined){
        try{
            const contacts = await Contact.findAll({
                where:{
                    [Op.or]:[{email: email ?? ''}, {phoneNumber: phoneNumber ?? ''}]
                }
            })
            return contacts;
        }catch(err:any){
            throw new Error(err);
        }
    }

    static async createContact(contactData:any){
        try{
            const newContact = await Contact.create(contactData);
            return newContact;
        }catch(err:any){
            throw new Error(err);
        }
    }

    static async updateContactLinkedPrecedence(contactId: number, linkedId: number, linkedPrecedence: 'primary' | 'secondary') {
        return await Contact.update({ linkedId, linkedPrecedence }, {
          where: { id: contactId }
        });
    }
    static async updateContactLinkedId(linkedId:number,newLinkedId:number){
        return await Contact.update({linkedId:newLinkedId},{where:{linkedId:linkedId}})
    }

    static async getAllContacts() {
        return await Contact.findAll();
    }
}


export default ContactRepository