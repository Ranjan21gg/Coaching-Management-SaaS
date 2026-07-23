
export default function StudentCard({ student,LogoSize,className="" }) {

    return (
        <div className="flex items-center gap-3 px-6 py-4">

            <div className={`${LogoSize} w-10 h-10 ${LogoSize}text-xl rounded-full  bg-blue-600
                        flex items-center justify-center font-bold text-white
                        bg-gradient-to-r from-blue-500 to-purple-500`}>

                {student?.name?.charAt(0).toUpperCase() || "?"}
            </div>

            <div>

                <p className="text-white dark:text-black font-bold">
                    {student?.name || "Unknown"}
                </p>

                <p className="text-sm font-bold text-blue-400">
                    {student?.course || "N/A"}
                </p>

            </div>

        </div>
    )
}
