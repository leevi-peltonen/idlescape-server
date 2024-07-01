import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { ALL_SKILLS_DEV } from 'src/data/skills';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill) 
        private readonly skillRepository: Repository<Skill>
    ) {}

    async create(skillName: string): Promise<Skill> {
        const skill = this.skillRepository.create({ name: skillName })
        return this.skillRepository.save(skill)
    }

    async findAll(): Promise<Skill[]> {
        return this.skillRepository.find()
    }

    async initialize() {
        const skills = await this.findAll();
        if (skills.length === ALL_SKILLS_DEV.length) {
            return { message: 'Resources already initialized', success: false }
        }
        this.skillRepository.save(ALL_SKILLS_DEV);
        return { message: 'Resources initialized', success: true }
    }
}
