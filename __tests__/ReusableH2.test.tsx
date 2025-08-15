import { render, screen } from "@testing-library/react";
import { H2Props, ReusableH2 } from "../src/components/ReusableH2/ReusableH2";

const TestProps: H2Props = {
    text: "Title"
}

describe("Test that the header displays text", () => {

    test("H2Title should contain text", () => {
        render(<ReusableH2 text={TestProps.text}/>)
        const textValue = screen.getByText(/title/i)
        expect(textValue).toBeInTheDocument();
    })

    test("Should render as a h2 element", () => {
        render(<ReusableH2 text={TestProps.text}/>)
        const heading = screen.getByRole("heading", {level: 2});
        expect(heading).toHaveTextContent(/title/i)
    })
})