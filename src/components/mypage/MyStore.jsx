import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MyProductCard from "./ProductCard";
import SideBar from "./SideBar";
import styles from "./css/MyStore.module.css";

const product = [
  {
    imageUrl: "/img/mypage/bag.png",
    name: "가죽 가방",
    price: "50,000원",
    detail: "관심 9 | 채팅 5"
  },
  {
    imageUrl: "/img/mypage/watch.png",
    name: "손목 시계",
    price: "300,000원",
    detail: "관심 5 | 채팅 9"
  },
  {
    imageUrl: "/img/mypage/sunglasses.png",
    name: "선글라스",
    price: "30,000원",
    detail: "관심 11 | 채팅 5"
  },
  {
    imageUrl: "/img/mypage/chair.png",
    name: "의자",
    price: "10,000원",
    detail: "관심 3 | 채팅 3"
  }
];

export default function MyStore() {
  return (
    <div className={styles.my_store_header_container}>
      <Header/>
      <div className={styles.my_store_side_container}>
        <SideBar/>
          <div className={styles.my_store_main_container}>
            <div className={styles.my_store_profile}>닉네임 | 평점:
              <span className={styles.my_store_score}>★</span>4.5
            </div>
            <div className={styles.my_store_nav_container}>
              <ul className={styles.my_store_nav_ul}>
                <li className={styles.my_store_nav_li}>
                  <Link to="/myStore" className={styles.my_store_nav_item}>상품</Link>
                </li>
                <li className={styles.my_store_nav_li}>
                  <Link to="/receivedReview" className={styles.my_store_nav_item}>후기</Link>
                </li>
                <li className={styles.my_store_nav_li}>
                  <Link to="/followList" className={styles.my_store_nav_item}>팔로우</Link>
                </li>
              </ul>
            </div>
            <div className={styles.my_store_product}>
              {product.map((product, index) => (
                <MyProductCard key={index} product={product}/>
              ))}
            </div>
          </div>
        <div className={styles.my_store_banner}>배너</div>
      </div>
      <Footer/>
    </div>
  );
};