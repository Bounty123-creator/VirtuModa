import { register } from "swiper/element/bundle";
import styles from "./SocialProof.module.css";
import EmblaCarousel from "./EmblaCarousel";
import Image from "next/image";

register();

type reviewType = {
    name: string,
    text: string
}

export default function SocialProof() {
  return (
    <>
      <div className={styles.container}>
        <h2>Unsere Kundenrezensionen</h2>
        <Carousel></Carousel>
      </div>
    </>
  );
}

function Review({name, text}: reviewType) {
    return (
        <>
            <div className="embla__slide">
                <div style={{display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center"}}>
                    <div style={{position: "relative", width: "2rem", height: "2rem", borderRadius: "100%", overflow: "hidden"}}>
                        <Image
                            src="/pfp.jpg"
                            alt="pfp"
                            fill={true}
                        ></Image>
                    </div>
                    <h4>{name}</h4>
                </div>
                <div style={{width: "100%", height: "1px", backgroundColor: "var(--color-accent)"}}></div>
                <p>{text}</p>
            </div>
        </>
    )
}
function Carousel() {
 const slides = 
 [
  ["Alice Johnson", "Diese KI leistet fantastische Arbeit beim Kleiden von Menschen. Die Genauigkeit der Outfits ist fast wie Magie! Sie mischt und passt Kleidungsstücke perfekt an. Die Ergebnisse sind stilvoll und sehr realistisch. Es ist ein Wendepunkt in der Mode."],
  ["Bob Smith", "Schneller und guter Service. Definitiv nochmal!"],
  ["Charlie Davis", "Ich arbeite jetzt schon mehrere Monate mit dieser Firma zusammen und ich kann es jedem Unternehmer in der Fashionindustrie weiterempfehlen!"],
]

  return (
    <>  
        <EmblaCarousel slides={slides.map((arr, index) => {
            return <Review key={index} name={arr[0]} text={arr[1]}></Review>
        })}></EmblaCarousel>
    </>
  );
}