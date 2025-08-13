export const dynamic = "force-dynamic";
import Container from "@/components/Container/Container";
import GameContainer from "@/components/GameContainer/GameContainer";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Container>
          <GameContainer />
      </Container>
    </div>
  );
}
