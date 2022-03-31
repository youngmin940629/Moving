import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Spin } from 'antd';

const ImageUpload = ({
  imageUploader,
  setState,
  userInfo,
  image,
  setImage,
}) => {
  const [loading, setLoading] = useState(false);
  const { me } = useSelector(state => state.user);
  const [userImg, setUserImg] = useState();
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
  };

  const onChange = async e => {
    setLoading(true);
    const uploaded = await imageUploader.upload(e.target.files[0]);
    setLoading(false);
    setImage(uploaded.url);
    setState(true);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  useEffect(() => {
    setImage(userInfo.picture);
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          style={{
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={onButtonClick}
        >
          {image != null ? (
            <img
              style={{ width: '250px', height: '250px', borderRadius: '50%' }}
              src={image}
            />
          ) : (
            <img
              style={{ width: '250px', height: '250px', borderRadius: '50%' }}
              src="/img/profile.png"
            />
          )}
        </button>
      )}
      {loading && (
        <Spin
          style={{
            width: '250px',
            height: '250px',
            lineHeight: '250px',
          }}
        ></Spin>
      )}
    </div>
  );
};

export default ImageUpload;
