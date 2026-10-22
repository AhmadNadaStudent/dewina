import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { History as HistoryIcon, Search, Book, Calendar, Tag, CheckCircle, FileEdit, Trash2, Eye } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import PageHeader from '../components/common/PageHeader';
import GradientCard from '../components/common/GradientCard';

export default function History() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);
    const queryClient = useQueryClient();

    const { data: logs = [], isLoading } = useQuery({
        queryKey: ['classificationLogs'],
        queryFn: () => base44.entities.ClassificationLog.list('-created_date', 100)
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.ClassificationLog.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classificationLogs'] });
            toast.success('Log berhasil dihapus');
            setDeleteId(null);
        }
    });

    const filteredLogs = logs.filter(log => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            log.book_title?.toLowerCase().includes(query) ||
            log.selected_ddc?.toLowerCase().includes(query) ||
            log.discipline?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title="Riwayat Klasifikasi"
                    subtitle="Log keputusan klasifikasi untuk konsistensi dan dokumentasi"
                    icon={HistoryIcon}
                />

                {/* Search */}
                <GradientCard variant="glass" className="p-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari judul buku, nomor DDC, atau disiplin..."
                            className="pl-10 bg-white/80 border-slate-200"
                        />
                    </div>
                </GradientCard>

                {/* Logs List */}
                <GradientCard variant="solid" className="p-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-24" />
                            ))}
                        </div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="text-center py-12">
                            <HistoryIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500">Belum ada riwayat klasifikasi</p>
                            <p className="text-sm text-slate-400 mt-1">Gunakan wizard untuk mulai mengklasifikasi</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all bg-white"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Book className="w-5 h-5 text-violet-500 flex-shrink-0" />
                                                <h3 className="font-semibold text-slate-800 truncate">{log.book_title}</h3>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <Badge className="bg-violet-100 text-violet-700 border-0">
                                                    DDC: {log.selected_ddc}
                                                </Badge>
                                                {log.discipline && (
                                                    <Badge variant="outline" className="text-slate-600">
                                                        {log.discipline}
                                                    </Badge>
                                                )}
                                                {log.manual_override && (
                                                    <Badge className="bg-amber-100 text-amber-700 border-0">
                                                        <FileEdit className="w-3 h-3 mr-1" />
                                                        Override
                                                    </Badge>
                                                )}
                                                <Badge
                                                    className={cn(
                                                        "border-0",
                                                        log.status === 'completed'
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-slate-100 text-slate-600"
                                                    )}
                                                >
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    {log.status || 'draft'}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {log.created_date && format(new Date(log.created_date), 'dd MMM yyyy, HH:mm', { locale: id })}
                                                </span>
                                                {log.approach && (
                                                    <span className="flex items-center gap-1">
                                                        <Tag className="w-3 h-3" />
                                                        {log.approach}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSelectedLog(log)}
                                                className="text-violet-500 hover:text-violet-700 hover:bg-violet-50"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(log.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GradientCard>

                {/* Detail Dialog */}
                <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Book className="w-5 h-5 text-violet-500" />
                                Detail Klasifikasi
                            </DialogTitle>
                        </DialogHeader>

                        {selectedLog && (
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                                    <p className="text-sm text-violet-600 font-medium">Nomor DDC</p>
                                    <p className="text-4xl font-bold text-violet-700">{selectedLog.selected_ddc}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Judul</p>
                                        <p className="text-sm text-slate-800">{selectedLog.book_title}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Pengarang</p>
                                        <p className="text-sm text-slate-800">{selectedLog.author || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Disiplin</p>
                                        <p className="text-sm text-slate-800">{selectedLog.discipline || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Pendekatan</p>
                                        <p className="text-sm text-slate-800">{selectedLog.approach || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Bentuk Karya</p>
                                        <p className="text-sm text-slate-800">{selectedLog.work_form || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium">Wilayah</p>
                                        <p className="text-sm text-slate-800">{selectedLog.geographic_area || '-'}</p>
                                    </div>
                                </div>

                                {selectedLog.justification && (
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-medium mb-1">Justifikasi</p>
                                        <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                                            {selectedLog.justification}
                                        </p>
                                    </div>
                                )}

                                {selectedLog.manual_override && selectedLog.override_reason && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                        <p className="text-xs text-amber-600 uppercase font-medium mb-1">Alasan Override</p>
                                        <p className="text-sm text-amber-800">{selectedLog.override_reason}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation */}
                <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Log Klasifikasi?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Log akan dihapus secara permanen.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => deleteMutation.mutate(deleteId)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}