interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, onClick, className, disabled, type = "button" }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 ${className}`}
        >
            {children}
        </button>
    );
}
