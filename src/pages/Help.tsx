import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import Divulgue from "../assets/divulgue.png";
import Money from "../assets/Money.png";
import PadrinhoMadrinhaImg from "../assets/padrinho_madrinha.png";
import AdoteImg from "../assets/adoteImg.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const HelpPage = () => {
    const { t } = useTranslation();

    const [openModal, setOpenModal] = useState(false)

    const infoSlides = [
        {
            id: 1,
            title: `${t("want_help.make_donation.title")}`,
            image: Money,
            alt: `${t("want_help.make_donation.alt")}`,
            content: (
                <>
                    <p>{t("want_help.make_donation.content._1")}</p>
                    <p>{t("want_help.make_donation.content._2")}</p>
                    <p>{t("want_help.make_donation.content._3")}</p>
                    <p>{t("want_help.make_donation.content._4")}</p>
                </>
            ),
        },
        {
            id: 2,
            title: `${t("want_help.share_our_work.title")}`,
            image: Divulgue,
            content: (
                <>
                    <br />
                    <p>{t("want_help.share_our_work.content._1")}</p><br />
                    <p>{t("want_help.share_our_work.content._2")}</p>
                    <p>
                        {t("want_help.share_our_work.social_media.instagram")}
                    </p>
                    <p>{t("want_help.share_our_work.social_media.facebook")}</p>
                    <p>{t("want_help.share_our_work.social_media.whatsapp")}</p>
                    <br />
                </>
            ),
        },
        {
            id: 3,
            title: `${t("want_help.become_sponsor.title")}`,
            image: PadrinhoMadrinhaImg,
            content: (
                <>
                    <p>{t("want_help.become_sponsor.content._1")}</p>
                    <p>{t("want_help.become_sponsor.content._2")}</p>
                    <p>{t("want_help.become_sponsor.content._3")}</p>
                    <p>{t("want_help.become_sponsor.content._4")}</p>
                    <p>{t("want_help.become_sponsor.content._5")}</p>
                    <p>{t("want_help.become_sponsor.content._6")}</p>
                </>
            ),
        },
        {
            id: 4,
            title: `${t("want_help.adopt_cat.title")}`,
            image: AdoteImg,
            content: (
                <>
                    <p>{t("want_help.adopt_cat.content._1")}</p>
                    <p>{t("want_help.adopt_cat.content._2")}</p>
                    <p>{t("want_help.adopt_cat.content._3")}</p>
                    <p>{t("want_help.adopt_cat.content._4")}</p>
                    <p>
                        {t("want_help.adopt_cat.content._5")}
                        <Link
                            to={"/"}
                            className="underline cursor-pointer text-primary shadow-2xl"
                        >
                            {t("want_help.adopt_cat.content.link")}
                        </Link>
                    </p>
                </>
            ),
        },
    ];

    const [donationIndex, setDonationIndex] = useState(0)

    const infoDonation = [
        {
            area: t("want_help.donation_modal.areas.vet"),
            contribuicoes: [
                t("want_help.donation_modal.contributions.consultas"),
                t("want_help.donation_modal.contributions.vacinas"),
                t("want_help.donation_modal.contributions.castracoes"),
                t("want_help.donation_modal.contributions.exames"),
                t("want_help.donation_modal.contributions.emergencias"),
            ]
        },
        {
            area: t("want_help.donation_modal.areas.food"),
            contribuicoes: [
                t("want_help.donation_modal.contributions.racao"),
                t("want_help.donation_modal.contributions.leite"),
                t("want_help.donation_modal.contributions.areia"),
                t("want_help.donation_modal.contributions.medicamentos"),
            ]
        },
        {
            area: t("want_help.donation_modal.areas.shelter"),
            contribuicoes: [
                t("want_help.donation_modal.contributions.limpeza"),
                t("want_help.donation_modal.contributions.infraestrutura"),
                t("want_help.donation_modal.contributions.bem_estar"),
            ]
        },
        {
            area: t("want_help.donation_modal.areas.campaigns"),
            contribuicoes: [
                t("want_help.donation_modal.contributions.eventos"),
                t("want_help.donation_modal.contributions.materiais"),
                t("want_help.donation_modal.contributions.redes"),
            ]
        },
    ]

    const [amount, setAmount] = useState(0.0);
    const [inputValue, setInputValue] = useState("R$ 0,00");

    const formatToCurrency = (value: string) => {
        const number = parseFloat(value.replace(/[^\d]/g, '')) / 100 || 0.00;
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleChange = (e: { target: { value: any; }; }) => {
        const raw = e.target.value;
        const cleaned = raw.replace(/[^\d]/g, ''); // Keep only digits
        const numeric = parseFloat(cleaned) / 100 || 0;
        setAmount(numeric);
        setInputValue(formatToCurrency(cleaned));
    };

    const handlePay = () => {
        const area = infoDonation[donationIndex]?.area;
        const userId = sessionStorage.getItem("userId");
        console.log(userId)

        if (!userId || !area) {
            return;
        }

        const report = {
            userId,
            userName: "user",
            amount,
            area
        };
        const API = import.meta.env.VITE_API_URL

        fetch(API + '/report/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to submit donation");
                }
                return response.json();
            })
            .then(data => {
                console.log("Report submitted successfully:", data);
            })
            .catch(error => {
                console.error("Error submitting report:", error);
            }
            );
    }

    useEffect(() => {
        console.log(amount)
    }, [amount])

    return (
        <>
            <section className="flex flex-col gap-10">
                <img
                    src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                    className="w-full h-[500px] object-cover"
                />
                <InfoCarousel slides={infoSlides} />

                <div className="flex justify-center items-center mt-5 py-20 bg-gray-100 pb-30">
                    <div className="mx-auto max-w-md w-100 p-15 bg-gradient-to-br from-white to-sky-50 rounded-lg shadow-2xl text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t("want_help.donation_modal.title")}</h2>
                        <p className="text-gray-600 mb-4">{t("want_help.donation_modal.subtitle")}</p>

                        <div className="flex flex-col gap-3">
                            {
                                infoDonation.map((val, idx) => (
                                    <button
                                        key={idx}
                                        className="rounded-md py-2 px-4 mx-4 bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100"
                                        onClick={() => { setOpenModal(true); setDonationIndex(idx); }}
                                    >
                                        {val.area}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className={`fixed inset-0 flex justify-center items-center backdrop-contrast-35 backdrop-blur-xs z-50 ${openModal ? '' : 'hidden'}`}>
                    <div className="relative text-center max-w-lg m-2 p-6 rounded-lg bg-white shadow-lg w-full sm:w-[90%] md:w-[600px]">
                        <button className="absolute top-2 right-2 p-1 rounded-md bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100" onClick={() => setOpenModal(false)}>
                            {t("want_help.donation_modal.cancel")}
                        </button>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                            {infoDonation[donationIndex].area}
                        </h3>

                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                            <div className="flex flex-col justify-around items-center gap-1 w-full md:w-auto">
                                {[5, 10, 20, 50, 100].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => {
                                            setAmount(val);
                                            setInputValue(formatToCurrency((val * 100).toString()));
                                        }}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded w-full md:w-32"
                                    >
                                        {formatToCurrency((val * 100).toString())}
                                    </button>
                                ))}

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder={t("want_help.donation_modal.placeholder")}
                                    value={inputValue}
                                    onChange={handleChange}
                                    className="mt-2 rounded-sm border border-gray-300 w-full md:w-32 text-center py-3"
                                />
                            </div>

                            <div className="flex flex-col w-full md:w-auto px-2 justify-between">
                                <div className="mt-3">
                                    <p>{t("want_help.donation_modal.area_contribution", {
                                        area: infoDonation[donationIndex].area,
                                    })}</p>
                                    <ul className="text-start px-5 md:px-10 list-disc list-inside text-sm md:text-base">
                                        {infoDonation[donationIndex].contribuicoes.map((val, idx) => (
                                            <li key={idx}>{val}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className="p-3 mt-4 rounded-md text-base md:text-xl bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100 w-full"
                                    onClick={() => {
                                        setOpenModal(false);
                                        handlePay();
                                    }}
                                >
                                    {t("want_help.donation_modal.finish_payment")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HelpPage;
