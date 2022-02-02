import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesSchema, AssemblySchema } from './product.schema';
import { AccessoriesController } from './products.types/accessories/products.accessories.controller';
import { AssemblyController } from './products.types/assembly/products.assembly.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: "assembly", schema: AssemblySchema}, {name: "accessories", schema: AccessoriesSchema}])],
  controllers: [ProductsController, AccessoriesController, AssemblyController],
  providers: [ProductsService]
})
export class ProductsModule {}