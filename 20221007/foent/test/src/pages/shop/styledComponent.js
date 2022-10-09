import styled from "styled-components";

const ContentsWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Select = styled.select`
  /* position: absolute; */
  position: relative;
  right: -50%;
  transform: translateX(-50%);
  width: 50px;
`;
const ItemsWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const PagesWrap = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  margin-top: 30px;
  padding: 0;
`;
export { ContentsWrap, Select, ItemsWrap, PagesWrap };
