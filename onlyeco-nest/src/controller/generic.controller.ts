import {Body, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiImplicitParam, ApiResponse} from '@nestjs/swagger';

export abstract class GenericController<ENTITY> {
    constructor(
        private readonly service: IService<ENTITY>
    ){ }
    
    @Get()
    findAll(): Promise<ENTITY[]> {
        return this.service.findAll();
    }
    
    @Get(':id')
    findById(@Param('id') id: number): Promise<ENTITY> {
        return this.service.findById(id);
    }
    
    @Get('/multiple')
    findByMultipleId(@Body() ids: any[]): Promise<ENTITY[]> {
        return this.service.findByIds(ids);
    }
    
    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    create(@Body() object: ENTITY) {
        if (object.id === 0 || object.id === -1) {
            object.id = undefined;
        }
        return this.service.insert(object);
    }
    
    @Post('/multiple')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    createMultiple(@Body() objects: ENTITY[]) {
        objects.forEach((item) => {
            this.service.insert(item).then((success) => {
    
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    
    @Put()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    edit(@Body() object: ENTITY) {
        return this.service.update(object);
    }
    
    @Put('/multiple')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    editMultiple(@Body() objects: ENTITY[]) {
        objects.forEach(
            (x)=> {
                this.service.update(<any>x).then((success) => {
            
                }).catch((error) => {
                    console.log(error);
                });
            }
        );
    }
    
    @Delete()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    delete(@Body() object: ENTITY) {
        return this.service.destroy(object);
    }
    
    @Delete('/multiple')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error.'})
    deleteMultiple(@Body() object: ENTITY[]) {
        return this.service.destroyMultiple(object);
    }
}