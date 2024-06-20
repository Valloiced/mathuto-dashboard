'use client'

import { useState, useEffect } from 'react';

import Header from "@/components/modules/Header";
import Modules from "@/components/modules/Modules";

import type { Modules as ModulesType } from '@/global/types';

export default function ModulesPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const [modules, setModules] = useState<ModulesType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/modules', { method: 'GET' });
                const data = await res.json();

                setModules(data.modules);
            } catch (error: any | unknown) {
                console.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <Header />
            <Modules
                loading={loading}
                modules={modules} 
            />
        </div>
    )
}