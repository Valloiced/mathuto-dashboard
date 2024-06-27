import { useRouter, usePathname } from "next/navigation";

import Frame from 'react-frame-component';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import 'react-device-frameset/styles/device-selector.min.css';

import { MdOutlineArrowBackIosNew, MdEdit } from "react-icons/md";

import ContentView from "./ContentView";

import type { ViewLessonProps } from '@/app/modules/[topic_id]/[lesson_id]/page';

export type LessonTabs = 'brief-summary' | 'full-description' | 'external-links';

export interface ContentViewProps {
    name?: string;
    lessonNo?: number;
    content?: {
        full: string,
        summary: string,
        links?: string[]
    };
}

export default function ViewLesson({ lesson }: ViewLessonProps) {
    const router = useRouter();
    const currentPage = usePathname();

    return (
        <div className='flex flex-col gap-8'>
            <div className="flex flex-row w-full pb-10 justify-between">
                <button 
                    className="global-btn flex flex-row gap-2 items-center px-10 py-2 shadow-lg"
                    onClick={() => router.back()}
                >
                    <MdOutlineArrowBackIosNew />
                    <p>Back To Lessons</p>
                </button>
                <button 
                    className='group global-btn flex flex-row gap-2 w-28 justify-center items-center font-montserrat font-bold [&]:text-tertiary-theme [&]:bg-white border-2 border-tertiary-theme hover:text-white hover:border-primary-theme'
                    onClick={() => router.replace(currentPage + '?type=edit')}
                >
                    <MdEdit className="text-lg text-tertiary-theme text-opacity-75 group-hover:text-white transition-colors duration-300" />
                    <p className='text-sm'>Edit</p>
                </button>
            </div>
            <div className="flex flex-row justify-between self-center">
                <h1 className="font-montserrat font-bold text-3xl text-dark-blue">Preview Lesson</h1>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <DeviceFrameset device="iPhone X">
                    <Frame
                        className='w-full min-h-[120vh] bg-tertiary-blue'
                        initialContent='<!DOCTYPE html><html class="bg-tertiary-blue mobile-scrollbar"><head><link href="/_next/static/css/app/layout.css" rel="stylesheet"><link href="/_next/static/css/41d710fb0559d038.css" rel="stylesheet"><link href="/_next/static/css/3af4576b8a847ea6.css" rel="stylesheet"><link href="/_next/static/css/34b0be53d932864d.css" rel="stylesheet"><link href="/_next/static/css/028fa15d8dd842b0.css" rel="stylesheet"><link href="/index.css" rel="stylesheet"></head><body><div></div></body</html>'
                    >
                        <ContentView 
                            name={lesson?.name}
                            lessonNo={lesson?.lessonNo}
                            content={lesson?.content}
                        />
                    </Frame>
                </DeviceFrameset>
            </div>
        </div>
    );
}
