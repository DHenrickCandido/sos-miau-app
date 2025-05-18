import React, { useState, useEffect, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import catIcon from "../../assets/cat_icon_registered.png";
import EditCatModal from "./EditCatModal/EditCatModal";
import { Gato } from "../../types/types";
import DeleteCatModal from "./DeleteCatModal/DeleteCatModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TableRegisteredCats = () => {
    const {t} = useTranslation();
    const [gatos, setGatos] = useState<Gato[]>([]);
    const [selectedCat, setSelectedCat] = useState<Gato | null>(null);
    const [catToDelete, setCatToDelete] = useState<Gato | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const getCats = async () => {
            try {
                const response = await fetch("http://localhost:3000/donorOng/" + sessionStorage.getItem("userId"), {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (!response.ok) {
                  console.error("Failed to find Cats");
                  return;
                }

                const data = await response.json();
                console.log(data.cats_available)

                setGatos(
                    // ...(data.cats_available || []),
                    // ...(data.cats_adopted   || []),
                    data.cats_available
                  );    
              } catch (error) {
                console.error("Error submitting form:", error);
              }
        }
        getCats();

      }, []);

      
    const handleAdocaoChange = (index: number, value: boolean) => {
        const updatedGatos = [...gatos];
        updatedGatos[index].adopted = value;
        setGatos(updatedGatos);
    };

    const handleEditClick = (gato: Gato) => {
        setSelectedCat(gato);
    };

    const handleCloseModal = () => {
        setSelectedCat(null);
    };

    const handleDeleteClick = (gato: Gato) => {
        setCatToDelete(gato);
    };

    const handleConfirmDelete = (gato: Gato) => {
        setGatos((prev) => prev.filter((g) => g !== gato));
        setCatToDelete(null);
    };

    const filteredGatos = gatos.filter(
        (gato) =>
            gato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gato.breed.toLowerCase().includes(searchTerm.toLowerCase()) 
            // gato.adopted.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 font-afacad">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl text-secondary mb-4 font-tiny">
                    {t("table_registeredcats.title")}
                </h1>

                <div className="relative mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder={t("table_registeredcats.search")}
                        className="w-full rounded-full pl-6 pr-10 py-2 shadow-inner border border-gray-300 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                        🔍
                    </span>
                </div>
                <Link to="/catregister" className="relative right-3 mb-4 text-secondary">
                        {t("table_registeredcats.add_cat")}
                    </Link>
            </div>

            <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                <thead>
                    <tr className="text-left text-secondary text-lg">
                        <th className="p-3"> </th>
                        <th className="p-3">{t("table_registeredcats.name")}</th>
                        <th className="p-3">{t("table_registeredcats.gender")}</th>
                        <th className="p-3">{t("table_registeredcats.neutered")}</th>
                        <th className="p-3">{t("table_registeredcats.birthdate")}</th>
                        <th className="p-3">{t("table_registeredcats.breed")}</th>
                        <th className="p-3">{t("table_registeredcats.adopted")}</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGatos.length > 0 ? (
                        filteredGatos.map((gato, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 text-lg text-primary"
                            >
                                <td className="p-3">
                                    <img
                                        src={catIcon}
                                        alt="avatar"
                                        className="rounded-full w-10 h-10"
                                    />
                                </td>
                                <td className="p-3">{gato.name}</td>
                                <td className="p-3">{gato.gender}</td>
                                <td className="p-3">{gato.id}</td>
                                <td className="p-3">{gato.birthday}</td>
                                <td className="p-3">{gato.breed}</td>
                                <td className="p-3">
                                    <select
                                        value={gato.adopted}
                                        onChange={(e) =>
                                            handleAdocaoChange(
                                                index,
                                                e.target.value === "Sim" 
                                            )
                                        }
                                        className="bg-transparent border-none focus:outline-none"
                                    >
                                        <option value="Sim">Sim</option>
                                        <option value="Não">Não</option>
                                    </select>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(gato)}
                                    >
                                        <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(gato)}
                                    >
                                        <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="text-center p-4 text-secondary"
                            >
                                {t("table_registeredcats.nocats")}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCat && (
                <EditCatModal gato={selectedCat} onClose={handleCloseModal} />
            )}

            {catToDelete && (
                <DeleteCatModal
                    gato={catToDelete}
                    onClose={() => setCatToDelete(null)}
                    onDelete={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default TableRegisteredCats;
