import React from "react";
import Header from "../header/Header";
import ImageSlider from "./Sub_imageSlider";
import './css/Sub_imageSlider.module.css'
import './css/Sub_productInfo.module.css'
import './css/Sub_sellerInfo.module.css'
import './css/Sub_purchase_side.module.css'

export default () => {

  return (
    <>
      <Header />
      <ImageSlider />
    </>
  );
}