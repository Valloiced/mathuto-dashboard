import { 
    ChangeEvent, 
    Dispatch, 
    FormEvent, 
    SetStateAction, 
    useState,
    useEffect
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import useRouteInterceptor from "@/hooks/useRouteInterceptor";

import { MdOutlineArrowBackIosNew  } from "react-icons/md";

import { EditLessonProps } from "@/app/modules/[topic_id]/[lesson_id]/page";

import InputFields from "./InputFields";
import ExternalLinks from "./ExternalLinks";
import Editor from "./Editor";

import SaveDialog from "@/components/dialog/SaveDialog";
import DeleteDialog from "@/components/dialog/DeleteDialog";

export type EditorView = 'live' | 'edit' | 'preview';

export interface PrimaryInfo {
    title: string,
    summary: string,
    subtopic?: string
}

export interface InputFieldsProps {
    primaryInfo: PrimaryInfo,
    handleBasicInput: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface ExternalLinksProps {
    links: string[],
    linkInput: string, 
    handleLinkInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleAddLink: (e: FormEvent<HTMLFormElement>) => void,
    handleRemoveLink: (linkToRemove: string) => void
}

export interface EditorProps {
    preview: EditorView,
    handleEditorView: (toToggle: 'edit' | 'preview') => void,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

export default function EditLesson({ 
    canDelete, 
    lesson, 
    handleSubmit,
    handleDelete
} : EditLessonProps) {
    const router = useRouter();

    const [editorView, setEditorView] = useState({
        edit: true,
        preview: true
    });

    const [primaryInfo, setPrimaryInfo] = useState<PrimaryInfo>({
        title: lesson?.name || '',
        summary: lesson?.content?.summary || '',
        subtopic: lesson?.subtopic || ''
    });

    const [fullDescription, setFullDescription] = useState<string>(
        lesson?.content?.full || '**Edit your lessons here**'
    );
    
    const [links, setLinks] = useState<string[]>(lesson?.content?.links || []);
    const [linkInput, setLinkInput] = useState<string>('');

    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    useRouteInterceptor(isUpdated);

    // Sync lesson updates with EditLesson states
    useEffect(() => {
        setPrimaryInfo({
            title: lesson?.name || '',
            summary: lesson?.content?.summary || '',
            subtopic: lesson?.subtopic || ''
        });
        setFullDescription(lesson?.content?.full || '**Edit your lessons here**');
        setLinks(lesson?.content?.links || []);
    }, [lesson]);

    // Check if there is any changes in the form
    useEffect(() => {
        const compareSubtopic = primaryInfo.subtopic !== lesson?.subtopic;
        const compareTitle = primaryInfo.title !== lesson?.name;
        const compareLinks = links !== lesson?.content.links;
        const compareDesc =  fullDescription !== lesson?.content.full;
        const compareSummary = primaryInfo.summary !== lesson?.content.summary;

        const isUpdated = 
            compareSubtopic 
            || compareTitle 
            || compareLinks 
            || compareDesc 
            || compareSummary;

        setIsUpdated(isUpdated);
    }, [primaryInfo, [...links], fullDescription]);

    const handleBasicInput = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { name, value } = e.target;

        setPrimaryInfo(prevInfo => ({ ...prevInfo, [name]: value })); 
    }

    const handleAddLink = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isLinkExist = links.indexOf(linkInput);
        if (linkInput !== '' && isLinkExist === -1 && linkInput.startsWith('https://')) {
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

    const handleSaveData = () => {
        if (primaryInfo.title === '' || primaryInfo.summary === '') {
            toast.warn("Please fill in the required fields", { 
                autoClose: 5000, 
                closeOnClick: true 
            });
            return;
        }

        const form = {
            name: primaryInfo.title,
            subtopic: primaryInfo.subtopic,
            content: {
                full: fullDescription,
                summary: primaryInfo.summary,
                links: links
            }
        };
        
        setIsUpdated(false); // Prevent confirm dialogue to allow redirects
        confirmAlert({
            customUI: ({ onClose }) => 
            <SaveDialog 
                onClose={onClose} 
                handler={() => handleSubmit(form)}
            />
        });
    }

    const handleDeleteData = () => {
        confirmAlert({
            customUI: ({ onClose }) => 
            <DeleteDialog 
                onClose={onClose} 
                handler={() => handleDelete()}
            />
        });
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
                <div className="flex gap-4 w-48">
                    <button 
                        className="global-btn w-full [&]:rounded-md"
                        onClick={handleSaveData}
                        disabled={!isUpdated}
                    >
                        SAVE
                    </button>
                    {canDelete && (
                        <button 
                            className="global-btn [&]:bg-red [&]:hover:bg-light-red w-full [&]:rounded-md"
                            onClick={handleDeleteData}
                        >
                            DELETE
                        </button>
                    )}
                </div>
            </div>
            <InputFields 
                primaryInfo={primaryInfo}
                handleBasicInput={handleBasicInput}
            />
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