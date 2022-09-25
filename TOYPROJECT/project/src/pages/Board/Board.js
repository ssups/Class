import React from "react";
import "./Board.css";

const Board = ({ postData, setPostData }) => {
    console.log(postData);
    return (
        <div className="Board">
            <div className="PostWrap">
                {postData.map((data, index) => (
                    <div className="Post" key={"post" + index}>
                        <div className="title">제목: {data.title}</div>
                        <div className="subTitle">작성자: {data.nick_name}</div>
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
