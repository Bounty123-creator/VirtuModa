import styles from "./page.module.css";
import Image from "next/image";

type postType = {
    date: string,
    text: string,
    subtext: string,
}

export default function Page() {
  return (
    <div className={styles.main}>
        <h2>Outfit Anyone AI Blog</h2>

        <div className={styles.postsContainer}>
            <Post date="2023-12-23" text="Outfit Anyone: Transforming
              Virtual Try-On" subtext="Outfit Anyone introduction"></Post>

        </div>
    </div>
  );
}

function Post({date, text, subtext}: postType) {
  return (
    <a href="">
        <div className={styles.post}>
          <div className={styles.postImage}>
            <Image
              src="/blog.jpg"
              fill={true}
              alt="Test"
              objectFit="cover"
            ></Image>
          </div>

          <div className={styles.postText}>
            <p>
              <small>{date}</small>
            </p>
            <p>
              {text}
            </p>
            <p>
              <small>
                {subtext}
              </small>
            </p>
          </div>
        </div>
    </a>

  );
}
