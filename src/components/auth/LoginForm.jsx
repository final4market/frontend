import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginForm.module.css';
import { jwtDecode } from 'jwt-decode';
import ModalPopupForm from './ModalPopupForm';

const LoginForm = () => {
    const [memberId, setMemberId] = useState('');
    const [memberPasswd, setMemberPasswd] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();

    const handleButtonClick = (e) => {
        const pX = e.pageX;
        const pY = e.pageY;
        const oX = parseInt(e.target.offsetLeft);
        const oY = parseInt(e.target.offsetTop);

        const span = document.createElement('span');
        span.className = `${styles.loginFormClickEffect} x-${oX} y-${oY}`;
        span.style.marginLeft = `${pX - oX}px`;
        span.style.marginTop = `${pY - oY}px`;
        e.target.appendChild(span);

        span.animate({
            width: "500px",
            height: "500px",
            top: "-250px",
            left: "-250px"
        }, 600);

        e.target.classList.add('active');
    };

    const handleMaterialButtonClick = (e) => {
        const button = e.currentTarget;
        if (button.classList.contains(styles.loginFormMaterialButton)) {
            setTimeout(() => {
                document.querySelector(`.${styles.loginFormOverbox}`).style.overflow = 'hidden';
                document.querySelector(`.${styles.loginFormBox}`).classList.add(styles.back);
            }, 200);
            button.classList.add('active').animate({
                width: '700px',
                height: '700px'
            });

            setTimeout(() => {
                const shape = button.querySelector(`.${styles.loginFormShape}`);
                shape.style.width = '50%';
                shape.style.height = '50%';
                shape.style.transform = 'rotate(45deg)';

                document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormTitle}`).forEach(el => el.style.display = 'block');
                document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormInput}`).forEach(el => el.style.display = 'block');
                document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormButton}`).forEach(el => el.style.display = 'block');
            }, 700);

            button.classList.remove(styles.loginFormMaterialButton);
        }

        if (document.querySelector(`.${styles.loginFormAlt2}`).classList.contains('material-button')) {
            document.querySelector(`.${styles.loginFormAlt2}`).classList.remove('material-button');
            document.querySelector(`.${styles.loginFormAlt2}`).classList.add(styles.loginFormMaterialButton);
        }
    };

    const handleAlt2ButtonClick = (e) => {
        const button = e.currentTarget;
        if (!button.classList.contains(styles.loginFormMaterialButton)) {
            document.querySelector(`.${styles.loginFormShape}`).style.width = '100%';
            document.querySelector(`.${styles.loginFormShape}`).style.height = '100%';
            document.querySelector(`.${styles.loginFormShape}`).style.transform = 'rotate(0deg)';

            setTimeout(() => {
                document.querySelector(`.${styles.loginFormOverbox}`).style.overflow = 'initial';
            }, 600);

            button.animate({
                width: '140px',
                height: '140px'
            }, 500, () => {
                document.querySelector(`.${styles.loginFormBox}`).classList.remove(styles.back);
                button.classList.remove('active');
            });

            document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormTitle}`).forEach(el => el.style.display = 'none');
            document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormInput}`).forEach(el => el.style.display = 'none');
            document.querySelectorAll(`.${styles.loginFormOverbox} .${styles.loginFormButton}`).forEach(el => el.style.display = 'none');

            button.classList.add('material-button');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/api/auth/login', {
                memberId,
                memberPasswd
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);

            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setError('로그인 유효 시간이 만료됐습니다. 다시 로그인해주세요.');
                localStorage.removeItem('token');
                return;
            }

            const userRole = decodedToken.role;
            if (userRole === '관리자') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('id 또는 비밀번호 오류');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalPopupForm isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormMaterialContainer}>
                    <div className={styles.loginFormBox}>
                        <div className={styles.loginFormTitle}>로그인</div>
                        <form onSubmit={handleLogin}>
                            <div className={styles.loginFormInput}>
                                <input
                                    type="text"
                                    id="memberId"
                                    value={memberId}
                                    onChange={(e) => setMemberId(e.target.value)}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="memberId">회원 아이디</label>
                                <span className={styles.loginFormSpin}></span>
                            </div>
                            <div className={styles.loginFormInput}>
                                <input
                                    type="password"
                                    id="memberPasswd"
                                    value={memberPasswd}
                                    onChange={(e) => setMemberPasswd(e.target.value)}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="memberPasswd">Password</label>
                                <span className={styles.loginFormSpin}></span>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className={`${styles.loginFormButton} ${styles.loginFormLogin}`}>
                                <button type="submit"><span>GO</span> <i className="fa fa-check"></i></button>
                            </div>
                        </form>
                        <a href="#" className={styles.loginFormPassForgot}>Forgot your password?</a>
                    </div>

                    <div className={styles.loginFormOverbox}>
                        <div className={`${styles.loginFormMaterialButton} ${styles.loginFormAlt2}`}><span className={styles.loginFormShape}></span></div>
                        <div className={styles.loginFormTitle}>REGISTER</div>
                        <div className={styles.loginFormInput}>
                            <input type="text" name="regname" id="regname" placeholder=" " />
                            <label htmlFor="regname">Username</label>
                            <span className={styles.loginFormSpin}></span>
                        </div>
                        <div className={styles.loginFormInput}>
                            <input type="password" name="regpass" id="regpass" placeholder=" " />
                            <label htmlFor="regpass">Password</label>
                            <span className={styles.loginFormSpin}></span>
                        </div>
                        <div className={styles.loginFormInput}>
                            <input type="password" name="reregpass" id="reregpass" placeholder=" " />
                            <label htmlFor="reregpass">Repeat Password</label>
                            <span className={styles.loginFormSpin}></span>
                        </div>
                        <div className={styles.loginFormButton}>
                            <button><span>NEXT</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalPopupForm>
    );
};

export default LoginForm;
