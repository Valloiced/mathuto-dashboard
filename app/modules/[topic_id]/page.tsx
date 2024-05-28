"use client";

import { useState } from 'react';
import { useParams } from "next/navigation";

import Banner from "@/components/topic/Banner";
import Navigation from "@/components/topic/Navigation";
import Lessons from "@/components/topic/Lessons";

export type ActiveTab = 'lessons' | 'quizzes';

export default function Topic() {
    const params = useParams<{ topic_id: string }>();
    
    const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');

    const toggleTab = (tab: ActiveTab) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col">
            <Banner title={'Linear Algebra'} />
            <Navigation activeTab={activeTab} toggleTab={toggleTab} />
            <Lessons />
        </div>
    )
}