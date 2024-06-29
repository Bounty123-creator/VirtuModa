import styles from "./FileInput.module.css";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Spinner } from "@nextui-org/spinner";

const buttonVariants: Variants = {
  hover: {
    background:
      "radial-gradient(circle, var(--color-background) 0%, var(--color-accent) 0%",
    color: "var(--color-background)",
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },

  start: {
    color: "var(--color-accent)",
    background:
      "radial-gradient(circle, var(--color-background) 100%, var(--color-accent) 100%)",
  },

  click: {
    scale: 0.9,
    transition: {
      duration: 0.1,
      bounce: 0.2,
    },
  },

  invalid: {
    border: "1px solid grey",
    color: "grey",
    transition: {
      duration: 0.5,
    },
  },

  invalid_click: {
    x: ["0rem", "-1rem", "0rem", "1rem", "0rem"],
    transition: {
      duration: 0.1,
    },
  },
};

export default function FileInput() {
  const [garm_img, setGarmImg] = useState<File | undefined>(undefined);
  const [human_img, setHumanImg] = useState<File | undefined>(undefined);
  const [error, setError] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garm_img, human_img]);

  function checkValidity() {
    const acceptedFiles = ["image/png", "image/jpeg", "image/webp"];

    if (!garm_img) {
      setError(true);
      console.log("Error set true 1");
      return;
    } else if (!acceptedFiles.some((type) => garm_img?.type.endsWith(type))) {
      setError(true);
      console.log("Error set true 2 ");

      return;
    } else if (!human_img) {
      setError(true);
      console.log("Error set true 3");

      return;
    } else if (!acceptedFiles.some((type) => human_img?.type.endsWith(type))) {
      setError(true);
      console.log("Error set true 4");
      return;
    } else {
      console.log("Error set false");
      setError(false);
    }
  }

  function SubmitButton() {
    return (
      <>
        <motion.button
          className={styles.submit}
          onClick={async () => {
            if (loading) {
              return;
            }

            checkValidity();
            if (error) {
              return;
            }
            setLoading(true);

            const formdata = new FormData();

            if (garm_img) {
              formdata.append("garm_img", garm_img);
            }

            if (human_img) {
              formdata.append("human_img", human_img);
            }

            if (!human_img || !garm_img || !formdata) {
              setError(true);
              console.log(
                "Something went wrong when trying to append the files to the formData"
              );
              return;
            }

            const req = new Request("/api/upload", {
              method: "POST",
              body: formdata,
            });
            const res = await fetch(req);

            if (!res.ok) {
              throw new Error("Failed to fetch data");
            } else {
              const output_link = await res.json();
              setOutput(output_link);
            }

            setLoading(false);
          }}
          variants={buttonVariants}
          initial="start"
          animate={error || loading ? "invalid" : ""}
          whileHover={error || loading ? "invalid" : "hover"}
          whileTap={error || loading ? "" : "click"}
          style={loading ? { display: "none" } : { display: "block" }}
        >
          Submit
        </motion.button>
        {loading ? <div className={styles.spinner}></div> : <></>}
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upload_wrapper}>
          <div className={styles.input_wrapper}>
            <h4>Laden sie ein Bild eines Kleidungsstückes hoch</h4>

            <motion.label
              htmlFor="file-upload-garm"
              className={styles.file_input}
            >
              {garm_img ? garm_img.name : "+ Add an image..."}
            </motion.label>

            <input
              type="file"
              style={{ display: "none" }}
              id="file-upload-garm"
              accept="image/jpeg, image/png, image/webp"
              onInput={(e) => {
                setGarmImg(e.currentTarget.files?.[0]);
              }}
            ></input>
          </div>

          <div className={styles.input_wrapper}>
            <h4>Laden sie ein Bild ihres Models hoch</h4>

            <motion.label
              htmlFor="file-upload-human"
              className={styles.file_input}
            >
              {human_img ? human_img.name : "+ Add an image..."}
            </motion.label>

            <input
              type="file"
              style={{ display: "none" }}
              id="file-upload-human"
              accept="image/jpeg, image/png, image/webp"
              onInput={(e) => {
                setHumanImg(e.currentTarget.files?.[0]);
              }}
            ></input>
          </div>

          <SubmitButton></SubmitButton>
          <div
            style={{
              display: error ? "inline" : "none",
              textAlign: "center",
              color: output ? "green" : error ? "red" : "var(--color-contrast)",
              width: "100%",
            }}
          >
            {error
              ? "Something went wrong... Check if you uploaded an image and wether you have an clothing and human image"
              : ""}
            {output ? "Successful!" : ""}
          </div>
        </div>

        <div className={styles.output_wrapper}>
          {output ? <></> : <h2>Ergebnis</h2>}
          <div className={styles.output_image}>
            <Image
              src={
                output
                  ? output
                  : "https://replicate.delivery/pbxt/Tfs5JETdzlURKyKeUOltKwch7udHf8e2xmNsftwid7ca2E6UC/output.jpg"
              }
              alt="Your ouput image"
              fill={true}
              objectFit="contain"
            ></Image>
          </div>
          {output ? <a href={output}>Click here to download</a> : <></>}
        </div>
      </div>
    </>
  );
}
