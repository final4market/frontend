import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import SideBar from "./MypageSideBar";
import MyPageMemberId from "./MyPageMemberId";
import styles from "./css/MyStore.module.css";

export default function MyStore() {
  const [profile, setProfile] = useState({});
  const [product, setProduct] = useState({});
  const memberId = MyPageMemberId();
  const productNo = 1;


  useEffect(() => {
    // 프로필 정보 가져오기
    const myPageProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/myPageProfile/${memberId}`);
        setProfile(response.data); // 서버에서 받은 프로필 정보 설정
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // 상품 정보 가져오기
    const myPageProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/myPageProduct/${productNo}`);
        setProduct(response.data); // 서버에서 받은 상품 정보 설정
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // useEffect 내에서 위에서 정의한 함수들 호출
    myPageProfile();
    myPageProduct();
  }, [memberId]); // memberId가 변경될 때마다 useEffect가 실행됨

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
            <img className={styles.my_store_product_image} src={product.productImagePath} alt="productImage" />
            <div className={styles.my_store_product_title}>
              <h4>{product.productTitle}</h4>
            </div>
            <div className={styles.my_store_product_price}>
              {product.productPrice}원
            </div>
            <div className={styles.my_store_product_detail}>
              관심{product.interestCount}
              <div className={styles.my_store_vertical_bar}>|</div>
              채팅{product.chatCount}
            </div>
          </div>
        </div>
        <div className={styles.my_store_banner}>배너</div>
      </div>
    </div>
  );
};
