export const dynamic = "force-dyanmic";

import GameContainer from "@/components/GameContainer/GameContainer";
import { cards } from "@/data/cards";

export default function Home() {
  return (
    <div className="flex justify-center">
          <GameContainer />
    </div>
  );
}
