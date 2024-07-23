<<<<<<< HEAD:src/components/mypage/MypageHeader.jsx
import React from 'react';
import styles from './css/MypageHeader.module.css';
=======
import React from "react";
import styles from "./css/Header.module.css";
>>>>>>> 1f7764110cb9a2fd5ed1bd561f2f4d261fd97a66:src/components/mypage/Header.jsx

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>logo</div>
      <input type="text" className={styles.search_input} placeholder="상품명 입력" />
      <nav className={styles.user_menu}>
        <a href="#">마이 페이지</a>
        <a href="#">로그아웃</a>
      </nav>
    </header>
  );
};