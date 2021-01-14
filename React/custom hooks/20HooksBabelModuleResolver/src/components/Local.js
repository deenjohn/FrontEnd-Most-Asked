import React from "react";
import { useLocalStorage } from "hooks";

const Local = () => {
  const [value, setValue] = useLocalStorage("test", "I am initial");

  return (
    <div>
      <h1>{value || ""}</h1>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  );
};

export default Local;

// Different types of api
// const { value, get, set } = useCookie({key, value})
// value
// const { value, get, set } = useCookie({key: anotherKey, value})

// const { get, set } = useCookie()
// get("theme")
