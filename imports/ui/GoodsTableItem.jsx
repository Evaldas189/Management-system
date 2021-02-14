import React from "react";

function GoodsTableItem({index,name, description, price}) {
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
    </tr>
  );
}

export default GoodsTableItem;
