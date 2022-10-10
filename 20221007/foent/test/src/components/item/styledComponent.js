import styled from "styled-components";

// 상품사진, 상품이름, 상품등록유저, 상품설명, 상품가격, 상품수량, 구매버튼, (댓글)

const ItemWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 2px solid black;
  box-sizing: border-box;
  margin-bottom: 1%;
`;
const ItemImg = styled.div`
  width: 15%;
  height: 100%;
  border-right: 2px solid black;
`;
const ItemAttribute = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export { ItemWrap, ItemImg, ItemAttribute };
