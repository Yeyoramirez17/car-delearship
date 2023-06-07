import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './dtos/create-car.dto';
import { UpdateCarDTO } from './dtos/update-car.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {

    private cars: Car[] = [];

    public findAll() {
        return this.cars;
    }

    public findById( id: string ) {
        const car = this.cars.find( car => car.id === id );
        if( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
        return car;
    }

    create( createCarDto: CreateCarDTO) {
        const car: Car = { 
            id: uuid(),
            ... createCarDto,
        };

        this.cars.push( car );

        return car;
    }

    update( id: string, updateCarDto: UpdateCarDTO ) {
        let carDB = this.findById( id );

        if( updateCarDto.id && updateCarDto.id !== id ) throw new BadRequestException(`Car id '${id}' is not valid inside body`);
        
        this.cars = this.cars.map( car => {
            if ( car.id === id ) {
                carDB = { ... carDB, ... updateCarDto, id }
                return carDB;
            }

            return car;
        } );

        return carDB;
    }

    delete( id: string) {
        const car = this.findById( id );
        this.cars = this.cars.filter( car => car.id !== id);
    }

    fillCardsWithSeedData( cars: Car[] ): void {
        this.cars = cars;
    }
}
