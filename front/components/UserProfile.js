import React, { useState } from 'react';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const InputStyle = styled(Input)`
  width: 245px;
`;

const UserProfile = () => {
  const { me } = useSelector(state => state.user);

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="프로필 페이지"
          bordered={false}
          style={{
            width: '100%',
          }}
        >
          <div style={{ padding: '20px 100px' }}>
            <table>
              <tbody>
                <tr>
                  <td>아이디</td>
                  <td>
                    <span className="profile-span">{me.id}</span>
                  </td>
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td>
                    <span className="profile-span">
                      <a>비밀번호 변경하기 &gt;</a>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td>
                    <span className="profile-span">{me.name}</span>
                  </td>
                </tr>
                <tr>
                  <td>성별</td>
                  <td>
                    <span className="profile-span">{me.gender}</span>
                  </td>
                </tr>
                <tr>
                  <td>생년월일</td>
                  <td>
                    <span className="profile-span">{me.birthDate}</span>
                  </td>
                </tr>
                <tr>
                  <td>휴대폰 번호</td>
                  <td>
                    <span className="profile-span">{me.phoneNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td>이메일 주소</td>
                  <td>
                    <span className="profile-span">
                      <InputStyle value="이메일 주소를 입력해주세요.(선택)" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
