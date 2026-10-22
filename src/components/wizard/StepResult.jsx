import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, RotateCcw, Copy, CheckCircle, AlertCircle, Lightbulb, FileEdit } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import GradientCard from '../common/GradientCard';
import { toast } from "sonner";

export default function StepResult({ data, onUpdate, onPrev, onSave, onReset, isSaving }) {
    const [manualOverride, setManualOverride] = React.useState(false);
    const [overrideNumber, setOverrideNumber] = React.useState('');
    const [overrideReason, setOverrideReason] = React.useState('');
    const [copied, setCopied] = React.useState(false);

    // Calculate final DDC number
    const calculateDDC = () => {
        let ddc = data.section || '';

        // Add standard subdivision if applicable
        if (data.workFormNotation && data.workFormNotation !== '') {
            ddc += data.workFormNotation;
        }

        // Add geographic notation if applicable
        if (data.geographicArea && data.geographicArea !== '') {
            // For geographic, we typically add after removing the dash
            const geoCode = data.geographicArea.replace('-', '');
            if (data.workFormNotation === '-09' || !data.workFormNotation) {
                ddc += '09' + geoCode;
            }
        }

        return ddc;
    };

    const finalDDC = manualOverride ? overrideNumber : calculateDDC();

    const handleCopy = () => {
        navigator.clipboard.writeText(finalDDC);
        setCopied(true);
        toast.success('Nomor DDC disalin!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        onSave({
            ...data,
            finalDDC,
            manualOverride,
            overrideReason: manualOverride ? overrideReason : ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Hasil Klasifikasi</h2>
                    <p className="text-sm text-slate-500">Nomor DDC berdasarkan analisis Anda</p>
                </div>
            </div>

            {/* Final DDC Number */}
            <GradientCard variant="purple" className="p-6">
                <div className="text-center">
                    <p className="text-sm text-violet-600 font-medium mb-2">Nomor DDC</p>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            {finalDDC || '---'}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopy}
                            className="text-violet-500 hover:text-violet-700"
                        >
                            {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </GradientCard>

            {/* Justification Panel */}
            <GradientCard variant="glass" className="p-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Justifikasi Keputusan
                </h3>

                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">1</div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Subjek Utama</p>
                            <p className="text-sm text-slate-500">{data.subjectDescription?.substring(0, 100)}...</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">2</div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Disiplin Ilmu</p>
                            <p className="text-sm text-slate-500">{data.discipline} - {data.disciplineName}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">3</div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Pendekatan/Topik</p>
                            <p className="text-sm text-slate-500">{data.section} - {data.sectionName}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">4</div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Bentuk Karya</p>
                            <p className="text-sm text-slate-500">{data.workFormName} {data.workFormNotation && `(${data.workFormNotation})`}</p>
                        </div>
                    </div>

                    {data.geographicName && (
                        <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">5</div>
                            <div>
                                <p className="text-sm font-medium text-slate-700">Wilayah Geografis</p>
                                <p className="text-sm text-slate-500">{data.geographicArea} - {data.geographicName}</p>
                            </div>
                        </div>
                    )}
                </div>
            </GradientCard>

            {/* Manual Override */}
            <GradientCard variant="warm" className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <FileEdit className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-slate-800">Manual Override</h3>
                    </div>
                    <Switch
                        checked={manualOverride}
                        onCheckedChange={setManualOverride}
                    />
                </div>

                {manualOverride && (
                    <div className="space-y-4 pt-4 border-t border-amber-200/50">
                        <div className="flex items-start gap-2 p-3 bg-amber-100/50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                            <p className="text-xs text-amber-800">
                                Pustakawan profesional dapat memilih nomor berbeda berdasarkan pertimbangan khusus.
                                Wajib memberikan alasan untuk dokumentasi.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Nomor DDC Alternatif</Label>
                            <Input
                                value={overrideNumber}
                                onChange={(e) => setOverrideNumber(e.target.value)}
                                placeholder="Masukkan nomor DDC..."
                                className="bg-white/80"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Alasan Pemilihan</Label>
                            <Textarea
                                value={overrideReason}
                                onChange={(e) => setOverrideReason(e.target.value)}
                                placeholder="Jelaskan alasan memilih nomor ini..."
                                className="bg-white/80"
                            />
                        </div>
                    </div>
                )}
            </GradientCard>

            {/* Actions */}
            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    className="border-slate-200"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="border-slate-200"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Mulai Ulang
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || (manualOverride && (!overrideNumber || !overrideReason))}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-200 px-6"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Menyimpan...' : 'Simpan Klasifikasi'}
                    </Button>
                </div>
            </div>
        </div>
    );
}