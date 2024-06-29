import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

interface ContactAtrributes {
    id: number;
    phoneNumber : string | null; 
    email: string | null
    linkedId : number | null
    linkedPrecedence : 'primary' | 'secondary';
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null
}

interface ContactOptionalAtrributes extends Optional<ContactAtrributes, 'id' | 'linkedId' | 'deletedAt'> {}

class Contact extends Model<ContactAtrributes, ContactOptionalAtrributes> implements ContactAtrributes {
    public id!:number
    public phoneNumber!: string | null;
    public email! : string | null;
    public linkedId!: number | null;
    public linkedPrecedence!: "primary" | "secondary";
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date;
}

Contact.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    linkedId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    linkedPrecedence: {
        type: DataTypes.ENUM('primary', 'secondary'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    sequelize,
    tableName:'Contacts'
}
)