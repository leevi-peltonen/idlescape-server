import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

    @Post()
    create(@Body('name') name: string) {
        return this.skillService.create(name);
    }

    @Get()
    findAll() {
        return this.skillService.findAll();
    }

    @Get('/init')
    initialize() {
        try {
            return this.skillService.initialize()
        } catch (error) {
            return { message: 'Error initializing skills' }
        }
    }
}
