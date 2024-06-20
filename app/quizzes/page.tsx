'use client'

import { useState, useEffect } from 'react';

import Header from "@/components/quizzes/Header";
import Quizzes from "@/components/quizzes/Quizzes";

import type { Modules, Quizzes as QuizzesType } from '@/global/types';

// Modified Quizzes Type
export interface QuizzesWithTopics extends Omit<QuizzesType, 'details'> {
    details: QuizzesType['details'] & {
        topics: Modules[]; // Adding the new property
    };
}
export default function QuizzesPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const [quizzes, setQuizzes] = useState<QuizzesWithTopics[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/quizzes', { method: 'GET' });
                const data = await res.json();

                // Change var
                setQuizzes(data.quizzes);
            } catch (error: any | unknown) {
                console.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    
    return (
        <div className="flex flex-col gap-6">
            <Header />
            <Quizzes
                loading={loading}
                quizzes={quizzes} 
            />
        </div>
    )
}