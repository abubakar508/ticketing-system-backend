import { Module } from '@nestjs/common';
import { ticketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  providers: [ticketsService],
  controllers: [TicketsController]
})
export class TicketsModule {}
