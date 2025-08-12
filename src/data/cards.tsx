export type CardProps = {
    pairId: string,
    frontImage: string,
    backImage: string,
    isMatched: boolean,
    alt: string,
}

export const cards: CardProps[] = [
    {
        pairId: "warrior1",
        frontImage: "/images/warrior.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Warrior Card"
    },
    {
        pairId: "wizard1",
        frontImage: "/images/wizard.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Wizard Card"
    },
    {
        pairId: "archer1",
        frontImage: "/images/archer.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Archer Card"
    },
    {
        pairId: "healingPotion1",
        frontImage: "/images/healingPotion.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Healing Potion Card"
    },
    {
        pairId: "manaPotion1",
        frontImage: "/images/manaPotion.png",
        backImage: "/images/unknown.png",
        isMatched: false,
        alt: "Mana Potion Card"
    },
]
