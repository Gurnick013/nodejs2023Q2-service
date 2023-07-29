import { Global, Module } from '@nestjs/common';
import DB from './DB';

@Global()
@Module({
  exports: [DB],
  controllers: [],
  providers: [DB],
})
export class DataBaseModule {}
