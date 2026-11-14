import type { forgeLevelType, mountLevelType, petLevelType, skillLevelType } from "../types/types";

export const forgeLevels: forgeLevelType[] = [
    {
        level: 1,
        totalCost: null,
        totalSummon: null,
        gemCost: null,
        time: null,
        chances: {
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
        totalSummon: null,
        gemCost: 1,
        time: 300,
        chances: {
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
        totalSummon: null,
        gemCost: 2,
        time: 900,
        chances: {
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
        totalSummon: null,
        gemCost: 4,
        time: 1800,
        chances: {
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
        totalSummon: null,
        gemCost: 8,
        time: 3600,
        chances: {
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
        totalSummon: null,
        gemCost: 17,
        time: 7200,
        chances: {
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
        totalSummon: null,
        gemCost: 63,
        time: 27180,
        chances: {
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
        totalSummon: null,
        gemCost: 109,
        time: 47160,
        chances: {
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
        totalSummon: null,
        gemCost: 155,
        time: 67140,
        chances: {
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
        totalSummon: null,
        gemCost: 201,
        time: 87180,
        chances: {
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
        totalSummon: null,
        gemCost: 247,
        time: 104400,
        chances: {
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
        totalSummon: null,
        gemCost: 293,
        time: 126000,
        chances: {
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
        totalSummon: null,
        gemCost: 339,
        time: 144000,
        chances: {
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
        totalSummon: null,
        gemCost: 385,
        time: 165600,
        chances: {
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
        totalSummon: null,
        gemCost: 431,
        time: 187200,
        chances: {
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
        totalSummon: null,
        gemCost: 477,
        time: 205200,
        chances: {
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
        totalSummon: null,
        gemCost: 523,
        time: 226800,
        chances: {
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
        totalSummon: null,
        gemCost: 569,
        time: 244800,
        chances: {
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
        totalSummon: null,
        gemCost: 638,
        time: 277200,
        chances: {
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
        totalSummon: null,
        gemCost: 707,
        time: 306000,
        chances: {
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
        totalSummon: null,
        gemCost: 776,
        time: 334800,
        chances: {
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
        totalSummon: null,
        gemCost: 845,
        time: 363600,
        chances: {
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
        totalSummon: null,
        gemCost: 914,
        time: 396000,
        chances: {
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
        totalSummon: null,
        gemCost: 983,
        time: 424800,
        chances: {
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
        totalSummon: null,
        gemCost: 1050,
        time: 457200,
        chances: {
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
        totalSummon: null,
        gemCost: 1120,
        time: 486000,
        chances: {
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
        totalSummon: null,
        gemCost: 1190,
        time: 514800,
        chances: {
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
        totalSummon: null,
        gemCost: 1250,
        time: 547200,
        chances: {
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
        totalSummon: null,
        gemCost: 1320,
        time: 576000,
        chances: {
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
        totalSummon: null,
        gemCost: 1390,
        time: 607200,
        chances: {
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
        totalSummon: null,
        gemCost: 1460,
        time: 633600,
        chances: {
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
        totalSummon: null,
        gemCost: 1530,
        time: 666000,
        chances: {
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
        totalSummon: null,
        gemCost: 1600,
        time: 694800,
        chances: {
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
        totalSummon: null,
        gemCost: 1670,
        time: 727200,
        chances: {
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
        totalSummon: null,
        gemCost: 1740,
        time: 756000,
        chances: {
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

export const skillLevels: skillLevelType[] = [
  {
    level: 1,
    summon: 2,
    totalSummon: 2,
    cost: 80,
    totalCost: 80,
    chances: { common: 100, rare: 0, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 2,
    summon: 4,
    totalSummon: 6,
    cost: 160,
    totalCost: 240,
    chances: { common: 99.95, rare: 0.05, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 3,
    summon: 6,
    totalSummon: 12,
    cost: 240,
    totalCost: 480,
    chances: { common: 99.90, rare: 0.10, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 4,
    summon: 8,
    totalSummon: 20,
    cost: 320,
    totalCost: 800,
    chances: { common: 99.75, rare: 0.25, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 5,
    summon: 10,
    totalSummon: 30,
    cost: 400,
    totalCost: 1200,
    chances: { common: 99, rare: 1, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 6,
    summon: 12,
    totalSummon: 42,
    cost: 480,
    totalCost: 1680,
    chances: { common: 98, rare: 2, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 7,
    summon: 14,
    totalSummon: 56,
    cost: 560,
    totalCost: 2240,
    chances: { common: 96, rare: 4, epic: 0, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 8,
    summon: 16,
    totalSummon: 72,
    cost: 640,
    totalCost: 2880,
    chances: { common: 94.89, rare: 5.08, epic: 0.03, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 9,
    summon: 18,
    totalSummon: 90,
    cost: 720,
    totalCost: 3600,
    chances: { common: 93.49, rare: 6.45, epic: 0.06, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 10,
    summon: 20,
    totalSummon: 110,
    cost: 800,
    totalCost: 4400,
    chances: { common: 91.68, rare: 8.19, epic: 0.12, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 11,
    summon: 30,
    totalSummon: 140,
    cost: 1200,
    totalCost: 5600,
    chances: { common: 89.34, rare: 10.41, epic: 0.25, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 12,
    summon: 40,
    totalSummon: 180,
    cost: 1600,
    totalCost: 7200,
    chances: { common: 86.28, rare: 13.21, epic: 0.50, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 13,
    summon: 50,
    totalSummon: 230,
    cost: 2000,
    totalCost: 9200,
    chances: { common: 82.22, rare: 16.78, epic: 1, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 14,
    summon: 60,
    totalSummon: 290,
    cost: 2400,
    totalCost: 11600,
    chances: { common: 76.69, rare: 21.31, epic: 2, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 15,
    summon: 80,
    totalSummon: 370,
    cost: 3200,
    totalCost: 14800,
    chances: { common: 68.93, rare: 27.07, epic: 4, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 16,
    summon: 100,
    totalSummon: 470,
    cost: 4000,
    totalCost: 18800,
    chances: { common: 61.18, rare: 34.38, epic: 4.44, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 17,
    summon: 110,
    totalSummon: 580,
    cost: 4400,
    totalCost: 23200,
    chances: { common: 51.41, rare: 43.66, epic: 4.93, legendary: 0, ultimate: 0, mythic: 0 }
  },
  {
    level: 18,
    summon: 110,
    totalSummon: 690,
    cost: 4400,
    totalCost: 27600,
    chances: { common: 39.05, rare: 55.45, epic: 5.47, legendary: 0.03, ultimate: 0, mythic: 0 }
  },
  {
    level: 19,
    summon: 110,
    totalSummon: 800,
    cost: 4400,
    totalCost: 32000,
    chances: { common: 23.44, rare: 70.45, epic: 6.07, legendary: 0.06, ultimate: 0, mythic: 0 }
  },
  {
    level: 20,
    summon: 110,
    totalSummon: 910,
    cost: 4400,
    totalCost: 36400,
    chances: { common: 17.50, rare: 75.63, epic: 6.74, legendary: 0.12, ultimate: 0, mythic: 0 }
  },
  {
    level: 21,
    summon: 110,
    totalSummon: 1020,
    cost: 4400,
    totalCost: 40800,
    chances: { common: 17.50, rare: 74.77, epic: 7.48, legendary: 0.25, ultimate: 0, mythic: 0 }
  },
  {
    level: 22,
    summon: 110,
    totalSummon: 1130,
    cost: 4400,
    totalCost: 45200,
    chances: { common: 17.50, rare: 73.69, epic: 8.31, legendary: 0.50, ultimate: 0, mythic: 0 }
  },
  {
    level: 23,
    summon: 110,
    totalSummon: 1240,
    cost: 4400,
    totalCost: 49600,
    chances: { common: 17.50, rare: 72.28, epic: 9.22, legendary: 1, ultimate: 0, mythic: 0 }
  },
  {
    level: 24,
    summon: 110,
    totalSummon: 1350,
    cost: 4400,
    totalCost: 54000,
    chances: { common: 17.50, rare: 70.27, epic: 10.23, legendary: 2, ultimate: 0, mythic: 0 }
  },
  {
    level: 25,
    summon: 110,
    totalSummon: 1460,
    cost: 4400,
    totalCost: 58400,
    chances: { common: 17.50, rare: 67.14, epic: 11.36, legendary: 4, ultimate: 0, mythic: 0 }
  },
  {
    level: 26,
    summon: 110,
    totalSummon: 1570,
    cost: 4400,
    totalCost: 62800,
    chances: { common: 17.50, rare: 65.67, epic: 12.61, legendary: 4.22, ultimate: 0, mythic: 0 }
  },
  {
    level: 27,
    summon: 110,
    totalSummon: 1680,
    cost: 4400,
    totalCost: 67200,
    chances: { common: 17.50, rare: 64.05, epic: 13.99, legendary: 4.45, ultimate: 0, mythic: 0 }
  },
  {
    level: 28,
    summon: 110,
    totalSummon: 1790,
    cost: 4400,
    totalCost: 71600,
    chances: { common: 17.50, rare: 62.27, epic: 15.53, legendary: 4.70, ultimate: 0, mythic: 0 }
  },
  {
    level: 29,
    summon: 110,
    totalSummon: 1900,
    cost: 4400,
    totalCost: 76000,
    chances: { common: 17.50, rare: 60.30, epic: 17.24, legendary: 4.96, ultimate: 0, mythic: 0 }
  },
  {
    level: 30,
    summon: 110,
    totalSummon: 2010,
    cost: 4400,
    totalCost: 80400,
    chances: { common: 17.50, rare: 58.13, epic: 19.14, legendary: 5.23, ultimate: 0, mythic: 0 }
  },
  {
    level: 31,
    summon: 110,
    totalSummon: 2120,
    cost: 4400,
    totalCost: 84800,
    chances: { common: 17.50, rare: 55.74, epic: 21.24, legendary: 5.51, ultimate: 0, mythic: 0 }
  },
  {
    level: 32,
    summon: 110,
    totalSummon: 2230,
    cost: 4400,
    totalCost: 89200,
    chances: { common: 17.50, rare: 53.10, epic: 23.58, legendary: 5.82, ultimate: 0, mythic: 0 }
  },
  {
    level: 33,
    summon: 110,
    totalSummon: 2340,
    cost: 4400,
    totalCost: 93600,
    chances: { common: 17.50, rare: 50.19, epic: 26.17, legendary: 6.14, ultimate: 0, mythic: 0 }
  },
  {
    level: 34,
    summon: 110,
    totalSummon: 2450,
    cost: 4400,
    totalCost: 98000,
    chances: { common: 17.50, rare: 46.97, epic: 29.05, legendary: 6.48, ultimate: 0, mythic: 0 }
  },
  {
    level: 35,
    summon: 110,
    totalSummon: 2560,
    cost: 4400,
    totalCost: 102400,
    chances: { common: 17.50, rare: 43.42, epic: 32.25, legendary: 6.83, ultimate: 0, mythic: 0 }
  },
  {
    level: 36,
    summon: 110,
    totalSummon: 2670,
    cost: 4400,
    totalCost: 106800,
    chances: { common: 17.50, rare: 39.50, epic: 35.80, legendary: 7.21, ultimate: 0, mythic: 0 }
  },
  {
    level: 37,
    summon: 110,
    totalSummon: 2780,
    cost: 4400,
    totalCost: 111200,
    chances: { common: 17.50, rare: 35.16, epic: 39.73, legendary: 7.61, ultimate: 0, mythic: 0 }
  },
  {
    level: 38,
    summon: 110,
    totalSummon: 2890,
    cost: 4400,
    totalCost: 115600,
    chances: { common: 17.50, rare: 30.37, epic: 44.11, legendary: 8.02, ultimate: 0, mythic: 0 }
  },
  {
    level: 39,
    summon: 110,
    totalSummon: 3000,
    cost: 4400,
    totalCost: 120000,
    chances: { common: 17.50, rare: 25.05, epic: 48.96, legendary: 8.46, ultimate: 0.03, mythic: 0 }
  },
  {
    level: 40,
    summon: 110,
    totalSummon: 3110,
    cost: 4400,
    totalCost: 124400,
    chances: { common: 17.50, rare: 19.17, epic: 54.34, legendary: 8.93, ultimate: 0.06, mythic: 0 }
  },
  {
    level: 41,
    summon: 110,
    totalSummon: 3220,
    cost: 4400,
    totalCost: 128800,
    chances: { common: 17.50, rare: 16.50, epic: 56.45, legendary: 9.42, ultimate: 0.12, mythic: 0 }
  },
  {
    level: 42,
    summon: 110,
    totalSummon: 3330,
    cost: 4400,
    totalCost: 133200,
    chances: { common: 17.50, rare: 16.50, epic: 55.81, legendary: 9.94, ultimate: 0.25, mythic: 0 }
  },
  {
    level: 43,
    summon: 110,
    totalSummon: 3440,
    cost: 4400,
    totalCost: 137600,
    chances: { common: 17.50, rare: 16.50, epic: 55.01, legendary: 10.49, ultimate: 0.50, mythic: 0 }
  },
  {
    level: 44,
    summon: 110,
    totalSummon: 3550,
    cost: 4400,
    totalCost: 142000,
    chances: { common: 17.50, rare: 16.50, epic: 53.94, legendary: 11.06, ultimate: 1, mythic: 0 }
  },
  {
    level: 45,
    summon: 110,
    totalSummon: 3660,
    cost: 4400,
    totalCost: 146400,
    chances: { common: 17.50, rare: 16.50, epic: 52.33, legendary: 11.67, ultimate: 2, mythic: 0 }
  },
  {
    level: 46,
    summon: 110,
    totalSummon: 3770,
    cost: 4400,
    totalCost: 150800,
    chances: { common: 17.50, rare: 16.50, epic: 49.69, legendary: 12.31, ultimate: 4, mythic: 0 }
  },
  {
    level: 47,
    summon: 110,
    totalSummon: 3880,
    cost: 4400,
    totalCost: 155200,
    chances: { common: 17.50, rare: 16.50, epic: 48.79, legendary: 12.99, ultimate: 4.22, mythic: 0 }
  },
  {
    level: 48,
    summon: 110,
    totalSummon: 3990,
    cost: 4400,
    totalCost: 159600,
    chances: { common: 17.50, rare: 16.50, epic: 47.84, legendary: 13.71, ultimate: 4.45, mythic: 0 }
  },
  {
    level: 49,
    summon: 110,
    totalSummon: 4100,
    cost: 4400,
    totalCost: 164000,
    chances: { common: 17.50, rare: 16.50, epic: 46.85, legendary: 14.46, ultimate: 4.70, mythic: 0 }
  },
  {
    level: 50,
    summon: 110,
    totalSummon: 4210,
    cost: 4400,
    totalCost: 168400,
    chances: { common: 17.50, rare: 16.50, epic: 45.79, legendary: 15.25, ultimate: 4.96, mythic: 0 }
  },
  {
    level: 51,
    summon: 110,
    totalSummon: 4320,
    cost: 4400,
    totalCost: 172800,
    chances: { common: 17.50, rare: 16.50, epic: 44.68, legendary: 16.09, ultimate: 5.23, mythic: 0 }
  },
  {
    level: 52,
    summon: 110,
    totalSummon: 4430,
    cost: 4400,
    totalCost: 177200,
    chances: { common: 17.50, rare: 16.50, epic: 43.51, legendary: 16.98, ultimate: 5.51, mythic: 0 }
  },
  {
    level: 53,
    summon: 110,
    totalSummon: 4540,
    cost: 4400,
    totalCost: 181600,
    chances: { common: 17.50, rare: 16.50, epic: 42.27, legendary: 17.91, ultimate: 5.82, mythic: 0 }
  },
  {
    level: 54,
    summon: 110,
    totalSummon: 4650,
    cost: 4400,
    totalCost: 186000,
    chances: { common: 17.50, rare: 16.50, epic: 40.97, legendary: 18.90, ultimate: 6.14, mythic: 0 }
  },
  {
    level: 55,
    summon: 110,
    totalSummon: 4760,
    cost: 4400,
    totalCost: 190400,
    chances: { common: 17.50, rare: 16.50, epic: 39.59, legendary: 19.94, ultimate: 6.48, mythic: 0 }
  },
  {
    level: 56,
    summon: 110,
    totalSummon: 4870,
    cost: 4400,
    totalCost: 194800,
    chances: { common: 17.50, rare: 16.50, epic: 38.13, legendary: 21.03, ultimate: 6.83, mythic: 0 }
  },
  {
    level: 57,
    summon: 110,
    totalSummon: 4980,
    cost: 4400,
    totalCost: 199200,
    chances: { common: 17.50, rare: 16.50, epic: 36.60, legendary: 22.19, ultimate: 7.21, mythic: 0 }
  },
  {
    level: 58,
    summon: 110,
    totalSummon: 5090,
    cost: 4400,
    totalCost: 203600,
    chances: { common: 17.50, rare: 16.50, epic: 34.99, legendary: 23.41, ultimate: 7.61, mythic: 0 }
  },
  {
    level: 59,
    summon: 110,
    totalSummon: 5200,
    cost: 4400,
    totalCost: 208000,
    chances: { common: 17.50, rare: 16.50, epic: 33.28, legendary: 24.70, ultimate: 8.02, mythic: 0 }
  },
  {
    level: 60,
    summon: 110,
    totalSummon: 5310,
    cost: 4400,
    totalCost: 212400,
    chances: { common: 17.50, rare: 16.50, epic: 31.48, legendary: 26.06, ultimate: 8.46, mythic: 0 }
  },
  {
    level: 61,
    summon: 110,
    totalSummon: 5420,
    cost: 4400,
    totalCost: 216800,
    chances: { common: 17.50, rare: 16.50, epic: 29.58, legendary: 27.49, ultimate: 8.93, mythic: 0 }
  },
  {
    level: 62,
    summon: 110,
    totalSummon: 5530,
    cost: 4400,
    totalCost: 221200,
    chances: { common: 17.50, rare: 16.50, epic: 27.58, legendary: 29, ultimate: 9.42, mythic: 0 }
  },
  {
    level: 63,
    summon: 110,
    totalSummon: 5640,
    cost: 4400,
    totalCost: 225600,
    chances: { common: 17.50, rare: 16.50, epic: 25.47, legendary: 30.59, ultimate: 9.94, mythic: 0 }
  },
  {
    level: 64,
    summon: 110,
    totalSummon: 5750,
    cost: 4400,
    totalCost: 230000,
    chances: { common: 17.50, rare: 16.50, epic: 23.24, legendary: 32.28, ultimate: 10.49, mythic: 0 }
  },
  {
    level: 65,
    summon: 110,
    totalSummon: 5860,
    cost: 4400,
    totalCost: 234400,
    chances: { common: 17.50, rare: 16.50, epic: 20.88, legendary: 34.05, ultimate: 11.06, mythic: 0 }
  },
  {
    level: 66,
    summon: 110,
    totalSummon: 5970,
    cost: 4400,
    totalCost: 238800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 37.83, ultimate: 11.67, mythic: 0 }
  },
  {
    level: 67,
    summon: 110,
    totalSummon: 6080,
    cost: 4400,
    totalCost: 243200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 37.19, ultimate: 12.31, mythic: 0 }
  },
  {
    level: 68,
    summon: 110,
    totalSummon: 6190,
    cost: 4400,
    totalCost: 247600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 36.48, ultimate: 12.99, mythic: 0.03 }
  },
  {
    level: 69,
    summon: 110,
    totalSummon: 6300,
    cost: 4400,
    totalCost: 252000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 35.73, ultimate: 13.71, mythic: 0.06 }
  },
  {
    level: 70,
    summon: 110,
    totalSummon: 6410,
    cost: 4400,
    totalCost: 256400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 34.92, ultimate: 14.46, mythic: 0.12 }
  },
  {
    level: 71,
    summon: 110,
    totalSummon: 6520,
    cost: 4400,
    totalCost: 260800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 34, ultimate: 15.25, mythic: 0.25 }
  },
  {
    level: 72,
    summon: 110,
    totalSummon: 6630,
    cost: 4400,
    totalCost: 265200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 32.91, ultimate: 16.09, mythic: 0.50 }
  },
  {
    level: 73,
    summon: 110,
    totalSummon: 6740,
    cost: 4400,
    totalCost: 269600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 31.52, ultimate: 16.98, mythic: 1 }
  },
  {
    level: 74,
    summon: 110,
    totalSummon: 6850,
    cost: 4400,
    totalCost: 274000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 29.59, ultimate: 17.91, mythic: 2 }
  },
  {
    level: 75,
    summon: 110,
    totalSummon: 6960,
    cost: 4400,
    totalCost: 278400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 26.60, ultimate: 18.90, mythic: 4 }
  },
  {
    level: 76,
    summon: 110,
    totalSummon: 7070,
    cost: 4400,
    totalCost: 282800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 25.33, ultimate: 19.94, mythic: 4.23 }
  },
  {
    level: 77,
    summon: 110,
    totalSummon: 7180,
    cost: 4400,
    totalCost: 287200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 23.99, ultimate: 21.03, mythic: 4.48 }
  },
  {
    level: 78,
    summon: 110,
    totalSummon: 7290,
    cost: 4400,
    totalCost: 291600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 22.57, ultimate: 22.19, mythic: 4.74 }
  },
  {
    level: 79,
    summon: 110,
    totalSummon: 7400,
    cost: 4400,
    totalCost: 296000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 21.08, ultimate: 23.41, mythic: 5.01 }
  },
  {
    level: 80,
    summon: 110,
    totalSummon: 7510,
    cost: 4400,
    totalCost: 300400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 19.50, ultimate: 24.70, mythic: 5.30 }
  },
  {
    level: 81,
    summon: 110,
    totalSummon: 7620,
    cost: 4400,
    totalCost: 304800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 17.83, ultimate: 26.06, mythic: 5.61 }
  },
  {
    level: 82,
    summon: 110,
    totalSummon: 7730,
    cost: 4400,
    totalCost: 309200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 27.06, mythic: 5.94 }
  },
  {
    level: 83,
    summon: 110,
    totalSummon: 7840,
    cost: 4400,
    totalCost: 313600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 26.72, mythic: 6.28 }
  },
  {
    level: 84,
    summon: 110,
    totalSummon: 7950,
    cost: 4400,
    totalCost: 318000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 26.36, mythic: 6.64 }
  },
  {
    level: 85,
    summon: 110,
    totalSummon: 8060,
    cost: 4400,
    totalCost: 322400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 25.97, mythic: 7.03 }
  },
  {
    level: 86,
    summon: 110,
    totalSummon: 8170,
    cost: 4400,
    totalCost: 326800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 25.56, mythic: 7.44 }
  },
  {
    level: 87,
    summon: 110,
    totalSummon: 8280,
    cost: 4400,
    totalCost: 331200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 25.13, mythic: 7.87 }
  },
  {
    level: 88,
    summon: 110,
    totalSummon: 8390,
    cost: 4400,
    totalCost: 335600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 24.67, mythic: 8.32 }
  },
  {
    level: 89,
    summon: 110,
    totalSummon: 8500,
    cost: 4400,
    totalCost: 340000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 24.19, mythic: 8.81 }
  },
  {
    level: 90,
    summon: 110,
    totalSummon: 8610,
    cost: 4400,
    totalCost: 344400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 23.68, mythic: 9.32 }
  },
  {
    level: 91,
    summon: 110,
    totalSummon: 8720,
    cost: 4400,
    totalCost: 348800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 23.14, mythic: 9.86 }
  },
  {
    level: 92,
    summon: 110,
    totalSummon: 8830,
    cost: 4400,
    totalCost: 353200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 22.57, mythic: 10.43 }
  },
  {
    level: 93,
    summon: 110,
    totalSummon: 8940,
    cost: 4400,
    totalCost: 357600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 21.96, mythic: 11.04 }
  },
  {
    level: 94,
    summon: 110,
    totalSummon: 9050,
    cost: 4400,
    totalCost: 362000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 21.32, mythic: 11.68 }
  },
  {
    level: 95,
    summon: 110,
    totalSummon: 9160,
    cost: 4400,
    totalCost: 366400,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 20.65, mythic: 12.35 }
  },
  {
    level: 96,
    summon: 110,
    totalSummon: 9270,
    cost: 4400,
    totalCost: 370800,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 19.93, mythic: 13.07 }
  },
  {
    level: 97,
    summon: 110,
    totalSummon: 9380,
    cost: 4400,
    totalCost: 375200,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 19.17, mythic: 13.83 }
  },
  {
    level: 98,
    summon: 110,
    totalSummon: 9490,
    cost: 4400,
    totalCost: 379600,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 18.37, mythic: 14.63 }
  },
  {
    level: 99,
    summon: 110,
    totalSummon: 9600,
    cost: 4400,
    totalCost: 384000,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 17.52, mythic: 15.48 }
  },
  {
    level: 100,
    summon: null,
    totalSummon: null,
    cost: null,
    totalCost: null,
    chances: { common: 17.50, rare: 16.50, epic: 16.50, legendary: 16.50, ultimate: 16.50, mythic: 16.50 }
  }
]


export const mountLevels: mountLevelType[] = [
  {
    level: 1,
    summon: 20,
    totalSummon: 20,
    cost: 1000,
    totalCost: 1000,
    chances: {
        common: 100.00,
        rare: 0.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 2,
    summon: 20,
    totalSummon: 40,
    cost: 1000,
    totalCost: 2000,
    chances: {
        common: 99.99,
        rare: 0.01,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 3,
    summon: 20,
    totalSummon: 60,
    cost: 1000,
    totalCost: 3000,
    chances: {
        common: 99.98,
        rare: 0.02,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 4,
    summon: 20,
    totalSummon: 80,
    cost: 1000,
    totalCost: 4000,
    chances: {
        common: 99.97,
        rare: 0.03,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 5,
    summon: 20,
    totalSummon: 100,
    cost: 1000,
    totalCost: 5000,
    chances: {
        common: 99.95,
        rare: 0.05,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 6,
    summon: 20,
    totalSummon: 120,
    cost: 1000,
    totalCost: 6000,
    chances: {
        common: 99.92,
        rare: 0.08,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 7,
    summon: 20,
    totalSummon: 140,
    cost: 1000,
    totalCost: 7000,
    chances: {
        common: 99.86,
        rare: 0.14,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 8,
    summon: 20,
    totalSummon: 160,
    cost: 1000,
    totalCost: 8000,
    chances: {
        common: 99.76,
        rare: 0.24,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 9,
    summon: 20,
    totalSummon: 180,
    cost: 1000,
    totalCost: 9000,
    chances: {
        common: 99.59,
        rare: 0.41,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 10,
    summon: 20,
    totalSummon: 200,
    cost: 1000,
    totalCost: 10000,
    chances: {
        common: 99.30,
        rare: 0.70,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 11,
    summon: 20,
    totalSummon: 220,
    cost: 1000,
    totalCost: 11000,
    chances: {
        common: 98.81,
        rare: 1.19,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 12,
    summon: 20,
    totalSummon: 240,
    cost: 1000,
    totalCost: 12000,
    chances: {
        common: 97.98,
        rare: 2.02,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 13,
    summon: 20,
    totalSummon: 260,
    cost: 1000,
    totalCost: 13000,
    chances: {
        common: 96.57,
        rare: 3.43,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 14,
    summon: 20,
    totalSummon: 280,
    cost: 1000,
    totalCost: 14000,
    chances: {
        common: 94.17,
        rare: 5.83,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 15,
    summon: 20,
    totalSummon: 300,
    cost: 1000,
    totalCost: 15000,
    chances: {
        common: 90.09,
        rare: 9.90,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 16,
    summon: 20,
    totalSummon: 320,
    cost: 1000,
    totalCost: 16000,
    chances: {
        common: 83.16,
        rare: 16.84,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 17,
    summon: 20,
    totalSummon: 340,
    cost: 1000,
    totalCost: 17000,
    chances: {
        common: 80.00,
        rare: 20.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 18,
    summon: 20,
    totalSummon: 360,
    cost: 1000,
    totalCost: 18000,
    chances: {
        common: 75.00,
        rare: 25.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 19,
    summon: 20,
    totalSummon: 380,
    cost: 1000,
    totalCost: 19000,
    chances: {
        common: 68.75,
        rare: 31.25,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 20,
    summon: 20,
    totalSummon: 400,
    cost: 1000,
    totalCost: 20000,
    chances: {
        common: 60.94,
        rare: 39.06,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 21,
    summon: 20,
    totalSummon: 420,
    cost: 1000,
    totalCost: 21000,
    chances: {
        common: 51.17,
        rare: 48.83,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 22,
    summon: 20,
    totalSummon: 440,
    cost: 1000,
    totalCost: 22000,
    chances: {
        common: 38.89,
        rare: 61.03,
        epic: 0.07,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 23,
    summon: 20,
    totalSummon: 460,
    cost: 1000,
    totalCost: 23000,
    chances: {
        common: 23.59,
        rare: 76.29,
        epic: 0.12,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 24,
    summon: 20,
    totalSummon: 480,
    cost: 1000,
    totalCost: 24000,
    chances: {
        common: 15.00,
        rare: 84.80,
        epic: 0.20,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 25,
    summon: 20,
    totalSummon: 500,
    cost: 1000,
    totalCost: 25000,
    chances: {
        common: 15.00,
        rare: 84.66,
        epic: 0.34,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 26,
    summon: 20,
    totalSummon: 520,
    cost: 1000,
    totalCost: 26000,
    chances: {
        common: 15.00,
        rare: 84.44,
        epic: 0.56,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 27,
    summon: 20,
    totalSummon: 540,
    cost: 1000,
    totalCost: 27000,
    chances: {
        common: 15.00,
        rare: 84.07,
        epic: 0.93,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 28,
    summon: 20,
    totalSummon: 560,
    cost: 1000,
    totalCost: 28000,
    chances: {
        common: 15.00,
        rare: 83.44,
        epic: 1.55,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 29,
    summon: 20,
    totalSummon: 580,
    cost: 1000,
    totalCost: 29000,
    chances: {
        common: 15.00,
        rare: 82.41,
        epic: 2.59,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 30,
    summon: 20,
    totalSummon: 600,
    cost: 1000,
    totalCost: 30000,
    chances: {
        common: 15.00,
        rare: 80.68,
        epic: 4.32,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 31,
    summon: 20,
    totalSummon: 620,
    cost: 1000,
    totalCost: 31000,
    chances: {
        common: 15.00,
        rare: 77.80,
        epic: 7.20,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 32,
    summon: 20,
    totalSummon: 640,
    cost: 1000,
    totalCost: 32000,
    chances: {
        common: 15.00,
        rare: 73.00,
        epic: 12.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 33,
    summon: 20,
    totalSummon: 660,
    cost: 1000,
    totalCost: 33000,
    chances: {
        common: 15.00,
        rare: 65.00,
        epic: 20.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 34,
    summon: 20,
    totalSummon: 680,
    cost: 1000,
    totalCost: 34000,
    chances: {
        common: 15.00,
        rare: 61.00,
        epic: 24.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 35,
    summon: 20,
    totalSummon: 700,
    cost: 1000,
    totalCost: 35000,
    chances: {
        common: 15.00,
        rare: 56.20,
        epic: 28.80,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 36,
    summon: 20,
    totalSummon: 720,
    cost: 1000,
    totalCost: 36000,
    chances: {
        common: 15.00,
        rare: 50.44,
        epic: 34.56,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 37,
    summon: 20,
    totalSummon: 740,
    cost: 1000,
    totalCost: 37000,
    chances: {
        common: 15.00,
        rare: 43.53,
        epic: 41.47,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 38,
    summon: 20,
    totalSummon: 760,
    cost: 1000,
    totalCost: 38000,
    chances: {
        common: 15.00,
        rare: 35.16,
        epic: 49.77,
        legendary: 0.07,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 39,
    summon: 20,
    totalSummon: 780,
    cost: 1000,
    totalCost: 39000,
    chances: {
        common: 15.00,
        rare: 25.16,
        epic: 59.72,
        legendary: 0.12,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 40,
    summon: 20,
    totalSummon: 800,
    cost: 1000,
    totalCost: 40000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 69.80,
        legendary: 0.20,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 41,
    summon: 20,
    totalSummon: 820,
    cost: 1000,
    totalCost: 41000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 69.66,
        legendary: 0.34,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 42,
    summon: 20,
    totalSummon: 840,
    cost: 1000,
    totalCost: 42000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 69.44,
        legendary: 0.56,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 43,
    summon: 20,
    totalSummon: 860,
    cost: 1000,
    totalCost: 43000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 69.07,
        legendary: 0.93,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 44,
    summon: 20,
    totalSummon: 880,
    cost: 1000,
    totalCost: 44000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 68.44,
        legendary: 1.55,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 45,
    summon: 20,
    totalSummon: 900,
    cost: 1000,
    totalCost: 45000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 67.41,
        legendary: 2.59,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 46,
    summon: 20,
    totalSummon: 920,
    cost: 1000,
    totalCost: 46000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 65.68,
        legendary: 4.32,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 47,
    summon: 20,
    totalSummon: 940,
    cost: 1000,
    totalCost: 47000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 62.80,
        legendary: 7.20,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 48,
    summon: 20,
    totalSummon: 960,
    cost: 1000,
    totalCost: 48000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 58.00,
        legendary: 12.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 49,
    summon: 20,
    totalSummon: 980,
    cost: 1000,
    totalCost: 49000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 50.00,
        legendary: 20.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 50,
    summon: 20,
    totalSummon: 1000,
    cost: 1000,
    totalCost: 50000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 48.50,
        legendary: 21.50,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 51,
    summon: 20,
    totalSummon: 1020,
    cost: 1000,
    totalCost: 51000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 46.89,
        legendary: 23.11,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 52,
    summon: 20,
    totalSummon: 1040,
    cost: 1000,
    totalCost: 52000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 45.15,
        legendary: 24.85,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 53,
    summon: 20,
    totalSummon: 1060,
    cost: 1000,
    totalCost: 53000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 43.29,
        legendary: 26.71,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 54,
    summon: 20,
    totalSummon: 1080,
    cost: 1000,
    totalCost: 54000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 41.29,
        legendary: 28.71,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 55,
    summon: 20,
    totalSummon: 1100,
    cost: 1000,
    totalCost: 55000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 39.06,
        legendary: 30.87,
        ultimate: 0.07,
        mythic: 0.00
    }
}, {
    level: 56,
    summon: 20,
    totalSummon: 1120,
    cost: 1000,
    totalCost: 56000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 36.70,
        legendary: 33.18,
        ultimate: 0.12,
        mythic: 0.00
    }
}, {
    level: 57,
    summon: 20,
    totalSummon: 1140,
    cost: 1000,
    totalCost: 57000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 34.13,
        legendary: 35.67,
        ultimate: 0.20,
        mythic: 0.00
    }
}, {
    level: 58,
    summon: 20,
    totalSummon: 1160,
    cost: 1000,
    totalCost: 58000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 31.32,
        legendary: 38.35,
        ultimate: 0.34,
        mythic: 0.00
    }
}, {
    level: 59,
    summon: 20,
    totalSummon: 1180,
    cost: 1000,
    totalCost: 59000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 28.22,
        legendary: 41.22,
        ultimate: 0.56,
        mythic: 0.00
    }
}, {
    level: 60,
    summon: 20,
    totalSummon: 1200,
    cost: 1000,
    totalCost: 60000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 24.75,
        legendary: 44.31,
        ultimate: 0.93,
        mythic: 0.00
    }
}, {
    level: 61,
    summon: 20,
    totalSummon: 1220,
    cost: 1000,
    totalCost: 61000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 20.81,
        legendary: 47.64,
        ultimate: 1.55,
        mythic: 0.00
    }
}, {
    level: 62,
    summon: 20,
    totalSummon: 1240,
    cost: 1000,
    totalCost: 62000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 52.41,
        ultimate: 2.59,
        mythic: 0.00
    }
}, {
    level: 63,
    summon: 20,
    totalSummon: 1260,
    cost: 1000,
    totalCost: 63000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 50.68,
        ultimate: 4.32,
        mythic: 0.00
    }
}, {
    level: 64,
    summon: 20,
    totalSummon: 1280,
    cost: 1000,
    totalCost: 64000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 47.80,
        ultimate: 7.20,
        mythic: 0.00
    }
}, {
    level: 65,
    summon: 20,
    totalSummon: 1300,
    cost: 1000,
    totalCost: 65000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 43.00,
        ultimate: 12.00,
        mythic: 0.00
    }
}, {
    level: 66,
    summon: 20,
    totalSummon: 1320,
    cost: 1000,
    totalCost: 66000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 35.00,
        ultimate: 20.00,
        mythic: 0.00
    }
}, {
    level: 67,
    summon: 20,
    totalSummon: 1340,
    cost: 1000,
    totalCost: 67000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.26,
        ultimate: 20.74,
        mythic: 0.00
    }
}, {
    level: 68,
    summon: 20,
    totalSummon: 1360,
    cost: 1000,
    totalCost: 68000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.49,
        ultimate: 21.51,
        mythic: 0.00
    }
}, {
    level: 69,
    summon: 20,
    totalSummon: 1380,
    cost: 1000,
    totalCost: 69000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.70,
        ultimate: 22.30,
        mythic: 0.00
    }
}, {
    level: 70,
    summon: 20,
    totalSummon: 1400,
    cost: 1000,
    totalCost: 70000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 31.87,
        ultimate: 23.13,
        mythic: 0.00
    }
}, {
    level: 71,
    summon: 20,
    totalSummon: 1420,
    cost: 1000,
    totalCost: 71000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 30.94,
        ultimate: 23.98,
        mythic: 0.07
    }
}, {
    level: 72,
    summon: 20,
    totalSummon: 1440,
    cost: 1000,
    totalCost: 72000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 30.01,
        ultimate: 24.87,
        mythic: 0.12
    }
}, {
    level: 73,
    summon: 20,
    totalSummon: 1460,
    cost: 1000,
    totalCost: 73000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 29.01,
        ultimate: 25.79,
        mythic: 0.20
    }
}, {
    level: 74,
    summon: 20,
    totalSummon: 1480,
    cost: 1000,
    totalCost: 74000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 27.92,
        ultimate: 26.75,
        mythic: 0.34
    }
}, {
    level: 75,
    summon: 20,
    totalSummon: 1500,
    cost: 1000,
    totalCost: 75000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 26.70,
        ultimate: 27.74,
        mythic: 0.56
    }
}, {
    level: 76,
    summon: 20,
    totalSummon: 1520,
    cost: 1000,
    totalCost: 76000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 25.30,
        ultimate: 28.76,
        mythic: 0.93
    }
}, {
    level: 77,
    summon: 20,
    totalSummon: 1540,
    cost: 1000,
    totalCost: 77000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 23.62,
        ultimate: 29.83,
        mythic: 1.55
    }
}, {
    level: 78,
    summon: 20,
    totalSummon: 1560,
    cost: 1000,
    totalCost: 78000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 21.48,
        ultimate: 30.93,
        mythic: 2.59
    }
}, {
    level: 79,
    summon: 20,
    totalSummon: 1580,
    cost: 1000,
    totalCost: 79000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 18.61,
        ultimate: 32.07,
        mythic: 4.32
    }
}, {
    level: 80,
    summon: 20,
    totalSummon: 1600,
    cost: 1000,
    totalCost: 80000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 32.80,
        mythic: 7.20
    }
}, {
    level: 81,
    summon: 20,
    totalSummon: 1620,
    cost: 1000,
    totalCost: 81000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 28.00,
        mythic: 12.00
    }
}, {
    level: 82,
    summon: 20,
    totalSummon: 1640,
    cost: 1000,
    totalCost: 82000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 20.00,
        mythic: 20.00
    }
}, {
    level: 83,
    summon: 20,
    totalSummon: 1660,
    cost: 1000,
    totalCost: 83000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.74,
        mythic: 20.26
    }
}, {
    level: 84,
    summon: 20,
    totalSummon: 1680,
    cost: 1000,
    totalCost: 84000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.48,
        mythic: 20.52
    }
}, {
    level: 85,
    summon: 20,
    totalSummon: 1700,
    cost: 1000,
    totalCost: 85000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.21,
        mythic: 20.79
    }
}, {
    level: 86,
    summon: 20,
    totalSummon: 1720,
    cost: 1000,
    totalCost: 86000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.94,
        mythic: 21.06
    }
}, {
    level: 87,
    summon: 20,
    totalSummon: 1740,
    cost: 1000,
    totalCost: 87000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.67,
        mythic: 21.33
    }
}, {
    level: 88,
    summon: 20,
    totalSummon: 1760,
    cost: 1000,
    totalCost: 88000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.39,
        mythic: 21.61
    }
}, {
    level: 89,
    summon: 20,
    totalSummon: 1780,
    cost: 1000,
    totalCost: 89000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.11,
        mythic: 21.89
    }
}, {
    level: 90,
    summon: 20,
    totalSummon: 1800,
    cost: 1000,
    totalCost: 90000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.82,
        mythic: 22.18
    }
}, {
    level: 91,
    summon: 20,
    totalSummon: 1820,
    cost: 1000,
    totalCost: 91000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.53,
        mythic: 22.46
    }
}, {
    level: 92,
    summon: 20,
    totalSummon: 1840,
    cost: 1000,
    totalCost: 92000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.24,
        mythic: 22.76
    }
}, {
    level: 93,
    summon: 20,
    totalSummon: 1860,
    cost: 1000,
    totalCost: 93000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.95,
        mythic: 23.05
    }
}, {
    level: 94,
    summon: 20,
    totalSummon: 1880,
    cost: 1000,
    totalCost: 94000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.65,
        mythic: 23.35
    }
}, {
    level: 95,
    summon: 20,
    totalSummon: 1900,
    cost: 1000,
    totalCost: 95000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.34,
        mythic: 23.66
    }
}, {
    level: 96,
    summon: 20,
    totalSummon: 1920,
    cost: 1000,
    totalCost: 96000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.04,
        mythic: 23.96
    }
}, {
    level: 97,
    summon: 20,
    totalSummon: 1940,
    cost: 1000,
    totalCost: 97000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.72,
        mythic: 24.28
    }
}, {
    level: 98,
    summon: 20,
    totalSummon: 1960,
    cost: 1000,
    totalCost: 98000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.41,
        mythic: 24.59
    }
}, {
    level: 99,
    summon: 20,
    totalSummon: 1980,
    cost: 1000,
    totalCost: 99000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.09,
        mythic: 24.91
    }
}, {
    level: 100,
    summon: null,
    totalSummon: null,
    cost: null,
    totalCost: null,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.00,
        mythic: 25.00
    }
}
];

export const petLevels: petLevelType[] = [
    {
    level: 1,
    summon: 2,
    totalSummon: 2,
    cost: 200,
    totalCost: 200,
    chances: {
        common: 100.00,
        rare: 0.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 2,
    summon: 2,
    totalSummon: 4,
    cost: 200,
    totalCost: 400,
    chances: {
        common: 99.50,
        rare: 0.50,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 3,
    summon: 3,
    totalSummon: 7,
    cost: 300,
    totalCost: 700,
    chances: {
        common: 99.00,
        rare: 1.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 4,
    summon: 3,
    totalSummon: 10,
    cost: 300,
    totalCost: 1000,
    chances: {
        common: 98.00,
        rare: 2.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 5,
    summon: 4,
    totalSummon: 14,
    cost: 400,
    totalCost: 1400,
    chances: {
        common: 95.00,
        rare: 5.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 6,
    summon: 4,
    totalSummon: 18,
    cost: 400,
    totalCost: 1800,
    chances: {
        common: 90.00,
        rare: 10.00,
        epic: 0.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 7,
    summon: 5,
    totalSummon: 23,
    cost: 500,
    totalCost: 2300,
    chances: {
        common: 79.66,
        rare: 20.00,
        epic: 0.34,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 8,
    summon: 5,
    totalSummon: 28,
    cost: 500,
    totalCost: 2800,
    chances: {
        common: 77.64,
        rare: 21.80,
        epic: 0.56,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 9,
    summon: 6,
    totalSummon: 34,
    cost: 600,
    totalCost: 3400,
    chances: {
        common: 75.30,
        rare: 23.76,
        epic: 0.93,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 10,
    summon: 6,
    totalSummon: 40,
    cost: 600,
    totalCost: 4000,
    chances: {
        common: 72.54,
        rare: 25.90,
        epic: 1.55,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 11,
    summon: 7,
    totalSummon: 47,
    cost: 700,
    totalCost: 4700,
    chances: {
        common: 69.18,
        rare: 28.23,
        epic: 2.59,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 12,
    summon: 7,
    totalSummon: 54,
    cost: 700,
    totalCost: 5400,
    chances: {
        common: 64.91,
        rare: 30.77,
        epic: 4.32,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 13,
    summon: 8,
    totalSummon: 62,
    cost: 800,
    totalCost: 6200,
    chances: {
        common: 59.26,
        rare: 33.54,
        epic: 7.20,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 14,
    summon: 9,
    totalSummon: 71,
    cost: 900,
    totalCost: 7100,
    chances: {
        common: 51.44,
        rare: 36.56,
        epic: 12.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 15,
    summon: 10,
    totalSummon: 81,
    cost: 1000,
    totalCost: 8100,
    chances: {
        common: 40.15,
        rare: 39.85,
        epic: 20.00,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 16,
    summon: 11,
    totalSummon: 92,
    cost: 1100,
    totalCost: 9200,
    chances: {
        common: 35.86,
        rare: 43.44,
        epic: 20.70,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 17,
    summon: 12,
    totalSummon: 104,
    cost: 1200,
    totalCost: 10400,
    chances: {
        common: 31.23,
        rare: 47.35,
        epic: 21.42,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 18,
    summon: 13,
    totalSummon: 117,
    cost: 1300,
    totalCost: 11700,
    chances: {
        common: 26.22,
        rare: 51.61,
        epic: 22.17,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 19,
    summon: 14,
    totalSummon: 131,
    cost: 1400,
    totalCost: 13100,
    chances: {
        common: 20.80,
        rare: 56.25,
        epic: 22.95,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 20,
    summon: 15,
    totalSummon: 146,
    cost: 1500,
    totalCost: 14600,
    chances: {
        common: 15.00,
        rare: 61.25,
        epic: 23.75,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 21,
    summon: 16,
    totalSummon: 162,
    cost: 1600,
    totalCost: 16200,
    chances: {
        common: 15.00,
        rare: 60.42,
        epic: 24.59,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 22,
    summon: 17,
    totalSummon: 179,
    cost: 1700,
    totalCost: 17900,
    chances: {
        common: 15.00,
        rare: 59.55,
        epic: 25.45,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 23,
    summon: 18,
    totalSummon: 197,
    cost: 1800,
    totalCost: 19700,
    chances: {
        common: 15.00,
        rare: 58.66,
        epic: 26.34,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 24,
    summon: 19,
    totalSummon: 216,
    cost: 1900,
    totalCost: 21600,
    chances: {
        common: 15.00,
        rare: 57.74,
        epic: 27.26,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 25,
    summon: 20,
    totalSummon: 236,
    cost: 2000,
    totalCost: 23600,
    chances: {
        common: 15.00,
        rare: 56.79,
        epic: 28.21,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 26,
    summon: 21,
    totalSummon: 257,
    cost: 2100,
    totalCost: 25700,
    chances: {
        common: 15.00,
        rare: 55.80,
        epic: 29.20,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 27,
    summon: 22,
    totalSummon: 279,
    cost: 2200,
    totalCost: 27900,
    chances: {
        common: 15.00,
        rare: 54.78,
        epic: 30.22,
        legendary: 0.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 28,
    summon: 23,
    totalSummon: 302,
    cost: 2300,
    totalCost: 30200,
    chances: {
        common: 15.00,
        rare: 53.65,
        epic: 31.28,
        legendary: 0.07,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 29,
    summon: 23,
    totalSummon: 325,
    cost: 2300,
    totalCost: 32500,
    chances: {
        common: 15.00,
        rare: 52.51,
        epic: 32.37,
        legendary: 0.12,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 30,
    summon: 23,
    totalSummon: 348,
    cost: 2300,
    totalCost: 34800,
    chances: {
        common: 15.00,
        rare: 51.27,
        epic: 33.51,
        legendary: 0.20,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 31,
    summon: 23,
    totalSummon: 371,
    cost: 2300,
    totalCost: 37100,
    chances: {
        common: 15.00,
        rare: 49.98,
        epic: 34.68,
        legendary: 0.34,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 32,
    summon: 23,
    totalSummon: 394,
    cost: 2300,
    totalCost: 39400,
    chances: {
        common: 15.00,
        rare: 48.55,
        epic: 35.89,
        legendary: 0.56,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 33,
    summon: 23,
    totalSummon: 417,
    cost: 2300,
    totalCost: 41700,
    chances: {
        common: 15.00,
        rare: 46.92,
        epic: 37.15,
        legendary: 0.93,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 34,
    summon: 23,
    totalSummon: 440,
    cost: 2300,
    totalCost: 44000,
    chances: {
        common: 15.00,
        rare: 45.00,
        epic: 38.45,
        legendary: 1.55,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 35,
    summon: 23,
    totalSummon: 463,
    cost: 2300,
    totalCost: 46300,
    chances: {
        common: 15.00,
        rare: 42.61,
        epic: 39.80,
        legendary: 2.59,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 36,
    summon: 23,
    totalSummon: 486,
    cost: 2300,
    totalCost: 48600,
    chances: {
        common: 15.00,
        rare: 39.49,
        epic: 41.19,
        legendary: 4.32,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 37,
    summon: 23,
    totalSummon: 509,
    cost: 2300,
    totalCost: 50900,
    chances: {
        common: 15.00,
        rare: 35.17,
        epic: 42.63,
        legendary: 7.20,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 38,
    summon: 23,
    totalSummon: 532,
    cost: 2300,
    totalCost: 53200,
    chances: {
        common: 15.00,
        rare: 28.88,
        epic: 44.12,
        legendary: 12.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 39,
    summon: 23,
    totalSummon: 555,
    cost: 2300,
    totalCost: 55500,
    chances: {
        common: 15.00,
        rare: 19.33,
        epic: 45.67,
        legendary: 20.00,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 40,
    summon: 23,
    totalSummon: 578,
    cost: 2300,
    totalCost: 57800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 49.50,
        legendary: 20.50,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 41,
    summon: 23,
    totalSummon: 601,
    cost: 2300,
    totalCost: 60100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 48.99,
        legendary: 21.01,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 42,
    summon: 23,
    totalSummon: 624,
    cost: 2300,
    totalCost: 62400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 48.46,
        legendary: 21.54,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 43,
    summon: 23,
    totalSummon: 647,
    cost: 2300,
    totalCost: 64700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 47.92,
        legendary: 22.08,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 44,
    summon: 23,
    totalSummon: 670,
    cost: 2300,
    totalCost: 67000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 47.37,
        legendary: 22.63,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 45,
    summon: 23,
    totalSummon: 693,
    cost: 2300,
    totalCost: 69300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 46.81,
        legendary: 23.19,
        ultimate: 0.00,
        mythic: 0.00
    }
}, {
    level: 46,
    summon: 23,
    totalSummon: 716,
    cost: 2300,
    totalCost: 71600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 46.15,
        legendary: 23.77,
        ultimate: 0.07,
        mythic: 0.00
    }
}, {
    level: 47,
    summon: 23,
    totalSummon: 739,
    cost: 2300,
    totalCost: 73900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 45.51,
        legendary: 24.37,
        ultimate: 0.12,
        mythic: 0.00
    }
}, {
    level: 48,
    summon: 23,
    totalSummon: 762,
    cost: 2300,
    totalCost: 76200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 44.82,
        legendary: 24.98,
        ultimate: 0.20,
        mythic: 0.00
    }
}, {
    level: 49,
    summon: 23,
    totalSummon: 785,
    cost: 2300,
    totalCost: 78500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 44.06,
        legendary: 25.60,
        ultimate: 0.34,
        mythic: 0.00
    }
}, {
    level: 50,
    summon: 23,
    totalSummon: 808,
    cost: 2300,
    totalCost: 80800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 43.20,
        legendary: 26.24,
        ultimate: 0.56,
        mythic: 0.00
    }
}, {
    level: 51,
    summon: 23,
    totalSummon: 831,
    cost: 2300,
    totalCost: 83100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 42.17,
        legendary: 26.90,
        ultimate: 0.93,
        mythic: 0.00
    }
}, {
    level: 52,
    summon: 23,
    totalSummon: 854,
    cost: 2300,
    totalCost: 85400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 40.87,
        legendary: 27.57,
        ultimate: 1.55,
        mythic: 0.00
    }
}, {
    level: 53,
    summon: 23,
    totalSummon: 877,
    cost: 2300,
    totalCost: 87700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 39.15,
        legendary: 28.26,
        ultimate: 2.59,
        mythic: 0.00
    }
}, {
    level: 54,
    summon: 23,
    totalSummon: 900,
    cost: 2300,
    totalCost: 90000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 36.71,
        legendary: 28.97,
        ultimate: 4.32,
        mythic: 0.00
    }
}, {
    level: 55,
    summon: 23,
    totalSummon: 923,
    cost: 2300,
    totalCost: 92300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 33.11,
        legendary: 29.69,
        ultimate: 7.20,
        mythic: 0.00
    }
}, {
    level: 56,
    summon: 23,
    totalSummon: 946,
    cost: 2300,
    totalCost: 94600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 27.57,
        legendary: 30.43,
        ultimate: 12.00,
        mythic: 0.00
    }
}, {
    level: 57,
    summon: 23,
    totalSummon: 969,
    cost: 2300,
    totalCost: 96900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 18.81,
        legendary: 31.19,
        ultimate: 20.00,
        mythic: 0.00
    }
}, {
    level: 58,
    summon: 23,
    totalSummon: 992,
    cost: 2300,
    totalCost: 99200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.84,
        ultimate: 20.16,
        mythic: 0.00
    }
}, {
    level: 59,
    summon: 23,
    totalSummon: 1015,
    cost: 2300,
    totalCost: 101500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.68,
        ultimate: 20.32,
        mythic: 0.00
    }
}, {
    level: 60,
    summon: 23,
    totalSummon: 1038,
    cost: 2300,
    totalCost: 103800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.52,
        ultimate: 20.48,
        mythic: 0.00
    }
}, {
    level: 61,
    summon: 23,
    totalSummon: 1061,
    cost: 2300,
    totalCost: 106100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.35,
        ultimate: 20.65,
        mythic: 0.00
    }
}, {
    level: 62,
    summon: 23,
    totalSummon: 1084,
    cost: 2300,
    totalCost: 108400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.19,
        ultimate: 20.81,
        mythic: 0.00
    }
}, {
    level: 63,
    summon: 23,
    totalSummon: 1107,
    cost: 2300,
    totalCost: 110700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 34.02,
        ultimate: 20.98,
        mythic: 0.00
    }
}, {
    level: 64,
    summon: 23,
    totalSummon: 1130,
    cost: 2300,
    totalCost: 113000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.85,
        ultimate: 21.15,
        mythic: 0.00
    }
}, {
    level: 65,
    summon: 23,
    totalSummon: 1153,
    cost: 2300,
    totalCost: 115300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.68,
        ultimate: 21.32,
        mythic: 0.00
    }
}, {
    level: 66,
    summon: 23,
    totalSummon: 1176,
    cost: 2300,
    totalCost: 117600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.51,
        ultimate: 21.49,
        mythic: 0.00
    }
}, {
    level: 67,
    summon: 23,
    totalSummon: 1199,
    cost: 2300,
    totalCost: 119900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.34,
        ultimate: 21.66,
        mythic: 0.00
    }
}, {
    level: 68,
    summon: 23,
    totalSummon: 1222,
    cost: 2300,
    totalCost: 122200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 33.17,
        ultimate: 21.83,
        mythic: 0.00
    }
}, {
    level: 69,
    summon: 23,
    totalSummon: 1245,
    cost: 2300,
    totalCost: 124500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.99,
        ultimate: 22.01,
        mythic: 0.00
    }
}, {
    level: 70,
    summon: 23,
    totalSummon: 1268,
    cost: 2300,
    totalCost: 126800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.82,
        ultimate: 22.18,
        mythic: 0.00
    }
}, {
    level: 71,
    summon: 23,
    totalSummon: 1291,
    cost: 2300,
    totalCost: 129100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.57,
        ultimate: 22.36,
        mythic: 0.07
    }
}, {
    level: 72,
    summon: 23,
    totalSummon: 1314,
    cost: 2300,
    totalCost: 131400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.34,
        ultimate: 22.54,
        mythic: 0.12
    }
}, {
    level: 73,
    summon: 23,
    totalSummon: 1337,
    cost: 2300,
    totalCost: 133700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 32.08,
        ultimate: 22.72,
        mythic: 0.20
    }
}, {
    level: 74,
    summon: 23,
    totalSummon: 1360,
    cost: 2300,
    totalCost: 136000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 31.76,
        ultimate: 22.90,
        mythic: 0.34
    }
}, {
    level: 75,
    summon: 23,
    totalSummon: 1383,
    cost: 2300,
    totalCost: 138300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 31.36,
        ultimate: 23.08,
        mythic: 0.56
    }
}, {
    level: 76,
    summon: 23,
    totalSummon: 1406,
    cost: 2300,
    totalCost: 140600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 30.80,
        ultimate: 23.27,
        mythic: 0.93
    }
}, {
    level: 77,
    summon: 23,
    totalSummon: 1429,
    cost: 2300,
    totalCost: 142900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 29.99,
        ultimate: 23.45,
        mythic: 1.55
    }
}, {
    level: 78,
    summon: 23,
    totalSummon: 1452,
    cost: 2300,
    totalCost: 145200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 28.77,
        ultimate: 23.64,
        mythic: 2.59
    }
}, {
    level: 79,
    summon: 23,
    totalSummon: 1475,
    cost: 2300,
    totalCost: 147500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 26.85,
        ultimate: 23.83,
        mythic: 4.32
    }
}, {
    level: 80,
    summon: 23,
    totalSummon: 1498,
    cost: 2300,
    totalCost: 149800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 23.78,
        ultimate: 24.02,
        mythic: 7.20
    }
}, {
    level: 81,
    summon: 23,
    totalSummon: 1521,
    cost: 2300,
    totalCost: 152100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 18.79,
        ultimate: 24.22,
        mythic: 12.00
    }
}, {
    level: 82,
    summon: 23,
    totalSummon: 1544,
    cost: 2300,
    totalCost: 154400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 20.00,
        mythic: 20.00
    }
}, {
    level: 83,
    summon: 23,
    totalSummon: 1567,
    cost: 2300,
    totalCost: 156700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.74,
        mythic: 20.26
    }
}, {
    level: 84,
    summon: 23,
    totalSummon: 1590,
    cost: 2300,
    totalCost: 159000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.48,
        mythic: 20.52
    }
}, {
    level: 85,
    summon: 23,
    totalSummon: 1613,
    cost: 2300,
    totalCost: 161300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 19.21,
        mythic: 20.79
    }
}, {
    level: 86,
    summon: 23,
    totalSummon: 1636,
    cost: 2300,
    totalCost: 163600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.94,
        mythic: 21.06
    }
}, {
    level: 87,
    summon: 23,
    totalSummon: 1659,
    cost: 2300,
    totalCost: 165900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.67,
        mythic: 21.33
    }
}, {
    level: 88,
    summon: 23,
    totalSummon: 1682,
    cost: 2300,
    totalCost: 168200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.39,
        mythic: 21.61
    }
}, {
    level: 89,
    summon: 23,
    totalSummon: 1705,
    cost: 2300,
    totalCost: 170500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 18.11,
        mythic: 21.89
    }
}, {
    level: 90,
    summon: 23,
    totalSummon: 1728,
    cost: 2300,
    totalCost: 172800,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.82,
        mythic: 22.18
    }
}, {
    level: 91,
    summon: 23,
    totalSummon: 1751,
    cost: 2300,
    totalCost: 175100,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.53,
        mythic: 22.46
    }
}, {
    level: 92,
    summon: 23,
    totalSummon: 1774,
    cost: 2300,
    totalCost: 177400,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 17.24,
        mythic: 22.76
    }
}, {
    level: 93,
    summon: 23,
    totalSummon: 1797,
    cost: 2300,
    totalCost: 179700,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.95,
        mythic: 23.05
    }
}, {
    level: 94,
    summon: 23,
    totalSummon: 1820,
    cost: 2300,
    totalCost: 182000,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.65,
        mythic: 23.35
    }
}, {
    level: 95,
    summon: 23,
    totalSummon: 1843,
    cost: 2300,
    totalCost: 184300,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.34,
        mythic: 23.66
    }
}, {
    level: 96,
    summon: 23,
    totalSummon: 1866,
    cost: 2300,
    totalCost: 186600,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 16.04,
        mythic: 23.96
    }
}, {
    level: 97,
    summon: 23,
    totalSummon: 1889,
    cost: 2300,
    totalCost: 188900,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.72,
        mythic: 24.28
    }
}, {
    level: 98,
    summon: 23,
    totalSummon: 1912,
    cost: 2300,
    totalCost: 191200,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.41,
        mythic: 24.59
    }
}, {
    level: 99,
    summon: 23,
    totalSummon: 1935,
    cost: 2300,
    totalCost: 193500,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.09,
        mythic: 24.91
    }
}, {
    level: 100,
    summon: null,
    totalSummon: null,
    cost: null,
    totalCost: null,
    chances: {
        common: 15.00,
        rare: 15.00,
        epic: 15.00,
        legendary: 15.00,
        ultimate: 15.00,
        mythic: 25.00
    }
}
]