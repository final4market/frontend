import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { Link as ScrollLink } from 'react-scroll';
import styles from './css/RegisterSuccess.module.css';

const RegisterSuccess = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const options = {
        stringsElement: '#typed-strings',
        loop: true,
        typeSpeed: 50, // Increased type speed to slow down the typing
        backSpeed: 25, // Increased back speed to slow down the backspacing
        startDelay: 1000,
        backDelay: 5000,
      };

      const typed = new Typed('#typed', options);

      return () => {
        typed.destroy();
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.regSuccessPage}>
      <div className={styles.regSuccessHeader}>
        <div className={styles.regSuccessVertText}>
          <div className={styles.regSuccessLogo}>
            <a href="/">
              <img src="/img/lm_logo_default_black.png" alt="logo" />
            </a>
          </div>
          <h1 id="typer-size">
            <span id="typed"></span>
            <div id="typed-strings">
              <p>WELCOME</p>
            </div>
          </h1>
          <h3>가입을 환영합니다</h3>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
