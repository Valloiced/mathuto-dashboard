'use client';

import { useState, useEffect } from 'react';

import useProfile from "@/hooks/useProfile";

import Welcome from "@/components/dashboard/Welcome";
import PreviewModules from "@/components/dashboard/PreviewModules";
import PreviewQuizzes from "@/components/dashboard/PreviewQuizzes";

import type { Modules, Quizzes } from '@/global/types';

interface DashboardProps {
    moduleCount: number,
    quizCount: number,
    modules: Modules[],
    quizzes: Quizzes[]
}

export default function Dashboard() {
    const userData = useProfile();

    const [loading, setLoading] = useState<boolean>(true);

    const [dashboardData, setDashboardData] = useState<DashboardProps>({
        moduleCount: 0,
        quizCount: 0,
        modules: [],
        quizzes: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/dashboard', { method: 'GET' });
                const data = await res.json();

                setDashboardData(data);
            } catch (error: any | unknown) {
                console.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const firstName = userData.username?.split(' ')[0];

    return (
        <section className="flex flex-col">
            <Welcome 
                firstName={firstName} 
                moduleCount={dashboardData.moduleCount} 
                quizCount={dashboardData.quizCount} 
            />
            <div className="flex flex-col my-12 gap-10">
                <PreviewModules
                    loading={loading}
                    modules={dashboardData.modules} 
                />
                <PreviewQuizzes 
                    loading={loading}
                    quizzes={dashboardData.quizzes} 
                />
            </div>
        </section>
    )
}