"use client";
import { useEffect, useState } from "react";
import { cards as baseCards, CardProps } from "@/data/cards";
import Card from "../Card/Card";

type CardState = "hidden" | "flipped" | "matched"

let currentScore = 0;
let maxTries = 7;
let initialPairs = 2;

// Gör dubbla kort för matchning och randomiserar deras position så att vi får "memory" spelet upplagt.
const buildDeck = (cards: CardProps[], pairsCount: number) => {
  const subset = cards.slice(0, Math.min(pairsCount, cards.length));
  return [...subset, ...subset].sort(() => Math.random() - 0.5);
};


const GameContainer = () => {
    const [deck, setDeck] = useState<CardProps[]>([]);
    const [cardStateArray, setCardStateArray] = useState<CardState[]>([])
    const [blockInput, setBlockInput] = useState(false)

    const hasWon = cardStateArray.every(state => state == "matched") && cardStateArray.length > 0;

    //Återställer och randomiserar ett nytt spelbräde vid vinst
    const resetBoard = () => {
        
        const newDeck = buildDeck(baseCards, initialPairs)
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


    //Initiates the first game;

    const increaseLevel = () => {
        initialPairs++
    }

    //Hanterar kortens "states", antingen är kortet hidden (inte hänt något) eller så är det flippat och väntar på matchning, eller så är det matchat.
    const handleCardClick = (cardIndex: number) => {

        if (blockInput) {
            return;
        }

        const card = deck[cardIndex];
        const state = cardStateArray[cardIndex];

        if (state != "hidden") {
            return
        }

        const otherFlippedCardIndex = cardStateArray.findIndex(state => state == "flipped")

        console.log({ otherFlippedCardIndex, card, state })

        if (otherFlippedCardIndex == -1) {
            // No other card is flipped

            //Skapar en ny state array, där vi kopierar previous state och skriver över cardIndex position till flipped.
            setCardStateArray((previousState) => {
                const newState = [...previousState]
                newState[cardIndex] = "flipped"
                return newState
            })


        } else {

            console.log(deck)

            const otherCard = deck[otherFlippedCardIndex]

            console.log({ card, otherCard })

            if (otherCard.pairId == card.pairId) {
                currentScore++
                setCardStateArray((previousState) => {
                    const newState = [...previousState]
                    newState[cardIndex] = "matched"
                    newState[otherFlippedCardIndex] = "matched"
                    return newState

                })

            } else {

                //Sätter ett kort till flipped oavsett om kombon var rätt eller fel, låter felaktig kombo synas i 1 sekund innan den flippar
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
                    maxTries--
                }, 1000)
            }
        }
    };

    console.log("Deck", deck)
    console.log("State", cardStateArray)

    return (
        <div className="bg-blue-400 min-w-screen flex justify-center py-12">
            <div className="flex flex-col max-w-[1220px] justify-center bg-gradient-to-b from-[#AEE4FF] to-[#5BC0FF] p-6">
                <div className="pb-6">
                    <p>Score: {currentScore}</p>
                    <p>Attempts: {maxTries}</p>
                </div>
                <div className="flex flex-wrap h-auto max-w-auto gap-6 justify-center" >
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
            </div>
        </div>
    );
};

export default GameContainer;
