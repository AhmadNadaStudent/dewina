import React from 'react';
import { Search, FolderTree, Info, ChevronRight, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import PageHeader from '../components/common/PageHeader';
import GradientCard from '../components/common/GradientCard';
import { DDC_TREE, STANDARD_SUBDIVISIONS } from '../components/ddc/DDCData';

export default function DDCExplorer() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [expandedClasses, setExpandedClasses] = React.useState({});
    const [expandedDivisions, setExpandedDivisions] = React.useState({});
    const [selectedItem, setSelectedItem] = React.useState(null);

    const toggleClass = (code) => {
        setExpandedClasses(prev => ({ ...prev, [code]: !prev[code] }));
    };

    const toggleDivision = (code) => {
        setExpandedDivisions(prev => ({ ...prev, [code]: !prev[code] }));
    };

    const handleSelect = (code, name, type, parent) => {
        setSelectedItem({ code, name, type, parent });
    };

    const filteredTree = Object.entries(DDC_TREE).filter(([code, data]) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        if (code.includes(query) || data.name.toLowerCase().includes(query)) return true;

        // Search in divisions
        for (const [divCode, divData] of Object.entries(data.divisions)) {
            if (divCode.includes(query) || divData.name.toLowerCase().includes(query)) return true;
            // Search in sections
            if (divData.sections) {
                for (const [secCode, secName] of Object.entries(divData.sections)) {
                    if (secCode.includes(query) || secName.toLowerCase().includes(query)) return true;
                }
            }
        }
        return false;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="DDC Tree Explorer"
                    subtitle="Telusuri struktur hierarki Dewey Decimal Classification 000-900"
                    icon={FolderTree}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Tree */}
                    <div className="lg:col-span-2">
                        {/* Search */}
                        <GradientCard variant="glass" className="p-4 mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari kelas, divisi, atau seksi DDC..."
                                    className="pl-10 bg-white/80 border-slate-200"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </GradientCard>

                        {/* Tree View */}
                        <GradientCard variant="solid" className="p-6">
                            <div className="space-y-2">
                                {filteredTree.map(([classCode, classData]) => (
                                    <div key={classCode} className="border border-slate-200 rounded-xl overflow-hidden">
                                        {/* Main Class */}
                                        <button
                                            onClick={() => {
                                                toggleClass(classCode);
                                                handleSelect(classCode, classData.name, 'class', null);
                                            }}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-4 transition-colors",
                                                "hover:bg-gradient-to-r hover:from-slate-50 hover:to-white",
                                                expandedClasses[classCode] && "bg-gradient-to-r from-slate-50 to-white"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg",
                                                classData.color
                                            )}>
                                                {classCode}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-slate-800">{classData.name}</p>
                                                <p className="text-xs text-slate-500">
                                                    {Object.keys(classData.divisions).length} divisi
                                                </p>
                                            </div>
                                            <ChevronRight className={cn(
                                                "w-5 h-5 text-slate-400 transition-transform",
                                                expandedClasses[classCode] && "rotate-90"
                                            )} />
                                        </button>

                                        {/* Divisions */}
                                        {expandedClasses[classCode] && (
                                            <div className="border-t border-slate-100 bg-slate-50/50">
                                                {Object.entries(classData.divisions).map(([divCode, divData]) => (
                                                    <div key={divCode}>
                                                        <button
                                                            onClick={() => {
                                                                toggleDivision(divCode);
                                                                handleSelect(divCode, divData.name, 'division', classData.name);
                                                            }}
                                                            className="w-full flex items-center gap-3 p-3 pl-8 hover:bg-white transition-colors"
                                                        >
                                                            <div className={cn(
                                                                "w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold",
                                                                classData.color.replace('from-', 'bg-').split(' ')[0],
                                                                "text-white"
                                                            )}>
                                                                {divCode}
                                                            </div>
                                                            <div className="flex-1 text-left">
                                                                <p className="text-sm font-medium text-slate-700">{divData.name}</p>
                                                                {divData.sections && (
                                                                    <p className="text-xs text-slate-500">
                                                                        {Object.keys(divData.sections).length} seksi
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {divData.sections && Object.keys(divData.sections).length > 0 && (
                                                                <ChevronRight className={cn(
                                                                    "w-4 h-4 text-slate-400 transition-transform",
                                                                    expandedDivisions[divCode] && "rotate-90"
                                                                )} />
                                                            )}
                                                        </button>

                                                        {/* Sections */}
                                                        {expandedDivisions[divCode] && divData.sections && (
                                                            <div className="bg-white border-t border-slate-100">
                                                                {Object.entries(divData.sections).map(([secCode, secName]) => (
                                                                    <button
                                                                        key={secCode}
                                                                        onClick={() => handleSelect(secCode, secName, 'section', divData.name)}
                                                                        className="w-full flex items-center gap-3 p-2 pl-16 hover:bg-violet-50 transition-colors"
                                                                    >
                                                                        <span className="font-mono text-sm text-violet-600 font-semibold w-10">
                                                                            {secCode}
                                                                        </span>
                                                                        <span className="text-sm text-slate-600 text-left">{secName}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </GradientCard>
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-6">
                            {/* Selected Item Info */}
                            {selectedItem ? (
                                <GradientCard variant="purple" className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Info className="w-5 h-5 text-violet-600" />
                                        <h3 className="font-semibold text-slate-800">Detail</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-violet-600 font-medium uppercase">Kode</p>
                                            <p className="text-3xl font-bold text-violet-700">{selectedItem.code}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-violet-600 font-medium uppercase">Nama</p>
                                            <p className="text-lg font-medium text-slate-800">{selectedItem.name}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-violet-600 font-medium uppercase">Jenis</p>
                                            <p className="text-sm text-slate-600 capitalize">{selectedItem.type}</p>
                                        </div>

                                        {selectedItem.parent && (
                                            <div>
                                                <p className="text-xs text-violet-600 font-medium uppercase">Parent</p>
                                                <p className="text-sm text-slate-600">{selectedItem.parent}</p>
                                            </div>
                                        )}
                                    </div>
                                </GradientCard>
                            ) : (
                                <GradientCard variant="glass" className="p-6">
                                    <div className="text-center py-8">
                                        <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-sm text-slate-500">
                                            Pilih item untuk melihat detail
                                        </p>
                                    </div>
                                </GradientCard>
                            )}

                            {/* Standard Subdivisions */}
                            <GradientCard variant="warm" className="p-6">
                                <h3 className="font-semibold text-slate-800 mb-4">Subdivisi Standar</h3>
                                <div className="space-y-2">
                                    {Object.entries(STANDARD_SUBDIVISIONS).map(([code, data]) => (
                                        <div key={code} className="p-2 bg-white/60 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs text-amber-700 font-semibold">{code}</span>
                                                <span className="text-sm text-slate-700">{data.name}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">{data.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </GradientCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}