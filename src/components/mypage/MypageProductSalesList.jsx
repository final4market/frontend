import React, { useState, useEffect } from 'react';
import MypageSideBar from './MypageSideBar';
import axios from 'axios';
import styles from './css/MypageProductSalesList.module.css';
import MypageProductSoldoutList from './MypageProductSoldoutList';
import MypageMemberId from './MypageMemberId'; // 커스텀 훅을 import

const MypageProductSalesList = () => {
  const [memberProductList, setMemberProductList] = useState([]);

  const memberId = MypageMemberId(); // 커스텀 훅을 사용

  const readData = async (memberId) => {
    try {
      const response = await axios.get(`http://localhost:9999/member/product/list/${memberId}`);
      console.log('Products:', response.data); // 응답 데이터 구조 확인
      setMemberProductList(response.data);
    } catch (error) {
      console.error('Error fetching member product list:', error);
    }
  };

  useEffect(() => {
    if (memberId) {
      readData(memberId);
    }
  }, [memberId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price); // 한국 원화 형식
  };


  return (
    <div>
      <div className={styles.MypageProductSalesListComponent}>
        <MypageSideBar />
        <div>
          <h3>판매중 ({memberProductList.length})</h3>
          {memberProductList.map((memberProduct, index) => (
            <div key={index}>
              <div className={styles.MypageProductSalesList}>
                <img className={styles.ProductSalesimg} src={`http://localhost:9999/file?productNo=${memberProduct.productNo}&productImageNo=1`} alt="Product" />
                <div className={styles.ProductSalestext}>
                  <p className={styles.ProductSalesthDate}>구매확정일 : {memberProduct.thDate}</p>
                  <p className={styles.productTitle}>{memberProduct.productTitle}</p>
                  <p className={styles.productPrice}>￦{formatPrice(memberProduct.productPrice)}</p>
                </div>
              </div>
            </div>
          ))}
      
          <MypageProductSoldoutList />
      
        </div>
      </div>
    </div>
  );
};

export default MypageProductSalesList;
