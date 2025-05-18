import React, { useRef } from "react";

interface AddTextProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const AddText: React.FC<AddTextProps> = ({
    value,
    onChange,
    placeholder = "Enter your text here...",
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div style={{ width: "100%" }}>
           <h1>helo</h1>
        </div>
    );
};

export default AddText;