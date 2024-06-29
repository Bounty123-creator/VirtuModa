import { useRouter } from "next/navigation"
import styles from "./BigButton.module.css"
import {Variants, motion} from "framer-motion"

type buttonType = {
    text: string,
    href: string,
}

const buttonVariants: Variants = {
    hover: {
        background: "radial-gradient(circle, rgba(0, 0, 0, 0) 0%, var(--color-accent) 0%",
        color: "var(--color-background)",
        scale: 1.1,
        transition: {
            duration: .2
        }
    },
    
    start: {
        color: "var(--color-accent)",
        background: "radial-gradient(circle, rgba(0, 0, 0, 0) 100%, var(--color-accent) 100%)",
    },

    click: {
        scale: 0.9,
        transition: {
          duration: 0.1,
          bounce: 0.2,
        },
      },
}

export default function BigButton({text, href}: buttonType) {
    const router = useRouter()

    return (
        <>
            <motion.button variants={buttonVariants} onClick={(e) => {
                e.preventDefault()
                router.push(href)
            }} whileHover="hover" whileTap="click" initial="start" className={styles.button}>
                {text}
            </motion.button>
        </>
    )
}