'use client'

import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import styles from './Header.module.css'

const logos = [
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
    "/images/carlexlogo.png",
]

const navItems = [
    { label: "PLAY MEMORY", id: "memory" },
    { label: "PLAY POKÉMON", id: "pokemon" },
    { label: "CHECK MY PROJECTS", id: "projects" },
    //Can add more if needed
];

const Header = () => {
    const allLogos = [...logos, ...logos];
    const [isHidden, setIsHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", menuOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setMenuClosing(false);
        }, 300);
    };

    const goTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        closeMenu();
    };


    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeMenu();
        }
    };

    return (
        <>
            <div
                className={clsx(
                    styles.marqueeWrapper,
                    isHidden && "transform-all translate-y-[-50px] duration-700 opacity-0"
                )}
            >
                <div className={styles.marqueeContent}>
                    {allLogos.map((src, i) => (
                        <div className={styles.logo} key={i}>
                            <p className="bg-gradient-to-r from-[#FFA9FF] via-[#FFB78B] via-[#FF8282] via-[#43FEFF] to-[#845ef7] inline-block text-transparent bg-clip-text text-[14px] tracking-wide drop-shadow-sm font-bold">
                                $ LOOKING FOR LIA | WORK OPPORTUNITIES
                            </p>
                        </div>
                    ))}
                </div>
                <div className={styles.gradientLine}></div>
            </div>

            <div
                className={clsx(
                    styles.menu,
                    isHidden && "transform-all translate-x-[-50px] duration-700 opacity-0"
                )}
            >
                <div className="container">
                    <div className={styles.menuButtons}>
                        <button
                            className={styles.fancyButton}
                            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
                            aria-expanded={menuOpen}
                            aria-controls="topdrop"
                        >
                            <span className={styles.buttonBg}></span>
                            <span className={styles.buttonText}>
                                {menuOpen ? "CLOSE" : "MENU"}
                            </span>
                        </button>
                        <img
                            className="max-w-[150px] h-auto"
                            src="/images/iceslime.png"
                            alt="snowman"
                        />
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div
                    id="topdrop"
                    className={clsx(
                        styles.topDrop,
                        styles.topDropOpen,
                        menuClosing ? styles.slideUp : styles.slideDown
                    )}
                    onClick={handleOverlayClick}
                >
                    <div className={styles.topDropInner}>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={styles.navItem}
                                onClick={() => goTo(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                        <div>
                            <img src={"/images/iceslime.png"}/>
                        </div>
                        <div className={styles.socials}>
                            <a target='_blank' href="https://web.facebook.com/profile.php?id=100008084297525">FACEBOOK</a>
                            <a target='_blank' href="https://www.linkedin.com/in/alexander-hallgren-5a4a501aa/">LINKEDIN</a>
                            <a target='_blank' href="https://github.com/Endorze">GITHUB</a>
                            <a target='_blank' href="https://www.instagram.com/alexander_webdev/">INSTAGRAM</a>
                            <div className={styles.menuButtons}>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
