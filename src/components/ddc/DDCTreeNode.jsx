import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function DDCTreeNode({ code, name, sections, color, level = 0, onSelect }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSections = sections && Object.keys(sections).length > 0;

    const handleToggle = () => {
        if (hasSections) {
            setIsExpanded(!isExpanded);
        }
    };

    const handleSelect = (selectedCode, selectedName) => {
        if (onSelect) {
            onSelect(selectedCode, selectedName);
        }
    };

    return (
        <div className="select-none">
            <div
                onClick={handleToggle}
                className={cn(
                    "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200",
                    "hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50",
                    level === 0 && "bg-gradient-to-r from-slate-50 to-white mb-1"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {hasSections ? (
                    <>
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-violet-500" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                        {isExpanded ? (
                            <FolderOpen className="w-4 h-4 text-violet-500" />
                        ) : (
                            <Folder className="w-4 h-4 text-slate-400" />
                        )}
                    </>
                ) : (
                    <>
                        <span className="w-4" />
                        <FileText className="w-4 h-4 text-slate-400" />
                    </>
                )}

                <span className={cn(
                    "font-mono text-sm font-semibold",
                    level === 0 ? color?.replace('from-', 'text-').split(' ')[0] : "text-violet-600"
                )}>
                    {code}
                </span>

                <span className={cn(
                    "text-sm truncate",
                    level === 0 ? "font-medium text-slate-700" : "text-slate-600"
                )}>
                    {name}
                </span>
            </div>

            {isExpanded && hasSections && (
                <div className="border-l-2 border-violet-100 ml-6">
                    {Object.entries(sections).map(([secCode, secName]) => (
                        <div
                            key={secCode}
                            onClick={() => handleSelect(secCode, secName)}
                            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-violet-50 ml-4"
                        >
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span className="font-mono text-sm text-violet-600 font-semibold">{secCode}</span>
                            <span className="text-sm text-slate-600 truncate">{secName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}