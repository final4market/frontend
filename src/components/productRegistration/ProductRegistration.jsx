import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './css/ProductRegistration.module.css';
import ProductinsertPopup from './productinsertPopup';
import ProductImageUpload from './ProductImageUpload';
import ProductDeliveryOptions from './ProductDeliveryOptions';
import ProductTradeArea from './ProductTradeArea';
import CategorySelector from './CategorySelector';

export default function ProductRegistration() {
    const productTitle = useRef();
    const productContent = useRef();
    const productPrice = useRef();
    const deliveryCharge = useRef();
    const [ProductCategoryList, setProductCategoryList] = useState([]);
    const [formData, setFormData] = useState({
        productTitle: '',
        productPrice: '',
        productStatus: '',
        deliveryNo: '',
        tradeArea: '',
        directDeal: 'select',
        deliveryCharge: '',
        categoryNo: '' // Add categoryNo to formData
    });

    const [parentNumberOptions, setParentNumberOptions] = useState([]);
    const [parentNumber, setParentNumber] = useState('1');

    const [errors, setErrors] = useState({
        productTitle: '',
        productPrice: '',
        productStatus: '',
        deliveryNo: '',
        productContent: '',
        deliveryCharge: '',
    });

    const [popup, setPopup] = useState({
        show: false,
        message: '',
        isConfirmation: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/category/list');
                setParentNumberOptions(response.data);
            } catch (error) {
                console.error('Error fetching parent number options:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const readData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/category/list/${parentNumber}`);
                setProductCategoryList(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        readData();
    }, [parentNumber]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [deliveryTransaction, setDeliveryTransaction] = useState(false);
    const [directTransaction, setDirectTransaction] = useState(false);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
           
        }));
    }, [directTransaction]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            deliveryNo: deliveryTransaction ? prevFormData.deliveryNo : '',
        }));
    }, [deliveryTransaction]);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            productTitle: '',
            productPrice: '',
            productStatus: '',
            deliveryNo: '',
            productContent: '',
            deliveryCharge: '',

        };

        if (!formData.productTitle) {
            newErrors.productTitle = '상품명을 입력하세요';
            valid = false;
        }
        if (!formData.productPrice) {
            newErrors.productPrice = '판매가격을 입력하세요';
            valid = false;
        }
        if (!formData.productStatus) {
            newErrors.productStatus = '상품 상태를 선택하세요';
            valid = false;
        }
        if (deliveryTransaction && !formData.deliveryNo) {
            newErrors.deliveryNo = '배송 정보를 선택하세요';
            valid = false;
        }
        if (!formData.productContent) {
            newErrors.productContent = '상품 설명을 입력하세요';
            valid = false;
        }
        if ((formData.deliveryNo === '2' || formData.deliveryNo === '3') && !formData.deliveryCharge) {
            newErrors.deliveryCharge = '택배비를 입력하세요';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('productTitle', formData.productTitle);
        formDataToSend.append('productPrice', formData.productPrice);
        formDataToSend.append('categoryNo', formData.categoryNo); // Use categoryNo from formData
        formDataToSend.append('productContent', productContent.current.value);
        formDataToSend.append('productStatus', formData.productStatus);
        formDataToSend.append('deliveryNo', formData.deliveryNo);
        formDataToSend.append('tradeArea', formData.tradeArea);
        formDataToSend.append('deliveryCharge', formData.deliveryCharge);

        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((fileInput) => {
            const files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
                formDataToSend.append('file', files[i]);
            }
        });

        console.log('FormData to Send:');
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post('http://localhost:9999/product/insert', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPopup({
                show: true,
                message: response.data.msg,
                isConfirmation: false,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setPopup({
                show: true,
                message: '상품 등록에 실패했습니다.',
                isConfirmation: false,
            });
        }
    };

    return (
        <div className={styles.productContainer}>
            <form onSubmit={handleSubmit}>
                <ProductImageUpload />
                <div className={styles.productHeader}>
                    <input
                        type="text"
                        ref={productTitle}
                        name="productTitle"
                        placeholder="상품명"
                        className={styles.productName}
                        onChange={handleChange}
                    />
                    {errors.productTitle && <div className={`${styles.error} ${styles.red}`}>{errors.productTitle}</div>}
                    <div className={styles.priceContainer}>
                        <input
                            type="text"
                            name="productPrice"
                            ref={productPrice}
                            onChange={handleChange}
                            value={formData.productPrice === '0' ? '0' : formData.productPrice}
                            placeholder="₩판매가격"
                            className={styles.priceInput}
                        />
                        <div className={styles.freeCheckbox}>
                            <label htmlFor="free">
                                <input
                                    type="checkbox"
                                    id="free"
                                    name="priceFree"
                                    onChange={(e) => handleChange({ target: { name: 'productPrice', value: e.target.checked ? '0' : '' } })}
                                />
                                무료나눔
                            </label>
                        </div>
                    </div>
                    {errors.productPrice && <div className={`${styles.error} ${styles.red}`}>{errors.productPrice}</div>}
                </div>

                <CategorySelector
                    onCategoryChange={(value) => setFormData({ ...formData, categoryNo: value })}
                    onParentChange={(value) => setParentNumber(value)}
                />

                <div className={styles.productHeader}>
                    <textarea
                        name="productContent"
                        ref={productContent}
                        placeholder="판매상품 상세 설명"
                        className={styles.description}
                        onChange={handleChange}
                    />
                    {errors.productContent && <div className={`${styles.error} ${styles.red}`}>{errors.productContent}</div>}
                </div>

                <div className={styles.productState}>
                    <label className={`${styles.productRadioLabel} ${formData.productStatus === '새상품' ? styles.selected : ''}`}>
                        <input
                            type="radio"
                            name="productStatus"
                            value="새상품"
                            checked={formData.productStatus === '새상품'}
                            onChange={handleChange}
                        />
                        새상품
                    </label>
                    <label className={`${styles.productRadioLabel} ${formData.productStatus === '중고' ? styles.selected : ''}`}>
                        <input
                            type="radio"
                            name="productStatus"
                            value="중고"
                            checked={formData.productStatus === '중고'}
                            onChange={handleChange}
                        />
                        중고
                    </label>
                    {errors.productStatus && <div className={`${styles.error} ${styles.red}`}>{errors.productStatus}</div>}
                </div>

                <div>
                <label>
                        <input
                            type='checkbox'
                            name='deliveryTransaction'
                            checked={deliveryTransaction}
                            onChange={(e) => setDeliveryTransaction(e.target.checked)}
                        />
                        택배거래
                    </label>

                    <label>
                        <input
                            type='checkbox'
                            name='directTransaction'
                            checked={directTransaction}
                            onChange={(e) => setDirectTransaction(e.target.checked)}
                        />
                        직거래
                    </label>
                </div>

                {deliveryTransaction && (
                    <ProductDeliveryOptions formData={formData} handleChange={handleChange} errors={errors} />
                )}
                {directTransaction && (
                    <ProductTradeArea formData={formData} handleChange={handleChange} />
                )}
                <button type="submit" className={styles.submitButton}>작성 완료</button>
            </form>
            <ProductinsertPopup
                show={popup.show}
                onClose={() => setPopup({ ...popup, show: false })}
                message={popup.message}
                isConfirmation={popup.isConfirmation}
            />

            
        </div>
    );
}
