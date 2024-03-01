import BaseFrame from "../components/BaseFrame";
import styles from "./Stream.module.css";

const Stream = () => {
  return (
    <div className={styles.stream}>
      <BaseFrame />
      <div className={styles.uRLInstructionFrame}>
        <main className={styles.instructionsFrame}>
          <section className={styles.leftSection}>
            <img
              className={styles.qrCodeIcon}
              loading="eager"
              alt=""
              src="/qr-code.png"
            />
            <b
              className={styles.scanTheCode}
            >{`Scan the Code & be a part of the stream. We are waiting for you....`}</b>
            <div className={styles.instructionsButtonsContainer}>
              <button className={styles.linkInstructions}>
                <div className={styles.linkInstructionsChild} />
                <b className={styles.instructions}>{`Instructions `}</b>
              </button>
              <button className={styles.linkInstructions1}>
                <div className={styles.linkInstructionsItem} />
                <b className={styles.url}>URL</b>
              </button>
            </div>
          </section>
          <section className={styles.rightSection}>
            <img
              className={styles.onlineConnectionImageChild}
              loading="eager"
              alt=""
              src="/group-46.svg"
            />
            <img
              className={styles.undrawOnlineConnection6778Icon}
              alt=""
              src="/undraw-online-connection-6778-1.svg"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Stream;
