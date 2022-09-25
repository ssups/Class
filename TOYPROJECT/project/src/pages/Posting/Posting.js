import { React, useRef } from "react";
import "./Posting.css";

const Posting = ({ setPostData, loginedUserData }) => {
    const inputTitle = useRef();
    const inputText = useRef();
    function registerPost() {
        const title = inputTitle.current.value;
        const text = inputText.current.value;
        console.log(title.length, text.length);
    }
    return (
        <div className="Posting">
            <div className="title">
                제목: <input type="text" ref={inputTitle} />
            </div>
            <div className="subTitle">작성자: {loginedUserData.nick_name}</div>
            <div className="contents">
                {/* {data.img ? <img src={data.img} alt="postImg" /> : null} */}
                <div className="text">
                    <textarea ref={inputText}></textarea>
                </div>
            </div>
            <div className="btns">
                <button onClick={registerPost}>등록</button>
                <button>취소</button>
            </div>
        </div>
    );
};

export default Posting;
