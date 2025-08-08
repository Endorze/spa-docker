export type CardProps = {
    id: number,
    pairId: string,
    frontImage: string,
    backImage: string,
    isMatched: boolean,
    alt: string,
}

export const cards:CardProps[] = [
    {
        id: 1,
        pairId: "warrior1",
        frontImage: "/images/warrior.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Warrior Card"
    },
    {
        id: 2,
        pairId: "wizard1",
        frontImage: "/images/wizard.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Wizard Card"
    },
    {
        id: 3,
        pairId: "archer1",
        frontImage: "/images/archer.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Archer Card"
    },
     {
        id: 4,
        pairId: "healingPotion1",
        frontImage: "/images/healingPotion.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Healing Potion Card"
    },
     {
        id: 5,
        pairId: "manaPotion1",
        frontImage: "/images/manaPotion.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Mana Potion Card"
    },
]
