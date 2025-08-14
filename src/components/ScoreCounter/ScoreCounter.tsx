import styles from "./ScoreCounter.module.css"

type Props = {
    score: number,
    text?: string,
}

export const ScoreCounter = ({ text, score }: Props) => {
    return (
        <div className="min-h-[100px] min-w-[200px] bg-white flex justify-center items-center">
            <div className="flex text-center flex-col">
                <h2 className={styles.text}>{text}</h2>
                <p className={styles.score}>{score}</p>
            </div>
        </div>
    )
}