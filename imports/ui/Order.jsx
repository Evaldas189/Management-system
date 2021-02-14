import React from "react";

function Order({ index, fullname, good, amount, fullPrice, date }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{fullname}</td>
      <td>{good}</td>
      <td>{amount}</td>
      <td>{fullPrice}</td>
    </tr>
  );
}

export default Order;
