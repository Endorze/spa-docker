import styles from "./ReusableH2.module.css"

type Props = {
    text: string,
}

export const ReusableH2 = ({text}: Props) => {
    return (
        <h2 className={styles.reusableTitle}>
            {text}
        </h2>
    )
}
