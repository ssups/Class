import React, { useEffect, useState } from "react";
import { ContentsWrap, Select, ItemsWrap, PagesWrap, PageList } from "./styledComponent";
import { Item } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { shopAction } from "../../redux/middleware";

const Shop = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.shopReducer.list);
  const [pageAmount, setPageAmount] = useState(0);
  const [listPerPage, setListPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  function onChange(e) {
    setListPerPage(e.target.value * 1);
    setCurrentPage(1);
  }
  function onClick(e) {
    setCurrentPage(e.target.innerHTML * 1);
    e.target.classList.add("abc");
  }
  useEffect(() => {
    dispatch(shopAction.getList());
  }, []);
  useEffect(() => {
    console.log(list);
    // 왜 콘솔이 두번씩 찍히는가?
    setPageAmount(list ? Math.ceil(list.length / listPerPage) : 0);
  }, [list, listPerPage]);

  return (
    <ContentsWrap>
      <h1>상점</h1>
      <Select name="" id="" onChange={onChange} defaultValue={4}>
        <option value="2">2</option>
        <option value="4" selected>
          4
        </option>
        <option value="6">6</option>
      </Select>
      <ItemsWrap>
        {list
          ? Array(listPerPage)
              .fill(0)
              .map((el, ind) => (
                <Item
                  key={list[(currentPage - 1) * listPerPage + ind]?.id}
                  data={list[(currentPage - 1) * listPerPage + ind]}
                />
              ))
          : null}
      </ItemsWrap>
      <hr style={{ width: "100%" }} />
      <PagesWrap>
        {Array(pageAmount)
          .fill(0)
          .map((el, ind) => (
            <PageList key={ind} onClick={onClick}>
              {ind + 1}
            </PageList>
          ))}
      </PagesWrap>
    </ContentsWrap>
  );
};

export default Shop;
