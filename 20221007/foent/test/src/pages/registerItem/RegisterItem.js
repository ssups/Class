import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostWrap, Writer, Form, List, Label, Button } from "./styledComponent";
import { shopAction } from "../../redux/middleware";
import { useNavigate } from "react-router-dom";
// 상품명 , 등록유저, 상품설명, 가격

const PostItem = () => {
  const id = useSelector(state => state.loginReducer.id);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const nav = useNavigate();
  function register() {
    const itemName = inputRef.itemName.value;
    const description = inputRef.description.value;
    const price = Number(inputRef.price.value).toLocaleString("en");
    const amount = inputRef.amount.value;
    if (
      itemName.replaceAll(" ", "") === "" ||
      description.replaceAll(" ", "") === "" ||
      price === "0" ||
      amount === ""
    ) {
      alert("네가지 항목다 입력해주세요");
      return;
    }
    dispatch(shopAction.register(itemName, id, description, price, amount, nav));
  }
  return (
    <PostWrap>
      <h1>상품 등록</h1>
      <Writer>등록유저: {id}</Writer>
      <Form style={{ height: "80%", width: "100%" }}>
        <List>
          <Label htmlFor="name">상품명:</Label>
          <input
            type="text"
            id="itemName"
            ref={el => (inputRef.itemName = el)}
            style={{ width: "70%", height: "50px", fontSize: "25px" }}
          />
        </List>
        <List>
          <Label htmlFor="text">상품설명:</Label>
          <textarea
            id="text"
            ref={el => (inputRef.description = el)}
            style={{ width: "70%", height: "300px", fontSize: "25px" }}
          ></textarea>
        </List>
        <List>
          <Label htmlFor="price">가격 :</Label>
          <input
            type="number"
            id="price"
            ref={el => (inputRef.price = el)}
            style={{ width: "70%", height: "50px", fontSize: "25px" }}
          />
        </List>
        <List>
          <Label htmlFor="price">개수 :</Label>
          <input
            type="number"
            id="price"
            ref={el => (inputRef.amount = el)}
            style={{ width: "70%", height: "50px", fontSize: "25px" }}
          />
        </List>
        <List>
          <Button onClick={register}>등록</Button>
          <Button>취소</Button>
        </List>
      </Form>
    </PostWrap>
  );
};

export default PostItem;
