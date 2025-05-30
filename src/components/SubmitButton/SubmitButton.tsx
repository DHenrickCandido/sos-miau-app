interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton: React.FC<ButtonProps> = ({ children, type = "submit", ...props }) => {    return (
        <button
            type={type}
            {...props}
            className="col-span-2 mt-6 w-full bg-primary text-secondary dark:bg-secondary dark:text-white hover:bg-blue-100 py-2 rounded-lg dark:hover:bg-[#0f2533] transition-colors duration-300"
        >
            {children}
        </button>
    );
};

export default SubmitButton;
