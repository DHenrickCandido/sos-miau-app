import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const userId = sessionStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getUser = async () => {
    if (!userId) return; 
    console.log("Fetching user with ID:", userId);

    try {
        const response = await fetch(`http://localhost:3000/adopter/${userId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
      

      if (!response.ok) {
        console.error("Failed to fetch user");
        return;
      }

      const data = await response.json();
      console.log("User fetched successfully:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

    useEffect(() => {
        getUser();
    }, [userId]);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleSignOut = () => {
        sessionStorage.removeItem("userId");
        setUser(null);
        setShowDropdown(false);
    };

  return (
    <div className="header sticky h-26 top-0 w-full flex items-center lg:justify-between px-2 lg:px-10 bg-primary text-white z-50">
      <Dropdown />
      <Link
        to="/"
        className="font-tiny lg:text-5xl text-4xl text-center lg:w-fit w-full"
      >
        SOS Miau
      </Link>

      {user ? (
        <div className="relative">
        <button
            onClick={toggleDropdown}
            className="lg:flex items-center gap-6 text-md uppercase"
        >
            <span>{user.name}</span>
        </button>
        {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
                Sign Out
            </button>
            </div>
        )}
        </div>
        ) : (
        <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
        <HeaderLink to="/login">{t("login")}</HeaderLink>
        <HeaderLink to="/signup">{t("sign_up")}</HeaderLink>
        </div>
        )}

    </div>
  );
};

export default Header;
