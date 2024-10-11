export interface ButtonProps {
    type: "button" | "submit";
    buttonName: string;
    onClick?:()=>void;
}