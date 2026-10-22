import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Globe, Check, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { GEOGRAPHIC_AREAS, INDONESIA_NOTATION } from '../ddc/DDCData';

export default function StepGeographic({ data, onUpdate, onNext, onPrev }) {
    const [expandedArea, setExpandedArea] = React.useState(null);
    const [showIndonesia, setShowIndonesia] = React.useState(false);

    const handleSelectArea = (code, name) => {
        onUpdate({
            geographicArea: code,
            geographicName: name
        });
    };

    const handleSkip = () => {
        onUpdate({
            geographicArea: '',
            geographicName: 'Tidak ada wilayah khusus'
        });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <Globe className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Wilayah Geografis</h2>
                    <p className="text-sm text-slate-500">Tambahkan notasi wilayah jika relevan</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-emerald-800">
                    <strong>Tabel 2 DDC:</strong> Notasi geografis ditambahkan untuk menunjukkan lokasi atau wilayah yang menjadi fokus karya.
                </p>
            </div>

            {/* Indonesia Special Section */}
            <div className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-white rounded-xl overflow-hidden">
                <button
                    onClick={() => setShowIndonesia(!showIndonesia)}
                    className="w-full flex items-center justify-between p-4"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🇮🇩</span>
                        <div className="text-left">
                            <p className="font-bold text-slate-800">Indonesia</p>
                            <p className="text-xs text-slate-500">Notasi: {INDONESIA_NOTATION.code}</p>
                        </div>
                    </div>
                    <ChevronRight className={cn(
                        "w-5 h-5 text-slate-400 transition-transform",
                        showIndonesia && "rotate-90"
                    )} />
                </button>

                {showIndonesia && (
                    <div className="border-t border-red-100 bg-red-50/50 p-3">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleSelectArea(INDONESIA_NOTATION.code, 'Indonesia')}
                                className={cn(
                                    "flex items-center gap-2 p-3 rounded-lg text-left transition-all",
                                    data.geographicArea === INDONESIA_NOTATION.code
                                        ? "bg-red-100 border-2 border-red-400"
                                        : "bg-white border border-slate-200 hover:border-red-300"
                                )}
                            >
                                {data.geographicArea === INDONESIA_NOTATION.code && (
                                    <Check className="w-4 h-4 text-red-600" />
                                )}
                                <span className="font-mono text-sm text-red-600 font-semibold">
                                    {INDONESIA_NOTATION.code}
                                </span>
                                <span className="text-sm">Indonesia (Umum)</span>
                            </button>
                            {Object.entries(INDONESIA_NOTATION.subdivisions).map(([code, name]) => (
                                <button
                                    key={code}
                                    onClick={() => handleSelectArea(code, name)}
                                    className={cn(
                                        "flex items-center gap-2 p-3 rounded-lg text-left transition-all",
                                        data.geographicArea === code
                                            ? "bg-red-100 border-2 border-red-400"
                                            : "bg-white border border-slate-200 hover:border-red-300"
                                    )}
                                >
                                    {data.geographicArea === code && (
                                        <Check className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className="font-mono text-sm text-red-600 font-semibold">{code}</span>
                                    <span className="text-sm">{name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Other Geographic Areas */}
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                {Object.entries(GEOGRAPHIC_AREAS).map(([code, area]) => (
                    <div key={code} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setExpandedArea(expandedArea === code ? null : code)}
                            className={cn(
                                "w-full flex items-center justify-between p-3 text-left transition-colors",
                                expandedArea === code ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-mono text-sm text-indigo-700 font-bold">
                                    {code}
                                </span>
                                <span className="font-medium text-slate-700 text-sm">{area.name}</span>
                            </div>
                            <ChevronRight className={cn(
                                "w-5 h-5 text-slate-400 transition-transform",
                                expandedArea === code && "rotate-90"
                            )} />
                        </button>

                        {expandedArea === code && area.subdivisions && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(area.subdivisions).map(([subCode, subName]) => (
                                        <button
                                            key={subCode}
                                            onClick={() => handleSelectArea(subCode, subName)}
                                            className={cn(
                                                "flex items-center gap-2 p-2 rounded-lg text-left transition-all text-sm",
                                                data.geographicArea === subCode
                                                    ? "bg-violet-100 border-2 border-violet-400"
                                                    : "bg-white border border-slate-200 hover:border-violet-300"
                                            )}
                                        >
                                            {data.geographicArea === subCode && (
                                                <Check className="w-3 h-3 text-violet-600" />
                                            )}
                                            <span className="font-mono text-xs text-violet-600 font-semibold">{subCode}</span>
                                            <span className="text-xs text-slate-700 truncate">{subName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {data.geographicArea && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                        Wilayah terpilih: <strong>{data.geographicArea} - {data.geographicName}</strong>
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
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-slate-600"
                    >
                        Lewati
                    </Button>
                    <Button
                        onClick={onNext}
                        disabled={!data.geographicArea}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 px-6"
                    >
                        Lanjutkan
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}