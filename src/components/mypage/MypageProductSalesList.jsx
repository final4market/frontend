import React, { useState } from 'react';
import MypageSideBar from './MypageSideBar';
import axios from 'axios';

const MypageProductSalesList = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const followClick = () => {
    setIsFollowing((prevState) => !prevState);
    axios.get('http://localhost:9999/insertFollow?buyerId=member10&sellerId=member4')
      .then(response => {
        console.log(response);
        alert(response.data.msg);
      })
      .catch(error => {
        console.error('Error occurred:', error); 
      });
  };

  return (
    <div>
      <MypageSideBar />
    </div>
  );
}

export default MypageProductSalesList;
