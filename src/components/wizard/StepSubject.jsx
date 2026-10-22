import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import GradientCard from '../common/GradientCard';

export default function StepSubject({ data, onUpdate, onNext }) {
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const canProceed = data.bookTitle && data.subjectDescription;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <BookOpen className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Identifikasi Subjek Utama</h2>
                    <p className="text-sm text-slate-500">Langkah pertama dalam proses klasifikasi DDC</p>
                </div>
            </div>

            <GradientCard variant="glass" className="p-6">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="bookTitle" className="text-slate-700 font-medium">
                            Judul Buku <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="bookTitle"
                            value={data.bookTitle || ''}
                            onChange={(e) => onUpdate({ bookTitle: e.target.value })}
                            placeholder="Masukkan judul buku yang akan diklasifikasi..."
                            className="bg-white/80 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author" className="text-slate-700 font-medium">
                            Pengarang
                        </Label>
                        <Input
                            id="author"
                            value={data.author || ''}
                            onChange={(e) => onUpdate({ author: e.target.value })}
                            placeholder="Nama pengarang buku..."
                            className="bg-white/80 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subjectDescription" className="text-slate-700 font-medium">
                            Deskripsi Subjek / Isi Buku <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="subjectDescription"
                            value={data.subjectDescription || ''}
                            onChange={(e) => onUpdate({ subjectDescription: e.target.value })}
                            placeholder="Jelaskan secara singkat tentang apa buku ini membahas. Semakin detail, semakin akurat klasifikasinya..."
                            className="bg-white/80 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20 min-h-[120px]"
                        />
                        <p className="text-xs text-slate-400">
                            Tips: Sebutkan topik utama, pendekatan, dan tujuan buku
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="keywords" className="text-slate-700 font-medium">
                            Kata Kunci (Opsional)
                        </Label>
                        <Input
                            id="keywords"
                            value={data.keywords || ''}
                            onChange={(e) => onUpdate({ keywords: e.target.value })}
                            placeholder="Kata kunci yang relevan, pisahkan dengan koma..."
                            className="bg-white/80 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                        />
                    </div>
                </div>
            </GradientCard>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-amber-800">Panduan Analisis Subjek</p>
                        <ul className="text-xs text-amber-700 mt-2 space-y-1">
                            <li>• Identifikasi "tentang apa" buku ini secara esensial</li>
                            <li>• Perhatikan judul dan daftar isi untuk memahami fokus</li>
                            <li>• Jangan terkecoh oleh judul yang menyesatkan</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 px-6"
                >
                    Lanjutkan
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}