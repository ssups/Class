import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Board.css";

const Board = ({ postData, setPostData }) => {
    console.log(postData);
    const loginedUserData = useSelector(state => state.loginedUserData);
    const nav = useNavigate();
    function goModify(postId) {
        nav(`/posting/modify/${postId}`);
    }
    function delPost(postId) {
        setPostData(current => current.filter(el => el.post_id != postId * 1));
    }
    return (
        <div className="Board">
            <div className="PostWrap">
                {postData.map((data, index) => (
                    <div className="Post" key={"post" + index}>
                        <div className="title">제목: {data.title}</div>
                        <div className="subTitle">
                            <div className="contents">
                                {(loginedUserData
                                    ? loginedUserData.nick_name
                                    : null) === data.nick_name ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                goModify(data.post_id)
                                            }>
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                delPost(data.post_id)
                                            }>
                                            삭제
                                        </button>
                                    </>
                                ) : null}
                                <span>작성자: {data.nick_name}</span>
                            </div>
                        </div>
                        <div className="contents">
                            {data.img ? (
                                <img src={data.img} alt="postImg" />
                            ) : null}
                            <div className="text">{data.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
