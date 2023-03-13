import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { db } from "./../database";

export class CachedData extends Model<InferAttributes<CachedData>, InferCreationAttributes<CachedData>> {
    id: CreationOptional<number>;
    name: string;
    uuid: string;
    discordId: string;
    tag: string;
    avatar: string;
    guildId: string;
    createdAt: Date;
    cachedAt: Date;
}

CachedData.init(
    {
        id: {
            type: DataTypes.NUMBER,
            field: 'data_id',
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discordId: {
            type: DataTypes.STRING,
            field: 'discord_id',
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guild_id',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        cachedAt: {
            type: DataTypes.DATE,
            field: 'cached_at',
            allowNull: false
        },
    },
    {
        sequelize: db,
        tableName: 'data',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
)