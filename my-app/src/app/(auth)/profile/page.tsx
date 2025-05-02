import SocialLinks from "@/components/ui/profile/social-links"
import ResumeUpload from "@/components/ui/profile/resume-upload"
import DeleteProfile from "@/components/ui/profile/delete-profile"

export default function ProfilePage() {
    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your profile information and resume
                </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                <div>
                    <SocialLinks />
                </div>
                <div>
                    <ResumeUpload />
                </div>
            </div>
            
            <div className="mt-12 flex justify-center">
                <div className="max-w-md w-full">
                    <DeleteProfile />
                </div>
            </div>
        </div>
    )
}