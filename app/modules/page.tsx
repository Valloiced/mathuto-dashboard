'use client'

import Header from "@/components/modules/Header";
import Modules from "@/components/modules/Modules";

export default function ModulesPage() {
    return (
        <div className="flex flex-col gap-6">
            <Header />
            <Modules />
        </div>
    )
}