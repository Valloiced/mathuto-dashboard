import { useState, useRef } from 'react';
import Link from 'next/link';

import { FaLink } from "react-icons/fa6";

import type { ContentViewProps, LessonTabs } from ".";

export default function ContentView({ 
    name, 
    lessonNo, 
    content 
}: ContentViewProps) {
    const [currentTab, setCurrentTab] = useState<LessonTabs>('brief-summary');
    const lessonTabRef = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = lessonTabRef.current;
        if (container) {
            container.dataset.isDown = "true";
            container.dataset.startX = (e.pageX - container.offsetLeft).toString();
            container.dataset.scrollLeft = container.scrollLeft.toString();
        }
    };

    const onMouseLeave = () => {
        const container = lessonTabRef.current;
        if (container) {
            container.dataset.isDown = "false";
        }
    };

    const onMouseUp = () => {
        const container = lessonTabRef.current;
        if (container) {
            container.dataset.isDown = "false";
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = lessonTabRef.current;
        if (container && container.dataset.isDown === "true") {
            e.preventDefault();
            const startX = parseInt(container.dataset.startX || "0", 10);
            const scrollLeft = parseInt(container.dataset.scrollLeft || "0", 10);
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 3; 
            container.scrollLeft = scrollLeft - walk;
        }
    };
    
    const renderLinks = content?.links?.map((link) => (
        <div key={link} className='flex flex-row items-center'>
            <div className='text-md px-2 text-blue'>
                <FaLink />
            </div>
            <Link href={link} target='_blank'>
                <p className='font-poppins font-medium text-[0.7rem] break-all pl-2'>{link}</p>
            </Link>
        </div>
    ));

    return (
        <div className='flex flex-col bg-tertiary-blue min-h-screen gap-16 my-20'>
            <div className='px-4 flex flex-col gap-8 font-montserrat font-extrabold text-4xl text-dark-blue'>
                <h1>{lessonNo}</h1>
                <h1>{name}</h1>
            </div>
            <div className='flex flex-col gap-4'>
                <div 
                    className='flex flex-row gap-2 overflow-x-scroll px-4 no-scrollbar cursor-grab'
                    ref={lessonTabRef}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    draggable={false}
                >
                    <button 
                        className={`flex-shrink-0 px-4 py-2 text-sm font-montserrat rounded-full font-semibold ${currentTab === 'brief-summary' ? 'bg-blue text-white' : 'bg-white text-dark-blue border-[1px] border-dark-blue border-opacity-50'}`}
                        onClick={() => setCurrentTab('brief-summary')}
                    >
                        <h2>Brief Summary</h2>
                    </button>
                    <button 
                        className={`flex-shrink-0 px-4 py-2 text-sm font-montserrat rounded-full font-semibold ${currentTab === 'full-description' ? 'bg-blue text-white' : 'bg-white text-dark-blue border-[1px] border-dark-blue border-opacity-50'}`}
                        onClick={() => setCurrentTab('full-description')}
                    >
                        <h2>Full Description</h2>
                    </button>
                    <button 
                        className={`flex-shrink-0 px-4 py-2 text-sm font-montserrat rounded-full font-semibold ${currentTab === 'external-links' ? 'bg-blue text-white' : 'bg-white text-dark-blue border-[1px] border-dark-blue border-opacity-50'}`}
                        onClick={() => setCurrentTab('external-links')}
                    >
                        <h2>External Links</h2>
                    </button>
                </div>
                <div className='flex flex-col gap-4 mx-4 px-4 py-4 rounded-2xl bg-white'>
                    {currentTab === 'brief-summary' && (
                        <>
                            <h2 className='font-montserrat font-bold text-lg text-dark-blue'>Brief Summary</h2>
                            <p className='font-poppins font-medium text-sm break-words'>
                                {content?.summary}
                            </p>
                        </>
                    )}
                    {currentTab === 'full-description' && (
                        <>
                            <h2 className='font-montserrat font-bold text-lg text-dark-blue'>Full Description</h2>
                            <p className='font-poppins font-medium text-sm whitespace-pre-wrap break-words'>
                                {content?.full}
                            </p>
                        </>
                    )}
                    {currentTab === 'external-links' && (
                        <>
                            <h2 className='font-montserrat font-bold text-lg text-dark-blue'>External Links</h2>
                            {renderLinks}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}