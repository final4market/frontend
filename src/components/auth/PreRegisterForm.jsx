import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login/css/LoginForm.module.css'
import registerStyles from './RegisterForm.module.css';

const PreRegisterForm = () => {
  const [memberName, setMemberName] = useState('');
  const [memberNameError, setMemberNameError] = useState('');
  const [regSSN1, setRegSSN1] = useState('');
  const [regSSN2, setRegSSN2] = useState('');
  const regSSN2Ref = useRef(null);
  const [ssnError, setSsnError] = useState('');
  const [regPNo1, setRegPNo1] = useState('');
  const [regPNo2, setRegPNo2] = useState('');
  const [regPNo3, setRegPNo3] = useState('');
  const regPNo2Ref = useRef(null);
  const regPNo3Ref = useRef(null);
  const [phoneNoError, setPhoneNoError] = useState('');
  const [carrierError, setCarrierError] = useState('');
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAnimation(true);
    return () => setShowAnimation(false); //한 번만 실행된 후로 더 이상 애니메이션 실행X
  }, []);

  const handleBlurMultipleInputs = (inputs, setError, errorMessage) => {
    const allInputsFilled = inputs.every(input => input.trim() !== '');
    if (!allInputsFilled) {
      setError(errorMessage);
    } else {
      setError('');
    }
  };


  const handleMemberNameChange = (e) => {
    const value = e.target.value;
    setMemberName(value);
    if (!value.trim()) {
      setMemberNameError('이름을 입력해 주세요');
    } else {
      setMemberNameError('');
    }
  };

  const handleSSN1Change = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setRegSSN1(value);
      if (value.length !== 6) {
        setSsnError('생년월일 6자리를 입력해 주세요');
      } else {
        setSsnError('');
        regSSN2Ref.current.focus();
      }
    }
  }

  const handleSSN2Change = (e) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {  // Ensures only 1 digit can be entered
      setRegSSN2(value);
      if (value.length !== 1) {
        setSsnError('주민등록번호 뒷자리 1자리를 입력해 주세요');
      } else {
        setSsnError('');
      }
    }
  };

  const handlePNo1Change = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setRegPNo1(value);
      if (value.length === 3) {
        regPNo2Ref.current.focus();
      }
    }
  };

  const handlePNo2Change = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setRegPNo2(value);
      if (value.length === 4) {
        regPNo3Ref.current.focus();
      }
    }
  };

  const handlePNo3Change = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setRegPNo3(value);
    }
  };

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    console.log('Selected:', value);
    if (!value) {
      setCarrierError('통신사를 선택해 주세요');
    } else {
      setCarrierError('');
    }
  };

  const handlePreRegister = async (e) => {
    e.preventDefault();
    const memberPhoneNo = `${regPNo1}-${regPNo2}-${regPNo3}`;

    if (!memberPhoneNo || memberPhoneNo.split('-').some(part => part.length === 0) || !memberName) {
      setPhoneNoError('본인 명의의 전화번호를 정확히 입력해주세요');
      setMemberNameError('이름을 입력해 주세요');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9999/api/auth/preregister', {
        memberName,
        memberPhoneNo
      });

      if (response.data.isRegistered) {
        setError('이미 등록된 정보입니다');
        // Assuming ModalPopup is a component that needs to be defined or imported
        // <ModalPopup message={error} />
      } else {
        navigate('/registerMember', { state: { memberName, memberPhoneNo } });
      }

    } catch (err) {
      console.error('등록 여부 확인 오류:', err);
      setError('전화번호 확인 과정 오류: ' + err.message);
    }
  };

  return (
    <div className={registerStyles.registerFormPage}>
      <div className={registerStyles.registerFormContainer}>
        <div className={registerStyles.registerFormLeft}>
          <div className={`${registerStyles.registerFormTitle} ${showAnimation ? registerStyles.emergeText : ''}`}>
            Join
          </div>
        </div>
        <div className={registerStyles.registerFormRight}>
          <div className={registerStyles.registerFormInput}>
            <form>
              <div className={registerStyles.registerFormInputBox}>
                <label htmlFor="regName">이름</label>
                <input
                  className={registerStyles.registerFormInputField}
                  type="text"
                  id="regName"
                  value={memberName}
                  onChange={handleMemberNameChange}
                  onBlur={() => handleBlurMultipleInputs([memberName], setMemberNameError, '이름을 입력해 주세요')}
                  required
                  placeholder=" "
                />
              </div>
              <p className={`${registerStyles.registerFormErrorText} ${memberNameError ? registerStyles.visible : ''}`}
                style={{ visibility: memberNameError ? 'visible' : 'hidden' }}>
                {memberNameError || ' '}
              </p>
              <div className={registerStyles.registerFormInputBox}>
                <label htmlFor="regSSN">생년월일</label>
                <div className={registerStyles.registerFormSSN}>
                  <input
                    className={registerStyles.registerFormInputField}
                    type="text"
                    id="regSSN1"
                    value={regSSN1}
                    onChange={handleSSN1Change}
                    onBlur={() => handleBlurMultipleInputs([regSSN1], setSsnError, '생년월일 6자리를 입력해 주세요')}
                    maxLength="6"
                    required
                    placeholder=" "
                  />
                  <span className={registerStyles.registerFormDash}>-</span>
                  <input
                    className={registerStyles.registerFormInputField}
                    type="text"
                    id="regSSN2"
                    value={regSSN2}
                    onChange={handleSSN2Change}
                    onBlur={() => handleBlurMultipleInputs([regSSN1, regSSN2], setSsnError, '주민등록번호 첫 7자리를 입력해주세요')}
                    ref={regSSN2Ref}
                    maxLength="1"
                    required
                  />
                  <span className="filled-circles">●●●●●●</span>
                </div>
              </div>
              <p className={`${registerStyles.registerFormErrorText} ${ssnError ? registerStyles.visible : ''}`}
                style={{ visibility: ssnError ? 'visible' : 'hidden' }}>
                {ssnError || ' '}
              </p>
              <div className={registerStyles.registerFormInputBox}>
                <label htmlFor="regPNO">전화번호</label>
                <div className={registerStyles.registerFormPNo}>
                  <input
                    className={registerStyles.registerFormInputField}
                    type="text"
                    id="regPNo1"
                    value={regPNo1}
                    onChange={handlePNo1Change}
                    onBlur={() => handleBlurMultipleInputs([regPNo1], setPhoneNoError, '전화번호를 정확히 입력해주세요')}
                    maxLength="3"
                    required
                    placeholder=""
                  />
                  <span className={registerStyles.registerFormDash}>-</span>
                  <input
                    className={registerStyles.registerFormInputField}
                    type="text"
                    id="regPNo2"
                    ref={regPNo2Ref}
                    value={regPNo2}
                    onChange={handlePNo2Change}
                    onBlur={() => handleBlurMultipleInputs([regPNo1, regPNo2], setPhoneNoError, '전화번호를 정확히 입력해주세요')}
                    maxLength="4"
                    required
                    placeholder=""
                  />
                  <span className={registerStyles.registerFormDash}>-</span>
                  <input
                    className={registerStyles.registerFormInputField}
                    type="text"
                    id="regPNo3"
                    ref={regPNo3Ref}
                    value={regPNo3}
                    onChange={handlePNo3Change}
                    onBlur={() => handleBlurMultipleInputs([regPNo1, regPNo2, regPNo3], setPhoneNoError, '전화번호를 정확히 입력해주세요')}
                    maxLength="4"
                    required
                    placeholder=""
                  />
                </div>
              </div>
              <p className={`${registerStyles.registerFormErrorText} ${phoneNoError ? registerStyles.visible : ''}`}
                style={{ visibility: phoneNoError ? 'visible' : 'hidden' }}>
                {phoneNoError || ' '}
              </p>
              <div className={`${registerStyles.registerFormCarrier} ${registerStyles.registerFormInputBox}`}>
                <label htmlFor="regCarrier">통신사</label>
                <select
                  className={registerStyles.registerFormInputField}
                  id="regCarrier"
                  name="regCarrier"
                  onChange={handleSelectionChange}
                >
                  <option value="" disabled selected hidden></option>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG U+">LG U+</option>
                  <option value="SKT 알뜰폰">SKT 알뜰폰</option>
                  <option value="KT 알뜰폰">KT 알뜰폰</option>
                  <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
                </select>
              </div>
              <p className={`${registerStyles.registerFormErrorText} ${carrierError ? registerStyles.visible : ''}`}
                style={{ visibility: carrierError ? 'visible' : 'hidden' }}>
                {carrierError || ' '}
              </p>
              <input
                type="button"
                id="submit"
                value="확인"
                lang="ko"
                className={styles.loginFormButton}
                onClick={handlePreRegister}
              />
            </form>
          </div>
        </div >
      </div >
    </div >
  );
};

export default PreRegisterForm;
