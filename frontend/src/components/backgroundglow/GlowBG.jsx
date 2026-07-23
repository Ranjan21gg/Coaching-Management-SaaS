export default function GlowBG({
    firstColor = "bg-blue-500/20",
    secondColor = "bg-purple-500/10",
}) {
    return (
        <>
            <div
                className={`absolute top-20 left-20 w-96 h-96 ${firstColor} blur-[140px] rounded-full`}
            />

            <div
                className={`absolute bottom-0 right-0 w-96 h-96 ${secondColor} blur-[140px] rounded-full`}
            />
        </>
    );
}