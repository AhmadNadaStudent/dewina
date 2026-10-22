import React from 'react';
import { cn } from "@/lib/utils";

export default function GradientCard({
    children,
    className = "",
    variant = "default",
    hover = true
}) {
    const variants = {
        default: "bg-white/70 backdrop-blur-xl border border-white/20",
        glass: "bg-white/40 backdrop-blur-2xl border border-white/30",
        solid: "bg-gradient-to-br from-slate-50 to-white border border-slate-200/50",
        purple: "bg-gradient-to-br from-violet-50/80 to-purple-50/80 backdrop-blur-xl border border-violet-200/30",
        blue: "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl border border-blue-200/30",
        warm: "bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl border border-amber-200/30"
    };

    return (
        <div className={cn(
            "rounded-2xl shadow-lg shadow-slate-200/50",
            variants[variant],
            hover && "transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-1",
            className
        )}>
            {children}
        </div>
    );
}