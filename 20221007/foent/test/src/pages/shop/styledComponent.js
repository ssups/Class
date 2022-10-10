import styled from "styled-components";

const ContentsWrap = styled.div`
  /* background-color: orange; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 90vh;
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
  margin-bottom: 15px;
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
  margin-top: 15px;
  padding: 0;
`;
const PageList = styled.li`
  border-right: 1px solid black;
  width: 20px;
  text-align: center;
  cursor: pointer;

  :last-child {
    border: none;
  }
`;
export { ContentsWrap, Select, ItemsWrap, PagesWrap, PageList };
