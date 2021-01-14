import React from "react";
import { useTheme } from "hooks";

const Theme = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>
      <select
        name=""
        id=""
        defaultValue={theme}
        onChange={e => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Theme;
