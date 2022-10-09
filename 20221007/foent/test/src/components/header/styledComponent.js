import styled from "styled-components";
// 자동완성 되게할라면 마켓에서 vscode-styled-componets 설치

// styled.여기다가 사용할 태그 이름 적기
// 그러면 선언한 변수명으로 스타일이 적용된 태그가 생성됨
const Button = styled.button`
  width: 100px;
  height: 30px;
  margin: 0;
  margin-left: 20px;
  border: 0;
  padding: 0;
  :last-child {
    width: 130px;
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  height: 50px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContents = styled.ul`
  display: flex;
  list-style: none;
`;

const ContentsBtn = styled.li`
  color: white;
  cursor: pointer;
  margin-left: 20px;
  padding: 10px;
`;

const LoginWrap = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  color: white;
`;

const LoginInput = styled.input`
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  margin: 0 10px;
`;

export { Button, HeaderWrap, HeaderContents, ContentsBtn, LoginWrap, LoginInput };
