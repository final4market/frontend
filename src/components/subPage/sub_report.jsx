import React, { Fragment, useState } from 'react';
import styles from './css/sub_productInfo.module.css';
import Backdrop from './Sub_overlay';
import axios from 'axios';

const Report = ({ isReportOpen, onClose }) => {
  const [expanded, setExpanded] = useState(null); // 단일 섹션만 열리도록 상태 변경
  const [reportContents, setReportContents] = useState({
    ad: '',
    inaccurate: '',
    prohibited: '',
    scam: '',
    other: ''
  });

  // 텍스트 영역 표시 상태를 토글하는 함수
  const toggleExpansion = (type) => {
    setExpanded(prevState => prevState === type ? null : type); // 현재 열려 있는 섹션이 클릭되면 닫기, 그렇지 않으면 새 섹션 열기
  };

  // 텍스트 영역 내용 변경 핸들러
  const handleContentChange = (type, value) => {
    setReportContents(prevState => ({
      ...prevState,
      [type]: value
    }));
  };
  console.log(reportContents);
  const submitReport = async (type) => {
    // 유형에 따른 문구를 반환하는 함수
    const getTypeText = (type) => {
      const typeText = {
        ad: '광고성 상점이에요.',
        inaccurate: '상품 정보가 부정확해요.',
        prohibited: '거래 금지 품목으로 판단돼요.',
        scam: '사기가 의심돼요.',
        other: '기타'
      };
      return typeText[type] || '기타';
    };
    const typeText = getTypeText(type);
    console.log(typeText);

    try {
      // axios 요청에 params로 전달
      const response = await axios.post('http://localhost:9999/insertReport', {
        productNo: '15',
        claimerId: 'member10',
        sellerId: 'member4',
        reportContent: `[${typeText}] ${reportContents[type]}` // 타입에 따른 문구와 내용을 결합
      });

      // 요청이 성공적으로 완료되면 처리할 로직
      alert(response.data.msg);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Backdrop
        show={isReportOpen}
        onClick={onClose}
        excludeClasses={['report_container']}
      />
      {isReportOpen && (
        <div className={styles.report_container}>
          <div className={styles.report}>
            <h2>신고하기</h2>
            <span className={styles.close} onClick={onClose}>
              <img src="/img/x.png" alt="close" />
            </span>
            <hr />
            {['ad', 'inaccurate', 'prohibited', 'scam', 'other'].map(type => (
              <Fragment key={type}>
                <div className={`${styles.detailReport} ${expanded === type ? styles.expandable : ''}`}>
                  <p>{type === 'ad' ? '광고성 상점이에요.' :
                    type === 'inaccurate' ? '상품 정보가 부정확해요.' :
                      type === 'prohibited' ? '거래 금지 품목으로 판단돼요.' :
                        type === 'scam' ? '사기가 의심돼요.' : '기타'}</p>
                  <img
                    src={expanded === type ? '/img/report_click_arrow.png' : '/img/report_arrow.png'}
                    alt="arrow"
                    className={styles.report_height}
                    onClick={() => toggleExpansion(type)}
                  />
                  {expanded === type && (
                    <>
                      <textarea
                        value={reportContents[type]}
                        onChange={(e) => handleContentChange(type, e.target.value)}
                      ></textarea>
                      <button className={styles.reportSubmit} onClick={() => submitReport(type)}>등록</button>
                    </>
                  )}
                </div>
                <hr />
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Report;