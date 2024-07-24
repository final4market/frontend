import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "./css/InterestProduct.module.css";

const product = [
  {
    name: "정장",
    price: "90,000원",
    detail: "관심 1 | 채팅 9",
    imageUrl: "/img/mypage/suit.png",
  },
  {
    name: "구두",
    price: "50,000원",
    detail: "관심 9 | 채팅 5",
    imageUrl: "/img/mypage/shoes.png",
  },
  {
    name: "만년필",
    price: "1,000,000원",
    detail: "관심 19 | 채팅 95",
    imageUrl: "/img/mypage/pen.png",
  },
  {
    name: "헤드폰",
    price: "100,000원",
    detail: "관심 1 | 채팅 13",
    imageUrl: "/img/mypage/headphones.png",
  },
];

export default function InterestProduct() {
  return (
    <div className={styles.interest_product_header_container}>
      <Header/>
      <div className={styles.interest_product_side_container}>
        <SideBar/>
        <div className={styles.interest_product_main_container}>
          <div className={styles.my_interest_product}>관심 상품</div>
          <div className={styles.interest_product_card}>

          </div>
        </div>
        <div className={styles.interest_product_banner}>배너</div>
      </div>
      <Footer/>
    </div>
  );
};