"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import "./ProgressBar.css";

const ProgressBar = () => {
    const progressRef = useRef(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const animatingRef = useRef(false);
    const isFirstLoadRef = useRef(true);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const progressBar = progressRef.current;

        if (isFirstLoadRef.current) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const initialProgress = scrollTop / (documentHeight - windowHeight);
            setScrollPercent(Math.round(initialProgress * 100));
            gsap.set(progressBar, { scaleX: initialProgress });
            isFirstLoadRef.current = false;
        }

        const updateProgress = () => {
            if (animatingRef.current) return;

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const progress = scrollTop / (documentHeight - windowHeight);
            const percent = Math.round(progress * 100);
            setScrollPercent(percent);

            gsap.to(progressBar, {
                scaleX: progress,
                duration: 0.1,
                ease: "none",
                overwrite: true,
            });
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        return () => {
            window.removeEventListener("scroll", updateProgress);
        };
    }, []);

    useEffect(() => {
        const progressBar = progressRef.current;
        if (!progressBar || isFirstLoadRef.current) return;

        const handleRouteChange = () => {
            animatingRef.current = true;

            gsap.to(progressBar, {
                scaleX: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    animatingRef.current = false;
                },
            });
        };

        handleRouteChange();
    }, [pathname, searchParams]);

    return (
        <div className="progress-container">
            <div className="progress-wrapper">
            <span className="progress-text">//progress+bar</span>
                <div ref={progressRef} className="progress-bar"></div>
                <span className="progress-counter">{scrollPercent}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
