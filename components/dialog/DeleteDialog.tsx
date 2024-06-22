interface DeleteDialogProps {
    onClose: () => void,
    handler: any
}

export default function DeleteDialog({ onClose, handler } : DeleteDialogProps) {
    return (
        <div className="flex flex-col gap-6 bg-white rounded-md p-8 shadow-2xl">
            <h1 className="font-montserrat font-semibold text-red text-2xl">Delete Data</h1>
            <p className="font-poppins font-medium text-black/50">Are you sure that you want to delete? This action is irreversible</p>
            <div className="flex flex-row gap-4"> 
                <button 
                    className="font-poppins font-medium bg-white text-red text-sm w-20 py-1 border-2 border-red rounded-full"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    className="font-poppins font-medium bg-red text-white text-sm w-20 py-1 rounded-full"
                    onClick={() =>{
                        onClose();
                        handler();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}