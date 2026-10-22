import React from 'react';

export default function PageHeader({ title, subtitle, icon: Icon }) {
    return (
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative flex items-center gap-4">
                    {Icon && (
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Icon className="w-8 h-8" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        {subtitle && (
                            <p className="text-white/80 mt-2 text-lg">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}