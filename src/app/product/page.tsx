"use client"
import FileInput from "@/components/Product/FileInput"
import styles from "./page.module.css"

export default function Page() {
    return (
        <>
            <main className={styles.main}>
                <FileInput></FileInput>
            </main>
        </>
    )
}