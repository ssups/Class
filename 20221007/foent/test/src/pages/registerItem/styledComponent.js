import styled from "styled-components";

const PostWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 2px solid black;
`;
const Writer = styled.span`
  position: relative;
  right: -50%;
  transform: translateX(-55%);
  width: max-content;
`;
const Form = styled.ul`
  margin-top: 50px;
  padding: 0;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  list-style: none;
  /* align-items: flex-start; */
  justify-content: space-between;
`;
const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  width: 130px;
  text-align: center;
  font-size: 25px;
`;
const Button = styled.button`
  width: 100px;
  :last-child {
    margin-left: 30px;
  }
`;

export { PostWrap, Writer, Form, List, Label, Button };
