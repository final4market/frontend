import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './css/Header.module.css';
import Backdrop from '../subPage/Sub_overlay';
import { AuthContext } from '../../services/AuthContext';

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatArea = useRef();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const chatWidth = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
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
            <Link to="#">내상점</Link>
          </div>
          <div className={styles.search_container}>
            <input type='text' name='search' placeholder='검색어를 입력하세요' />
          </div>
          <nav className={styles.nav_container}>
            <ul className={styles.main_category_container}>
              <li className={styles.first_category}>
                <div className={styles.menu_container}></div>
                <div className={styles.menu}>
                  <img src='/img/menu.png' className={styles.menu_bar} alt='menu' />
                  <p>카테고리</p>
                </div>
                <div className={styles.category_container}>
                  <ul className={styles.category}>
                    <li className={styles.main_category}>
                      <a href='#'>수입명품</a>
                      <div className={styles.sub_category_container}>
                        <div className={styles.sub_category_block}>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className={styles.main_category}>
                      <a href='#'>수입명품</a>
                      <div className={styles.sub_category_container}>
                        <div className={styles.sub_category_block}>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                          <ul className={styles.sub_category}>
                            <li><a href='#'>남성신발</a></li>
                            <li><a href='#'>여성신발</a></li>
                            <li><a href='#'>가방</a></li>
                            <li><a href='#'>지갑</a></li>
                            <li><a href='#'>액세서리</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                            <li><a href='#'>기타</a></li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={styles.menu}><Link to='#'>무료 나눔</Link></li>
              <li className={styles.menu}><Link to='#'>찜한 상품</Link></li>
              <li className={styles.menu}><Link to='#'>실시간 시세</Link></li>
            </ul>
            <ul className={styles.menu_item_container}>
              <div className={styles.menu_item}>
                <img src='/img/money.png' alt='money' />
                <li><Link to='#'>판매하기</Link></li>
              </div>
              <div className={styles.menu_item}>
                <img src='/img/profile.png' alt='profile' />
                <li><Link to='#'>내상점</Link></li>
              </div>
              <div className={styles.menu_item}>
                <img src='/img/chat.png' alt='chat' />
                <li><button onClick={chatWidth}>채팅하기</button></li>
              </div>
            </ul>
          </nav>
        </div>
        <Backdrop
          show={isChatOpen}
          onClick={closeChat}
          excludeClasses={['side']} // 사이드 바를 제외하고 클릭을 감지
        />
        <div className={`${styles.side} ${!isChatOpen ? styles.hidden : ''}`} ref={chatArea}>
          <span onClick={closeChat}><img src='/img/x.png' alt='close' className={styles.x} /></span>
          {/* <a href='#'>하이</a> */}
        </div>
      </div>
      <hr />
    </>
  );
}