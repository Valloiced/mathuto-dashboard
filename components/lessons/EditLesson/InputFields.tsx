import type { InputFieldsProps } from "."

export default function InputFields({ primaryInfo, handleBasicInput } : InputFieldsProps) {
    return (
        <>
            <div className="group w-full px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                <h3 className="font-montserrat font-medium text-xs text-black group-focus-within:text-blue">Title (Required)</h3>
                <div className="flex flex-col justify-evenly">
                    <input 
                        type="text"
                        name="title"
                        value={primaryInfo.title}
                        maxLength={100} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Title"
                        onChange={handleBasicInput}
                        required
                    />
                </div>   
            </div>
            <div className="group w-full px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                <h3 className="font-montserrat font-medium text-xs group-focus-within:text-blue">Brief Summary (Required)</h3>
                <div className="flex flex-col justify-evenly"> 
                    <input 
                        type="text" 
                        name="summary"
                        value={primaryInfo.summary}
                        maxLength={1000} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Summary"
                        onChange={handleBasicInput}
                        required
                    />
                </div>   
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="font-montserrat font-bold text-dark-blue">Subtopic (optional)</h2>
                    <p className="font-poppins font-normal text-black text-opacity-75 text-sm">
                        You can provide subtopic title for your lessons to categorize them in your module. 
                        Related lessons could be group using the given subtopic for each lessons. 
                        If no subtopic are given, the application would automatically identify them as independent lessons and will group them under the module name.
                    </p>
                </div>
                <div className="group w-full px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                    <h3 className="font-montserrat font-medium text-xs text-black group-focus-within:text-blue">Subtopic</h3>
                    <div className="flex flex-col justify-evenly">
                        <input 
                            type="text" 
                            name="subtopic"
                            value={primaryInfo.subtopic}
                            maxLength={60} 
                            className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                            placeholder="Add Subtopic"
                            onChange={handleBasicInput}
                        />
                    </div>   
                </div>
            </div>
        </>
    )
}