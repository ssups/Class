import { React, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostModify.css";

const PostModify = ({ postData, setPostData }) => {
    const params = useParams();
    const nav = useNavigate();
    const inputTitle = useRef();
    const inputText = useRef();
    const targetPost = postData.filter(el => {
        return el.post_id === params.post_id * 1;
    })[0];
    function modifyPost() {
        const title = inputTitle.current.value;
        const text = inputText.current.value;
        if (title === "") {
            alert("제목을 쓰세요");
            return;
        }
        if (text === "") {
            alert("내용을 쓰세요");
            return;
        }
        setPostData(current =>
            current.map(el => {
                if (el.post_id === targetPost.post_id) {
                    el.title = title;
                    el.text = text;
                }
                return el;
            })
        );
        nav("/board");
    }
    function cancle() {
        nav("/board");
    }
    return (
        <div className="Posting">
            <div className="title">
                제목:{" "}
                <input
                    type="text"
                    ref={inputTitle}
                    defaultValue={targetPost.title}
                />
            </div>
            <div className="subTitle">작성자: {targetPost.nick_name}</div>
            <div className="contents">
                {/* {data.img ? <img src={data.img} alt="postImg" /> : null} */}
                <div className="text">
                    <textarea
                        ref={inputText}
                        defaultValue={targetPost.text}></textarea>
                </div>
            </div>
            <div className="btns">
                <button onClick={modifyPost}>수정</button>
                <button onClick={cancle}>취소</button>
            </div>
        </div>
    );
};

export default PostModify;
