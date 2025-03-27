import { AppDataSource } from "../db";
import { Data } from "../entities/Data";
import { filter, filterNumber } from "../utils";

const repo = AppDataSource.getRepository(Data)

export class DataService {
    static async getData(search: string) {
        return await repo.find({
            where: [
                {
                    id: filterNumber(search)
                },
                {
                    uuid: filter(search)
                },
                {
                    name: filter(search)
                },
                {
                    tag: filter(search)
                },
                {
                    discordId: filter(search)
                },
                {
                    guildId: filter(search)
                }
            ]
        })
    }

    static async getDataById(id: number) {
        const data = await repo.findOne({
            where: {
                id: id
            }
        })

        if (data == null) {
            throw new Error('DATA_NOT_FOUND')
        }

        return data
    }
}