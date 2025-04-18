import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cat1 from "../../assets/adoption01.jpg";

const CatCard = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [adopted, setAdopted] = useState(false);

    const gatos = [
        {
            id: 1,
            name: "Margot",
            gender: "Fêmea",
            breed: "SRD",
            age: "1 ano e 6 meses",
            description:
                "Demora um pouquinho para se acostumar com o ambiente, então precisa de um humano paciente!",
            behavior: "Brincalhona",
            photo: Cat1,
        },
    ];

    return (
        <>
            <div className="p-4 w-full max-w-sm">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-200 shadow-md dark:bg-blue-950 dark:border-gray-700">
                    <div className="w-full h-64 flex justify-center items-center">
                        <img
                            src={Cat1}
                            alt="Gato para Adoção"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="w-full p-2">
                        <button
                            onClick={() => {
                                setIsOpen(true);
                                setAdopted(false);
                            }}
                            className="w-full px-4 py-2 text-lg font-medium text-white bg-emerald-500 rounded-xl hover:bg-green-500 focus:outline-none dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        >
                            {t("cats_page.interest")}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 lg:px-0 px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full dark:bg-primary transition-transform transform scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-1 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                        >
                            ✖
                        </button>

                        {!adopted ? (
                            gatos.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="flex lg:flex-row flex-col gap-5 lg:items-start items-center"
                                >
                                    <img
                                        src={cat.photo}
                                        alt="Gato para Adoção"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <h1 className="font-tiny text-green-500 text-xl uppercase">
                                            {cat.name}
                                        </h1>
                                        <ul className="text-white font-afacad">
                                            <li>• {cat.gender}</li>
                                            <li>• {cat.age}</li>
                                            <li>• {cat.breed}</li>
                                            <li>• {cat.description}</li>
                                            <li>• {cat.behavior}</li>
                                        </ul>
                                        <button
                                            onClick={() => setAdopted(true)}
                                            className="bg-white px-6 py-2 rounded-md font-tiny text-green-500 hover:bg-zinc-200 cursor-pointer text-lg transition-all uppercase"
                                        >
                                            {t("cats_page.button_adopt")}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-emerald-600 font-tiny">
                                    {t("cats_page.thanks_for_adopting")}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 font-afacad text-xl">
                                    {t(
                                        "cats_page.thanks_for_adopting_description"
                                    )}
                                </p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 font-tiny cursor-pointer uppercase"
                                >
                                    {t(
                                        "cats_page.thanks_for_adopting_close_button"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CatCard;
