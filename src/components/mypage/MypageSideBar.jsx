import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/MypageSideBar.module.css';

export default function MypageSideBar() {
  return (
    <div className={styles.side_bar}>
      <div className={styles.my_page}>마이 페이지</div>
      <Link to="/my-store" className={styles.my_store}>내 상점</Link>
      <Link to="/my-info" className={styles.my_info}>내 정보</Link>
      <Link to="/like-product" className={styles.like_product}>관심 상품</Link>
      <Link to="/buy-history" className={styles.buy_history}>구매 내역</Link>
      <Link to="/sell-history" className={styles.sell_history}>판매 내역</Link>
      <Link to="/writed-review" className={styles.writed_review}>작성 후기</Link>
      <Link to="/received-review" className={styles.received_review}>받은 후기</Link>
      <Link to="/follow-list" className={styles.follow_list}>팔로우 목록</Link>
    </div>
  );
}
