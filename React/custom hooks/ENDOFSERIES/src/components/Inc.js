import React from "react";
import { useInc } from "hooks";

const Inc = () => {
  const [volume, { inc, dec, reset }] = useInc({
    maxValue: 10,
    minValue: 0,
    initial: 10,
    step: 3
  });

  return (
    <div>
      <h3>Volume</h3>
      <button onClick={dec}>-</button>
      {volume}
      <button onClick={inc}>+</button>
      <button onClick={reset}>Reset Volume</button>
    </div>
  );
};

export default Inc;
