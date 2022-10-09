import { Routes, Route, Navigate } from "react-router-dom";
import { Main, Shop } from "./pages";
import { Header } from "./components";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector(state => state.loginReducer.isLogin);
  const LoginRedirect = () => {
    return isLogin === true ? <Shop /> : loginMessage();
  };
  function loginMessage() {
    alert("로그인 하자");
    return <Navigate to="/" />; // redirect 시켜주는 컴ㄴ포넌트
  }

  return (
    <div className="App">
      <Header isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<LoginRedirect />} />
      </Routes>
    </div>
  );
}

export default App;

// 1. 로그인이 되어있을때만 상품페이지에서 상품을 추가할수 있고
// 2. 상품에 대한 글과 제목 상품 등록한 유저 가격 수량(만들다가 기분이 좋으면 덧글까지 추가하셔도 되고)
// 3. 다른 유처가 구매하면 구매되게 돈없고 구매만 되게
// 4. 상품의 리스트는 페이지네이션으로 구현(페이지네이션: 한페이지에 보여지는 리스트 갯수정해서 그갯수 넘어가면 다음페이지 넘어가게 하는거)
