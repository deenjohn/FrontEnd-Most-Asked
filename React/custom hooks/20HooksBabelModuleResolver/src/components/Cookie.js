import React from "react";
import { useCookies } from "hooks";

const Cookie = () => {
  const [cookie, setCookie] = useCookies({ key: "test" });
  // const [cookie, setCookie] = useCookies({ key: "2ndkey" });
  return (
    <div>
      <h1>{cookie || ""}</h1>
      <input value={cookie} onChange={e => setCookie(e.target.value)} />
    </div>
  );
};

export default Cookie;

// Different types of api
// const { value, get, set } = useCookie({key, value})
// value
// const { value, get, set } = useCookie({key: anotherKey, value})

// const { get, set } = useCookie()
// get("theme")
