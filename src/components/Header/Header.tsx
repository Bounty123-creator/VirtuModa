"use client"
import { useRouter } from "next/navigation"
import styles from "./Header.module.css"
import Image from "next/image"
import { Variants, easeOut, motion} from "framer-motion"

type buttonType = {
    text: string,
    link: string,
}

const buttonVariants: Variants = {
    hover: {
        width: "125%",
        transition: {
            duration: 0.08,
            ease: easeOut,

        }
    },

    start: {
        width: "0%"
    }
}

export default function Header() {
    const router = useRouter()

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.nav_buttons}>
                    <div onClick={() => {
                        router.push("/")
                    }} className={styles.logo_container}>
                        <Image
                        src="/logo.png?v=2"
                        alt="Logo"
                        fill={true}
                        ></Image>
                    </div>
                    <Button text="Product" link="/product"></Button>
                    <Button text="Blog" link="/blog"></Button>
                    <Button text="FAQ" link="/faq"></Button>
                    <Button text="Contact us" link="/contact"></Button>
                </div>
            </div>
        </> 
    )
}

function Button({text, link}: buttonType) {
    const router = useRouter()

    return (
        <motion.div variants={{}} onClick={() => {router.push(link)}} whileHover="hover" className={styles.button_container}>
                <p>{text}</p>
                <motion.div variants={buttonVariants} className={styles.hover}></motion.div>
        </motion.div>
    )
}