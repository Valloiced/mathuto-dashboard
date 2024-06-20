import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";

import { FaInfoCircle } from "react-icons/fa";

import type { EditorProps } from ".";

export default function Editor({ preview, handleEditorView, value, setValue } : EditorProps) {
    // TODO: ADD TEMPLATE HERE FOR LESSONS
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-montserrat font-bold text-dark-blue">Full Description</h2>
                <p className="font-poppins font-normal text-black text-opacity-75 text-sm">
                    Edit your full lesson in the markdown below. This allows you to format your lessons according to your preferences. You could toggle the editor below to switch between editing and preview. <Link href="https://www.markdownguide.org/basic-syntax/" className="text-tertiary-theme hover:text-opacity-75" target="_blank">Learn how to use markdown in here.</Link>
                </p>
                <div className="note">
                        <FaInfoCircle width={50} height={50} />
                        <p>You can include images in your lessons by referencing your image in an external source, such as drive. <Link href="https://www.markdownguide.org/basic-syntax/" className="text-tertiary-theme hover:text-opacity-75" target="_blank">Learn how to use markdown in here.</Link></p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1">
                    <button 
                        className={`py-2 w-[8rem] font-montserrat font-medium shadow-md hover:bg-lightWhite border-2 ${preview === 'live' || preview === 'edit' ? 'border-blue text-blue' : 'border-black border-opacity-25 text-black text-opacity-50'}`}
                        onClick={() => handleEditorView('edit')}
                    >
                        Edit
                    </button>
                    <button 
                        className={`py-2 w-[8rem] font-montserrat font-medium shadow-md hover:bg-lightWhite border-2 ${preview === 'live' || preview === 'preview' ? 'border-blue text-blue' : 'border-black border-opacity-25 text-black text-opacity-50'}`}
                        onClick={() => handleEditorView('preview')}
                    >
                        Preview
                    </button>
                </div>
                <div className="w-full" data-color-mode="light">
                    <MDEditor       
                        preview={preview}
                        height={600}
                        value={value}
                        onChange={(value) => setValue(value ? value : "")}
                    />
                </div>
            </div>
        </div>
    )
}