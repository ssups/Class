import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Posting.css";

const Posting = ({ setPostData, loginedUserData }) => {
    const inputTitle = useRef();
    const inputText = useRef();
    const nav = useNavigate();
    function registerPost() {
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
            current.concat({
                post_id: current.length + 1,
                nick_name: loginedUserData.nick_name,
                title,
                // img: "https://w.namu.la/s/6f490388edd0eb0595b633808b7f9d4a4251ef5f33052b34a8f104a7b872676191869533df4148d6b540c5191c3651c6e492c4cb1502b8f1a62ba16a194f75b830f2e42d3496fe77d8c553746be4b71e71e75fef709cd4e150d92d22dd1083620ad619bfea1bf4cc287c80edac3d66ef",
                text,
            })
        );
        nav("/board");
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
