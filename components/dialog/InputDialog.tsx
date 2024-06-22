import { useState } from "react";

interface DeleteDialogProps {
    onClose: () => void,
    handler: any,
    title?: string,
    description?: string
}

export default function InputDialog({ onClose, handler, title, description } : DeleteDialogProps) {
    const [input, setInput] = useState<string>("");
    
    return (
        <div className="flex flex-col gap-6 bg-white rounded-md p-8 shadow-2xl">
            <h1 className="font-montserrat font-semibold text-blue text-2xl">
                {title || "Enter input"}
            </h1>
            <p className="font-poppins font-medium text-black/50">
                {description || "Please provide your input below"}
            </p>
            <input 
                type="text"
                className="w-full border-[1px] py-1 px-2 border-black/50 rounded-md"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex flex-row gap-4"> 
                <button 
                    className="font-poppins font-medium bg-white text-blue text-sm w-24 py-1 border-2 border-blue rounded-full"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    className="font-poppins font-medium bg-blue text-white text-sm w-24 py-2 rounded-full"
                    onClick={() => {
                        onClose();
                        handler(input);
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}