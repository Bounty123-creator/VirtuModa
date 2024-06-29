import styles from "./ImageContainer.module.css"
import Image from "next/image"

type imageContainerType = {src: string, alt: string}

export default function ImageContainer({src, alt}: imageContainerType) {
    return (
        <>
            <div className={styles.image_container}>
                <Image
                    src={src}
                    alt={alt}
                    fill={true}
                ></Image>
            </div>
        </>
    )
}