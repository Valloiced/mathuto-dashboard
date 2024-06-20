import Link from "next/link";

import { PiLinkSimpleBold } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

import { ExternalLinksProps } from ".";

export default function ExternalLinks({ 
    links, 
    linkInput, 
    handleLinkInput,
    handleAddLink, 
    handleRemoveLink 
} : ExternalLinksProps) {
    const renderLinks = links.map((link) => (
        <div key={link} className="flex flex-row items-center justify-between py-2">
            <Link 
                className="group flex flex-row items-center w-[90%] gap-2 cursor-pointer"
                href={link}
                target="_blank"
            >
                <PiLinkSimpleBold className="flex-shrink-0 text-dark-blue group-hover:text-opacity-75" />
                <p className="truncate text-dark-blue font-poppins text-xs font-light group-hover:text-opacity-75">{link}</p>
            </Link>
            <MdOutlineDeleteOutline 
                className="cursor-pointer text-dark-red"
                onClick={() => handleRemoveLink(link)}
            />
        </div>
    ));
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-montserrat font-bold text-dark-blue">External Links (optional)</h2>
                <p className="font-poppins font-normal text-black text-opacity-75 text-sm">You can provide links for references or citations, and to provide students additional resources. </p>
            </div>
            <div className="note">
                        <FaInfoCircle width={50} height={50} />
                        <p>URL must start with &quot;https://&quot;</p>
            </div>
            <div className="flex flex-row max-sm:flex-col gap-5">
                <form className="flex flex-col flex-grow w-[45%] max-sm:w-full" onSubmit={(e) => handleAddLink(e)}>
                    {/* Input Wrapper */}
                    <div className="group px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                        <h3 className="font-montserrat font-medium text-xs group-focus-within:text-blue">External Link</h3>
                        <div className="flex flex-col justify-evenly"> 
                            <input 
                                type="text" 
                                className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                                placeholder="Add Link"
                                onChange={handleLinkInput}
                                value={linkInput}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-center">
                        <input type="submit" className="global-btn px-16 py-2 my-4 shadow-lg" value="Add Link" />
                    </div> 
                </form>
                {/* Links Wrapper */}
                <div className="flex flex-col py-4 px-4 justify-between bg-white flex-grow w-[50%] max-sm:w-full rounded-md shadow-md">
                    <h2 className="font-montserrat font-bold text-dark-blue">LINKS</h2>
                    <div className={`flex flex-col min-h-[20vh] py-2 ${!links.length && 'justify-center items-center py-0'}`}>
                        { !links.length && <p className="font-montserrat font-normal text-sm">No Links Yet</p>}
                        {renderLinks}
                    </div>
                </div>
            </div>
        </div> 
    )
} 