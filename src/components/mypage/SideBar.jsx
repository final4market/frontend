import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.side_container}>
      <div className={styles.my_page}>마이 페이지</div>
      <ul className={styles.side_ul}>
        <li className={styles.side_li}>
          <Link to="/myStore" className={`${styles.side_item} ${styles.my_store}`}>내 상점</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/myInfo" className={`${styles.side_item} ${styles.my_info}`}>내 정보</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/interestProduct" className={`${styles.side_item} ${styles.interest_product}`}>관심 상품</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/" className={`${styles.side_item} ${styles.buy_history}`}>구매 내역</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/" className={`${styles.side_item} ${styles.sell_history}`}>판매 내역</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/" className={`${styles.side_item} ${styles.writed_review}`}>작성 후기</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/" className={`${styles.side_item} ${styles.received_review}`}>받은 후기</Link>
        </li>
        <li className={styles.side_li}>
          <Link to="/" className={`${styles.side_item} ${styles.follow_list}`}>팔로우 목록</Link>
        </li>
      </ul>
    </div>
  );
};