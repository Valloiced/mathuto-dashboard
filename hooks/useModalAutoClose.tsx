import { 
  useState, 
  useEffect, 
  useRef, 
  Dispatch, 
  SetStateAction, 
  MutableRefObject 
} from "react";

export default function useModalAutoClose(defaultValue: boolean): [boolean, Dispatch<SetStateAction<boolean>>, MutableRefObject<HTMLElement | null>] {
    const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

    // REQUIRED
    // If not given, auto-closing would not work
    const modalRef = useRef<HTMLElement | null>(null); 

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    
    return [isOpen, setIsOpen, modalRef];
}
