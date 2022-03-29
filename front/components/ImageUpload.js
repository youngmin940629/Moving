import React, { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ACCESS_KEY = 'AKIAQJ6JP66DMYOWJYKQ';
const SECRET_ACCESS_KEY = '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';
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'ssafy-moving';

const ImageUpload = ({ imageUploader }) => {
  const { me } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [category, setCategory] = useState(null);
  const inputRef = useRef();

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const onFileChange = file => {
    console.log('file', file);
    console.log('me.data', me.data);
    const temp = [];
    me.data.category_list.map(item => {
      temp.push(item.id);
    });
    setUserImg(file.url);
    setCategory(temp);
  };

  const onChange = async e => {
    console.log(e.target.files[0]);
    const uploaded = await imageUploader.upload(e.target.files[0]);
    console.log('uploaded', uploaded);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  const onSubmit = () => {
    const data = {
      picture: userImg,
    };
    console.log('data', data);
    axios({
      url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/accounts/edit/${sessionStorage.getItem('id')}/`,
      method: 'put',
      data: data,
    })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (me != null) {
      setImage(me.data.picture);
    }
  }, []);

  return (
    <div style={{}}>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button style={{}} onClick={onButtonClick}>
        {userImg != null && <img src={userImg} />}
        {image || 'no-file'}
      </button>
      <button onClick={onSubmit}>이미지 업로드</button>
    </div>
  );
};

export default ImageUpload;
