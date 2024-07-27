import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Category } from './category.entity';
import { CreateTicketDto } from './create-ticket.dto';
import { UpdateTicketDto } from './update-ticket.dto';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class ticketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { categoryId, ...rest } = createTicketDto;
    const category = await this.categoriesRepository.findOne(
        { relations: ['category'] }
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const ticket = this.ticketsRepository.create({ ...rest, category });
    return this.ticketsRepository.save(ticket);
  }

  async findAlltickets(): Promise<Ticket[]> {
    return this.ticketsRepository.find({ relations: ['category'] });
  }

  async findTicketById(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne(
        // id, 
        { relations: ['category'] }
    );
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

    async updateTicket(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findTicketById(id);
    const { categoryId, ...rest } = updateTicketDto;
    if (categoryId !== undefined) {
      const category = await this.categoriesRepository.findOne(
        { relations: ['tickets'] }
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      ticket.category = category;
    }
    Object.assign(ticket, rest);
    return this.ticketsRepository.save(ticket);
  }

  async removeTicket(id: number): Promise<void> {
    const ticket = await this.findTicketById(id);
    await this.ticketsRepository.remove(ticket);
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['tickets'] });
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(
        // id, 
        { relations: ['tickets'] }
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
  }
}
