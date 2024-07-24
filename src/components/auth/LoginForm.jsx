import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import anime from 'animejs';
import styles from './css/LoginForm.module.css';

const LoginForm = () => {
    const [memberId, setMemberId] = useState('');
    const [memberPasswd, setMemberPasswd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let current = null;

        const emailInput = document.querySelector('#memberId');
        const passwordInput = document.querySelector('#memberPasswd');
        const submitButton = document.querySelector('#submit');

        emailInput.addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: '.loginFormPath',
                strokeDashoffset: {
                    value: 0,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });

        passwordInput.addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: '.loginFormPath',
                strokeDashoffset: {
                    value: -336,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });

        submitButton.addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: '.loginFormPath',
                strokeDashoffset: {
                    value: -730,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '530 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });

        return () => {
            emailInput.removeEventListener('focus', null);
            passwordInput.removeEventListener('focus', null);
            submitButton.removeEventListener('focus', null);
        };
    }, []);

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

    return (
        <div className="loginFormPage">
            <div className="loginFormContainer">
                <div className="loginFormLeft">
                    <div className="loginFormLogin">Login</div>
                    {error && <div className="loginFormErrormessages">{error}</div>}
                </div>
                <div className="loginFormRight">
                    <svg className="svgBackground" viewBox="0 0 320 300">
                        <defs>
                            <linearGradient id="linearGradient" x1="13" y1="193.49992" x2="307" y2="193.49992" gradientUnits="userSpaceOnUse">
                                <stop offset="0" style={{ stopColor: '#000000' }} />
                                <stop offset="1" style={{ stopColor: '#ffffff' }} />
                            </linearGradient>
                        </defs>
                        <path className="loginFormPath" d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" fill="none" />
                    </svg>
                    <div className="loginFormInput">
                        <form onSubmit={handleLogin}>
                            <label htmlFor="memberId">Email</label>
                            <input
                                type="text"
                                id="memberId"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                required
                            />
                            <label htmlFor="memberPasswd">Password</label>
                            <input
                                type="password"
                                id="memberPasswd"
                                value={memberPasswd}
                                onChange={(e) => setMemberPasswd(e.target.value)}
                                required
                            />
                            <input type="submit" id="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;