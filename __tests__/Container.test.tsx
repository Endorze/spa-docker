import { render, screen } from "@testing-library/react";
import "./Container"
import Container from "@/components/Container/Container";


describe("Container should take children", () => {

    test("Container displays children elements correctly.", () => {
        render(
        <Container>
            <h2>Test Title</h2>
        </Container>
        );

        expect(screen.getByText(/test title/i)).toBeInTheDocument();
    })
}) 