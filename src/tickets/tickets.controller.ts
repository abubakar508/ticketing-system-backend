import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTicketDto } from './create-ticket.dto';
import { ticketsService } from './tickets.service';
import { UpdateTicketDto } from './update-ticket.dto';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: ticketsService) {}

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  findAllTickets() {
    return this.ticketsService.findAlltickets();
  }

  @Get(':id')
  findProductById(@Param('id') id: number) {
    return this.ticketsService.findTicketById(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  removeTicket(@Param('id') id: number) {
    return this.ticketsService.removeTicket(id);
  }

  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.ticketsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.ticketsService.findAllCategories();
  }

  @Get('categories/:id')
  findCategoryById(@Param('id') id: number) {
    return this.ticketsService.findCategoryById(id);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.ticketsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: number) {
    return this.ticketsService.removeCategory(id);
  }
}
