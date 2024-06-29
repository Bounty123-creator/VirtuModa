import styles from "./ExplainSection.module.css"
import ImageContainer from "../ImageContainer/ImageContainer"

type explainblockType = {
    header: string, 
    text: string, 
    icon: string,
}

export default function ExplainSection() {
    return (
        <>
            <div className={styles.container}>
                <ExplainBlock header="Kleidungsstück auswählen" text="Laden Sie Ihre Kleidungsstücke mit nur wenigen Klicks hoch." icon="/clothing.png?v=1"></ExplainBlock>
                
                <div className={styles.arrow}>
                    <ImageContainer src="/arrow.png" alt="Arrow to the right"></ImageContainer>
                </div>

                <ExplainBlock header="Model auswählen" text="Wählen Sie Ihren bevorzugten virtuellen Agenten, um Ihre Kleidungsstücke mühelos zu stylen." icon="/mann.png?v=1"></ExplainBlock>
                
                <div className={styles.arrow}>
                    <ImageContainer src="/arrow.png" alt="Arrow to the right"></ImageContainer>
                </div>

                <ExplainBlock header="Fotos erhalten  " text="Erhalten Sie sofortige, KI-generierte Inhalte, die auf Ihre Modebedürfnisse zugeschnitten sind." icon="/instant.png?v=1"></ExplainBlock>
            </div>
        </>
    )
}

function ExplainBlock({header, text, icon}: explainblockType) {
    return (
        <>
            <div className={styles.explain_block}>
                <div className={styles.explain_icon}>
                    <ImageContainer src={icon} alt="Icon"></ImageContainer>
                </div>
                <h3>{header}</h3>
                <p>{text}</p>
            </div>
        </>
    )
}