import { useState } from "react";

export const useFocusedField = () => {
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (name) => () => setFocusedField(name);
  const handleBlur = (originalOnBlur) => (e) => {
    originalOnBlur?.(e);
    setFocusedField(null);
  };

  return { focusedField, handleFocus, handleBlur };
}
