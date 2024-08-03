import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './css/Header.module.css';
import Chat from './Header_ChatList';
import CategorySelector from './Header_CategorySelector';
import { AuthContext } from '../../services/AuthContext';
import axios from 'axios';

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [categoryAllInfo, setCategoryAllInfo] = useState([]);
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [parentNumber, setParentNumber] = useState(null);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigateLogin = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const chatWidth = () => {
    if (!isAuthenticated) {
      navigateLogin();
      return;
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleCategoryChange = (categoryNo) => {
    console.log('Selected category number:', categoryNo);
  };

  const handleParentChange = (parentNo) => {
    console.log('Selected parent category number:', parentNo);
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchValue}&parentCategoryNo=&categoryNo=`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    console.log('Header isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenProvider');
    setIsAuthenticated(false);
    navigate('/');
  };


  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.link_container}>
            {isAuthenticated ? (
              <Link to="/" onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </Link>
            ) : (
              <Link to="/login">로그인/회원가입</Link>
            )}
            <Link to="/mystore">내상점</Link>
          </div>
          <div className={styles.search_container}>
            <input
              type="text"
              name="search"
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img src='/img/search.png' className={styles.search_img} onClick={handleSearch}></img>
          </div>
          <nav className={styles.nav_container}>
            <ul className={styles.main_category_container}>
              <li className={styles.first_category}
                onMouseEnter={() => setIsSubCategoryOpen(true)}
                onMouseLeave={() => setIsSubCategoryOpen(false)}
              >
                <div className={styles.menu}>
                  <img src='/img/menu.png' className={styles.menu_bar} alt='menu' />
                  <p>카테고리</p>
                </div>
                <div className={styles.category_container}>
                  <CategorySelector
                    onCategoryChange={handleCategoryChange}
                    onParentChange={handleParentChange}
                  />
                </div>
              </li>
              <li className={styles.menu}><Link to='#'>무료 나눔</Link></li>
              <li className={styles.menu}><Link to='#'>찜한 상품</Link></li>
              <li className={styles.menu}><Link to='#'>실시간 시세</Link></li>
            </ul>
            <ul className={styles.menu_item_container}>
              <div className={styles.menu_item}>
                <img src='/img/money.png' alt='money' />
                <li><Link to='/productRegister'>판매하기</Link></li>
              </div>
              <div className={styles.menu_item}>
                <img src='/img/profile.png' alt='profile' />
                <li><Link to='/myStore'>내상점</Link></li>
              </div>
              <div className={styles.menu_item}>
                <img src='/img/chat.png' alt='chat' />
                <li><button onClick={chatWidth}>채팅하기</button></li>
              </div>
            </ul>
          </nav>
        </div>
        <Chat isChatOpen={isChatOpen} onClose={closeChat} />
      </div>
      <div className={styles.header_hr}>
        <hr />
      </div>
    </>
  );
}