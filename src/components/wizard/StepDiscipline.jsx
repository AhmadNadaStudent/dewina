import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, GraduationCap, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DDC_TREE } from '../ddc/DDCData';
import GradientCard from '../common/GradientCard';

const disciplines = Object.entries(DDC_TREE).map(([code, data]) => ({
    code,
    name: data.name,
    color: data.color,
    examples: Object.values(data.divisions).slice(0, 3).map(d => d.name).join(', ')
}));

export default function StepDiscipline({ data, onUpdate, onNext, onPrev }) {
    const selectedDiscipline = data.discipline;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Tentukan Disiplin Ilmu</h2>
                    <p className="text-sm text-slate-500">Pilih kelas utama DDC yang paling sesuai</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                    <strong>Prinsip DDC:</strong> Klasifikasi berdasarkan <em>disiplin ilmu</em>, bukan subjek semata.
                    Buku tentang "burung" bisa masuk Biologi (590), Seni (700), atau Olahraga (799) tergantung pendekatannya.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {disciplines.map((disc) => (
                    <button
                        key={disc.code}
                        onClick={() => onUpdate({ discipline: disc.code, disciplineName: disc.name })}
                        className={cn(
                            "relative text-left p-4 rounded-xl border-2 transition-all duration-300",
                            selectedDiscipline === disc.code
                                ? "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg shadow-violet-100"
                                : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-md"
                        )}
                    >
                        {selectedDiscipline === disc.code && (
                            <div className="absolute top-3 right-3 p-1 bg-violet-500 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <div className={cn(
                                "flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg",
                                disc.color
                            )}>
                                {disc.code}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-800 text-sm leading-tight">
                                    {disc.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                    {disc.examples}...
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    className="border-slate-200"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!selectedDiscipline}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 px-6"
                >
                    Lanjutkan
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}