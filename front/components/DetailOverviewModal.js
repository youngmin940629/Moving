import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export default function DetailOverviewModal({title, overview}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
    <a onClick={showModal}>전체 줄거리 보기</a>
    <Modal
      title={<b>{title}</b>}
      centered
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      maskStyle={{background:'rgba(0, 0, 0, 0.7)'}}
      footer={[
        <Button type="primary" ghost key="back" onClick={() => setIsModalVisible(false)}>
          확인
        </Button>,
      ]}
    >
      <h3 style={{fontWeight:'bold'}}>전체 줄거리</h3>
      <p style={{lineHeight:'200%', margin:'5px 20px', fontWeight:'600'}}>{overview}</p>
    </Modal>
  </>
  )
}
