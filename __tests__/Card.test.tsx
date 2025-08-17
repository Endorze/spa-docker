import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../src/components/Card/Card";
import { CardProps } from "@/data/cards";

const baseProps: CardProps = {
  pairId: "warrior1",
  frontImage: "/images/warrior.png",
  backImage: "/images/unknown.png",
  alt: "Warrior Card",
};

//om ett k0rt inte är flipped så bör framsidan inte visas, ska visa baksidan.
describe("Card component", () => {
  test("renders back image when isFlipped is false", () => {
    render(
      <Card {...baseProps} isFlipped={false} onClick={jest.fn()} />
    );

    const img = screen.getByRole("img", { name: /warrior card/i });
    expect(img).toHaveAttribute("src", baseProps.backImage);
  });

  //när ett kort är flipped så ska framsidan av kortet visas, så Warrior Card borde dyka upp
  test("renders front image when isFlipped is true", () => {
    render(
      <Card {...baseProps} isFlipped={true} onClick={jest.fn()} />
    );

    const img = screen.getByRole("img", { name: /warrior card/i });
    expect(img).toHaveAttribute("src", baseProps.frontImage);
  });

  //när jag trycker på kortet så ska min onclick funktion köras
  test("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();

    render(
      <Card {...baseProps} isFlipped={false} onClick={onClickMock} />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  //när jag klickar på ett kort så disablear jag den, den borde inte vara tryckbar efter.
  test("button is disabled when disabled = true", () => {
    render(
      <Card {...baseProps} isFlipped={false} onClick={jest.fn()} disabled />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });


  //knappen är enabled när vi sätter boolean till false, kollar om kortet är enabled.
  test("button is enabled when disabled = false", () => {
    render(
      <Card {...baseProps} isFlipped={false} onClick={jest.fn()} disabled={false} />
    );

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  test("alt text is correct", () => {
    render(
      <Card {...baseProps} isFlipped={false} onClick={jest.fn()} />
    );

    const img = screen.getByRole("img", { name: /warrior card/i });
    expect(img).toHaveAttribute("alt", "Warrior Card");
  });

  test("Dont trigger click event if disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Card {...baseProps} isFlipped={false} onClick={onClick} disabled />);

    await user.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled();
  })
});
