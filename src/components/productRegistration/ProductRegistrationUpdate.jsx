import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductRegisterUpdate = () => {
  const { productNo } = useParams(); // URL 파라미터에서 productNo를 읽어옴
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/product/details/${productNo}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productNo]);

  return (
    <div>
      {/* 상품 정보를 수정하는 폼 */}
      {product ? (
        <div>
          <h2>상품 수정</h2>
          <form>
            {/* 상품 정보 입력 폼 */}
            <input type="text" value={product.productTitle} />
            {/* 나머지 입력 필드 */}
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductRegisterUpdate;
