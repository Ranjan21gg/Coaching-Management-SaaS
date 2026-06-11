
export default function UserCard() {
    const isLoggedIn = !!localStorage.getItem("access"); // ✅ FIXED  
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div>
            {/*User Card */}
            {isLoggedIn && user && (
                <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-xl border border-white/20">

                    {/* Avatar */}
                    <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-sm font-bold uppercase tracking-wide text-white">
                            {user.institute}
                        </h1>

                        <div className="flex items-center gap-1">
                            <p className="text-[10px] font-semibold text-gray-200">
                                {user.username}
                            </p>

                            <span className="text-[9px] bg-yellow-400 text-black px-1 rounded-full font-semibold capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}