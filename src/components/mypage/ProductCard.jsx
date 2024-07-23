import React from "react";
import styles from "./css/ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <div className={styles.product_card}>
      <img src={product.imageUrl} alt={product.name}/>
      <div className={styles.product_card_info}>
        <div className={styles.product_card_name}>{product.name}</div>
        <div className={styles.product_card_price}>{product.price}</div>
        <div className={styles.product_card_detail}>{product.detail}</div>
      </div>
    </div>
  );
};