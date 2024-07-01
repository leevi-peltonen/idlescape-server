import { CreateSkillDto } from "src/skill/dto/create-skill.dto";

/**
 * This is a list of all the skills that are available in the game
 */
const ALL_SKILLS = [
    "Woodcutting",
    "Mining",
    "Smithing",
    "Fishing",
    "Cooking",
    "Firemaking",
    "Crafting",
    "Fletching",
    "Herblore",
    "Agility",
    "Thieving",
    "Slayer",
    "Farming",
    "Runecrafting",
    "Hunter",
    "Construction",
    "Summoning",
    "Dungeoneering",
    "Divination",
    "Invention",
    "Archaeology"
]

/**
 * Data for populating database in development phase
 */
export const ALL_SKILLS_DEV: CreateSkillDto[] = ALL_SKILLS.map(skill => ({ name: skill }))

