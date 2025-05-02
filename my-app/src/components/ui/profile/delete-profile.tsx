"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteProfile } from "@/lib/actions"
import { Card, CardContent } from "@/components/ui/card"

export default function DeleteProfile() {
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleDeleteClick = async () => {
        console.log(confirmDelete)
        if (confirmDelete) {
           await deleteProfile()
        } else {
            setConfirmDelete(true)
        }
    }

    const handleCancelClick = () => {
        setConfirmDelete(false)
    }

    return (
        <Card className="w-full mt-8 border-red-200">
            <CardContent className="pt-6 flex flex-col items-center">
                {confirmDelete ? (
                    <div className="text-center space-y-4">
                        <p className="text-red-500 font-medium">Are you sure you want to delete your profile?</p>
                        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteClick}>
                                Yes, Delete
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={handleDeleteClick}>
                        Delete Profile
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}