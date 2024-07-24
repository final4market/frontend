import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/MypageProductSalesList.module.css';
import MypageMemberId from './MypageMemberId'; // 커스텀 훅을 import

const MypageProductSoldoutList = () => {
  const [memberProductList, setMemberProductList] = useState([]);
  const memberId = MypageMemberId(); // 커스텀 훅을 사용

  const readData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9999/member/productSales/list/${id}`);
      console.log(response.data); // 응답 데이터 구조 확인
      setMemberProductList(response.data);
    } catch (error) {
      console.error('Error fetching member list:', error);
    }
  };

  useEffect(() => {
    if (memberId) {
      readData(memberId);
    }
  }, [memberId]); // memberId가 변경될 때마다 데이터 새로 읽어오기

  // 숫자를 천 단위로 구분하여 포맷팅하는 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price); // 한국 원화 형식
  };

  return (
    <div>
      <div className={styles.MypageProductSalesListComponent}>
        <div>
          <h3>판매완료 ({memberProductList.length})</h3>
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
        </div>
      </div>
    </div>
  );
};

export default MypageProductSoldoutList;
