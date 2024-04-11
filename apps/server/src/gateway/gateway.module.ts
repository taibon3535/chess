import { Module } from '@nestjs/common';
import { MyGateWay } from './GateWay';

@Module({
  providers: [MyGateWay],
})
export class GateWayModule {}
