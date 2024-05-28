import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { PiLinkSimpleBold } from "react-icons/pi";
import { MdOutlineDeleteOutline, MdOutlineArrowBackIosNew  } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EditorView = 'live' | 'edit' | 'preview';

interface ExternalLinksProps {
    links: string[],
    linkInput: string, 
    handleLinkInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleAddLink: (e: FormEvent<HTMLFormElement>) => void,
    handleRemoveLink: (linkToRemove: string) => void
}

interface EditorProps {
    preview: EditorView,
    handleEditorView: (toToggle: 'edit' | 'preview') => void,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

function InputFields() {
    return (
        <>
            <div className="group w-full px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                <h3 className="font-montserrat font-medium text-xs text-black group-focus-within:text-blue">Title (Required)</h3>
                <div className="flex flex-col justify-evenly">
                    <input 
                        type="text" 
                        maxLength={60} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Title"
                        required
                    />
                </div>   
            </div>
            <div className="group w-full px-4 py-2 border-2 border-black border-opacity-25 rounded-md bg-white focus-within:border-blue">
                <h3 className="font-montserrat font-medium text-xs group-focus-within:text-blue">Brief Summary (Required)</h3>
                <div className="flex flex-col justify-evenly"> 
                    <input 
                        type="text" 
                        maxLength={200} 
                        className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                        placeholder="Add Summary"
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
                            maxLength={60} 
                            className="font-montserrat font-semibold text-sm py-2 w-full text-dark-blue outline-none placeholder:font-normal"
                            placeholder="Add Subtopic"
                        />
                    </div>   
                </div>
            </div>
        </>
    )
}

function Editor({ preview, handleEditorView, value, setValue } : EditorProps) {
    // TODO: ADD TEMPLATE HERE FOR LESSONS
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-montserrat font-bold text-dark-blue">Full Description</h2>
                <p className="font-poppins font-normal text-black text-opacity-75 text-sm">
                    Edit your full lesson in the markdown below. This allows you to format your lessons according to your preferences. You could toggle the editor below to switch between editing and preview. <Link href="https://www.markdownguide.org/basic-syntax/" className="text-tertiary-theme hover:text-opacity-75" target="_blank">Learn how to use markdown in here.</Link>
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                    <button 
                        className={`py-2 w-[8rem] bg-white font-montserrat font-medium shadow-md hover:bg-lightWhite border-2 ${preview === 'live' || preview === 'edit' ? 'border-blue text-blue' : 'border-black border-opacity-25 text-black text-opacity-50'}`}
                        onClick={() => handleEditorView('edit')}
                    >
                        Edit
                    </button>
                    <button 
                        className={`py-2 w-[8rem] bg-white font-montserrat font-medium shadow-md hover:bg-lightWhite border-2 ${preview === 'live' || preview === 'preview' ? 'border-blue text-blue' : 'border-black border-opacity-25 text-black text-opacity-50'}`}
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
                        onChange={setValue}
                    />
                </div>
            </div>
        </div>
    )
}

function ExternalLinks({ links, linkInput, handleLinkInput, handleAddLink, handleRemoveLink } : ExternalLinksProps) {
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

export default function EditLesson() {
    const router = useRouter();

    const [editorView, setEditorView] = useState({
        edit: true,
        preview: true
    });

    const [fullDescription, setFullDescription] = useState<string>('**Edit your lessons here**');
    
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState<string>('');

    const handleAddLink = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isLinkExist = links.indexOf(linkInput);
        if (linkInput !== '' && isLinkExist === -1) {
            setLinks(prev => [...prev, linkInput]);
            setLinkInput('');
        }
    }

    const handleRemoveLink = (linkToRemove: string) => {
        const updateLinks = links.filter((link) => link !== linkToRemove);
        setLinks(updateLinks);
    }

    const handleLinkInput = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        setLinkInput(text);
    }

    const handleEditorView = (toToggle: 'edit' | 'preview') => {
        const { edit, preview } = editorView;

        if (
            (edit && preview)
            || toToggle === 'edit' && preview
            || toToggle === 'preview' && edit
        ) {
            setEditorView(prev => ({
                ...prev,
                [toToggle]: !prev[toToggle]
            }))
        }
    }

    const preview: EditorView = editorView.edit && editorView.preview 
        ? 'live' 
        : editorView.edit 
            ? 'edit' : 'preview';

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="w-full pb-2">
                <button 
                    className="global-btn flex flex-row gap-2 items-center px-10 py-2 shadow-lg"
                    onClick={() => router.back()}
                >
                    <MdOutlineArrowBackIosNew />
                    <p>Back To Lessons</p>
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <h1 className="font-montserrat font-bold text-3xl text-dark-blue">Create/Edit Lesson</h1>
                <button className="global-btn px-6 [&]:rounded-md">SAVE</button>
            </div>
            <InputFields />
            {/* Full Lesson Markdown Editor */}
            <Editor 
                preview={preview}
                handleEditorView={handleEditorView}
                value={fullDescription}
                setValue={setFullDescription}
            />
            <ExternalLinks 
                links={links}
                linkInput={linkInput}
                handleLinkInput={handleLinkInput}
                handleAddLink={handleAddLink}
                handleRemoveLink={handleRemoveLink}
            />     
        </div>
    )
}