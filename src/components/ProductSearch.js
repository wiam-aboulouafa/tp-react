// src/components/ProductSearch.js
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';
import { useDebounce } from '../hooks/useDebounce';

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const placeholderText = {
    fr: "Rechercher un produit...",
    en: "Search for a product...",
    de: "Suchen Sie nach einem Produkt",
  };

  const [inpVal, setInpVal] = useState(searchTerm);
  const debouncedValue = useDebounce(inpVal, 500); // tu peux ajuster le délai

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder={placeholderText[language]}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;