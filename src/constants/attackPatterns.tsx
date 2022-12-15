import styles from '../components/Pattern.module.css' // Not sure if this is bad practice?

export const patternA = (
    <>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={styles.patternSquare}></div>
        <div className={styles.patternSquare}>X</div>
        <div className={styles.patternSquare}></div>
        <div className={styles.patternSquare}></div>
        <div className={styles.patternSquare}></div>
        <div className={styles.patternSquare}></div>
    </>
);

export const patternB = (
    <>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={styles.patternSquare}>X</div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
        <div className={`${styles.patternSquare} ${styles.valid}`}></div>
    </>
);