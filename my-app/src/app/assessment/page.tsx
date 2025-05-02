import Assessments from "@/components/ui/assessment/assessments"

export default function AssessmentPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Assessment Required</h1>
                <p className="text-muted-foreground mt-2">
                    Please complete this assessment to personalize your experience.
                    Your responses will help us provide you with relevant content.
                </p>
            </div>
            <Assessments />
        </div>
    )
}