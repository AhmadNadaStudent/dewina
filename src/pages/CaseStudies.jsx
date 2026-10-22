import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { GraduationCap, BookOpen, Search, ChevronRight, Lightbulb, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import PageHeader from '../components/common/PageHeader';
import GradientCard from '../components/common/GradientCard';

// Sample case studies
const sampleCases = [
    {
        id: '1',
        title: 'Buku Panduan Ibadah Haji',
        book_example: 'Manasik Haji dan Umrah Lengkap',
        category: 'agama',
        difficulty_level: 'mudah',
        problem_description: 'Buku tentang tata cara ibadah haji. Apakah masuk ke 297 (Islam) atau 390 (Adat)?',
        analysis_steps: [
            'Identifikasi subjek: Tata cara ibadah haji',
            'Tentukan disiplin: Agama (bukan adat/budaya)',
            'Fokus pada aspek keagamaan Islam',
            'Haji adalah rukun Islam, masuk ibadah'
        ],
        correct_ddc: '297.352',
        explanation: 'Meskipun haji memiliki aspek budaya, fokus buku adalah praktik ibadah dalam Islam. 297 untuk Islam, .3 untuk praktik/ibadah, .52 untuk haji.',
        common_mistakes: ['Salah klasifikasi ke 390 (Adat)', 'Lupa subdivisi untuk haji']
    },
    {
        id: '2',
        title: 'Buku tentang Burung di Indonesia',
        book_example: 'Ensiklopedia Burung Indonesia',
        category: 'sains',
        difficulty_level: 'sedang',
        problem_description: 'Buku tentang berbagai jenis burung di Indonesia. Bisa masuk Zoologi, Geografi, atau lainnya.',
        analysis_steps: [
            'Identifikasi subjek: Burung sebagai makhluk hidup',
            'Tentukan pendekatan: Ilmiah (zoologi)',
            'Perhatikan fokus geografis: Indonesia',
            'Gunakan tabel wilayah jika perlu'
        ],
        correct_ddc: '598.09598',
        explanation: '598 untuk Aves (burung), 09 untuk perlakuan geografis, 598 untuk Indonesia. Fokus pada studi ilmiah burung, bukan sebagai hewan peliharaan atau berburu.',
        common_mistakes: ['Klasifikasi ke 636 (Peternakan)', 'Lupa notasi geografis']
    },
    {
        id: '3',
        title: 'Kecerdasan Buatan untuk Perpustakaan',
        book_example: 'Penerapan AI dalam Sistem Klasifikasi Perpustakaan',
        category: 'interdisipliner',
        difficulty_level: 'sulit',
        problem_description: 'Buku membahas AI tetapi untuk keperluan perpustakaan. Masuk ke Ilmu Komputer atau Ilmu Perpustakaan?',
        analysis_steps: [
            'Identifikasi dua subjek: AI dan Perpustakaan',
            'Tentukan fokus utama: Untuk perpustakaan',
            'Prinsip DDC: Discipline-first',
            'Tujuan akhir adalah layanan perpustakaan'
        ],
        correct_ddc: '025.04',
        explanation: 'Meski membahas AI, fokus buku adalah penerapannya di perpustakaan. DDC mengutamakan disiplin tujuan (perpustakaan) bukan alat (AI). 025 untuk operasional perpustakaan, .04 untuk teknologi informasi dalam perpustakaan.',
        common_mistakes: ['Salah klasifikasi ke 006.3 (AI)', 'Tidak memahami prinsip discipline-first']
    },
    {
        id: '4',
        title: 'Sejarah Ekonomi Indonesia',
        book_example: 'Perkembangan Ekonomi Indonesia 1945-2020',
        category: 'sejarah',
        difficulty_level: 'sedang',
        problem_description: 'Buku tentang sejarah ekonomi. Masuk ke kelas Ekonomi atau Sejarah?',
        analysis_steps: [
            'Identifikasi aspek: Sejarah dan Ekonomi',
            'Tentukan fokus: Perkembangan ekonomi sepanjang waktu',
            'Gunakan subdivisi standar untuk sejarah',
            'Tambahkan notasi wilayah Indonesia'
        ],
        correct_ddc: '330.9598',
        explanation: '330 untuk Ekonomi (bukan 900 Sejarah karena fokus pada aspek ekonomi), .09 untuk perlakuan historis, 598 untuk Indonesia.',
        common_mistakes: ['Klasifikasi ke 959.8 (Sejarah Indonesia)', 'Tidak menggunakan subdivisi standar']
    },
    {
        id: '5',
        title: 'Psikologi Pendidikan Anak',
        book_example: 'Memahami Psikologi Anak dalam Pembelajaran',
        category: 'interdisipliner',
        difficulty_level: 'sedang',
        problem_description: 'Gabungan antara Psikologi dan Pendidikan. Bagaimana menentukan kelas utama?',
        analysis_steps: [
            'Identifikasi dua disiplin: Psikologi dan Pendidikan',
            'Tentukan fokus: Aplikasi dalam pendidikan',
            'Periksa apakah ada nomor khusus di DDC',
            '370.15 khusus untuk psikologi pendidikan'
        ],
        correct_ddc: '370.15',
        explanation: 'DDC menyediakan nomor khusus 370.15 untuk psikologi pendidikan. Ini menunjukkan aplikasi psikologi dalam konteks pendidikan.',
        common_mistakes: ['Klasifikasi ke 155 (Psikologi diferensial)', 'Tidak mengetahui nomor khusus yang tersedia']
    }
];

const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'agama', label: 'Agama' },
    { value: 'teknologi', label: 'Teknologi' },
    { value: 'interdisipliner', label: 'Interdisipliner' },
    { value: 'sosial', label: 'Sosial' },
    { value: 'sains', label: 'Sains' },
    { value: 'seni', label: 'Seni' },
    { value: 'bahasa', label: 'Bahasa' },
    { value: 'sejarah', label: 'Sejarah' }
];

