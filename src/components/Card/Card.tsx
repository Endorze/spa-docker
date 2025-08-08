import { CardProps } from "@/data/cards";

type Props = CardProps & {
    isFlipped: boolean,
    onClick: () => void,
}

const Card = ({id, pairId, backImage, frontImage, isMatched, isFlipped, alt, onClick}: Props) => {

    return (
        <div>
            <button onClick={onClick}>
                <img className="max-w-[100px] h-auto object-cover" src={isFlipped ? frontImage : backImage} alt={alt}/>
            </button>
        </div>
    )
}

export default Card;