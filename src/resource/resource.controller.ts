import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

    @Get('/init')
    initialize() {
        try {
            return this.resourceService.initialize()
        } catch (error) {
            return { message: 'Error initializing resources' }
        }
        
    }

    @Get()
    findAll() {
        return this.resourceService.findAll();
    }

    @Get('/skill/:id')
    findAllBySkillId(@Param('id') id: string) {
        return this.resourceService.findAllBySkillId(+id);
    }
}
