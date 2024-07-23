import React, { useState, useEffect } from 'react';
import MypageSideBar from './MypageSideBar';
import axios from 'axios';
import styles from './css/MypageProductSalesList.module.css';
import MypageProductSoldoutList from './MypageProductSoldoutList';

const MypageProductSalesList = () => {
  const [memberProductList, setMemberProductList] = useState([]);
  const [memberProductImageList, setMemberProductImageList] = useState([]);

  const memberId = 'member4';

  const readData = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/member/product/list/${memberId}`);
      console.log('Products:', response.data); // 응답 데이터 구조 확인
      setMemberProductList(response.data);
    } catch (error) {
      console.error('Error fetching member product list:', error);
    }
  };

  const readImageData = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/file?productNo=73&productImageNo=1`);
      console.log('Product Images:', response.data); // 응답 데이터 구조 확인
      setMemberProductImageList(response.data);
    } catch (error) {
      console.error('Error fetching member product images:', error);
    }
  };

  useEffect(() => {
    readData();
    readImageData();
  }, []);

  // 숫자를 천 단위로 구분하여 포맷팅하는 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price); // 한국 원화 형식
  };

  // 제품과 이미지를 병합하여 리스트로 반환
  const mergedList = [];
  let productIndex = 0;
  let imageIndex = 0;

  while (productIndex < memberProductList.length || imageIndex < memberProductImageList.length) {
    if (productIndex < memberProductList.length) {
      mergedList.push({ type: 'product', data: memberProductList[productIndex] });
      productIndex++;
    }
    if (imageIndex < memberProductImageList.length) {
      mergedList.push({ type: 'image', data: memberProductImageList[imageIndex] });
      imageIndex++;
    }
  }

  return (
    <div>
      <div className={styles.MypageProductSalesListComponent}>
        <MypageSideBar />
        <div>
          <h3>판매중 ({memberProductList.length})</h3>
          {mergedList.map((item, index) => (
            <div key={index} className={styles.MypageProductSalesList}>
              {item.type === 'product' ? (
                <div className={styles.ProductSalestext}>
                  <p className={styles.productTitle}>{item.data.productTitle}</p>
                  <p className={styles.productPrice}>￦{formatPrice(item.data.productPrice)}</p>
                </div>
              ) : (
                <img className={styles.ProductSalesimg} src={item.data.image} alt="Product" />
              )}
            </div>
          ))}
          <MypageProductSoldoutList />
          <img src='http://localhost:9999/file?productNo=73&productImageNo=1'/>
        </div>
      </div>
    </div>
  );
};

export default MypageProductSalesList;
