export interface ButtonProps {
    type: "button" | "submit";
    style?: string;
    buttonName?: string;
    ariaLabel?: string;
    onClick?:()=>void;
    children?: React.ReactNode
}