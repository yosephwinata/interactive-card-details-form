import { useState } from "react";

export const useFormInput = (maxLength) => {
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length > maxLength) {
      return;
    }

    setValue(e.target.value);

    // Clear the error message when user starts typing.
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const inputProps = {
    value: value,
    onChange: handleChange,
    errorMsg: errorMsg,
  };

  return { inputProps, setErrorMsg };
};
