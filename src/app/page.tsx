import { cards } from "@/data/cards";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {cards.map((card, index) => {
        return (
          <img className="max-w-[200px] h-auto" key={index} src={card.frontImage} />
        )
      })}
    </div>
  );
}
