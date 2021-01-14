import React from "react";
import { useMount, useUnmount, useToggle } from "hooks";

const Mount = () => {
  const { isToggled, toggle } = useToggle();
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isToggled && <UnMount />}
    </div>
  );
};

export const UnMount = () => {
  useMount(() => {
    console.log("I mounted!");
  });

  useUnmount(() => {
    console.log("I Unmounted!");
  });

  return <div>Unmount me</div>;
};

export default Mount;
