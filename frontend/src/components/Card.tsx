export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white rounded-lg p-4 shadow-md ${className}`}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}