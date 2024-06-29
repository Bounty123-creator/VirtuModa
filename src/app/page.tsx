"use client"
import HeroSection from "@/components/HeroSection/HeroSection"
import styles from "./page.module.css"
import ExplainSection from "@/components/ExplainSection/ExplainSection"
import SocialProof from "@/components/SocialProof/SocialProof"
import BigButton from "@/components/BigButton/BigButton"

export default function Main() {


  return (
    <>
      <main className={styles.main}>
        <HeroSection></HeroSection>
        <ExplainSection></ExplainSection>
        <SocialProof></SocialProof>

        <BigButton href="/product" text="Kostenlos testen!"></BigButton>
      </main>
    </>
  )
}