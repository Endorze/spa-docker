import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameContainer from "@/components/GameContainer/GameContainer";

//mockar testdata för att kunna testa om kort matchar eller inte
jest.mock("../src/components/GameContainer/GameContainer", () => {
    const originalModule = jest.requireActual("../src/components/GameContainer/GameContainer");
    return {
        __esModule: true,
        ...originalModule,


    };
});

const testBuildDeck = () => {
    return [
        { pairId: "A", frontImage: "/a.png", backImage: "/b.png", alt: "A1" },
        { pairId: "B", frontImage: "/c.png", backImage: "/b.png", alt: "B1" },
        { pairId: "A", frontImage: "/a.png", backImage: "/b.png", alt: "A2" },
        { pairId: "B", frontImage: "/c.png", backImage: "/b.png", alt: "B2" },
    ]
}

describe("GameContainer Integration Tests", () => {

    const user = userEvent.setup({
        advanceTimers: () => jest.runOnlyPendingTimers(),
        delay: null,
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test("matching cards increases score and keeps them flipped", async () => {
        render(<GameContainer buildDeck={testBuildDeck} />);
        const cards = screen.getAllByRole("button");
        //användaren matchar två kort.
        await user.click(cards[0]);
        await user.click(cards[2]);

        await flushUntilStable();

        //om korten matchade så ska score öka med 2 och vara disabled
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(cards[0]).toBeDisabled();
        expect(cards[2]).toBeDisabled();
    });

    test("mismatched cards decrease attempts and flip back", async () => {
        render(<GameContainer buildDeck={testBuildDeck} />);

        const cards = screen.getAllByRole("button");

        await user.click(cards[0]);
        await user.click(cards[1]);

        await flushUntilStable();

        //antal försök minskar med 1 per fel match
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(cards[0]).toBeEnabled();
        expect(cards[1]).toBeEnabled();
    });

    test("input is blocked while two cards are flipped", async () => {
        render(<GameContainer buildDeck={testBuildDeck} />);

        const cards = screen.getAllByRole("button");

        await user.click(cards[0]);
        await user.click(cards[1]);

        // försöker klicka ett tredje kort
        await user.click(cards[2]);

        await flushUntilStable();

        // Eftersom blockInput = true ska tredje kortet inte flippas direkt
        expect(cards[2]).toBeEnabled();
    });

    test("game over appears when maxTries reaches 0", async () => {
        render(<GameContainer buildDeck={testBuildDeck} />);

        const cards = screen.getAllByRole("button");

        // matchar fel kort 10 gånger tills att vi får gameover
        for (let i = 0; i < 10; i++) {
            await user.click(cards[0]);
            await user.click(cards[1]);

            await flushUntilStable();
        }

        //vid game over förväntar vi oss att play again knappen kommer upp
        expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
    });


    test("play again resets the game state", async () => {
        render(<GameContainer buildDeck={testBuildDeck} />);

        const cards = screen.getAllByRole("button");

        // matchar fel tills game over
        for (let i = 0; i < 10; i++) {
            await user.click(cards[0]);
            await user.click(cards[1]);

            await flushUntilStable();
        }

        //vi förväntar oss att play agian knapp dyker upp, vi trycker på knappen
        const playAgainBtn = screen.getByRole("button", { name: /play again/i });
        await user.click(playAgainBtn);

        await flushUntilStable();

        //vid knapptryck så återställer vi poängen, så max tries 
        expect(screen.queryByRole("button", { name: /play again/i })).not.toBeInTheDocument();
        expect(screen.getByText("0")).toBeInTheDocument(); // score = 0
        expect(screen.getByText("10")).toBeInTheDocument(); // maxTries = 10
    });

    test("winning increases level and adds more pairs", async () => {

        render(<GameContainer buildDeck={testBuildDeck} />);

        expect(await screen.findByText(/level/i)).toBeInTheDocument();
        expect(await screen.findByText("1")).toBeInTheDocument();

        const cards = screen.getAllByRole("button");

        // matchar kort par 1 och 2
        await user.click(cards[0]); // A1
        await user.click(cards[2]); // A2
        await user.click(cards[1]); // B1
        await user.click(cards[3]); // B2

        await flushUntilStable()

        //nu ska vi se level 2

        expect(await screen.findByText(/level/i)).toBeInTheDocument();
        expect(await screen.findByText("2")).toBeInTheDocument();

    });
});


// utility funktion som kör alla timers och kör alla useEffects tills att DOM strukturen är stabil (tills att inget ändras längre)
async function flushUntilStable(maxLoops: number = 100) {
    for (let i = 0; i < maxLoops; i++) {
        const before = document.body.innerHTML;

        //kör alla timeouts
        act(() => {
            jest.runAllTimers();
        });

        //kör alla setState / useEffects
        await act(async () => { });

        const after = document.body.innerHTML;
        if (before === after) break; // när den inte hittar mer förändringar så slutar den köra
    }
}