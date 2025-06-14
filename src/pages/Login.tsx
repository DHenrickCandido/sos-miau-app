import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginImage from "../assets/signup_image2.png";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import SubmitButton from "../components/SubmitButton/SubmitButton";

const Login = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); 
        console.log("Login data submitted:", formData);

        try {
            const API = import.meta.env.VITE_API_URL; 
            const response = await fetch(
                API + "/adopter/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    setErrorMessage(t("loginPage.invalid_credentials"));
                } else {
                    setErrorMessage(t("loginPage.generic_error"));
                }
                console.error("Failed to submit");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.user.id);

            console.log("Form data submitted successfully:", data);
            window.location.href = `/`;
        } catch (error) {
            setErrorMessage("Erro ao tentar fazer login. Tente novamente.");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-center w-full h-full lg:pb-30">
            {/* Form Section */}
            <div className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="lg:w-1/2 lg:mx-auto">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("loginPage.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("loginPage.description")}
                    </p>
                    {/* Mensagem de erro */}
                    {errorMessage && (
                        <div className="text-red-600 text-sm mb-2">{errorMessage}</div>
                    )}
                    <div className="grid sm:grid-cols-1 gap-4">
                        <div className="col-span-2">
                            <Label>{t("loginPage.email")}</Label>
                            <InputField
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t("loginPage.email_placeholder")}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>{t("loginPage.password")}</Label>
                            <InputField
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={t("loginPage.password_placeholder")}
                                required
                            />
                        </div>
                        <SubmitButton>{t("loginPage.submit")}</SubmitButton>
                        <p className="text-left">
                            <a
                                href="/forgot-password"
                                className="text-primary-hover font-bold text-sm hover:underline"
                            >
                                {t("loginPage.forgot_password")}
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3">
                <img
                    src={LoginImage}
                    alt={t("loginPage.image_alt")}
                    className="w-full h-auto "
                />
            </div>
        </div>
    );
};

export default Login;