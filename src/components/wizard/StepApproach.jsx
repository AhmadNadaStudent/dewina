import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Focus, Check, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DDC_TREE } from '../ddc/DDCData';

export default function StepApproach({ data, onUpdate, onNext, onPrev }) {
    const discipline = DDC_TREE[data.discipline];
    const divisions = discipline?.divisions || {};

    const [expandedDivision, setExpandedDivision] = React.useState(null);

    const handleSelectSection = (divCode, secCode, secName) => {
        onUpdate({
            division: divCode,
            section: secCode,
            sectionName: secName
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <Focus className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Tentukan Pendekatan/Topik</h2>
                    <p className="text-sm text-slate-500">Pilih divisi dan seksi yang paling spesifik</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/50 rounded-xl p-4">
                <p className="text-sm text-violet-800">
                    Kelas terpilih: <strong>{data.discipline} - {data.disciplineName}</strong>
                </p>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(divisions).map(([divCode, divData]) => (
                    <div key={divCode} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setExpandedDivision(expandedDivision === divCode ? null : divCode)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 text-left transition-colors",
                                expandedDivision === divCode
                                    ? "bg-gradient-to-r from-slate-50 to-slate-100"
                                    : "bg-white hover:bg-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm",
                                    discipline.color.replace('from-', 'bg-').split(' ')[0],
                                    "text-white"
                                )}>
                                    {divCode}
                                </span>
                                <span className="font-medium text-slate-700">{divData.name}</span>
                            </div>
                            <ChevronRight className={cn(
                                "w-5 h-5 text-slate-400 transition-transform",
                                expandedDivision === divCode && "rotate-90"
                            )} />
                        </button>

                        {expandedDivision === divCode && divData.sections && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-3">
                                <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(divData.sections).map(([secCode, secName]) => (
                                        <button
                                            key={secCode}
                                            onClick={() => handleSelectSection(divCode, secCode, secName)}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                                                data.section === secCode
                                                    ? "bg-violet-100 border-2 border-violet-400"
                                                    : "bg-white border border-slate-200 hover:border-violet-300"
                                            )}
                                        >
                                            {data.section === secCode && (
                                                <Check className="w-4 h-4 text-violet-600 flex-shrink-0" />
                                            )}
                                            <span className="font-mono text-sm text-violet-600 font-semibold">
                                                {secCode}
                                            </span>
                                            <span className="text-sm text-slate-700">{secName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {data.section && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                        Seksi terpilih: <strong>{data.section} - {data.sectionName}</strong>
                    </p>
                </div>
            )}

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
                    disabled={!data.section}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 px-6"
                >
                    Lanjutkan
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}