import axios from 'axios';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const StoreInfo = () => {
  const followBtn = useRef();
  const followImg = useRef();
  const sellerImageCount = useRef([]);
  const [followImage, setFollowImage] = useState("/img/follow.png");
  const [buttonText, setButtonText] = useState('팔로우');
  const [storeInfo, setStoreInfo] = useState([{}]);
  const [profileInfo, setProfileInfo] = useState([{}]);
  const [buyerProfileInfo, setBuyerProfileInfo] = useState({});
  const [sellerProductImage, setSellerProductImage] = useState([]);

  const followClick = () => {
    setFollowImage((item) =>
      item === "/img/follow.png" ? "/img/star.png" : "/img/follow.png"
    );
    setButtonText((prevText) =>
      prevText === '팔로우' ? '팔로잉' : '팔로우'
    );
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const storeResponse = await axios.get('http://localhost:9999/storeInfo?memberId=member4');
        console.log(storeResponse.data);
        setStoreInfo(storeResponse.data);
        
        const sellerProfileResponse = await axios.get('http://localhost:9999/sellerProfile?memberId=member4');
        setProfileInfo(sellerProfileResponse.data);
  
        const buyerIds = storeResponse.data.filter(item => item.review !== null).map(item => item.buyerId);
        if (buyerIds.length > 0) {
          const buyerProfileResponse = await axios.post('http://localhost:9999/buyerProfile', { memberId: buyerIds });
          console.log(buyerProfileResponse.data);
          setBuyerProfileInfo(buyerProfileResponse.data);
        }

        const response = await axios.get('http://localhost:9999/sellerProductImage?memberId=member4');
        console.log(response.data);
        setSellerProductImage(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const remainingProducts = storeInfo.length > 0 ? storeInfo[0].saleCount - (1 + sellerImageCount.current.length) : 0;
  const remainingReviews = storeInfo.filter(item => item.review !== null).length;

  return (
    <div className="product_content_container">
      <div className="seller_information">
        <h2>상점 정보</h2>
        <hr />
        <div className="seller">
          <div className='store_info'>
            <div className="member_id">
              <Link><img src={profileInfo.length > 0 ? profileInfo : "/img/store_basic.png"} alt="profile" /></Link>
              <Link>{storeInfo.length > 0 && storeInfo[0].sellerId}</Link>
            </div>
            <div className="seller_sub_2">
              <Link to='#'>상품 {storeInfo.length > 0 && storeInfo[0].saleCount}개</Link>
              <span className="line"></span>
              <Link>팔로워 {storeInfo.length > 0 && storeInfo[0].followerCount}명</Link>
            </div>
            <div className="followBtn_container">
              <img src={followImage} ref={followImg} alt="followImage" />
              <button className="follow" ref={followBtn} onClick={followClick}>{buttonText}</button>
            </div>
            <div className="seller_product_img">
              {sellerProductImage.slice(0, 2).map((img, index) => (
                img.productNo != 16 && (
                  <div key={index}>
                    <Link to='#'><img src={img.image} alt={`Product ${index}`} ref={(el) => {
                      if (el && !sellerImageCount.current.includes(el)) {
                        sellerImageCount.current.push(el);
                      }
                    }}/></Link>
                     <p>{img.price.toLocaleString()}원</p>
                  </div>
                )
              ))}
            </div>
            {remainingProducts > 0 && (
              <div className="more">
                <Link to="#">
                  <span>{remainingProducts}개</span> 상품 더보기
                </Link>
                <hr />
              </div>
            )}
          </div>
          <div className="seller_review_container">
            <h2>상점 후기</h2>
            <hr />
            <div className="review">
              {remainingReviews === 0 ? (
                <div className="no_reviews_message">등록된 후기가 없습니다.</div>
              ) : (
                <div className="review_container">
                  {storeInfo.map((item, index) => (
                    item.review !== null && (
                      <Fragment key={item.buyerId}>
                        <div className="member_id">
                          <Link to='#'><img src={buyerProfileInfo.length > 0 && buyerProfileInfo[index] && item.buyerId === buyerProfileInfo[index].MEMBERID ? buyerProfileInfo[index].PROFILEPATH : "/img/store_basic.png"} alt="profile" /></Link>
                          <Link to='#'>{item.buyerId}</Link>
                        </div>
                        <div className="buyer_review">
                          <div className="buyer_review_img">
                            <img src="/img/star.png" alt="star" />
                            <img src="/img/star.png" alt="star" />
                            <img src="/img/star.png" alt="star" />
                            <img src="/img/star.png" alt="star" />
                            <img src="/img/star.png" alt="star" />
                          </div>
                          <p>{item.review}</p>
                        </div>
                        <hr />
                      </Fragment>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
          {remainingReviews > 0 && (
            <div className="review_more">
              <Link to="#">후기 더보기</Link>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;