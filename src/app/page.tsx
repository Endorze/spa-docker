"use client"
export const dynamic = "force-dynamic";
import Container from "@/components/Container/Container";
import GameContainer from "@/components/GameContainer/GameContainer";
import { CardProps } from "@/data/cards";

const buildDeck = (cards: CardProps[], pairsCount: number) => {
  const subset = cards.slice(0, Math.min(pairsCount, cards.length));
  return [...subset, ...subset].sort(() => Math.random() - 0.5);
};

export default function Home() {
  return (
    <div className="flex justify-center">
      <Container>
          <GameContainer buildDeck={buildDeck} />
      </Container>
    </div>
  );
}
