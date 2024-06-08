import styles from "../page.module.css";
import Image from "next/image";
import book from "../../../public/images/book.gif";
import loading from "../../../public/images/loading.gif";

export default function Conversations({ conversations, recommendations, loading }) {
  return (
    <ul>
      {conversations.map((item, index) => (
        <li
          key={index}
          className={`${item.type === "ai" ? styles.ai : styles.human}`}
        >
          {loading && (
            <ul className={styles.recommendationContainer}>
              <Image
                src={loading}
                className={styles.loading}
                width={60}
                height={60}
                alt="book"
              />
            </ul>
          )}
          {item.isRecommendation ? (
            <ul className={styles.recommendationContainer}>
              {recommendations.map((item, index) => (
                <li key={index} className={styles.recommendations}>
                  <Image
                    src={book}
                    className={styles.bookIcon}
                    width={60}
                    height={60}
                    alt="book"
                  />
                  <p className={styles.book}>
                    {item.title} by {item.author}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            item.text
          )}
        </li>
      ))}
    </ul>
  );
}
