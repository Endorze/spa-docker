import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameContainer from "../src/components/GameContainer/GameContainer";

//jag använder setTimeout så detta krävs
jest.useFakeTimers();


//mockar testdata för att kunna testa om kort matchar eller inte
jest.mock("../src/components/GameContainer/GameContainer", () => {
    const originalModule = jest.requireActual("../src/components/GameContainer/GameContainer");
    return {
        __esModule: true,
        ...originalModule,

        buildDeck: () => [
            { pairId: "A", frontImage: "/a.png", backImage: "/b.png", isMatched: false, alt: "A1" },
            { pairId: "B", frontImage: "/c.png", backImage: "/b.png", isMatched: false, alt: "B1" },
            { pairId: "A", frontImage: "/a.png", backImage: "/b.png", isMatched: false, alt: "A2" },
            { pairId: "B", frontImage: "/c.png", backImage: "/b.png", isMatched: false, alt: "B2" },
        ],
    };
});


describe("GameContainer Integration Tests", () => {

    test("matching cards increases score and keeps them flipped", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);
        console.log("1")
        const cards = screen.getAllByRole("button");
        console.log("2")
        //användaren matchar två kort.
        await user.click(cards[0]);
        console.log("3")
        await user.click(cards[2]);
        console.log("4")

        jest.runAllTimers();
        console.log("5")
        jest.advanceTimersByTime(5000);
        console.log("6")

        //om korten matchade så ska score öka med 2 och vara disabled
        expect(screen.getByText("2")).toBeInTheDocument();
        console.log("7")
        expect(cards[0]).toBeDisabled();
        console.log("8")
        expect(cards[2]).toBeDisabled();
        console.log("9")
    });

    test("mismatched cards decrease attempts and flip back", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);

        const cards = screen.getAllByRole("button");

        await user.click(cards[0]);
        await user.click(cards[1]);

        jest.runAllTimers();

        //antal försök minskar med 1 per fel match
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(cards[0]).toBeEnabled();
        expect(cards[1]).toBeEnabled();
    });

    test("input is blocked while two cards are flipped", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);

        const cards = screen.getAllByRole("button");

        await user.click(cards[0]);
        await user.click(cards[1]);

        // försöker klicka ett tredje kort
        await user.click(cards[2]);

        // Eftersom blockInput = true ska tredje kortet inte flippas direkt
        expect(cards[2]).toBeEnabled();
    });

    test("game over appears when maxTries reaches 0", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);

        const cards = screen.getAllByRole("button");

        // matchar fel kort 10 gånger tills att vi får gameover
        for (let i = 0; i < 10; i++) {
            await user.click(cards[0]);
            await user.click(cards[1]);
            jest.runAllTimers();
        }

        //vid game over förväntar vi oss att play again knappen kommer upp
        expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
    });


    test("play again resets the game state", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);

        const cards = screen.getAllByRole("button");

        // matchar fel tills game over
        for (let i = 0; i < 10; i++) {
            await user.click(cards[0]);
            await user.click(cards[1]);
            jest.runAllTimers();
        }

        //vi förväntar oss att play agian knapp dyker upp, vi trycker på knappen
        const playAgainBtn = screen.getByRole("button", { name: /play again/i });
        await user.click(playAgainBtn);


        //vid knapptryck så återställer vi poängen, så max tries 
        expect(screen.queryByRole("button", { name: /play again/i })).not.toBeInTheDocument();
        expect(screen.getByText("0")).toBeInTheDocument(); // score = 0
        expect(screen.getByText("10")).toBeInTheDocument(); // maxTries = 10
    });


    test("winning increases level and adds more pairs", async () => {
        const user = userEvent.setup();
        render(<GameContainer />);

        const cards = screen.getAllByRole("button");

        // matchar kort par 1
        await user.click(cards[0]); // A1
        await user.click(cards[2]); // A2
        jest.runAllTimers();

        //matchar kort par 2
        await user.click(cards[1]); // B1
        await user.click(cards[3]); // B2
        jest.runAllTimers();

        // vi skyndar på delayen med 2 sekunder
        jest.advanceTimersByTime(2000);

        //nu ska vi se level 2
        expect(screen.getByText(/level/i)).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });
});
