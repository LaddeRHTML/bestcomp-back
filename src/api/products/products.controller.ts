import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Request,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Payload } from 'api/auth/strategies/jwt-auth.strategy';
import { FilesService } from 'api/files/files.service';
import { Role } from 'api/users/enum';
import { Request as ExpressRequest } from 'express';
import { DeleteResult } from 'interfaces/delete.result';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { InsertResult, UpdateResult } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import {
    FilterProductsResponse,
    MinMaxProductValues,
    ProductsFilter
} from './interfaces/products.filter.interface';
import { ProductsService } from './products.service';

const controllerName = `${apiVersion}/products`;

interface RequestWithUser extends ExpressRequest {
    user: Payload;
}

@Controller(controllerName)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly filesService: FilesService
    ) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('')
    async createOne(
        @Body() createProductDto: CreateProductDto,
        @Req() req: RequestWithUser
    ): Promise<InsertResult> {
        const userId = req.user['userId'];
        return await this.productsService.createOne(createProductDto, userId);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    // @Post('/search?')
    // async findSortedItems(
    //     @Query('search-by') parameter: string,
    //     @Query('page')
    //     page: number,
    //     @Query('limit') limit: number,
    //     @Body() filters: CreateProductDto
    // ): Promise<Pagination<Product[]>> {
    //     return await this.productsService.findByFilters(parameter, page, limit, filters);
    // }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    // @Get('/min-max')
    // async getMinMaxValues(): Promise<FilterProductsResponse> {
    //     return await this.productsService.getMinMaxValues();
    // }

    // @HasRoles(Role.Admin)
    // @UseGuards(RoleGuard)
    // @UseInterceptors(FileInterceptor('excel-dealer-file'))
    // @Post('/excel')
    // async createMultipleItems(@UploadedFile() file: MulterFile) {
    //     if (file.originalname !== 'WW_dealers.xlsx') {
    //         throw new HttpException('Bad file provided', HttpStatus.CONFLICT);
    //     }

    //     const products = this.productsService.getDataFromExcel(file);
    //     return await this.productsService.manipulateMultipleItems(products);
    // }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne({ where: { id } });
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,

        @Req() req: RequestWithUser,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        const userId = req.user['userId'];
        return await this.productsService.updateOne(id, updateProductDto, userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/hide/many?')
    async updateVisiblityOfImportedProducts(
        @Query('is_hidden', {
            transform(value) {
                return value === 'true';
            }
        })
        is_hidden: boolean
    ) {
        return await this.productsService.updateVisiblityOfImportedProducts(is_hidden);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Patch('/pictures/upload/:id')
    async uploadPictures(
        @UploadedFiles()
        files: Express.Multer.File[],
        @Param('id') id: string,
        @Request() req: RequestWithUser
    ) {
        const userId = req.user['userId'];
        const uploadedPictures = await this.filesService.uploadFiles(files, userId);

        console.log(uploadedPictures);

        return this.productsService.updateOne(
            id,
            {
                pictures_id: uploadedPictures.map((p) => p.id),
                pictures: uploadedPictures
            },
            userId
        );
    }

    // @HasRoles(Role.Admin)
    // @UseGuards(RoleGuard)
    // @Delete('/remove/imported')
    // async removeImported(): Promise<DeleteResult> {
    //     return await this.productsService.removeImported();
    // }

    // @HasRoles(Role.Admin)
    // @UseGuards(RoleGuard)
    // @Delete('/:id')
    // async removeOne(@Param('id') id: string): Promise<Product> {
    //     return await this.productsService.removeOne(id);
    // }
}
