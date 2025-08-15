"use client";
import { useEffect, useState } from "react";
import { cards as baseCards, CardProps } from "@/data/cards";
import Card from "../Card/Card";
import { ReusableH2 } from "../ReusableH2/ReusableH2";
import styles from "./GameContainer.module.css";
import { ScoreCounter } from "../ScoreCounter/ScoreCounter";
import { H1Title } from "../H1Title/H1Title";

type CardState = "hidden" | "flipped" | "matched";

const buildDeck = (cards: CardProps[], pairsCount: number) => {
  const subset = cards.slice(0, Math.min(pairsCount, cards.length));
  return [...subset, ...subset].sort(() => Math.random() - 0.5);
};

const GameContainer = () => {
  const [maxTries, setMaxTries] = useState(10);
  const [score, setScore] = useState(0);
  const [initialPairs, setInitialPairs] = useState(2);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameOver, setGameOver] = useState(true);

  const [deck, setDeck] = useState<CardProps[]>([]);
  const [cardStateArray, setCardStateArray] = useState<CardState[]>([]);
  const [blockInput, setBlockInput] = useState(false);

  const hasWon =
    cardStateArray.length > 0 && cardStateArray.every((s) => s === "matched");

  const resetBoard = (pairs = initialPairs) => {
    const newDeck = buildDeck(baseCards, pairs);
    setDeck(newDeck);
    setCardStateArray(Array.from({ length: newDeck.length }, () => "hidden"));
    setBlockInput(false);
  };

  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(() => {
    if (hasWon) {
      setTimeout(() => {
        setInitialPairs((p) => p + 1);
        setCurrentLevel((l) => l + 1);
        resetBoard(initialPairs + 1);
      }, 2000);
    }
  }, [hasWon, initialPairs]);

  const loss = () => setGameOver(true);

  const handleCardClick = (cardIndex: number) => {
    if (maxTries <= 0 || blockInput) return;

    const state = cardStateArray[cardIndex];
    if (state !== "hidden") return;

    const otherFlippedCardIndex = cardStateArray.findIndex((s) => s === "flipped");

    if (otherFlippedCardIndex === -1) {
      setCardStateArray((prev) => {
        const next = [...prev];
        next[cardIndex] = "flipped";
        return next;
      });
    } else {
      const otherCard = deck[otherFlippedCardIndex];
      const card = deck[cardIndex];

      if (otherCard.pairId === card.pairId) {
        setScore((s) => s + 2);
        setCardStateArray((prev) => {
          const next = [...prev];
          next[cardIndex] = "matched";
          next[otherFlippedCardIndex] = "matched";
          return next;
        });
      } else {
        setBlockInput(true);
        setCardStateArray((prev) => {
          const next = [...prev];
          next[cardIndex] = "flipped";
          return next;
        });

        setTimeout(() => {
          setCardStateArray((prev) => {
            const next = [...prev];
            next[cardIndex] = "hidden";
            next[otherFlippedCardIndex] = "hidden";
            return next;
          });
          setBlockInput(false);

          setMaxTries((prev) => {
            const next = prev - 1;
            if (next <= 0) loss();
            return next;
          });
        }, 1000);
      }
    }
  };

  console.log("Deck", deck);
  console.log("State", cardStateArray);

  return (
    <>
      {gameOver ? (
        <div className="min-h-[100vh] flex justify-center items-center">
        <button
          onClick={() => {
            setInitialPairs(2);
            setCurrentLevel(1);
            setScore(0);
            setMaxTries(10);
            resetBoard(2);
            setGameOver(false);
          }}
          className="px-24 py-12 rounded-xl shadow-lg bg-red-500 text-[4rem] cursor-pointer font-bold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:scale-105 animate-pulse
  "
        >
          Play Again
        </button>
        </div>
      ) : (
        <section className="flex flex-col pt-32">
          <H1Title />
          <div className="relative w-fit flex justify-center items-center">
            <ScoreCounter score={score} />
            <div className="flex flex-col w-[800px] min-h-[600px] bg-gradient-to-b from-[#AEE4FF] to-[#5BC0FF] p-6 rounded-2xl">
              <div className="pb-6">
                <div className="flex justify-between items-center">
                  <ReusableH2 text="Memory" />
                  <p className={styles.gameContainerParagraph}>
                    Attempts{" "}
                    <span className="bg-white py-3 px-5 rounded-xl">{maxTries}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap h-auto max-w-auto gap-6 justify-center">
                {deck.map((card, index) => (
                  <Card
                    key={index}
                    {...card}
                    isFlipped={
                      cardStateArray[index] === "flipped" ||
                      cardStateArray[index] === "matched"
                    }
                    onClick={() => handleCardClick(index)}
                    disabled={blockInput || cardStateArray[index] !== "hidden"}
                  />
                ))}
              </div>
            </div>
            <ScoreCounter score={currentLevel} text="Level " />
          </div>
        </section>
      )}
    </>
  );
};

export default GameContainer;
