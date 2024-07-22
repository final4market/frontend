import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [memberId, setMemberId] = useState('');
    const [memberPasswd, setMemberPasswd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/api/auth/login', {
                memberId,
                memberPasswd
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            // 토큰을 해독해 Role을 파악한 후 알맞게 redirect
            const userRole = decodeToken(token).role;
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Member ID:</label>
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={memberPasswd}
                        onChange={(e) => setMemberPasswd(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const decodeToken = (token) => {
    // JWT 토큰을 해독해 리턴
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default LoginForm;
