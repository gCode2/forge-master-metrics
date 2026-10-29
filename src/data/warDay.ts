import type { forgeLevelType, warDayActionsType } from "../types/types";

export const warActions: warDayActionsType[] = [{
    id: 1,
    name: "Forge",
    actions: [
        {
        name: "Primitive",
        defaultPoints: 1
        },
        {
        name: "Medieval",
        defaultPoints: 1
        },
        {
        name: "Early Modern",
        defaultPoints: 1
        },
        {
        name: "Modern",
        defaultPoints: 2
        },
        {
        name: "Space",
        defaultPoints: 2
        },
        {
        name: "Interstellar",
        defaultPoints: 2
        },
        {
        name: "Multiverse",
        defaultPoints: 3
        },
        {
        name: "Quantum",
        defaultPoints: 3
        },
        {
        name: "Underworld",
        defaultPoints: 3
        },
        {
        name: "Divine",
        defaultPoints: 3
        },
    ]
},
{
    id: 2,
    name: "Dungeons",
    actions: [
        {
            name: "Hammer Dungeon",
            defaultPoints: 3000,
        },
        {
            name: "Ghost Dungeon",
            defaultPoints: 3000,
        },
        {
            name: "Invasion Dungeon",
            defaultPoints: 3000,
        },
        {
            name: "Zombie Dungeon",
            defaultPoints: 3000,
        },
    ],
    customAction: {
        name: "Dungeon Keys",
        defaultPoints: 3000,
    }
},
{
    id: 3,
    name: "Hatch Eggs",
    actions: [
        {
            name: "Common Egg",
            defaultPoints: 400,
        },
        {
            name: "Rare Egg",
            defaultPoints: 1600,
        },
        {
            name: "Epic Egg",
            defaultPoints: 3200,
        },
        {
            name: "Legendary Egg",
            defaultPoints: 6400,
        },
        {
            name: "Ultimate Egg",
            defaultPoints: 12800,
        },
        {
            name: "Mythic Egg",
            defaultPoints: 25600,
        },
    ]
}, 
{
    id: 4,
    name: "Merge Pets",
    actions: [
        {
            name: "Common Pet",
            defaultPoints: 1250,
        },
        {
            name: "Rare Pet",
            defaultPoints: 1250,
        },
        {
            name: "Epic Pet",
            defaultPoints: 1250,
        },
        {
            name: "Legendary Pet",
            defaultPoints: 1250,
        },
        {
            name: "Ultimate Pet",
            defaultPoints: 1250,
        },
        {
            name: "Mythic Pet",
            defaultPoints: 1250,
        }
    ],
    customAction: {
        name: "Merge Pets",
        defaultPoints: 1250,
        
    }
},
{
    id: 5,
    name: "Summon Mounts",
    actions: [
        {
            name: "Common Mount",
            defaultPoints: 600,
        },
        {
            name: "Rare Mount",
            defaultPoints: 600,
        },
        {
            name: "Epic Mount",
            defaultPoints: 600
        },
        {
            name: "Legendary Mount",
            defaultPoints: 600
        },
        {
            name: "Ultimate Mount",
            defaultPoints: 600
        },
        {
            name: "Mythic Mount",
            defaultPoints: 600
        }
    ],
    customAction: {
        name: "Summon Mounts",
        defaultPoints: 600
    },
    defaultCost: 50,
},
{
    id: 6,
    name: "Merge Mounts",
    actions: [
        {
            name: "Common Mount",
            defaultPoints: 600,
        },
        {
            name: "Rare Mount",
            defaultPoints: 600,
        },
        {
            name: "Epic Mount",
            defaultPoints: 600
        },
        {
            name: "Legendary Mount",
            defaultPoints: 600
        },
        {
            name: "Ultimate Mount",
            defaultPoints: 600
        },
        {
            name: "Mythic Mount",
            defaultPoints: 600
        }
    ],
    customAction: {
        name: "Merge Mounts",
        defaultPoints: 600
    }
},
{
    id: 7,
    name: "Tech",
    actions: [
        {
            name: "Tech I",
            defaultPoints: 920
        },
        {
            name: "Tech II",
            defaultPoints: 9000
        },
        {
            name: "Tech III",
            defaultPoints: 26000
        },
        {
            name: "Tech IV",
            defaultPoints: 47800
        },
        {
            name: "Tech V",
            defaultPoints: 90700
        }
    ]
},
{
    id: 8,
    name: "Spending",
    actions: [
        {
            name: "Spend 1000 Coins on Forge",
            defaultPoints: 27
        },
        {
            name: "Spend 1 Gem on Forge",
            defaultPoints: 50
        }    
    ]
},
{
    id: 9,
    name: "Summon Skills",
    actions: [
        {
            name: "Common Skill",
            defaultPoints: 125,
        },
        {
            name: "Rare Skill",
            defaultPoints: 125,
        },
        {
            name: "Epic Skill",
            defaultPoints: 125,
        },
        {
            name: "Legendary Skill",
            defaultPoints: 125,
        },
        {
            name: "Ultimate Skill",
            defaultPoints: 125,
        },
        {
            name: "Mythic Skill",
            defaultPoints: 125,
        }
    ],
    customAction:{
        name: "Summon Skills",
        defaultPoints: 125
    },
    defaultCost: 200,
},
{
    id:10,
    name: "Upgrade Skills",
    actions: [
        {
            name: "Common Skill",
            defaultPoints: 125,
        },
        {
            name: "Rare Skill",
            defaultPoints: 125,
        },
        {
            name: "Epic Skill",
            defaultPoints: 125,
        },
        {
            name: "Legendary Skill",
            defaultPoints: 125,
        },
        {
            name: "Ultimate Skill",
            defaultPoints: 125,
        },
        {
            name: "Mythic Skill",
            defaultPoints: 125,
        }
    ],
    customAction:{
        name: "Upgrade Skills",
        defaultPoints: 125
    }
}
]

