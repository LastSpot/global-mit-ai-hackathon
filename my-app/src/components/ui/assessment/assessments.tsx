"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { assessmentDone } from "@/lib/actions"
import { useRouter } from "next/navigation"

// Sample questions with multiple options to rank
const questions = [
    {
        id: 1,
        question: "Rank these programming languages by your preference:",
        options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
        id: 2,
        question: "Rank these career goals by importance to you:",
        options: ["Work-life balance", "High salary", "Learning opportunities", "Career advancement"]
    },
    {
        id: 3,
        question: "Rank these work environments by your preference:",
        options: ["Remote work", "Hybrid work", "Office work", "Field work"]
    },
    {
        id: 4,
        question: "Rank these skills by your proficiency:",
        options: ["Problem solving", "Communication", "Teamwork", "Technical skills"]
    },
    {
        id: 5,
        question: "Rank these project types by your interest:",
        options: ["Web development", "Mobile development", "Data analysis", "AI/Machine learning"]
    }
]

export default function Assessments() {
    const router = useRouter()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [rankings, setRankings] = useState<Record<number, number[]>>({})
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const currentQuestion = questions[currentQuestionIndex]
    
    // Initialize ranking for current question if not already set
    if (!rankings[currentQuestion.id]) {
        // Create default ranking based on original order
        const initialRanking = currentQuestion.options.map((_, index) => index)
        setRankings(prev => ({ ...prev, [currentQuestion.id]: initialRanking }))
    }
    
    const handleDragStart = (index: number) => {
        setDraggingIndex(index)
    }
    
    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        
        if (draggingIndex === null) return
        
        // Get current rankings for this question
        const currentRankings = [...rankings[currentQuestion.id]]
        
        // Don't do anything if dragging over the same item
        if (draggingIndex === index) return
        
        // Reorder the items
        const draggedItemValue = currentRankings[draggingIndex]
        currentRankings.splice(draggingIndex, 1)
        currentRankings.splice(index, 0, draggedItemValue)
        
        // Update the rankings
        setRankings(prev => ({
            ...prev,
            [currentQuestion.id]: currentRankings
        }))
        
        setDraggingIndex(index)
    }
    
    const handleDragEnd = () => {
        setDraggingIndex(null)
    }
    
    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
            setErrorMessage("")
        }
    }
    
    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1)
            setErrorMessage("")
        }
    }
    
    const handleSubmit = async () => {
        // Check if all questions have rankings
        const allQuestionsAnswered = questions.every(q => rankings[q.id] && rankings[q.id].length === q.options.length)
        
        if (!allQuestionsAnswered) {
            setErrorMessage("Please answer all questions before submitting.")
            return
        }
        
        setIsSubmitting(true)
        
        try {
            // Convert rankings to a more readable format for submission
            const formattedResults = questions.map(q => {
                const questionRankings = rankings[q.id]
                // Map each option index to its rank (1 being highest)
                const result: Record<string, number> = {}
                questionRankings.forEach((optionIndex, rank) => {
                    result[q.options[optionIndex]] = rank + 1
                })
                
                return {
                    question: q.question,
                    rankings: result
                }
            })
            
            console.log("Assessment results:", formattedResults)
            
            // Call server action to mark assessment as done
            await assessmentDone()
        } catch (error) {
            console.error("Error submitting assessment:", error)
            setErrorMessage("There was an error submitting your assessment. Please try again.")
            setIsSubmitting(false)
        }
    }
    
    // Create display items for current question with drag-and-drop ranking
    const rankingItems = rankings[currentQuestion.id]?.map((optionIndex, rank) => (
        <div 
            key={optionIndex}
            draggable
            onDragStart={() => handleDragStart(rank)}
            onDragOver={(e) => handleDragOver(e, rank)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 rounded-md cursor-move mb-2 border ${
                draggingIndex === rank ? "bg-muted border-dashed" : "bg-background"
            }`}
        >
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
                {rank + 1}
            </div>
            <div className="flex-grow">{currentQuestion.options[optionIndex]}</div>
        </div>
    ))
    
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Assessment</CardTitle>
                <CardDescription>
                    Please answer all questions to proceed to the dashboard.
                    Rank the options by dragging and dropping them in order of preference (1 = highest).
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </h3>
                    </div>
                    
                    <div className="text-lg font-medium mb-4">
                        {currentQuestion.question}
                    </div>
                    
                    <div className="mt-4">
                        {rankingItems}
                    </div>
                    
                    {errorMessage && (
                        <div className="mt-4 text-sm text-red-500">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
                <Button 
                    variant="outline" 
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </Button>
                
                {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={nextQuestion}>Next</Button>
                ) : (
                    <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Complete Assessment"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}