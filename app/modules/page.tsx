'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { confirmAlert as createModule } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import Header from "@/components/modules/Header";
import Modules from "@/components/modules/Modules";

import InputDialog from '@/components/dialog/InputDialog';

import type { Modules as ModulesType } from '@/global/types';

export default function ModulesPage() {
    const router = useRouter();
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
    }, []);

    const handleCreateModule = () => {
        const callback = async (moduleName: string) => {
            try {
                const res = await fetch('/api/modules', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ moduleName: moduleName })
                });

                const data = await res.json();

                if (res.ok && data.moduleId) {
                    router.push(`/modules/${data.moduleId}`);
                }
            } catch (error: any | unknown) {
                console.error("Submit error", error);
            }
        }

        createModule({
            customUI: ({ onClose }) => 
                <InputDialog 
                    onClose={onClose}
                    handler={callback}
                    title="Create Module"
                    description="Enter your new module name in the input below."
                />
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <Header handleCreateModule={handleCreateModule} />
            <Modules
                loading={loading}
                modules={modules}
            />
        </div>
    )
}