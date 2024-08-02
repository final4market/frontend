import styles from "./css/MyPageStarScore.module.css";

export default function MyPageStarScore({ score }) {
// 별의 총 개수 (예를 들어 5개)
const totalStar = 5;
  
return (
  <div className={styles.star_score}>
    {[...Array(totalStar)].map((_, index) => (
      <span key={index} className={index < score ? styles.filledStar : styles.emptyStar}>
        ★
      </span>
    ))}
  </div>
  );
};