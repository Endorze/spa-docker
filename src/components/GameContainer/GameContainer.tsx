"use client";
import { useEffect, useState } from "react";
import { cards as baseCards, CardProps } from "@/data/cards";
import Card from "../Card/Card";
import { ReusableH2 } from "../ReusableH2/ReusableH2";
import styles from "./GameContainer.module.css"
import { ScoreCounter } from "../ScoreCounter/ScoreCounter";
import { H1Title } from "../H1Title/H1Title";
import { snowflakeCursor } from 'cursor-effects';


type CardState = "hidden" | "flipped" | "matched"

let currentScore = 0;
let maxTries = 7;
let initialPairs = 2;
let currentLevel = 1;

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
                increaseLevel();
                resetBoard()
            }, 2000)
        }
    }, [hasWon])


    const increaseLevel = () => {
        initialPairs++
        currentLevel++
    }

    //Hanterar kortens "states", antingen är kortet hidden (inte hänt något) eller så är det flippat och väntar på matchning, eller så är det matchat.
    const handleCardClick = (cardIndex: number) => {

        if (maxTries <= 0) {
            return;
        }
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
                currentScore = (currentScore + (currentScore + 1 * 2))
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
                    if (maxTries <= 0) {
                        resetBoard();
                    }
                }, 1000)
            }
        }
    };

    console.log("Deck", deck)
    console.log("State", cardStateArray)

    return (
        <>
        <section className="flex flex-col pt-32">            
            <H1Title />
            <div className="relative w-content flex justify-center items-center">
                <ScoreCounter score={currentScore} />
                <div className="flex flex-col w-[800px] min-h-[600px] bg-gradient-to-b from-[#AEE4FF] to-[#5BC0FF] p-6 rounded-2xl">
                    <div className="pb-6">
                        <div className="flex justify-between items-center">
                            <ReusableH2 text="Memory" />
                            <p className={styles.gameContainerParagraph}>Attempts <span className="bg-white py-3 px-5 rounded-xl">{maxTries}</span></p>
                        </div>
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
                 <ScoreCounter score={currentLevel} text="Level "/>
            </div>
        </section>
        </>
    );
};

export default GameContainer;
