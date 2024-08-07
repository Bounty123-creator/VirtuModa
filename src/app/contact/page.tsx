"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./page.module.css"
import {  useRef, useState, useEffect, ReactNode } from "react"
import { useHover } from "usehooks-ts"
import { Variants, motion, useAnimation } from "framer-motion"

type contactForm = {
    children: JSX.Element,
    title: string,
}

export default function Contact() {
    return (

        <div className={styles.container} id="section-contact">

            {/* <div className={styles.background}>
                <Image src="/images/Contact.jpg" alt="Illustration of Vectorart" fill={true} sizes="50em"></Image>
            </div> */}

            <div className={styles.contact_form}>

                <Form></Form>

            </div>
        </div>

    )
}

function Form() {
    const [emailValue, setEmailValue] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")

    const invalidButtonVariants: Variants = {
        show: {
            x: [0, 10, -10, 0],
            transition: {
                duration: .2,
                ease: "easeInOut",
            }
        },
        hidden: {
            position: "relative",
            left: 0,
            width: "15em",
            color: "blue",
            borderRadius: "1em",
            backgroundColor: "var(--color-background)",
            border: "1px solid var(--color-contrast)",
            transition: {
                duration: .2,
            }
        },
        loading: {
            position: "relative",
            left: ["5em", "-5em", "5em"],
            borderRadius: "100%",
            width: "4em",
            backgroundColor: "var(--color-accent)",
            cursor: "default",
            transition: {
                duration: .8,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    }

    const validButtonVariants: Variants = {
        show: {
            position: "relative",
            scale: 1.1,
            color: "var(--color-contrast)",
            transition: {
                duration: .3,
            }
        },
        hidden: {
            position: "relative",
            scale: 1,
            color: "var(--color-contrast)",
            width: "15em",
            x: 0,
            border: "0px",
            backgroundColor: "var(--color-accent)",
        },
    }

    const errorVariants: Variants = {
        show: {display: "block"},
        hidden: {display: "none"}
    }

    const validAnim = useAnimation()
    const validRef = useRef(null)

    const errorAnim = useAnimation()
    const errorRef = useRef(null)

    const buttonAnim = useAnimation()
    const buttonRef = useRef(null)
    const buttonHover = useHover(buttonRef)

    const validation =  emailValue !== "" && validEmail && textValue !== "" && firstName !== "" && secondName !== "" ? (true) : (false)

    // Shows the button

    function showAnim() {
        if (!loading) {
            buttonAnim.set("hidden")
            buttonAnim.start("show")
        }
    }


    // Runs when button is clicked

    function clickHandler() {
        showAnim()
        submit()
    }

    useEffect(() => {
        if (loading) {
            buttonAnim.set("loading")
            buttonAnim.start("loading")
        } else if (!loading) {
            buttonAnim.start("hidden")
        }
    }, [loading, buttonAnim])

    useEffect(() => {
        // Animate if hovering and its not loading currently
        if (buttonHover && !loading)  {
            buttonAnim.start("show")
        } else if (!buttonHover && !loading) {
            buttonAnim.start("hidden")
        }
    }, [buttonHover, buttonAnim])

    useEffect(() => {
        // As soon as the form is valid / invalid it will reload the animation so that it will show valid or unvalid
        if (!loading) {
            buttonAnim.start("hidden")
        }
    }, [validation])

    async function submit() {

        if (validation) {

            setLoading(true)
            setButtonText("") // Looks more beautiful if button is empty

            // API Call here

            // Changing every value back to 0 so you can re-submit

            setEmailValue("")
            setFirstName("")
            setSecondName("")
            setTextValue("")
            setValidEmail(false)

            setTimeout(async () => {
                setButtonText("Submit") // Changing button text back to "submit"
                setLoading(false)
                buttonAnim.start("hidden")

                validAnim.set("show")
                setTimeout(() => {
                    validAnim.set("hidden")
                }, 4000)

            }, 4000)

        }
    }


    function updateEmailValidation(event: React.ChangeEvent<HTMLInputElement>) {
        setValidEmail(event.currentTarget.validity.valid)
    }

    function updateEmailValue(event: React.ChangeEvent<HTMLInputElement>) {
        setEmailValue(event.currentTarget.value)
        updateEmailValidation(event)
    }

    function updateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.currentTarget.value)
    }

    function updateSecondName(event: React.ChangeEvent<HTMLInputElement>) {
        setSecondName(event.currentTarget.value)
    }

    function updateTextValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextValue(event.currentTarget.value)
    }

    return (
        <div className={styles.form}>

            <div className={styles.form_wrapper}>

                <h2 className={styles.title}>Contact us:</h2>


                <Input title="">
                    <input style={!validEmail && emailValue != "" ? ({borderBottom: "1px solid red"}) : ({borderBottom: "1px solid var(--color-contrast)"})} type="email" value={emailValue} onChange={updateEmailValue} className={styles.input} name="form" id={styles.emailInput} placeholder="Email"/>
                </Input>

                <Input title="">
                    <div style={{display: "flex", gap: "1em"}}>
                        <input type="text" value={firstName} onChange={updateFirstName} className={styles.input} name="form" id={styles.firstNameInput} autoComplete="off" placeholder="First Name"/>
                        <input type="text" value={secondName} onChange={updateSecondName} className={styles.input} name="form" id={styles.secondNameInput} autoComplete="off" placeholder="Second Name"/>
                    </div>
                </Input>

                <Input title="">
                    <textarea value={textValue} onChange={updateTextValue} className={styles.input} id={styles.textInput} placeholder="Explain your Project briefly" autoComplete="off"></textarea>
                </Input>


                {loading ? 
                (
                    <div className={styles.spinner}></div>
                )
                
                :
                
                (
                    <div className={styles.button_wrapper}>
                    <motion.button onClick={clickHandler} ref={buttonRef} animate={buttonAnim} variants={
                            !validation || loading?
                            (
                                invalidButtonVariants
                            ) : (
                                validButtonVariants
                            )
                        }
                        className={styles.submitButton} type="submit" name="form"><h4>{buttonText}</h4>
                        </motion.button>
                </div>
                )}

                <motion.p ref={errorRef} initial="hidden" variants={errorVariants} animate={errorAnim} style={{color: "red"}}>Error, something went wrong, try again later</motion.p>
                <motion.p ref={validRef} initial="hidden" variants={errorVariants} animate={validAnim} style={{color: "green"}}>Successfully submitted!</motion.p>
                {/* Here we are using Variants "ErrorVariants" for both, because they do the same thing, show / dont show */}

            </div>

        </div>
    )
}

function Input({children, title}: contactForm) {

    return (
    <div className={styles.input_wrapper}>
        <div className={styles.text_wrapper}>
            {title? (<h1>{title}</h1>) : (null)}
        </div>
        {children}
    </div>
    )
}