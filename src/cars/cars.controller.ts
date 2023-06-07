import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dtos/create-car.dto';
import { Car } from './interfaces/car.interface';
import { UpdateCarDTO } from './dtos/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )
export class CarsController {

    constructor( private readonly carsService: CarsService ) {}

    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Get(':id')
    findById( @Param( 'id', ParseUUIDPipe ) id: string ) {
        return this.carsService.findById( id );
    }

    @Post()
    // @UsePipes( ValidationPipe )
    createCar( @Body() createCartDto: CreateCarDTO ): Car {
        return this.carsService.create( createCartDto );
    }

    @Patch(':id')
    updateCar( @Param('id', ParseUUIDPipe) id: string , @Body() updateCarDto: UpdateCarDTO ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.delete( id );
    }
}
