import {DataSource} from 'typeorm'
import {User} from './entities/user'
import { userInfo } from 'os'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'san0906',
    port: 5432,
    database: 'Skyora',
    entities: [User],
    logging: false,
    synchronize: true,
    dropSchema: true,
})
