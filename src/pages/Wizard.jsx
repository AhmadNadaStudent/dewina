import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

import PageHeader from '../components/common/PageHeader';
import GradientCard from '../components/common/GradientCard';
import WizardSteps from '../components/wizard/WizardSteps';
import StepSubject from '../components/wizard/StepSubject';
import StepDiscipline from '../components/wizard/StepDiscipline';
import StepApproach from '../components/wizard/StepApproach';
import StepWorkForm from '../components/wizard/StepWorkForm';
import StepGeographic from '../components/wizard/StepGeographic';
import StepResult from '../components/wizard/StepResult';

const initialData = {
    bookTitle: '',
    author: '',
    subjectDescription: '',
    keywords: '',
    discipline: '',
    disciplineName: '',
    division: '',
    section: '',
    sectionName: '',
    workForm: '',
    workFormName: '',
    workFormNotation: '',
    geographicArea: '',
    geographicName: ''
};

export default function Wizard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [wizardData, setWizardData] = useState(initialData);

    const saveMutation = useMutation({
        mutationFn: (data) => base44.entities.ClassificationLog.create({
            book_title: data.bookTitle,
            author: data.author,
            subject_analysis: data.subjectDescription,
            discipline: data.disciplineName,
            approach: data.sectionName,
            work_form: data.workForm,
            geographic_area: data.geographicName,
            selected_ddc: data.finalDDC,
            justification: `Disiplin: ${data.disciplineName}, Seksi: ${data.sectionName}, Bentuk: ${data.workFormName}`,
            manual_override: data.manualOverride,
            override_reason: data.overrideReason,
            status: 'completed'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classificationLogs'] });
            toast.success('Klasifikasi berhasil disimpan!');
            navigate(createPageUrl('History'));
        }
    });

    const handleUpdateData = (updates) => {
        setWizardData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
        setCurrentStep(prev => Math.min(prev + 1, 6));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleReset = () => {
        setWizardData(initialData);
        setCurrentStep(1);
        setCompletedSteps([]);
    };

    const handleSave = (finalData) => {
        saveMutation.mutate(finalData);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepSubject data={wizardData} onUpdate={handleUpdateData} onNext={handleNext} />;
            case 2:
                return <StepDiscipline data={wizardData} onUpdate={handleUpdateData} onNext={handleNext} onPrev={handlePrev} />;
            case 3:
                return <StepApproach data={wizardData} onUpdate={handleUpdateData} onNext={handleNext} onPrev={handlePrev} />;
            case 4:
                return <StepWorkForm data={wizardData} onUpdate={handleUpdateData} onNext={handleNext} onPrev={handlePrev} />;
            case 5:
                return <StepGeographic data={wizardData} onUpdate={handleUpdateData} onNext={handleNext} onPrev={handlePrev} />;
            case 6:
                return <StepResult
                    data={wizardData}
                    onUpdate={handleUpdateData}
                    onPrev={handlePrev}
                    onSave={handleSave}
                    onReset={handleReset}
                    isSaving={saveMutation.isPending}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title="Pemandu Klasifikasi DDC"
                    subtitle="Panduan interaktif untuk menentukan nomor DDC yang tepat"
                    icon={Wand2}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Steps Sidebar */}
                    <div className="lg:col-span-1">
                        <GradientCard variant="glass" className="p-6 sticky top-4">
                            <h3 className="font-semibold text-slate-800 mb-4">Langkah-langkah</h3>
                            <WizardSteps currentStep={currentStep} completedSteps={completedSteps} />
                        </GradientCard>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <GradientCard variant="solid" className="p-6 md:p-8">
                            {renderStep()}
                        </GradientCard>
                    </div>
                </div>
            </div>
        </div>
    );
}