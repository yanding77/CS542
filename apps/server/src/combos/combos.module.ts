import { Module } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';

@Module({
  providers: [CombosService],
  controllers: [CombosController]
})
export class CombosModule {}
