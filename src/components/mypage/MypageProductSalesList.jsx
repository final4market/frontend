import React, { useState, useEffect } from 'react';
import MypageSideBar from './MypageSideBar';
import axios from 'axios';
import styles from './css/MypageProductSalesList.module.css';

const MypageProductSalesList = () => {
  const [memberProductList, setMemberProductList] = useState([]);
  const memberId = 'member4';

  const readData = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/member/productSales/list/${memberId}`);
      console.log(response.data); // 응답 데이터 구조 확인
      setMemberProductList(response.data);
    } catch (error) {
      console.error('Error fetching member list:', error);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  // 숫자를 천 단위로 구분하여 포맷팅하는 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price); // 한국 원화 형식
  };

  // 날짜에 14일을 더한 값을 계산하는 함수
  const addDaysToDate = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 반환
  };

  // 현재 날짜와 기한 날짜 사이의 일수 차이를 계산하는 함수
  const calculateDday = (dateStr) => {
    const today = new Date();
    const deadline = new Date(dateStr);
    const timeDiff = deadline - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초를 일수로 변환
    return dayDiff;
  };

  return (
    <div>
      <div className={styles.MypageProductSalesListComponent}>
        <MypageSideBar />
        <div>
          {memberProductList.map((memberProduct, index) => (
            <div key={index} className={styles.MypageProductSalesList}>
              <div>
                <img className={styles.ProductSalesimg} src={memberProduct.productImagePath} alt="Product" />
              </div>
              <div className={styles.ProductSalestext}>
                <p className={styles.ProductSalesthDate}>구매확정일 : {memberProduct.thDate}</p>
                <p className={styles.productTitle}>{memberProduct.productTitle}</p>
                <p className={styles.productPrice}>￦{formatPrice(memberProduct.productPrice)}</p>
              </div>
              <div className={styles.reviewWrite}>
                <button className={styles.reviewWriteButton}>구매후기 작성하기</button>
                <p>작성기한 : {addDaysToDate(memberProduct.thDate, 14)}
                  {` (${calculateDday(addDaysToDate(memberProduct.thDate, 14)) >= 0 ? `D-${calculateDday(addDaysToDate(memberProduct.thDate, 14))}` : '기한 초과'})`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MypageProductSalesList;
