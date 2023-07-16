import { Controller, Get } from '@nestjs/common';



@Controller('seed')
export class SeedController {

  @Get()
  runSeed() {

    return 'SEED EXECUTED';
  }
}
