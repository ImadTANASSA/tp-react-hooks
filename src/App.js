import React, { createContext, useState } from 'react';
import LanguageSelector from "./components/LanguageSelector";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";

export const ThemeContext = createContext();
export const LanguageContext = createContext();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div
          className={`container ${isDarkTheme ? "bg-dark text-light" : "bg-light"
            }`}
        >
          <header className="my-4">
            <h1 className="text-center">
              {language === "fr" ? "Catalogue de Produits" : "Product Catalog"}
            </h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch setSearchTerm={setSearchTerm} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App
