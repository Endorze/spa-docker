import styles from "./ReusableH2.module.css"

export type H2Props = {
    text: string,
}

export const ReusableH2 = ({text}: H2Props) => {
    return (
        <h2 className={styles.reusableTitle}>
            {text}
        </h2>
    )
}