const difficultyColors = {
    mudah: 'bg-green-100 text-green-700',
    sedang: 'bg-amber-100 text-amber-700',
    sulit: 'bg-red-100 text-red-700'
};

export default function CaseStudies() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [categoryFilter, setCategoryFilter] = React.useState('all');
    const [expandedCase, setExpandedCase] = React.useState(null);

    const { data: dbCases = [] } = useQuery({
        queryKey: ['caseStudies'],
        queryFn: () => base44.entities.CaseStudy.list('-created_date', 50)
    });

    const allCases = [...sampleCases, ...dbCases];

    const filteredCases = allCases.filter(caseItem => {
        const matchesSearch = !searchQuery ||
            caseItem.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            caseItem.book_example?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || caseItem.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <PageHeader
                    title="Studi Kasus Klasifikasi"
                    subtitle="Pelajari dari contoh-contoh klasifikasi nyata untuk mengasah kemampuan"
                    icon={GraduationCap}
                />

                {/* Filters */}
                <GradientCard variant="glass" className="p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari studi kasus..."
                                className="pl-10 bg-white/80 border-slate-200"
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full md:w-48 bg-white/80">
                                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </GradientCard>

                {/* Cases List */}
                <div className="space-y-4">
                    {filteredCases.map((caseItem) => (
                        <GradientCard
                            key={caseItem.id}
                            variant="solid"
                            className="overflow-hidden"
                            hover={false}
                        >
                            {/* Header */}
                            <button
                                onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                                className="w-full p-6 text-left flex items-start gap-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex-shrink-0">
                                    <BookOpen className="w-6 h-6 text-violet-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <h3 className="font-semibold text-slate-800">{caseItem.title}</h3>
                                        <Badge className={cn("border-0 text-xs", difficultyColors[caseItem.difficulty_level])}>
                                            {caseItem.difficulty_level}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs capitalize">
                                            {caseItem.category}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">
                                        Contoh: <span className="italic">{caseItem.book_example}</span>
                                    </p>
                                    <p className="text-sm text-slate-500">{caseItem.problem_description}</p>
                                </div>
                                <ChevronRight className={cn(
                                    "w-5 h-5 text-slate-400 transition-transform flex-shrink-0",
                                    expandedCase === caseItem.id && "rotate-90"
                                )} />
                            </button>

                            {/* Expanded Content */}
                            {expandedCase === caseItem.id && (
                                <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6">
                                    {/* Analysis Steps */}
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5 text-amber-500" />
                                            Langkah Analisis
                                        </h4>
                                        <div className="space-y-2">
                                            {caseItem.analysis_steps?.map((step, index) => (
                                                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                                                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 flex-shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <p className="text-sm text-slate-700">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Correct Answer */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <h4 className="font-semibold text-green-800">Jawaban Benar</h4>
                                        </div>
                                        <div className="text-center mb-3">
                                            <span className="text-3xl font-bold text-green-700">{caseItem.correct_ddc}</span>
                                        </div>
                                        <p className="text-sm text-green-700">{caseItem.explanation}</p>
                                    </div>

                                    {/* Common Mistakes */}
                                    {caseItem.common_mistakes && caseItem.common_mistakes.length > 0 && (
                                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                                <h4 className="font-semibold text-red-800">Kesalahan Umum</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {caseItem.common_mistakes.map((mistake, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                                                        <span className="text-red-400">•</span>
                                                        {mistake}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </GradientCard>
                    ))}
                </div>

                {filteredCases.length === 0 && (
                    <GradientCard variant="glass" className="p-12 text-center">
                        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">Tidak ada studi kasus yang ditemukan</p>
                    </GradientCard>
                )}
            </div>
        </div>
    );
}