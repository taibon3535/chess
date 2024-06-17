import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GateWayModule } from '../gateway/gateway.module';

@Module({
  imports: [UsersModule, GateWayModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
