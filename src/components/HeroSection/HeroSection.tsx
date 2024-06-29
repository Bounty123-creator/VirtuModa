import BigButton from "../BigButton/BigButton"
import styles from "./HeroSection.module.css"

export default function HeroSection() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1>Create amazing Content for your Brand</h1>
                    <BigButton href="/product" text="Kostenlos testen!"></BigButton>
                </div>
            </div>
            <div className={styles.background}></div>
        </>
    )
}