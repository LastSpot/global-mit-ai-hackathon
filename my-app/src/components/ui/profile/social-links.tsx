"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SocialLinks() {
    const [links, setLinks] = useState({
        linkedin: "",
        github: "",
        website: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinks(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Save links to database or state management
        console.log("Saving links:", links);
        // Add actual save implementation here
    };

    return (
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={links.linkedin}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                        id="github"
                        name="github"
                        placeholder="https://github.com/username"
                        value={links.github}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                        id="website"
                        name="website"
                        placeholder="https://yourwebsite.com"
                        value={links.website}
                        onChange={handleChange}
                    />
                </div>
                
                <Button className="w-full" onClick={handleSave}>
                    Save Social Links
                </Button>
            </CardContent>
        </Card>
    );
}