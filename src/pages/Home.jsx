import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Wand2,
    FolderTree,
    History,
    GraduationCap,
    BookOpen,
    ArrowRight,
    Sparkles,
    Target,
    Brain,
    Shield
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

import GradientCard from '../components/common/GradientCard';

const features = [
    {
        icon: Wand2,
        title: 'Pemandu Klasifikasi',
        description: 'Panduan interaktif langkah demi langkah untuk menentukan nomor DDC yang tepat',
        color: 'from-violet-500 to-purple-600',
        link: 'Wizard',
        highlight: true
    },
    {
        icon: FolderTree,
        title: 'DDC Tree Explorer',
        description: 'Telusuri struktur hierarki lengkap DDC 000-900',
        color: 'from-blue-500 to-indigo-600',
        link: 'DDCExplorer'
    },
    {
        icon: History,
        title: 'Riwayat Klasifikasi',
        description: 'Log keputusan untuk konsistensi dan dokumentasi',
        color: 'from-emerald-500 to-teal-600',
        link: 'History'
    },
    {
        icon: GraduationCap,
        title: 'Studi Kasus',
        description: 'Pelajari dari contoh-contoh klasifikasi nyata',
        color: 'from-amber-500 to-orange-600',
        link: 'CaseStudies'
    }
];

const principles = [
    {
        icon: Target,
        title: 'Discipline-First',
        description: 'DDC mengklasifikasi berdasarkan disiplin ilmu, bukan subjek semata'
    },
    {
        icon: Brain,
        title: 'Analisis Subjek',
        description: 'Pahami esensi karya sebelum menentukan klasifikasi'
    },
    {
        icon: Shield,
        title: 'Konsistensi',
        description: 'Dokumentasi keputusan untuk standarisasi perpustakaan'
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-violet-300/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-1/3 right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 40, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Hero Section */}
            <div className="relative">
                <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-violet-200 mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4 text-violet-500" />
                            </motion.div>
                            <span className="text-sm font-medium text-violet-700">DEWey Intelligent Navigator Application</span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                DEWINA
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Proses klasifikasi Dewey Decimal Classification secara terstruktur dan terdokumentasi
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link to={createPageUrl('Wizard')}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-xl shadow-violet-200 px-8"
                                    >
                                        <Wand2 className="w-5 h-5 mr-2" />
                                        Mulai Klasifikasi
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link to={createPageUrl('DDCExplorer')}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-slate-300 hover:bg-slate-50"
                                    >
                                        <FolderTree className="w-5 h-5 mr-2" />
                                        Jelajahi DDC
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Features */}
            <div className="relative max-w-6xl mx-auto px-4 py-16">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                        Fitur Utama
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                        >
                            <Link to={createPageUrl(feature.link)}>
                                <GradientCard
                                    variant={feature.highlight ? "purple" : "glass"}
                                    className={cn(
                                        "p-6 h-full",
                                        feature.highlight && "ring-2 ring-violet-300"
                                    )}
                                    hover={false}
                                >
                                    <div className="flex items-start gap-4">
                                        <motion.div
                                            className={cn(
                                                "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
                                                feature.color
                                            )}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <feature.icon className="w-6 h-6" />
                                        </motion.div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                            <p className="text-sm text-slate-600">{feature.description}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-400" />
                                    </div>
                                </GradientCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Principles */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-16 overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Prinsip Klasifikasi DDC
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'rgba(255,255,255,0.15)'
                                }}
                            >
                                <motion.div
                                    className="p-3 bg-white/20 rounded-xl w-fit mb-4"
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <principle.icon className="w-6 h-6 text-white" />
                                </motion.div>
                                <h3 className="font-semibold text-white mb-2">{principle.title}</h3>
                                <p className="text-sm text-white/80">{principle.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="relative max-w-6xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <GradientCard variant="warm" className="p-8" hover={false}>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <motion.div
                                className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <BookOpen className="w-12 h-12 text-amber-600" />
                            </motion.div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    ⚠️  Penting untuk Dipahami
                                </h3>
                                <p className="text-slate-600">
                                    Website ini <strong>bukan menggantikan pustakawan</strong>, tetapi menstrukturkan
                                    alur berpikir klasifikasi agar lebih konsisten, logis, dan terdokumentasi.
                                    Keputusan akhir tetap ada pada profesional pustakawan.
                                </p>
                            </div>
                        </div>
                    </GradientCard>
                </motion.div>
            </div>
            {/* About & Creators CTA */}
            <div className="relative max-w-6xl mx-auto px-4 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl text-white shadow-md shadow-violet-200">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">
                                Inovasi Perpustakaan Digital Universitas Negeri Malang
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                                Pelajari konsep pengembangan serta kenali dosen pembimbing dan tim pencipta DEWINA.
                            </p>
                        </div>
                    </div>
                    <Link to={createPageUrl('About')} className="shrink-0">
                        <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-200 gap-2">
                            Kenali Tim Pencipta
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}