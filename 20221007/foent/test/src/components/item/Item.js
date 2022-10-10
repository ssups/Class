import React from "react";
import { ItemWrap, ItemImg, ItemAttribute } from "./styledComponent";
import { useSelector } from "react-redux";

const Item = ({ data }) => {
  const userId = useSelector(state => state.loginReducer.id);
  return (
    <>
      {data ? (
        <ItemWrap>
          <ItemImg>상품이미지</ItemImg>
          <ItemAttribute style={{ borderRight: "2px solid black" }}>
            <h3 style={{ margin: 0 }}>상품명:{data.item_name} </h3>
            <h5 style={{ margin: 0 }}>등록유저:{data.writer} </h5>
          </ItemAttribute>
          <div style={{ borderRight: "2px solid black", width: "55%" }}>
            <h3>상품설명:{data.description}</h3>
          </div>
          <ItemAttribute>
            <h4 style={{ margin: 0 }}>가격: {data.price}원</h4>
            <h4 style={{ margin: 0 }}>잔여 수량: {data.amount}개</h4>
            {userId !== data.writer ? (
              <h4 style={{ margin: 0 }}>
                구매 수량: <input type="number" defaultValue={1} style={{ width: "30px" }} />
              </h4>
            ) : null}
            {userId !== data.writer ? <button style={{ width: "70px" }}>구매</button> : null}
          </ItemAttribute>
        </ItemWrap>
      ) : (
        <div style={{ height: "100%" }}></div>
      )}
    </>
  );
};

export default Item;
