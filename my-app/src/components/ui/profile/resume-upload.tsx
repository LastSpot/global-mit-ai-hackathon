"use client"

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResumeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            
            // Check if file is a PDF
            if (selectedFile.type !== 'application/pdf') {
                setError("Please upload a PDF file");
                setFile(null);
                setFileName("");
                return;
            }
            
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError("");
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = () => {
        if (!file) {
            setError("Please select a resume to upload");
            return;
        }
        
        // Here you would handle the actual upload logic
        console.log("Uploading file:", file);
        // Implement file upload logic (e.g., to a server or cloud storage)
        
        // For demonstration, we'll just show a success message
        alert("Resume uploaded successfully!");
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume (PDF only)</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            ref={fileInputRef}
                            id="resume"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <Button 
                            onClick={handleUploadClick}
                            variant="outline"
                            className="w-full"
                        >
                            Choose File
                        </Button>
                    </div>
                    
                    {fileName && (
                        <div className="mt-2 text-sm">
                            Selected file: {fileName}
                        </div>
                    )}
                    
                    {error && (
                        <div className="mt-2 text-sm text-red-500">
                            {error}
                        </div>
                    )}
                    
                    <Button 
                        onClick={handleSubmit}
                        disabled={!file}
                        className="w-full mt-4"
                    >
                        Upload Resume
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}