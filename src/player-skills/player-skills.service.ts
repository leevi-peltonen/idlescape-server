import { Injectable } from '@nestjs/common';
import { CreatePlayerSkillDto } from './dto/create-player-skill.dto';
import { UpdatePlayerSkillDto } from './dto/update-player-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerSkill } from './entities/player-skill.entity';
import { In, Repository } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { GainXpDto } from './dto/gain-xp.dto';

@Injectable()
export class PlayerSkillsService {

    constructor(
        @InjectRepository(PlayerSkill)
        private readonly playerSkillRepository: Repository<PlayerSkill>,

        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,

        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    async create(playerId: number, skillId: number) {
        const player = await this.playerRepository.findOneBy({ id: playerId })
        const skill = await this.skillRepository.findOneBy({ id: skillId })

        const playerSkill = this.playerSkillRepository.create({ player, skill, level: 1, experience: 0 })
        return this.playerSkillRepository.save(playerSkill)
    }

    async findByPlayer(playerId: number) {
        return this.playerSkillRepository.find({ where: { player: { id: playerId } }, relations: ['skill'] })
    }


   /**
    * Add experience to a skill for a user
    * @param userId Id of the user
    * @param skillId Id of the skill
    * @param experience Amount of experience to add to the skill
    * @returns 
    */
    async addExperienceToSkill(gainXpDto: GainXpDto) {

        const player = await this.playerRepository.findOne({ where: { id: gainXpDto.playerId } })
        const skill = await this.skillRepository.findOne({ where: { id: gainXpDto.skillId } })

        if (!player) throw new Error('Player not found')
        if (!skill) throw new Error('Skill not found')

        let playerSkill = await this.playerSkillRepository.findOne({ where: { player: { id: gainXpDto.playerId }, skill: { id: gainXpDto.skillId } }, relations: ['skill', 'player']})

        if (!playerSkill) {
            playerSkill = this.playerSkillRepository.create({ player, skill, level: 1, experience: 0 })
        }

        playerSkill.experience += gainXpDto.xp
        

        playerSkill.level = this.calculateLevel(playerSkill.experience)
        await this.playerSkillRepository.save(playerSkill)
        return await this.playerSkillRepository.find({ where: { player: { id: gainXpDto.playerId } }, relations: ['skill'] })
    }
        
    /**
     *  Calculate the level of the entity based on the experience
     * @param experience Entity experience
     * @returns Level of the entity based on the experience
     */
    private calculateLevel(experience: number) {
        let level = 1
        while (experience >= this.experienceForLevel(level + 1)) {
            level++
        }
        return level
    }

    /**
     * Level curve for the game
     * @param level Level to figure out the experience required
     * @returns experience required to reach this level
     */
    private experienceForLevel(level: number) {
        return 720 * 2 ** (level / 7) + (1/8)*level*(level-1)-795
    }

}
