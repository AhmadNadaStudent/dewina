import React from 'react';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, name: 'Identifikasi Subjek', description: 'Tentukan subjek utama' },
    { id: 2, name: 'Disiplin Ilmu', description: 'Pilih bidang ilmu dominan' },
    { id: 3, name: 'Pendekatan', description: 'Tentukan fokus khusus' },
    { id: 4, name: 'Bentuk Karya', description: 'Jenis karya tulis' },
    { id: 5, name: 'Wilayah Geografis', description: 'Lokasi jika relevan' },
    { id: 6, name: 'Hasil Klasifikasi', description: 'Nomor DDC final' }
];

export default function WizardSteps({ currentStep, completedSteps }) {
    return (
        <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-purple-200 to-indigo-200" />

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative flex items-start gap-4 pl-2">
                            <div className={cn(
                                "relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all duration-300",
                                isCompleted
                                    ? "bg-gradient-to-br from-violet-500 to-purple-600 border-violet-500 text-white shadow-lg shadow-violet-200"
                                    : isCurrent
                                        ? "bg-white border-violet-500 text-violet-600 shadow-lg shadow-violet-100"
                                        : "bg-white border-slate-200 text-slate-400"
                            )}>
                                {isCompleted ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <span className="text-sm font-semibold">{step.id}</span>
                                )}
                            </div>

                            <div className={cn(
                                "pt-1 transition-all duration-300",
                                isCurrent ? "opacity-100" : "opacity-60"
                            )}>
                                <p className={cn(
                                    "text-sm font-semibold",
                                    isCurrent ? "text-violet-700" : "text-slate-600"
                                )}>
                                    {step.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}