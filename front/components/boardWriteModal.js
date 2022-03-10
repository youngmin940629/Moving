import React, { useState } from 'react';
import { Modal } from 'antd';

export default function boardWriteModal(props){
    // console.log("modalPropsTest",props.isModal)
    const [isShow, setIsShow] = useState();
    console.log(props.title)
    const isShowModal=()=>{
        // setIsShow(!isShow);
        props.setISModal(false)
    }

    return(
        <>
            <Modal title="Basic Modal" visible={props.title} onCancel={isShowModal}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}