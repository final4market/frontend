import React, { useState, useEffect } from 'react';
import MypageSideBar from './MypageSideBar';
import axios from 'axios';
import styles from './css/MypageProductSalesList.module.css';
import MypageProductSoldoutList from './MypageProductSoldoutList';
import MypageMemberId from './MypageMemberId'; // 커스텀 훅을 import
import ProductRegisterUpdate from '../productRegistration/ProductRegistrationUpdate';

const MypageProductSalesList = () => {
  const [memberProductList, setMemberProductList] = useState([]);

  const memberId = MypageMemberId(); // 커스텀 훅을 사용

  const readData = async (memberId) => {
    try {
      const response = await axios.get(`http://localhost:9999/member/productSaleslist/${memberId}`);
      console.log('Products:', response.data); // 응답 데이터 구조 확인
      setMemberProductList(response.data);
    } catch (error) {
      console.error('Error fetching member product list:', error);
    }
  };

  const productDelete =async(productNo)=>{
    try {
      await axios.delete(`http://localhost:9999/product/delete/${productNo}`)
      alert("삭제가 완료됐습니다."); // alert 창으로 메시지 표시
      window.location.reload(); // 페이지 새로고침
    }catch(error){

    }
  }

  const productUpdate=()=>{
   
  }
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
                  <p className={styles.productTitle}>{memberProduct.productTitle}</p>
                  <p className={styles.productPrice}>￦{formatPrice(memberProduct.productPrice)}</p>
                </div>
                <button onClick={()=> productUpdate(memberProduct.productNo)}>수정</button>
                <button onClick={() => productDelete(memberProduct.productNo) }>삭제</button>
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
