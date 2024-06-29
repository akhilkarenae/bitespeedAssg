import Contact from "../db/models/contacts.models";
import ContactRepository from "../repository/contact.repository";
import { linkedPrecedence } from "../utils/constants.utils";

class ContactServices {
    static async identifyCustomer(email?: string, phoneNumber?: string){
        try{
            const contacts = await ContactRepository.findContacts(email,phoneNumber)
            if(contacts.length===0){
                const newContact = await ContactRepository.createContact({email,phoneNumber,linkedPrecedence:'primary'})

                const response = {
                    primaryContactId : newContact.id,
                    emails:[email],
                    phoneNumber:[phoneNumber],
                    secondaryContactId:[]
                }

                return response;
            }
            // Todo: convert this arrays to set data structure
            let emails: string[] = [];
            let phoneNumbers: string[] = [];
            let secondaryContactIds: number[] = [];

            let primaryContact :any // contacts.find(contact => contact.linkedPrecedence==='primary')
            let primaryContactCount :number =0 ;
            contacts.forEach(contact =>{
                if(contact.linkedPrecedence==='primary'){
                    primaryContact = contact
                    primaryContactCount++;
                }
                if(contact.linkedPrecedence==='secondary' && contact.email){
                    emails.push(contact.email)
                }
                if(contact.linkedPrecedence==='secondary' && contact.phoneNumber){
                    phoneNumbers.push(contact.phoneNumber)
                }
                if(contact.linkedPrecedence==='secondary'){
                    secondaryContactIds.push(contact.id);
                }
            })

            // if no primary contact exits with given email and phone number
            if(primaryContactCount==0){
                let newContact: any;
                // primary contact exits but diff from req email/phonember 
                if(contacts.length>0){
                    newContact = await ContactRepository.createContact({email,phoneNumber,linkedId:contacts[0].linkedId,linkedPrecedence:'secondary'})
                    secondaryContactIds.push(newContact.id)
                }else{
                    if(!email && !phoneNumber){
                        throw new Error("For primary account email and phoneNumber both required")
                    }
                    newContact = await ContactRepository.createContact({email,phoneNumber,linkedPrecedence:'primary'})
                }
                if(email){
                    emails.push(email)
                }
                if(phoneNumber){
                    phoneNumbers.push(phoneNumber)
                }
                const response = {
                    primaryContactId : newContact.id,
                    emails:emails,
                    phoneNumbers:phoneNumbers,
                    secondaryContactIds:secondaryContactIds
                }
                return response;
            }else if(primaryContactCount===1){
                console.log("from 2")
                emails.push(primaryContact.email);
                phoneNumbers.push(primaryContact.phoneNumber);
                if(email && !emails.includes(email)){
                    const newContact = await ContactRepository.createContact({email,phoneNumber,linkedPrecedence:'secondary',linkedId:primaryContact.id})
                    emails.push(email)
                    if(phoneNumber){
                        phoneNumbers.push(phoneNumber)
                    }
                    secondaryContactIds.push(newContact.id)
                } else if(phoneNumber && !phoneNumbers.includes(phoneNumber)){
                    const newContact = await ContactRepository.createContact({email,phoneNumber,linkedPrecedence:'secondary',linkedId:primaryContact.id})
                    if(email){
                        emails.push(email)
                    }
                    phoneNumbers.push(phoneNumber)
                    secondaryContactIds.push(newContact.id)
                }
                const response = {
                    primaryContatctId:primaryContact.id,
                    emails:emails,
                    phoneNumbers:phoneNumbers,
                    secondaryContactIds: secondaryContactIds
                }
                return response;
            }else if(primaryContactCount>=2){
                primaryContact = contacts[0];
                for(const contact of contacts){
                    if(contact.id !== primaryContact.id && primaryContact.linkedPrecedence==='primary'){
                        // turn newly created contact to secondary and oldest is primary
                        if(contact.createdAt<primaryContact.createdAt){
                            await ContactRepository.updateContactLinkedPrecedence(primaryContact.id,contact.id,'secondary')
                            // update the all the linkedId to new primary contact id
                            await ContactRepository.updateContactLinkedId(primaryContact.id,contact.id)
                            primaryContact=contact
                        }else{
                            await ContactRepository.updateContactLinkedPrecedence(contact.id,primaryContact.id,'secondary')
                            // update the all the linkedId to new primary contact id
                            await ContactRepository.updateContactLinkedId(contact.id,primaryContact.id)
                        }
                    }
                    if(contact.email){
                        emails.push(contact.email)
                    }
                    
                    if(contact.phoneNumber){
                        phoneNumbers.push(contact.phoneNumber)
                    }
                    secondaryContactIds.push(contact.id)
                }

                const response = {
                    primaryContatctId:primaryContact.id,
                    emails:emails,
                    phoneNumbers:phoneNumbers,
                    secondaryContactIds: secondaryContactIds
                }
                return response;
            }

        }catch(err){
            console.log(err,"error")
            // throw new Error(err);
        }
    }

    static async allContacts () {
        const contacts = await ContactRepository.getAllContacts()
        return contacts;
    }
}

export default ContactServices