import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <div className={styles.adminHeaderContainer}>
      <div className={styles.adminHeader}>
        <div className={styles.adminHeaderTop}>
          <div className={styles.adminHeaderLeftSection}>
            <span className={styles.adminHeaderLogo}>logo</span>
            <span>관리자</span>
          </div>
          <div className={styles.adminHeaderRightSection}>
            <NavLink to="/admin/info" className={styles.adminHeaderInfoLink}>관리자정보</NavLink>
            <NavLink to="/" className={styles.adminHeaderLogoutLink}>로그아웃</NavLink>
          </div>
        </div>
        <div className={styles.adminHeaderBottom}>
          <NavLink to="/admin/members" className={styles.adminHeaderLink}>회원관리</NavLink>
          <NavLink to="/admin/reports" className={styles.adminHeaderLink}>신고관리</NavLink>
          <NavLink to="/admin/products" className={styles.adminHeaderLink}>상품관리</NavLink>
          <NavLink to="/admin/categories" className={styles.adminHeaderLink}>카테고리 관리</NavLink>
          <NavLink to="/admin/support" className={styles.adminHeaderLink}>고객센터</NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
