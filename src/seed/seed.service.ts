import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from '../brands/brands.service';
import { BRAND_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {

  constructor( 
    private readonly carsServices: CarsService,
    private readonly brandServices: BrandsService 
    ) {}

  populateDB(): string {
    this.carsServices.fillCardsWithSeedData( CARS_SEED );
    this.brandServices.fillBrandsWithSeedData( BRAND_SEED );

    return `Seed executed successfully`;
  }

}
