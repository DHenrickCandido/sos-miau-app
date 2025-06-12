import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import RescueCat from "../assets/rescue_cat.png";
import Polenta from "../assets/polenta.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Gato } from "../types/types";
import gatinho from "../assets/gatinho.jpg";

const Rescue = () => {
    console.log("Componente Rescue renderizado!");
    const { t } = useTranslation();

    const [gatos, setGatos] = useState<Gato[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        console.log("useEffect do Rescue disparado!");
        const fetchCats = async () => {
            try{
                const API = import.meta.env.VITE_API_URL;
                const response = await fetch(
                    API + "/cat/rescueCats",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
 
                if (!response.ok)
                    throw new Error("Erro ao buscar gatos resgatados");

                const data = await response.json();
                setGatos(data.response);
            } catch (error) {
                console.error("Erro ao carregar gatos resgatados:", error);
                console.error("Erro ao carregar gatos resgatados");
            } finally {
                setLoading(false);
            }
        }

        fetchCats();
    }, []);

    const infoSlides = gatos.map((gato) => ({
        title: gato.name,
        content: gato.description,
        image: gato.photo_url || gatinho 
    }));

    return (
    <section className="mb-30 flex flex-col gap-10 px-4 md:px-0">
        <img
            src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
            className="w-full h-64 md:h-[500px] object-cover rounded-lg"
        />
        <h1 className="text-center text-2xl md:text-5xl font-tiny uppercase text-secondary">
            {t("rescue.title")}
        </h1>
        { !loading && <InfoCarousel slides={infoSlides} /> }
    </section>
    );
};

export default Rescue;
