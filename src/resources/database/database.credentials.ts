import { DataSourceOptions } from 'typeorm';

import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';
import { File } from 'model/file/File';
import { CPU } from 'model/accessories/CPU/CPU';
import { WaterCooling } from 'model/accessories/WaterCooling/WaterCooling';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DATABASE_CONNECTION_HOST}`,
    port: parseInt(`${process.env.DATABASE_CONNECTION_PORT}`),
    username: `${process.env.DATABASE_CONNECTION_USERNAME}`,
    password: `${process.env.DATABASE_CONNECTION_PASSWORD}`,
    database: `${process.env.DATABASE_CONNECTION_MAINTENANCE}`,
    // url: `${process.env.DATABASE_CONNECTION_URL}`,
    entities: [User, Product, File, Order, CPU, WaterCooling],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
