import {
    Association,
    HasManyAddAssociationMixin,
    HasManyCreateAssociationMixin,
    Model,
    Optional,
    DataTypes,
} from "sequelize";
import { Message } from "./Message";
import { sequelize } from "./index";

interface IUserAttributes {
    id: number;
    firstName: string;
    surname: string;
    username: string;
    password: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}

export class User extends Model<IUserAttributes, IUserCreationAttributes>
    implements IUserAttributes {
    public id!: number;
    public firstName!: string;
    public surname!: string;
    public username!: string;
    public password!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public addMessage!: HasManyAddAssociationMixin<Message, number>;
    public createMessage!: HasManyCreateAssociationMixin<Message>;

    public readonly messages?: Message[];

    public static associations: {
        messages: Association<User, Message>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        surname: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize,
    }
);

User.hasMany(Message, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "messages",
});
