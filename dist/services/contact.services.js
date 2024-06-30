"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_repository_1 = __importDefault(require("../repository/contact.repository"));
class ContactServices {
    static identifyCustomer(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield contact_repository_1.default.findContacts(email, phoneNumber);
                if (contacts.length === 0) {
                    const newContact = yield contact_repository_1.default.createContact({ email, phoneNumber, linkedPrecedence: 'primary' });
                    const response = {
                        primaryContactId: newContact.id,
                        emails: [email],
                        phoneNumber: [phoneNumber],
                        secondaryContactId: []
                    };
                    return response;
                }
                // Todo: convert this arrays to set data structure
                let emails = [];
                let phoneNumbers = [];
                let secondaryContactIds = [];
                let primaryContact; // contacts.find(contact => contact.linkedPrecedence==='primary')
                let primaryContactCount = 0;
                contacts.forEach(contact => {
                    if (contact.linkedPrecedence === 'primary') {
                        primaryContact = contact;
                        primaryContactCount++;
                    }
                    if (contact.linkedPrecedence === 'secondary' && contact.email) {
                        emails.push(contact.email);
                    }
                    if (contact.linkedPrecedence === 'secondary' && contact.phoneNumber) {
                        phoneNumbers.push(contact.phoneNumber);
                    }
                    if (contact.linkedPrecedence === 'secondary') {
                        secondaryContactIds.push(contact.id);
                    }
                });
                // if no primary contact exits with given email and phone number
                if (primaryContactCount == 0) {
                    let newContact;
                    // primary contact exits but diff from req email/phonember 
                    if (contacts.length > 0) {
                        newContact = yield contact_repository_1.default.createContact({ email, phoneNumber, linkedId: contacts[0].linkedId, linkedPrecedence: 'secondary' });
                        secondaryContactIds.push(newContact.id);
                    }
                    else {
                        if (!email && !phoneNumber) {
                            throw new Error("For primary account email and phoneNumber both required");
                        }
                        newContact = yield contact_repository_1.default.createContact({ email, phoneNumber, linkedPrecedence: 'primary' });
                    }
                    if (email && !emails.includes(email)) {
                        emails.push(email);
                    }
                    if (phoneNumber && !emails.includes(phoneNumber)) {
                        phoneNumbers.push(phoneNumber);
                    }
                    const response = {
                        primaryContactId: newContact.id,
                        emails: emails,
                        phoneNumbers: phoneNumbers,
                        secondaryContactIds: secondaryContactIds
                    };
                    return response;
                }
                else if (primaryContactCount === 1) {
                    emails.push(primaryContact.email);
                    phoneNumbers.push(primaryContact.phoneNumber);
                    // request has either of phoneNumber or email common to an existing contact but contains new info
                    let newContact;
                    if ((email && !emails.includes(email)) || (phoneNumber && !phoneNumbers.includes(phoneNumber))) {
                        newContact = yield contact_repository_1.default.createContact({ email, phoneNumber, linkedPrecedence: 'secondary', linkedId: primaryContact.id });
                    }
                    if (email && !emails.includes(email)) {
                        emails.push(email);
                    }
                    if (phoneNumber && !emails.includes(phoneNumber)) {
                        phoneNumbers.push(phoneNumber);
                    }
                    if (newContact && !emails.includes(newContact.id)) {
                        secondaryContactIds.push(newContact.id);
                    }
                    // else if(phoneNumber && !phoneNumbers.includes(phoneNumber)){
                    //     const newContact = await ContactRepository.createContact({email,phoneNumber,linkedPrecedence:'secondary',linkedId:primaryContact.id})
                    // if(email){
                    //     emails.push(email)
                    // }
                    //     phoneNumbers.push(phoneNumber)
                    //     secondaryContactIds.push(newContact.id)
                    // }
                    const response = {
                        primaryContatctId: primaryContact.id,
                        emails: emails,
                        phoneNumbers: phoneNumbers,
                        secondaryContactIds: secondaryContactIds
                    };
                    return response;
                }
                else if (primaryContactCount >= 2) {
                    primaryContact = contacts[0];
                    for (const contact of contacts) {
                        if (contact.id !== primaryContact.id && primaryContact.linkedPrecedence === 'primary') {
                            // turn newly created contact to secondary and oldest is primary
                            if (contact.createdAt < primaryContact.createdAt) {
                                yield contact_repository_1.default.updateContactLinkedPrecedence(primaryContact.id, contact.id, 'secondary');
                                // update the all the linkedId to new primary contact id
                                yield contact_repository_1.default.updateContactLinkedId(primaryContact.id, contact.id);
                                primaryContact = contact;
                            }
                            else {
                                yield contact_repository_1.default.updateContactLinkedPrecedence(contact.id, primaryContact.id, 'secondary');
                                // update the all the linkedId to new primary contact id
                                yield contact_repository_1.default.updateContactLinkedId(contact.id, primaryContact.id);
                            }
                        }
                        if (contact.email && !emails.includes(contact.email)) {
                            emails.push(contact.email);
                        }
                        if (contact.phoneNumber && !emails.includes(contact.phoneNumber)) {
                            phoneNumbers.push(contact.phoneNumber);
                        }
                        secondaryContactIds.push(contact.id);
                    }
                    const response = {
                        primaryContatctId: primaryContact.id,
                        emails: emails,
                        phoneNumbers: phoneNumbers,
                        secondaryContactIds: secondaryContactIds
                    };
                    return response;
                }
            }
            catch (err) {
                console.log(err, "error");
                throw new Error(err);
            }
        });
    }
    static allContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield contact_repository_1.default.getAllContacts();
            return contacts;
        });
    }
}
exports.default = ContactServices;
