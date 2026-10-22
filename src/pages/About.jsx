import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Users,
    GraduationCap,
    BookMarked,
    Target,
    Brain,
    Shield,
    Library,
    ArrowRight,
    Award,
    Sparkles,
    CheckCircle2,
    Compass
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from '@/components/common/PageHeader';
import GradientCard from '@/components/common/GradientCard';

// Data Tim Pencipta & Pembimbing sesuai Buku Panduan DEWINA
const advisor = {
    name: "Dr. Sokhibul Ansor, S.Sos., M.Hum.",
    role: "Dosen Pembimbing & Pengarah",
    institution: "Universitas Negeri Malang",
    description: "Membimbing konseptualisasi klasifikasi, akurasi metodologi DDC, serta relevansi pedagogis bagi pustakawan.",
    avatarInitial: "SA",
    color: "from-amber-500 to-orange-600",
    bgBadge: "bg-amber-100 text-amber-800 border-amber-200"
};

const creators = [
    {
        name: "Novelia Eka Damayanti",
        role: "Tim Pengembang & Penulis",
        institution: "Universitas Negeri Malang",
        description: "Penyusunan alur analisis subjek, pedoman penggunaan, dan evaluasi struktur DDC.",
        avatarInitial: "ND",
        color: "from-pink-500 to-rose-600",
        badge: "Pencipta"
    },
    {
        name: "Ahmad Nada Fadilla Wildansyah",
        role: "Tim Pengembang & Penulis",
        institution: "Universitas Negeri Malang",
        description: "Pengembangan sistem interaktif, logika penelusuran hierarki, dan integrasi modul.",
        avatarInitial: "AW",
        color: "from-violet-500 to-purple-600",
        badge: "Pencipta"
    },
    {
        name: "Mohammad Affan Ghoffar",
        role: "Tim Pengembang & Penulis",
        institution: "Universitas Negeri Malang",
        description: "Perancangan basis data notasi DDC, studi kasus, serta pengujian konsistensi klasifikasi.",
        avatarInitial: "AG",
        color: "from-blue-500 to-indigo-600",
        badge: "Pencipta"
    },
    {
        name: "Rachmad Al Huda",
        role: "Tim Pengembang & Penulis",
        institution: "Universitas Negeri Malang",
        description: "Optimalisasi antarmuka pengguna, navigasi pemandu bertahap, dan dokumentasi sistem.",
        avatarInitial: "RH",
        color: "from-emerald-500 to-teal-600",
        badge: "Pencipta"
    }
];

const pillars = [
    {
        icon: Target,
        title: "Discipline-First Approach",
        desc: "DDC mengklasifikasikan bahan pustaka berdasarkan disiplin ilmu terlebih dahulu, memastikan subjek diletakkan pada konteks akademik yang tepat."
    },
    {
        icon: Brain,
        title: "Analisis Subjek Transparan",
        desc: "Membimbing pustakawan membedakan subjek utama, topik turunan, aspek bentuk penyajian (T1), hingga wilayah geografis (T2) secara berurutan."
    },
    {
        icon: Shield,
        title: "Konsistensi & Akuntabilitas",
        desc: "Setiap langkah keputusan terekam dalam riwayat, mempermudah evaluasi silang dan meminimalkan disparitas nomor klasifikasi pada koleksi serupa."
    }
];

