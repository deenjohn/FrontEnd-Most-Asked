import React from "react";
import { useScript } from "hooks";

const Script = () => {
  const [isLoaded, isError] = useScript(
    "https://www.google.com/recaptcha/api.js"
  );

  if (!isLoaded) return null;

  return (
    <div>
      <h3>Script</h3>
    </div>
  );
};
export default Script;
