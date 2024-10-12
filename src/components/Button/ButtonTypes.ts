export interface ButtonProps {
    type: "button" | "submit";
    style?: string;
    buttonName: string;
    onClick?:()=>void;
}