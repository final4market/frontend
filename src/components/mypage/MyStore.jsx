import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MyProductCard from "./ProductCard";
import SideBar from "./SideBar";
import styles from "./css/MyStore.module.css";

// const product = [
//   {
//     imageUrl: "/img/mypage/bag.png",
//     name: "가죽 가방",
//     price: "50,000원",
//     detail: "관심 9 | 채팅 5"
//   },
//   {
//     imageUrl: "/img/mypage/watch.png",
//     name: "손목 시계",
//     price: "300,000원",
//     detail: "관심 5 | 채팅 9"
//   },
//   {
//     imageUrl: "/img/mypage/sunglasses.png",
//     name: "선글라스",
//     price: "30,000원",
//     detail: "관심 11 | 채팅 5"
//   },
//   {
//     imageUrl: "/img/mypage/chair.png",
//     name: "의자",
//     price: "10,000원",
//     detail: "관심 3 | 채팅 3"
//   }
// ];

export default function MyStore() {
  const [profile, setProfile] = useState({});
  const [product, setProduct] = useState([]);
  const memberId = 'member4';
  const productNo = 1;

  useEffect(() => {
    fetchProfile(); // 프로필 정보 가져오기
    fetchProduct();
  }, []);

  const fetchProfile = () => {
    fetch(`http://localhost:9999/myStoreProfile/${memberId}`) // memberId는 실제 사용할 멤버 ID로 대체해야 함
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile: ", error));
  };

  const fetchProduct = () => {
    fetch(`http://localhost:9999/myStoreProduct/${productNo}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product: ", error));
  };

  return (
    <div className={styles.my_store_header_container}>
      <Header/>
      <div className={styles.my_store_side_container}>
        <SideBar/>
          <div className={styles.my_store_main_container}>
            <div className={styles.my_store_profile}>
              <img className={styles.my_store_profile_image} src={profile.memberProfilePath} alt="profileImage"/>
              {profile.memberNick} | 평점:
              <span className={styles.my_store_score}>★</span>
              {profile.memberScore}
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
              <img className={styles.my_store_product_image} src={product.productImagePath} alt="productIamge"/>
              <div className={styles.my_store_product_title}>
                <h4>{product.productTitle}</h4>
              </div>
              <div className={styles.my_store_product_price}>
                {product.productPrice}원
              </div>
              <div className={styles.my_store_detail}>
                관심{product.interestCount}|
                채팅{product.chatCount}
              </div>
            </div>
          </div>
        <div className={styles.my_store_banner}>배너</div>
      </div>
      <Footer/>
    </div>
  );
};