import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import BrazilIcon from "../../assets/brazil.svg";
import UnitedStatesIcon from "../../assets/unitedStates.svg";

function LanguageSwitcher() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "br";
        i18n.changeLanguage(savedLang);
    }, [i18n]);

    function handleChangeCurrentLanguage(lang: "br" | "en") {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    return (
        <div className="language-switcher flex items-center gap-2">
            <button
                className={`transition-all duration-75 bg-secondary dark:bg-blue-200 rounded-lg p-2 ${
                    currentLanguage === "en"
                        ? ""
                        : "border-b-2 border-yellow-600 dark:border-blue-600"
                }`}
                onClick={() => handleChangeCurrentLanguage("en")}
            >
                <img width={22} src={UnitedStatesIcon} alt={t("english")} />
            </button>
            <div className="h-4 w-[1px] bg-white"></div>
            <button
                className={`transition-all duration-75 bg-secondary dark:bg-blue-200 rounded-lg p-2 ${
                    currentLanguage === "br"
                        ? ""
                        : "border-b-2 border-yellow-600 dark:border-blue-600"
                }`}
                onClick={() => handleChangeCurrentLanguage("br")}
            >
                <img width={24} src={BrazilIcon} alt={t("portuguese")} />
            </button>
        </div>
    );
}

export default LanguageSwitcher;
