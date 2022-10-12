import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { apiv1 } from 'src/common/constants/api-const';
import { PaginationTypes } from 'src/common/interfaces/utils.interface';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './schemas/applications.schema';

@Controller(`${apiv1}/applications`)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @MessagePattern('core_api_application_create')
    @Post()
    async create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        console.log(createApplicationDto);
        return await this.applicationsService.create(createApplicationDto);
    }

    @MessagePattern('core_api_application_filtered')
    /* @UseGuards(JwtAuthGuard) */
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.applicationsService.findSortedItems(page, limit);
    }

    @MessagePattern('core_api_application_get_all')
    /* @UseGuards(JwtAuthGuard) */
    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @MessagePattern('core_api_application_get_one')
    /* @UseGuards(JwtAuthGuard) */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

    @MessagePattern('core_api_application_update')
    /* @UseGuards(JwtAuthGuard) */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateApplicationDto: UpdateApplicationDto
    ): Promise<Application> {
        return this.applicationsService.update(id, updateApplicationDto);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  } */
}
