export type CardProps = {
    pairId: string,
    frontImage: string,
    backImage: string,
    alt: string,
}

export const cards: CardProps[] = [
    {
        pairId: "warrior1",
        frontImage: "/images/warrior.png",
        backImage: "/images/unknown.png",
        alt: "Warrior Card"
    },
    {
        pairId: "wizard1",
        frontImage: "/images/wizard.png",
        backImage: "/images/unknown.png",
        alt: "Wizard Card"
    },
    {
        pairId: "archer1",
        frontImage: "/images/archer.png",
        backImage: "/images/unknown.png",
        alt: "Archer Card"
    },
    {
        pairId: "healingPotion1",
        frontImage: "/images/healingPotion.png",
        backImage: "/images/unknown.png",
        alt: "Healing Potion Card"
    },
    {
        pairId: "manaPotion1",
        frontImage: "/images/manaPotion.png",
        backImage: "/images/unknown.png",
        alt: "Mana Potion Card"
    },
]
