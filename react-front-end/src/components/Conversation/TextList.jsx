import React from "react";

const TextList = (props) => {
  const items = props.gifs.map((itemData) => {
    //console.log("textitem", itemData)
    return <Item url={itemData.url} sendGiphy={props.sendGiphy}/>;
  });
  return <div className="absolute bg-white bottom-9 z-50 grid grid-cols-2">{items}</div>;
};
const Item = (props) => {
  return (
    <div onClick={() => {props.sendGiphy(props.url)}}>
      <img src={props.url} />
    </div>
  );
};
export default TextList;