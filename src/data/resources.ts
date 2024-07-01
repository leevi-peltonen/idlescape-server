import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

/**
 * Data for populating database in development phase
 */
export const ALL_RESOURCES_DEV: CreateResourceDto[] = [
    {
        name: 'Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 1,
        skillId: 1,
        experience: 10
    },
    {
        name: 'Oak Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 2,
        skillId: 1,
        experience: 20
    },
    {
        name: 'Willow Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 3,
        skillId: 1,
        experience: 50
    },
    {
        name: 'Maple Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 4,
        skillId: 1,
        experience: 100
    },
    {
        name: 'Yew Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 5,
        skillId: 1,
        experience: 200
    },
    {
        name: 'Magic Tree',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 6,
        skillId: 1,
        experience: 500
    },
    {
        name: 'Copper Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 1,
        skillId: 2,
        experience: 10
    },
    {
        name: 'Iron Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 2,
        skillId: 2,
        experience: 20
    },
    {
        name: 'Coal',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 3,
        skillId: 2,
        experience: 50
    },
    {
        name: 'Gold Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 4,
        skillId: 2,
        experience: 100
    },
    {
        name: 'Mithril Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 5,
        skillId: 2,
        experience: 200
    },
    {
        name: 'Adamantite Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 6,
        skillId: 2,
        experience: 500
    },
    {
        name: 'Runite Ore',
        gatherAmount: 1,
        gatherTime: 5000,
        tier: 7,
        skillId: 2,
        experience: 1000
    },
]