export const warDaysActions: number[][] = [
    [1, 2, 9, 10],
    [8, 7, 5, 6],
    [1, 9, 10, 3, 4],
    [8, 2, 5, 6],
    [1, 7, 3, 4]
]

export const forgeLevels: forgeLevelType[] = [
    {
        level: 1,
        totalCost: null,
        gemCost: null,
        forgeChances: {
            primitive: 1.0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 2,
        totalCost: 400,
        gemCost: 1,
        forgeChances: {
            primitive: 0.99,
            medieval: 0.01,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 3,
        totalCost: 700,
        gemCost: 2,
        forgeChances: {
            primitive: 0.98,
            medieval: 0.02,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 4,
        totalCost: 1500,
        gemCost: 4,
        forgeChances: {
            primitive: 0.96,
            medieval: 0.04,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 5,
        totalCost: 3500,
        gemCost: 8,
        forgeChances: {
            primitive: 0.915,
            medieval: 0.08,
            earlyModern: 0.005,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 6,
        totalCost: 10000,
        gemCost: 17,
        forgeChances: {
            primitive: 0.82,
            medieval: 0.16,
            earlyModern: 0.02,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 7,
        totalCost: 25000,
        gemCost: 63,
        forgeChances: {
            primitive: 0.64,
            medieval: 0.32,
            earlyModern: 0.04,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 8,
        totalCost: 50000,
        gemCost: 109,
        forgeChances: {
            primitive: 0.278,
            medieval: 0.64,
            earlyModern: 0.08,
            modern: 0.002,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 9,
        totalCost: 100000,
        gemCost: 155,
        forgeChances: {
            primitive: 0.13,
            medieval: 0.70,
            earlyModern: 0.16,
            modern: 0.01,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 10,
        totalCost: 150000,
        gemCost: 201,
        forgeChances: {
            primitive: 0.06,
            medieval: 0.60,
            earlyModern: 0.32,
            modern: 0.02,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 11,
        totalCost: 250000,
        gemCost: 247,
        forgeChances: {
            primitive: 0,
            medieval: 0.319,
            earlyModern: 0.64,
            modern: 0.04,
            space: 0.001,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 12,
        totalCost: 350000,
        gemCost: 293,
        forgeChances: {
            primitive: 0,
            medieval: 0.275,
            earlyModern: 0.64,
            modern: 0.08,
            space: 0.005,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 13,
        totalCost: 450000,
        gemCost: 339,
        forgeChances: {
            primitive: 0,
            medieval: 0.08,
            earlyModern: 0.75,
            modern: 0.16,
            space: 0.01,
            interstellar: 0,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 14,
        totalCost: 600000,
        gemCost: 385,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0.66,
            modern: 0.32,
            space: 0.02,
            interstellar: 0.0005,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 15,
        totalCost: 800000,
        gemCost: 431,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0.317,
            modern: 0.64,
            space: 0.04,
            interstellar: 0.0025,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 16,
        totalCost: 910000,
        gemCost: 477,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0.215,
            modern: 0.70,
            space: 0.08,
            interstellar: 0.005,
            multiverse: 0,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 17,
        totalCost: 1020000,
        gemCost: 523,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0.829,
            space: 0.16,
            interstellar: 0.01,
            multiverse: 0.0005,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 18,
        totalCost: 1130000,
        gemCost: 569,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0.657,
            space: 0.32,
            interstellar: 0.02,
            multiverse: 0.0025,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 19,
        totalCost: 1240000,
        gemCost: 638,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0.315,
            space: 0.64,
            interstellar: 0.04,
            multiverse: 0.005,
            quantum: 0,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 20,
        totalCost: 1350000,
        gemCost: 707,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0.91,
            interstellar: 0.08,
            multiverse: 0.01,
            quantum: 0.0005,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 21,
        totalCost: 1460000,
        gemCost: 776,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0.817,
            interstellar: 0.16,
            multiverse: 0.02,
            quantum: 0.0025,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 22,
        totalCost: 1570000,
        gemCost: 845,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0.635,
            interstellar: 0.32,
            multiverse: 0.04,
            quantum: 0.005,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 23,
        totalCost: 1680000,
        gemCost: 914,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0.27,
            interstellar: 0.64,
            multiverse: 0.08,
            quantum: 0.01,
            underworld: 0,
            divine: 0
        }
    },
    {
        level: 24,
        totalCost: 1790000,
        gemCost: 983,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.82,
            multiverse: 0.16,
            quantum: 0.02,
            underworld: 0.0002,
            divine: 0
        }
    },
    {
        level: 25,
        totalCost: 1900000,
        gemCost: 1050,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.64,
            multiverse: 0.32,
            quantum: 0.04,
            underworld: 0.0005,
            divine: 0
        }
    },
    {
        level: 26,
        totalCost: 2010000,
        gemCost: 1120,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.438,
            multiverse: 0.50,
            quantum: 0.06,
            underworld: 0.0025,
            divine: 0
        }
    },
    {
        level: 27,
        totalCost: 2120000,
        gemCost: 1190,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.315,
            multiverse: 0.60,
            quantum: 0.08,
            underworld: 0.005,
            divine: 0
        }
    },
    {
        level: 28,
        totalCost: 2230000,
        gemCost: 1250,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.21,
            multiverse: 0.65,
            quantum: 0.13,
            underworld: 0.01,
            divine: 0
        }
    },
    {
        level: 29,
        totalCost: 2340000,
        gemCost: 1320,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0.0699,
            multiverse: 0.68,
            quantum: 0.23,
            underworld: 0.02,
            divine: 0.0002
        }
    },
    {
        level: 30,
        totalCost: 2450000,
        gemCost: 1390,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0.5995,
            quantum: 0.36,
            underworld: 0.04,
            divine: 0.0005
        }
    },
    {
        level: 31,
        totalCost: 2560000,
        gemCost: 1460,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0.5075,
            quantum: 0.43,
            underworld: 0.06,
            divine: 0.0025
        }
    },
    {
        level: 32,
        totalCost: 2670000,
        gemCost: 1530,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0.415,
            quantum: 0.50,
            underworld: 0.08,
            divine: 0.005
        }
    },
    {
        level: 33,
        totalCost: 2780000,
        gemCost: 1600,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0.28,
            quantum: 0.58,
            underworld: 0.13,
            divine: 0.01
        }
    },
    {
        level: 34,
        totalCost: 2890000,
        gemCost: 1670,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0.11,
            quantum: 0.64,
            underworld: 0.23,
            divine: 0.02
        }
    },
    {
        level: 35,
        totalCost: 3000000,
        gemCost: 1740,
        forgeChances: {
            primitive: 0,
            medieval: 0,
            earlyModern: 0,
            modern: 0,
            space: 0,
            interstellar: 0,
            multiverse: 0,
            quantum: 0.60,
            underworld: 0.36,
            divine: 0.04
        }
    }
];