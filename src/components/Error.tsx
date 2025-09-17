export default function Error({ errorMessage }: {
    errorMessage: string
}) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <p className="text-red-800 font-medium md:text-lg">Something went wrong</p>
            </div>
            <p className="text-red-700 mt-2">{errorMessage}</p>
        </div>
    )
}