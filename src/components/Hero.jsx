import styles from "../app/page.module.css";

import AnimatedTitle from "./AnimatedTitle";
import UploadBox from "./UploadBox";
import InfoCard from "./InfoCard";

export default function Hero() {
  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          <AnimatedTitle />
        </h1>

        <div>
          <p className={styles.subtitle}>
            Upload documents and interact with them using AI.
          </p>

          <div className={styles.uploadInner}>
            <UploadBox />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.infoCard}>
          <InfoCard title="Capabilities">
            <ul>
              <li>Semantic Search</li>

              <li>PDF Question Answering</li>
              <li>Context Retrieval</li>
              <li>AI Generated Responses</li>
            </ul>
          </InfoCard>
        </div>

        <div className={styles.techStack}>
          <InfoCard title="Tech Stack">
            <div>
              <span>Next.js</span>
              <span>Groq AI</span>
              <span>LangChain</span>
              <span>Supabase</span>
              <span>pgvector</span>
            </div>
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
