"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";

import Banner from "@/components/topic/Banner";
import Navigation from "@/components/topic/Navigation";
import Lessons from "@/components/topic/Lessons";
import Quizzes from '@/components/topic/Quizzes';

import type { 
    Quizzes as QuizzesType, 
    Lessons as LessonsType, 
    Modules 
} from '@/global/types';

interface Module {
    details: Modules,
    lessons?: LessonsType[]
}

export type ActiveTab = 'lessons' | 'quizzes';

export default function Topic() {
    const router = useRouter();
    const params = useParams<{ topic_id: string }>();
    
    const [loading, setLoading] = useState<boolean>(true);

    const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
    const [moduleData, setModuleData] = useState<Module>({
        details: {},
        lessons: []
    });

    const [quizzes, setQuizzes] = useState<QuizzesType[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/modules/${params.topic_id}`, { method: 'GET' });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }

                const { quizzes, ...moduleRelated } = data;
                setModuleData(moduleRelated);
                setQuizzes(quizzes);
            } catch (error: any | unknown) {
                console.error(error);

                router.replace('/dashboard');
            } finally {
                setLoading(false);
            }
        }

        if (params.topic_id) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const toggleTab = (tab: ActiveTab) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col">
            <Banner 
                title={moduleData?.details?.name || ""} 
            />
            <Navigation activeTab={activeTab} toggleTab={toggleTab} />

            {activeTab === 'lessons' ? (
                <Lessons
                    loading={loading}
                    topicId={moduleData?.details?.id || ""}
                    title={moduleData?.details?.name || ""}
                    numOfLessons={moduleData?.details?.noOfItems || 0}
                    lessons={moduleData?.lessons || []}
                />
            ) : (
                <Quizzes
                    loading={loading}
                    moduleId={params.topic_id}
                    quizzes={quizzes || []}
                />
            )}
        </div>
    )
}