"use client";
import { useEffect, useState } from "react";
import { cards as baseCards, CardProps } from "@/data/cards";
import Card from "../Card/Card";

type CardState = "hidden" | "flipped" | "matched"

let currentScore = 0;
let maxTries = 7;

// Gör dubbla kort för matchning
const buildDeck = (cards: CardProps[]) => [...cards, ...cards]
        .sort(() => Math.random() - 0.5);

const GameContainer = () => {

    const [deck, setDeck] = useState<CardProps[]>([]);
    const [cardStateArray, setCardStateArray] = useState<CardState[]>([])
    const [blockInput, setBlockInput] = useState(false)

    const hasWon = cardStateArray.every(state => state == "matched") && cardStateArray.length > 0;

    const resetBoard = () => {
        const newDeck = buildDeck(baseCards)

        setDeck(newDeck)
        setCardStateArray([...new Array(newDeck.length)].map(_ => "hidden"))
    }

    useEffect(resetBoard, [])

    useEffect(() => {
        if (hasWon) {
            console.log("Congrats you won!!!")
            setTimeout(() => {
                resetBoard()
            }, 2000)
        }
    }, [hasWon])

    const handleCardClick = (cardIndex: number) => {

        console.log("handleCardClick")
        
        if (blockInput) {
            console.log("blocked input")
            return;
        }
        
        const card = deck[cardIndex];
        const state = cardStateArray[cardIndex];

        if (state != "hidden") {
            console.log("clicked card not hidden")
            return
        }

        const otherFlippedCardIndex = cardStateArray.findIndex(state => state == "flipped")

        console.log({otherFlippedCardIndex, card, state})

        if (otherFlippedCardIndex == -1) {
            // No other card is flipped

            setCardStateArray((previousState) => {
                const newState = [...previousState]
                newState[cardIndex] = "flipped"
                return newState
            })


        } else {

            console.log(deck)

            const otherCard = deck[otherFlippedCardIndex]
            
            console.log({card, otherCard})

            if (otherCard.pairId == card.pairId) {

                setCardStateArray((previousState) => {
                    const newState = [...previousState]
                    newState[cardIndex] = "matched"
                    newState[otherFlippedCardIndex] = "matched"

                    return newState

                })

            } else {

                setBlockInput(true)

                setCardStateArray((previousState) => {
                    const newState = [...previousState]
                    newState[cardIndex] = "flipped"
                    return newState
                })

                setTimeout(() => {

                    setCardStateArray((previousState) => {
                        const newState = [...previousState]
                        newState[cardIndex] = "hidden"
                        newState[otherFlippedCardIndex] = "hidden"
                        return newState
                    })

                    setBlockInput(false)

                }, 1000)


            }


        }



    };

    console.log("Deck", deck)
    console.log("State", cardStateArray)

    return (
        <div className="flex flex-wrap max-w-[1220px] justify-center gap-3">
            <p>Score: {currentScore}</p>
            <p>Attempts: {maxTries}</p>
            {deck.map((card, index) => (
                <Card
                    key={index}
                    {...card}
                    isFlipped={cardStateArray[index] == "flipped" || cardStateArray[index] == "matched"}
                    onClick={() => handleCardClick(index)}
                    disabled={false}
                />
            ))}
        </div>
    );
};

export default GameContainer;
