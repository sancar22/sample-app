import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./index";

interface IMessageAttributes {
    id: number;
    ownerId: number;
    text: string;
}

interface MessageCreationAttributes
    extends Optional<IMessageAttributes, "id"> {}

export class Message
    extends Model<IMessageAttributes, MessageCreationAttributes>
    implements IMessageAttributes {
    public id!: number;
    public ownerId!: number;
    public text!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "messages",
        sequelize,
    }
);


