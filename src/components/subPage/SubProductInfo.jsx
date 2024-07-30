import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PurchaseSide from './SubSide';
import styles from './css/SubProductInfo.module.css';
import Report from './SubReport';
import Sub_chat from './SubChat';

const ProductInfo = ({ productImage }) => {
  const [timePassed, setTimePassed] = useState("");
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 관리하는 state
  const [productInfo, setProductInfo] = useState({
    productTitle: '',
    productPrice: 0,
    productCount: 0,
    productLike: 0,
    productDate: '',
    productStatus: '',
    productContent: '',
    categoryNo: 0 // 기본값 설정
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryName: '',
    tradiArea: ''
  });

  const [categoryInfo, setCategoryInfo] = useState([]);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInfo, setChatInfo] = useState(false);

  const fetchData = async () => {
    try {
      const productResponse = await axios.get('http://localhost:9999/api/product/productInfo?productNo=20');
      setProductInfo(productResponse.data);
      // console.log(productResponse.data);

      const deliveryResponse = await axios.get('http://localhost:9999/api/product/deliveryInfo?productNo=20');
      setDeliveryInfo(deliveryResponse.data);

      const categoryResponse = await axios.get(`http://localhost:9999/api/product/categoryInfo?categoryNo=${productResponse.data.categoryNo}`);
      setCategoryInfo(categoryResponse.data);

      const likeStatusResponse = await axios.get('http://localhost:9999/selectLikeStatus?productNo=20');
      // console.log(likeStatusResponse.data);
      const userLiked = likeStatusResponse.data.includes('member4');
      setIsLiked(userLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateTimePassed = () => {
      if (productInfo.productDate) {
        const currentDate = new Date();
        const createDate = new Date(productInfo.productDate);

        const second = currentDate - createDate;
        const hour = Math.floor(second / 1000 / 60 / 60);
        const minute = Math.floor(second / 1000 / 60);
        const day = Math.floor(hour / 24);

        if (day > 0) {
          setTimePassed(`${day}일 전`);
        } else if (hour > 0) {
          setTimePassed(`${hour}시간 전`);
        } else {
          setTimePassed(`${minute}분 전`);
        }
      }
    };

    updateTimePassed();
  }, [productInfo]);

  const likeClick = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    try {
      const response = await axios.get('http://localhost:9999/insertProductLike?memberId=member4&productNo=20');
      console.log(response);
      alert(response.data.msg);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const buyWidth = async () => {
    setIsPurchaseOpen(true);
  };

  const reportOpen = () => {
    setIsReportOpen(true);
  };

  const chatOpen = async () => {
    try {
      const responseChatInfo = await axios.get('http://localhost:9999/selectChatInfo?memberId=member4');
      console.log(responseChatInfo.data);
      setChatInfo(responseChatInfo.data)
    } catch (error) {
      console.error(error);
    }
    setIsChatOpen(true);
  }

  return (
    <>
      <div className={styles.product_information}>
        <div className={styles.product_category}>
          <Link to="#">홈</Link>
          <span>{'>'}</span>
          {categoryInfo?.length > 1 && <Link to="#">{categoryInfo[1]?.categoryName}</Link>}
          <span>{'>'}</span>
          {categoryInfo?.length > 0 && <Link to="#">{categoryInfo[0]?.categoryName}</Link>}
        </div>
        <p className={styles.product_title}>{productInfo.productTitle}</p>
        <p className={styles.product_price}>{productInfo.productPrice.toLocaleString()}원</p>
        <div className={styles.product_sub_information}>
          <div className={styles.product_create}>
            <img src="/img/time.png" alt="time" className={styles.information_img} />
            <span>{timePassed}</span>
          </div>
          <div className={styles.product_count}>
            <img src="/img/find.png" alt="find" className={styles.information_img} />
            <span>{productInfo.productCount}</span>
          </div>
          <div className={styles.product_like}>
            <img src={isLiked ? "/img/redheart.png" : "/img/heart.png"} alt="like" onClick={likeClick} className={styles.information_img} />
            <span>{productInfo.productLike}</span>
          </div>
          <div className={styles.product_report}>
            <a href="#" onClick={reportOpen}>
              <img src="/img/report.png" alt="report" className={styles.information_img} />신고하기
            </a>
          </div>
          <Report isReportOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
        </div>
        <div className={styles.product_status_information}>
          <div className={styles.product_status}>
            <p>제품상태</p>
            <p>{productInfo.productStatus}</p>
          </div>
          <span className={styles.line}></span>
          <div className={styles.product_delivery}>
            <p>거래방식</p>
            <p>직거래,택배</p>
          </div>
          <span className={styles.line}></span>
          <div className={styles.product_delivery_fee}>
            <p>배송</p>
            <p>{deliveryInfo.deliveryName}</p>
          </div>
        </div>
        <ul className={styles.product_trade_area}>
          <li>거래희망 지역 - {deliveryInfo.tradiArea}</li>
        </ul>
        <div className={styles.product_interaction_area}>
          <button className={styles.like_btn} onClick={likeClick}>
            <img src={isLiked ? "/img/redheart.png" : "/img/heart.png"} alt="like" />
          </button>
          <button className={styles.chat_btn} onClick={chatOpen}>채팅하기</button>
          <button className={styles.buy_btn} onClick={buyWidth}>구매하기</button>
        </div>
      </div>
      <div className={styles.product_content}>
        <div className={styles.content}>
          <h2>상품 정보</h2>
          <hr />
          <p>{productInfo.productContent}</p>
        </div>
      </div>
      <PurchaseSide isOpen={isPurchaseOpen} onClose={() => setIsPurchaseOpen(false)} productImage={productImage} productInfo={productInfo} />
      <Sub_chat isChatOpen={isChatOpen} onClose={() => setIsChatOpen(false)} productImage={productImage} productInfo={productInfo} memberId='member4' chatInfo={chatInfo} />
    </>
  );
};

export default ProductInfo;