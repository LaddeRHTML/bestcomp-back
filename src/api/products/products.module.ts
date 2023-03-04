import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'api/files/entitiy/file.entity';
import { FilesService } from 'api/files/files.service';
import { Order } from 'api/orders/entity/order.entity';
import { User } from 'api/users/entity/user.entity';

import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, File, Order, User])],
    controllers: [ProductsController],
    providers: [ProductsService, FilesService],
    exports: [ProductsService]
})
export class ProductsModule {}
