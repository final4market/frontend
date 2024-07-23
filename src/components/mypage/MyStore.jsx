import React from 'react';
import Header from './MypageHeader';
import SideBar from './SideBar';
import ProductCard from './ProductCard';
import Footer from './Footer';
import styles from './css/MyStore.module.css';

const products = [
  {
    name: "가죽 가방",
    price: "50,000원",
    detail: "관심 9 | 채팅 5",
    imageUrl: "/img/mypage/bag.png",
  },
  {
    name: "손목 시계",
    price: "300,000원",
    detail: "관심 5 | 채팅 9",
    imageUrl: "/img/mypage/watch.png",
  },
  {
    name: "선글라스",
    price: "30,000원",
    detail: "관심 11 | 채팅 5",
    imageUrl: "/img/mypage/sunglasses.png",
  },
  {
    name: "의자",
    price: "10,000원",
    detail: "관심 3 | 채팅 3",
    imageUrl: "/img/mypage/chair.png",
  },
];

export default function MyStore() {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.content}>
        <SideBar/>
          <main>
            <div className={styles.profile}>닉네임 | 평점: <span className={styles.score}>★</span>4.5</div>
            <nav>
              <ul>
                <li><a href="#" className={styles.product}>상품</a></li>
                <li><a href="#" className={styles.review}>후기</a></li>
                <li><a href="#" className={styles.follow}>팔로우</a></li>
              </ul>
           </nav>
            <div className={styles.products}>
              {products.map((product, index) => (
                <ProductCard key={index} product={product}/>
              ))}
            </div>
          </main>
        <div className={styles.banner}>배너</div>
      </div>
      <Footer/>
    </div>
  );
};