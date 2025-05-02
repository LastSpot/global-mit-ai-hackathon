"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { assessmentDone } from "@/lib/actions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Sample questions with multiple options
const questions = [
    {
        id: 1,
        question: "Which programming language do you prefer?",
        options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
        id: 2,
        question: "What is your most important career goal?",
        options: ["Work-life balance", "High salary", "Learning opportunities", "Career advancement"]
    },
    {
        id: 3,
        question: "What is your preferred work environment?",
        options: ["Remote work", "Hybrid work", "Office work", "Field work"]
    },
    {
        id: 4,
        question: "What is your strongest skill?",
        options: ["Problem solving", "Communication", "Teamwork", "Technical skills"]
    },
    {
        id: 5,
        question: "Which project type interests you the most?",
        options: ["Web development", "Mobile development", "Data analysis", "AI/Machine learning"]
    }
]

export default function Assessments() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex])
    
    const handleOptionSelect = useCallback((option: string) => {
        console.log(`Selected option: ${option} for question ${currentQuestion.id}`)
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: option
        }))
        setErrorMessage("")
    }, [currentQuestion.id])
    
    const nextQuestion = useCallback(() => {
        if (!answers[currentQuestion.id]) {
            setErrorMessage("Please select an option before continuing.")
            return
        }
        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
            setErrorMessage("")
        }
    }, [answers, currentQuestion.id, currentQuestionIndex])
    
    const prevQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1)
            setErrorMessage("")
        }
    }, [currentQuestionIndex])
    
    const handleSubmit = useCallback(async () => {
        console.log("Starting submission process...")
        
        // Check if current question is answered
        if (!answers[currentQuestion.id]) {
            console.log(`Current question ${currentQuestion.id} is not answered`)
            setErrorMessage("Please select an option before submitting.")
            return
        }
        
        // Check if all questions have answers
        const allAnswered = questions.every(q => answers[q.id])
        console.log(`All questions answered: ${allAnswered}`)
        console.log("Current answers:", answers)
        
        if (!allAnswered) {
            const unanswered = questions.filter(q => !answers[q.id]).map(q => q.id)
            console.log(`Unanswered questions: ${unanswered.join(', ')}`)
            setErrorMessage("Please answer all questions before submitting.")
            return
        }
        
        setIsSubmitting(true)
        setErrorMessage("")
        console.log("Submission in progress...")
        
        try {
            // Format results for submission - this could be saved to a database in the future
            const formattedResults = questions.map(q => ({
                question: q.question,
                answer: answers[q.id]
            }))
            
            console.log("Formatted results:", formattedResults)
            console.log("Calling assessmentDone server action...")
            
            // Call server action to mark assessment as done
            const result = await assessmentDone()
            console.log("Server action result:", result)
            
            // If result is a string, it's an error message from the server action
            if (typeof result === 'string') {
                console.error("Server returned error:", result)
                
                // Handle specific authentication errors
                if (result.toLowerCase().includes("auth") || 
                    result.toLowerCase().includes("login") || 
                    result.toLowerCase().includes("authenticated")) {
                    setErrorMessage("Authentication error. Please log in again to complete the assessment.")
                } else {
                    setErrorMessage(result || "There was an error submitting your assessment. Please try again.")
                }
                
                setIsSubmitting(false)
                return
            }
            
            // If we get here, the submission was successful
            // The server action handles redirect, so we don't need to do anything else
            console.log("Assessment submitted successfully")
        } catch (error) {
            console.error("Error details:", error)
            
            // Display a more specific error message if possible
            let errorMsg = "There was an error submitting your assessment. Please try again."
            if (error instanceof Error) {
                console.error("Error name:", error.name)
                console.error("Error message:", error.message)
                
                // Provide more specific error messages for common errors
                if (error.message.includes("network") || error.message.includes("fetch")) {
                    errorMsg = "Network error. Please check your connection and try again."
                } else if (error.message.includes("auth") || error.message.includes("unauthorized")) {
                    errorMsg = "Authentication error. Please log in again and try submitting."
                }
            }
            
            setErrorMessage(errorMsg)
            setIsSubmitting(false)
        } finally {
            console.log("Submission process completed")
        }
    }, [answers, currentQuestion.id])
    
    const progress = useMemo(() => {
        return `Question ${currentQuestionIndex + 1} of ${questions.length}`
    }, [currentQuestionIndex])
    
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Assessment</CardTitle>
                <CardDescription>
                    Please answer all questions to proceed to the dashboard.
                    Select one option for each question.
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            {progress}
                        </h3>
                    </div>
                    
                    <div className="text-lg font-medium mb-4">
                        {currentQuestion.question}
                    </div>
                    
                    <RadioGroup 
                        value={answers[currentQuestion.id] || ""}
                        onValueChange={handleOptionSelect}
                        className="space-y-3"
                    >
                        {currentQuestion.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2 rounded-md border p-3">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="flex-grow cursor-pointer">
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    
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