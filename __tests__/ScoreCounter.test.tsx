import { render, screen } from "@testing-library/react";
import { ScoreProps } from "../src/components/ScoreCounter/ScoreCounter";
import { ScoreCounter } from "../src/components/ScoreCounter/ScoreCounter";

//vad gör scorecounter?
//simpelt, den tar emot en nummer variabel och en string variabel, ingen funktionalitet, ska endast visa värden.

const Props: ScoreProps = {
    score: 2,
    text: "Level"
};

describe("Scorecounter should always display a number variable", () => {

    test("ScoreCounter should display string and number value", () => {

        render(
            <ScoreCounter {...Props} />
        )
        expect(screen.getByText(/level/i)).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    test("render only score/number value when text is not provided", () => {
        render(<ScoreCounter score={5} />)
        expect(screen.queryByText(/level/i)).not.toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    test("renders with score = 0", () => {
        render(<ScoreCounter score={0} />);
        expect(screen.getByText("0")).toBeInTheDocument();
    });

})