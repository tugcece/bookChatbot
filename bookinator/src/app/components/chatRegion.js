import { useState } from "react";
import styles from "../page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, FaRegEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import book from "../../../public/images/book.gif";
import axios from "axios";

const questions = [
  "Hangi tür kitapları seversin? Roman, Bilim Kurgu, Korku, Polisiye, Fantastik, Biyografi, Tarih gibi detaylandırabilir misin?",
  "Hangi dilde kitap okumayı istersin? Tercih ettiğin bir dil var mı?",
  "En sevdiğin yazar kim? Sana onun diline benzer şekilde yazılmış kitaplar önerebilirim.",
];

export default function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conversations, setConversations] = useState([
    { type: "ai", text: questions[0] },
  ]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setConversations((prev) => [...prev, { type: "human", text: input }]);
    if (currentQuestionIndex < questions.length - 1) {
      setConversations((prev) => [
        ...prev,
        { type: "ai", text: questions[currentQuestionIndex + 1] },
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      processConversations([...conversations, { type: "human", text: input }]);
    }

    setInput("");
  };

  const processConversations = async (finalConversations) => {
    const answers = finalConversations.filter(
      (convo) => convo.type === "human"
    );
    const recommendedBooks = await getRecommendations(answers);
    setRecommendations(recommendedBooks);
    setConversations((prev) => [
      ...prev,
      { type: "ai", isRecommendation: true },
    ]);
  };

  const getRecommendations = async (answers) => {
    try {
     /*  const url = "https://api.example.com/postData";

      const headers = {
        "Content-Type": "application/json"
      };

      const data = {
        konsept: answers[0].text,
        dil: answers[1].text,
        yazar: answers[2].text,
      };

      const response = await axios.post(url, data, headers);
      const books = response.data; */
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
    console.log("a", answers[0].text);
    const books = [
      { title: "To Kill a Mockingbird", author: "Harper Lee" },
      { title: "1984", author: "George Orwell" },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { title: "The Catcher in the Rye", author: "J.D. Salinger" },
      { title: "Moby-Dick", author: "Herman Melville" },
      { title: "Pride and Prejudice", author: "Jane Austen" },
      { title: "The Hobbit", author: "J.R.R. Tolkien" },
      { title: "War and Peace", author: "Leo Tolstoy" },
      { title: "The Odyssey", author: "Homer" },
      { title: "Ulysses", author: "James Joyce" },
    ];
    return books;
  };

  return (
    <div className={styles.questionRegion}>
      <div className={styles.chatRegion}>
        <ul>
          {conversations.map((item, index) => (
            <li
              key={index}
              className={`${item.type === "ai" ? styles.ai : styles.human}`}
            >
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
      </div>
      <form className={styles.inputRegion} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          className={styles.input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={
            input.trim() ? styles.enterButtonActive : styles.enterButtonDisabled
          }
          type="submit"
        >
          <FontAwesomeIcon
            className={styles.buttonIcon}
            icon={faPaperPlane}
            size="lg"
          />
        </button>
       {/*  <button className={styles.newChatButton}>
          <FontAwesomeIcon
            className={styles.buttonIcon}
            icon={FaRegEdit}
            size="lg"
          />
        </button> */}
      </form>
    </div>
  );
}