export default function About() {
    return (
        <div className="min-h-screen pb-16">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <PageHeader
                    title="Tentang DEWINA"
                    subtitle="Dewey Intelligent Navigator — Panduan Klasifikasi DDC Terstruktur dan Edukatif"
                    icon={Users}
                />

                {/* Sekilas Produk & Latar Belakang */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2">
                        <GradientCard variant="purple" className="p-8 h-full" hover={false}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-violet-100 rounded-xl">
                                    <Library className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="text-violet-700 bg-violet-50 border-violet-200 mb-1">
                                        Perpustakaan Digital UM
                                    </Badge>
                                    <h2 className="text-2xl font-bold text-slate-800">Latar Belakang & Visi</h2>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                                <p>
                                    Klasifikasi bahan perpustakaan merupakan kegiatan penting dalam pengolahan informasi yang menuntut ketelitian tinggi, pemahaman subjek mendalam, serta penguasaan struktur hierarkis <strong>Dewey Decimal Classification (DDC)</strong>. Berdasarkan pengalaman selama kegiatan kepustakawanan dan magang, proses penentuan notasi sering kali menjadi tantangan nyata bagi mahasiswa maupun pustakawan pemula.
                                </p>
                                <p>
                                    <strong>DEWINA (Dewey Intelligent Navigator)</strong> hadir sebagai inovasi media pendukung pembelajaran (<em>learning tool</em>) sekaligus sistem pendukung keputusan (<em>decision support</em>). DEWINA menuntun pengguna secara bertahap — mulai dari identifikasi subjek, penentuan disiplin ilmu, penelusuran topik spesifik, bentuk karya, hingga wilayah geografis.
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                                <Link to={createPageUrl('Wizard')}>
                                    <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-200 gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Mulai Klasifikasi Sekarang
                                    </Button>
                                </Link>
                                <Link to={createPageUrl('DDCExplorer')}>
                                    <Button variant="outline" className="border-slate-300 gap-2">
                                        <Compass className="w-4 h-4" />
                                        Eksplorasi Pohon DDC
                                    </Button>
                                </Link>
                            </div>
                        </GradientCard>
                    </div>

                    <div>
                        <GradientCard variant="warm" className="p-8 h-full flex flex-col justify-between" hover={false}>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-6 h-6 text-amber-600" />
                                    <h3 className="text-lg font-bold text-slate-800">Tujuan Pengembangan</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Mendukung proses pembelajaran analisis subjek secara terstruktur.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Mempermudah penelusuran hierarki DDC dari kelas 000 hingga 900.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Meningkatkan ketepatan, konsistensi, dan akuntabilitas notasi.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Menyediakan basis studi kasus nyata dan dokumentasi riwayat.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6 p-4 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                                💡 <strong>Catatan:</strong> DEWINA dirancang sebagai penguat kemampuan pustakawan, di mana keputusan akhir tetap diverifikasi berdasarkan pedoman DDC resmi.
                            </div>
                        </GradientCard>
                    </div>
                </div>

                {/* 3 Prinsip Dasar */}
                <div className="mb-14">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">3 Prinsip Klasifikasi DEWINA</h2>
                        <p className="text-slate-500 mt-1">Landasan metodologis dalam setiap rekomendasi dan penelusuran notasi</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-3 bg-violet-50 rounded-xl w-fit mb-4 text-violet-600">
                                    <pillar.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-slate-800 text-lg mb-2">{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Dosen Pembimbing */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <GraduationCap className="w-6 h-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Dosen Pembimbing / Pengarah</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Avatar Placeholder */}
                            <div className="relative group shrink-0">
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-orange-100 ring-4 ring-orange-50">
                                    {advisor.avatarInitial}
                                </div>
                                <div className="absolute -bottom-2 -right-2 p-1.5 bg-amber-500 rounded-full text-white shadow">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-slate-800">{advisor.name}</h3>
                                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                        {advisor.role}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-3">{advisor.institution}</p>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                                    {advisor.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tim Pencipta */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-6 h-6 text-violet-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Tim Pencipta DEWINA</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {creators.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center group"
                            >
                                {/* Placeholder Foto */}
                                <div className="relative mb-4">
                                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl shadow-md group-hover:scale-105 transition-transform ring-4 ring-slate-50`}>
                                        {member.avatarInitial}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-1 bg-white rounded-full shadow">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                                            ✓
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-violet-700 transition-colors">
                                    {member.name}
                                </h3>
                                <Badge variant="secondary" className="bg-violet-50 text-violet-700 border-violet-100 text-xs mb-2">
                                    {member.role}
                                </Badge>
                                <p className="text-xs text-slate-500 mb-3">{member.institution}</p>
                                <p className="text-xs text-slate-600 leading-relaxed mt-auto border-t border-slate-100 pt-3 w-full">
                                    {member.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Notice */}
                <div className="mt-16 text-center border-t border-slate-200/80 pt-8">
                    <p className="text-sm text-slate-500">
                        © Perpustakaan Digital — Universitas Negeri Malang (UM)
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        Manual Book & Sistem DEWINA (Dewey Intelligent Navigator)
                    </p>
                </div>
            </div>
        </div>
    );
}
