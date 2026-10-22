import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileText, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { STANDARD_SUBDIVISIONS } from '../ddc/DDCData';

const workForms = [
    { id: 'umum', name: 'Umum', description: 'Pembahasan umum tanpa bentuk khusus', notation: '', icon: '📚' },
    { id: 'teori', name: 'Teori', description: 'Aspek filosofis dan teoretis', notation: '-01', icon: '💡' },
    { id: 'praktik', name: 'Praktik/Panduan', description: 'Buku panduan, teknik, cara praktis', notation: '-02', icon: '🔧' },
    { id: 'kamus', name: 'Kamus/Ensiklopedia', description: 'Karya referensi', notation: '-03', icon: '📖' },
    { id: 'pendidikan', name: 'Pendidikan', description: 'Studi dan pengajaran', notation: '-07', icon: '🎓' },
    { id: 'sejarah', name: 'Sejarah', description: 'Perlakuan historis', notation: '-09', icon: '🏛️' }
];

export default function StepWorkForm({ data, onUpdate, onNext, onPrev }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <FileText className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Bentuk Karya</h2>
                    <p className="text-sm text-slate-500">Pilih jenis atau format penyajian buku</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-cyan-800">
                    <strong>Subdivisi Standar:</strong> Notasi ini ditambahkan setelah nomor kelas untuk menunjukkan bentuk penyajian karya.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workForms.map((form) => (
                    <button
                        key={form.id}
                        onClick={() => onUpdate({
                            workForm: form.id,
                            workFormName: form.name,
                            workFormNotation: form.notation
                        })}
                        className={cn(
                            "relative text-left p-4 rounded-xl border-2 transition-all duration-300",
                            data.workForm === form.id
                                ? "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg shadow-violet-100"
                                : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-md"
                        )}
                    >
                        {data.workForm === form.id && (
                            <div className="absolute top-3 right-3 p-1 bg-violet-500 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">{form.icon}</div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-slate-800">{form.name}</p>
                                    {form.notation && (
                                        <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-mono rounded">
                                            {form.notation}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{form.description}</p>
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
                    disabled={!data.workForm}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 px-6"
                >
                    Lanjutkan
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}