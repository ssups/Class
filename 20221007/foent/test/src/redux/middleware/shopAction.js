import axios from "axios";

function register(itemName, writer, description, price, amount, nav) {
  return async (dispatch, getState) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/register",
      data: { itemName, writer, description, price, amount },
    });
    alert(response.data);
    if (response.data === "등록 완료") nav("/shop");
  };
}

function getList() {
  return async (dispatch, getState) => {
    const response = await axios({
      url: "http://localhost:8000/shop",
    });
    dispatch({ type: "SET_LIST", payload: response.data });
  };
}

export const shopAction = { register, getList };
