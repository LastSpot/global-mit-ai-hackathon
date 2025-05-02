import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <Image src="/favicon.ico" alt="Logo" width={48} height={48} />
            <p>App Name</p>
        </div>
    )
}
