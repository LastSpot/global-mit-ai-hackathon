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
        "id": 1,
        "question": "In a team setting, I prefer to:",
        "options": [
            "Lead discussions and energize the group",
            "Observe quietly and contribute when I have something meaningful"
        ],
        "trait": [
            "Outgoing",
            "Introverted"
        ]
    },
    {
        "id": 2,
        "question": "I find more satisfaction in:",
        "options": [
            "Solving practical, real-world problems",
            "Imagining and designing what could be"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 3,
        "question": "When making decisions, I tend to:",
        "options": [
            "Focus on logic, data, and objectivity",
            "Consider people's feelings and emotional impact"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 4,
        "question": "I feel more comfortable with:",
        "options": [
            "Clear rules and predictable routines",
            "Flexibility and adapting as things unfold"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 5,
        "question": "In social situations, I:",
        "options": [
            "Thrive on interaction and enjoy meeting new people",
            "Prefer deep conversations with a few close individuals"
        ],
        "trait": [
            "Outgoing",
            "Introverted"
        ]
    },
    {
        "id": 6,
        "question": "I'm more drawn to:",
        "options": [
            "Proven methods and step-by-step processes",
            "New ideas, theories, and innovations"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 7,
        "question": "I naturally gravitate toward:",
        "options": [
            "Dispassionate reasoning, even in tense situations",
            "Compassion and understanding when people are struggling"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 8,
        "question": "When starting a project, I prefer:",
        "options": [
            "Planning everything in advance",
            "Figuring it out as I go"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 9,
        "question": "I would rather spend my day:",
        "options": [
            "Working through complex systems or technical challenges",
            "Helping people overcome personal or emotional challenges"
        ],
        "trait": [
            "Factual",
            "Empathetic"
        ]
    },
    {
        "id": 10,
        "question": "My ideal workday involves:",
        "options": [
            "Completing tasks efficiently with clear goals",
            "Exploring open-ended questions and trying new ideas"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 11,
        "question": "I'd be prouder to say I:",
        "options": [
            "Designed a reliable system used by thousands",
            "Inspired someone to discover a new way of thinking"
        ],
        "trait": [
            "Structured",
            "Idealistic"
        ]
    },
    {
        "id": 12,
        "question": "I feel more fulfilled when:",
        "options": [
            "I've accomplished something measurable and concrete",
            "I've experienced something meaningful and thought-provoking"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 13,
        "question": "When faced with ambiguity, I:",
        "options": [
            "Break it down logically to find a path forward",
            "Stay open to multiple interpretations and trust the process"
        ],
        "trait": [
            "Objective",
            "Flexible"
        ]
    },
    {
        "id": 14,
        "question": "When working on a long-term goal, I:",
        "options": [
            "Stick to a detailed plan and timeline",
            "Adjust my approach depending on how things unfold"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 15,
        "question": "I prefer work that:",
        "options": [
            "Has clear expectations and structure",
            "Allows freedom and creative exploration"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 16,
        "question": "When solving a problem, I usually:",
        "options": [
            "Look for the most efficient and proven solution",
            "Explore multiple angles and possible innovations"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 17,
        "question": "In group settings, I am more likely to:",
        "options": [
            "Take the initiative to organize and direct",
            "Support others and help create harmony"
        ],
        "trait": [
            "Structured",
            "Empathetic"
        ]
    },
    {
        "id": 18,
        "question": "I feel most energized when:",
        "options": [
            "I'm around lots of people and activity",
            "I'm alone or in small, focused groups"
        ],
        "trait": [
            "Outgoing",
            "Introverted"
        ]
    },
    {
        "id": 19,
        "question": "I find more meaning in:",
        "options": [
            "Achieving specific outcomes or success metrics",
            "Pursuing a deeper sense of purpose or impact"
        ],
        "trait": [
            "Objective",
            "Idealistic"
        ]
    },
    {
        "id": 20,
        "question": "In a workplace, I value most:",
        "options": [
            "Efficiency, deadlines, and productivity",
            "Inspiration, passion, and values"
        ],
        "trait": [
            "Structured",
            "Idealistic"
        ]
    },
    {
        "id": 21,
        "question": "I prefer tasks that:",
        "options": [
            "Are logical and measurable",
            "Involve emotion, people, or empathy"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 22,
        "question": "When learning something new, I:",
        "options": [
            "Want practical examples and direct application",
            "Enjoy exploring theories and abstract concepts"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 23,
        "question": "I believe the best decisions are made:",
        "options": [
            "With careful analysis and evidence",
            "With consideration for people and relationships"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 24,
        "question": "My ideal job environment is:",
        "options": [
            "Structured with clear systems",
            "Dynamic and constantly changing"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 25,
        "question": "When others come to me with a problem, I:",
        "options": [
            "Help them see the logical solution",
            "Try to understand how they feel first"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 26,
        "question": "I enjoy roles where I can:",
        "options": [
            "Plan, organize, and execute precisely",
            "Respond to change and think on my feet"
        ],
        "trait": [
            "Structured",
            "Flexible"
        ]
    },
    {
        "id": 27,
        "question": "I'm more motivated by:",
        "options": [
            "Reaching the top and proving myself",
            "Growing personally and helping others grow"
        ],
        "trait": [
            "Structured",
            "Idealistic"
        ]
    },
    {
        "id": 28,
        "question": "I often find myself:",
        "options": [
            "Focused on what is and what works",
            "Wondering about what could be and how to improve it"
        ],
        "trait": [
            "Factual",
            "Idealistic"
        ]
    },
    {
        "id": 29,
        "question": "I prefer feedback that:",
        "options": [
            "Is direct, clear, and to the point",
            "Takes into account emotions and delivery style"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    },
    {
        "id": 30,
        "question": "I make decisions:",
        "options": [
            "After listing pros and cons",
            "By trusting my values or gut instinct"
        ],
        "trait": [
            "Objective",
            "Empathetic"
        ]
    }
]

export default function Assessments() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex])
    
    // Calculate traits based on answers
    const calculateTraits = useCallback(() => {
        const traitCounts: Record<string, number> = {
            "Outgoing": 0,
            "Introverted": 0,
            "Factual": 0,
            "Idealistic": 0,
            "Objective": 0,
            "Empathetic": 0,
            "Structured": 0,
            "Flexible": 0
        }
        
        // Count traits based on selected answers
        Object.entries(answers).forEach(([questionId, answer]) => {
            const questionIndex = questions.findIndex(q => q.id === parseInt(questionId))
            if (questionIndex !== -1) {
                const question = questions[questionIndex]
                const optionIndex = question.options.findIndex(opt => opt === answer)
                if (optionIndex !== -1 && question.trait && question.trait[optionIndex]) {
                    traitCounts[question.trait[optionIndex]] = (traitCounts[question.trait[optionIndex]] || 0) + 1
                }
            }
        })
        
        return traitCounts
    }, [answers])
    
    // Get dominant traits (might be ties)
    const getDominantTraits = useCallback(() => {
        const traitCounts = calculateTraits()
        const maxCount = Math.max(...Object.values(traitCounts))
        
        // If no answers yet, return empty array
        if (maxCount === 0) return []
        
        // Get all traits that have the maximum count (could be multiple in case of ties)
        return Object.entries(traitCounts)
            .filter(([_, count]) => count === maxCount)
            .map(([trait]) => trait)
    }, [calculateTraits])
    
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
        
        // Calculate trait counts and dominant traits
        const traitCounts = calculateTraits()
        const dominantTraits = getDominantTraits()
        
        console.log("Trait counts:", traitCounts)
        console.log("Dominant traits:", dominantTraits)
        
        setIsSubmitting(true)
        setErrorMessage("")
        console.log("Submission in progress...")
        
        try {
            // Format results for submission - this could be saved to a database in the future
            const formattedResults = {
                answers: questions.map(q => ({
                    question: q.question,
                    answer: answers[q.id],
                    selectedTrait: q.trait[q.options.findIndex(opt => opt === answers[q.id])]
                })),
                traitCounts,
                dominantTraits
            }
            
            console.log("Formatted results:", formattedResults)
            console.log("Calling assessmentDone server action...")
            
            // Call server action to mark assessment as done and pass dominant traits
            const result = await assessmentDone(dominantTraits)
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
    }, [answers, currentQuestion.id, calculateTraits, getDominantTraits])
    
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