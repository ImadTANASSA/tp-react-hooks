import React, { useContext } from "react";
import { LanguageContext, ThemeContext } from "../App";

const LanguageSelector = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <select
            className={`px-5 py-2 rounded ${isDarkTheme
                    ? "bg-dark text-light border border-light"
                    : "bg-light text-dark border border-dark"
                }`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
        </select>
    );
};

export default LanguageSelector;