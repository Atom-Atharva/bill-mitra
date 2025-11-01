import type React from "react";

type Props = {
    imgUrl: string;
    children: React.ReactNode
};

const BackgroundImage = ({ imgUrl, children }: Props) => {
    return <div className="relative w-full h-screen overflow-hidden">
        <img
            src={imgUrl}
            alt="Background Image"
            className="absolute w-full h-full object-cover blur-xs scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute w-full h-full inset-0 bg-black/40" />

        {/* Foreground Form */}
        <div className="relative z-10 flex justify-center items-center h-full">
            {children}
        </div>
    </div>;
};

export default BackgroundImage;
