import React from "react";
import { ContentsWrap, Select, ItemsWrap, PagesWrap } from "./styledComponent";
import { Item } from "../../components";

const Shop = () => {
  return (
    <ContentsWrap>
      <h1>상점</h1>
      <Select name="" id="">
        <option value="5">5</option>
        <option value="7">7</option>
      </Select>
      <ItemsWrap>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ItemsWrap>
      <PagesWrap>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </PagesWrap>
    </ContentsWrap>
  );
};

export default Shop;
