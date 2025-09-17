import { BookOpen } from "lucide-react";

export default function Header() {
    return (
        <header className="shadow-sm border-b border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600 rounded-xl">
                        <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                        <h1 className="text-2xl font-bold text-gray-900">Book Finder</h1>
                        <p className="text-sm text-gray-600">Discover your next great read</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}