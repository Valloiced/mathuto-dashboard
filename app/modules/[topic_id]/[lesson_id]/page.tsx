'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import EditLesson from '@/components/lessons/EditLesson';
import ViewLesson from '@/components/lessons/ViewLesson';

import type { Lessons } from '@/global/types';

export interface EditLessonProps {
    canDelete: boolean,
    lesson: Lessons,
    handleSubmit: (form: any) => void,
    handleDelete: () => void

}

export interface ViewLessonProps {
    lesson: Lessons;
}

export default function Lesson() {
    const router = useRouter();
    const params = useParams<{ topic_id: string; lesson_id: string }>();

    const option = useSearchParams();
    const actionType = option.get('type');

    const [lessonData, setLessonData] = useState<Lessons | null>(null);

    // For editing only
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/modules/${params.topic_id}?lesson=${params.lesson_id}`);
                const data = await res.json();

                setLessonData(data.lessons || null);
            } catch (error) {
                console.error("Something went wrong", error);
            }
        }

        if (params.lesson_id !== 'create') {
            fetchData();
        } 
    }, [params]);

    const handleSubmit = async (form: any) => {
        try {
            const requestBody = { 
                ...form, 
                topic_id: params.topic_id, 
                lesson_id: params.lesson_id 
            };
            
            const promiseToast = toast.loading("Saving lesson data");
            const res = await fetch(`/api/modules/${params.topic_id}`, { 
                method: params.lesson_id === 'create' ? 'POST' : 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (res.ok) {
                toast.update(
                    promiseToast, 
                    { 
                        render: "Lesson saved",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                })
                router.replace(`/modules/${params.topic_id}`);
            } else {
                promiseToast && toast.update(
                    promiseToast, 
                    { 
                        render: "Lesson failed to save",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                })
            }
        } catch (error: any | unknown) {
            console.error("Server error", error);
        }
    }

    const handleDelete = async () => {
        try {
            const requestBody = { 
                topic_id: params.topic_id,
                lesson_id: params.lesson_id
            }

            const res = await fetch(`/api/modules/${params.topic_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
            });

            if (res.ok) {
                toast.success('Delete successfully', { 
                    closeOnClick: true, 
                    autoClose: 5000 
                })
                router.replace(`/modules/${params.topic_id}`)
            } else {
                toast.error('Data deletion failed', { 
                    closeOnClick: true, 
                    autoClose: 5000 
                })
            }
        } catch (error: any | unknown) {
            console.error("Submit error", error);
        }
    }

    return (
        <div>
            {actionType === 'edit' || params.lesson_id === 'create' 
                ? <EditLesson
                    canDelete={actionType === 'edit'}
                    lesson={lessonData as Lessons}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                /> 
                : <ViewLesson
                    lesson={lessonData as Lessons}
                />
            }
        </div>
    );
}
