let init = {
  list: null,
  pages: 0,
  amountPerPage: 4,
};

function reducer(state = init, { type, payload }) {
  switch (type) {
    case "SET_LIST":
      console.log("셋리스트");
      return { ...state, list: payload };
    //   state.list = payload;
    //   return state;
    case "BUY_ITEM":
      console.log("바이 아이템");
    //   return { ...state, list: payload };
    default:
      return state;
  }
}

export default reducer;
