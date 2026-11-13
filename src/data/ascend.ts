import type { AscendResources } from "../types/types";
import { forgeLevels, mountLevels, petLevels, skillLevels } from "./resourceData";

export const ascendResources: AscendResources = [
    {
        id: 1,
        resource: "Forge",
        defaultCost: 1,
        levels: forgeLevels
    },
    {
        id: 2,
        resource: "Skills",
        defaultCost: 200,
        levels: skillLevels
    },
    {
        id: 3,
        resource: "Pets",
        defaultCost: 100,
        levels: petLevels
    },
    {
        id: 4,
        resource: "Mounts",
        defaultCost: 50,
        levels: mountLevels
    }
]