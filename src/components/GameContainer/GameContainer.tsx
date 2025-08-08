"use client"
import { CardProps, cards } from "@/data/cards";
import Card from "../Card/Card";

const GameContainer = () => {
    return (
        <div className="flex flex-wrap max-w-[1220px] justify-center">
            {cards.map((card, index) => {
                return (
                    <Card key={index} id={card.id} pairId={card.pairId} frontImage={card.frontImage} backImage={card.backImage} isMatched={false} alt={card.alt} isFlipped={false} onClick={() => {}}/>
                )
            })}
        </div>
    )
}

export default GameContainer;