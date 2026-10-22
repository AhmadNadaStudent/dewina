import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Home,
    Wand2,
    FolderTree,
    History,
    GraduationCap,
    Menu,
    X,
    BookMarked,
    Users
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Pemandu', icon: Wand2, page: 'Wizard' },
    { name: 'DDC Explorer', icon: FolderTree, page: 'DDCExplorer' },
    { name: 'Riwayat', icon: History, page: 'History' },
    { name: 'Studi Kasus', icon: GraduationCap, page: 'CaseStudies' },
    { name: 'Tentang', icon: Users, page: 'About' }
];

export default function Layout({ children, currentPageName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30">
            <Toaster position="top-center" richColors />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
                            <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-200 group-hover:scale-105 transition-transform">
                                <BookMarked className="w-5 h-5 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent text-xl tracking-tight">DEWINA</span>
                                <span className="block text-[10px] text-slate-400 font-medium -mt-1">Dewey Intelligent Navigator</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link key={item.page} to={createPageUrl(item.page)}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "gap-2 text-sm font-medium transition-colors",
                                            currentPageName === item.page
                                                ? "bg-violet-100 text-violet-700 font-semibold"
                                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <nav className="flex flex-col p-4 gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.page}
                                    to={createPageUrl(item.page)}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3",
                                            currentPageName === item.page
                                                ? "bg-violet-100 text-violet-700 font-semibold"
                                                : "text-slate-600"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Global Footer */}
            <footer className="border-t border-slate-200/70 bg-white/60 backdrop-blur-md py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="p-1 bg-violet-600 rounded-lg text-white">
                            <BookMarked className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-slate-700">DEWINA</span>
                        <span>• Dewey Intelligent Navigator</span>
                    </div>
                    <div>
                        Perpustakaan Digital — Universitas Negeri Malang (UM)
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={createPageUrl('Home')} className="hover:text-violet-600 transition-colors">Home</Link>
                        <Link to={createPageUrl('Wizard')} className="hover:text-violet-600 transition-colors">Pemandu</Link>
                        <Link to={createPageUrl('DDCExplorer')} className="hover:text-violet-600 transition-colors">DDC Explorer</Link>
                        <Link to={createPageUrl('About')} className="hover:text-violet-600 transition-colors">Tentang Tim</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
