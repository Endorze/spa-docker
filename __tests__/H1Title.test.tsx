import { render, screen } from "@testing-library/react";
import { H1Title } from "@/components/H1Title/H1Title";
import "@testing-library/jest-dom";

describe("testing the h1 title", () => {
    
    test("Makes sure that the title is a h1", () => {
        render(<H1Title />)
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
    })

    test("Make sure that the title renders text", () => {
        render(<H1Title />)
        const text = screen.getByText("Endorze Games Presents");
        expect(text).toBeInTheDocument();
    })
})