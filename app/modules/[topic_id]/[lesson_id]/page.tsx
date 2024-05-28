'use client';

import { useParams, useSearchParams } from "next/navigation";

import EditLesson from "@/components/lessons/EditLesson";

export default function Lesson() {
    const params = useParams<{ topic_id:string, lesson_id: string }>();
    const option = useSearchParams();
    
    return (
        <div>
            <EditLesson />
        </div>
    )
}