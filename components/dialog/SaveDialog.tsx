interface SaveDialogProps {
    onClose: () => void,
    handler: any
}

export default function SaveDialog({ onClose, handler } : SaveDialogProps) {
    return (
        <div className="flex flex-col gap-6 white rounded-md p-8 shadow-2xl">
            <h1 className="font-montserrat font-semibold text-blue text-2xl">Confirm Changes</h1>
            <p className="font-poppins font-medium text-black/50">Do you want to save your current progress?</p>
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
                        handler();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}