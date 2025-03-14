import Dropdown from "../Dropdown/Dropdown";
import HeaderLink from "./HeaderLink/HeaderLink";

const Header = () => {
    
    return (
        <div className="header sticky h-26 top-0 w-full flex items-center lg:justify-between px-2 lg:px-10 bg-primary text-white">
            <Dropdown />
            <h1 className="font-tiny lg:text-5xl text-2xl text-center lg:w-fit w-full">
                SOS Miau
            </h1>
            <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                <HeaderLink to="/login">Entrar</HeaderLink>
                <HeaderLink to="/cadastrar">Cadastrar-se</HeaderLink>
            </div>
        </div>
    );
};

export default Header;
