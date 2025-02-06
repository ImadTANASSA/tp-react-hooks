import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import useDebounce from "../hooks/useDebounce";

const ProductSearch = ({ setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;
