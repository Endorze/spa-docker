"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientLoadingBar from "../GradientLoadingBar/GradientLoadingBar";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#AEE4FF] to-[#5BC0FF]"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <div className="flex flex-col">
                            <img className="max-w-[200px] h-auto" src={"/images/barbarian.png"} />
            
                            <GradientLoadingBar
                                value={100}
                                durationMs={2500}
                            />

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <div>{children}</div>
        </>
    );
}

