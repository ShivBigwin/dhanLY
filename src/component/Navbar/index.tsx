// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// export default function Navbar() {
//   const [isMounted, setIsMounted] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const menuRef = useRef<HTMLDivElement>(null);
//   const hamburgerRef = useRef<HTMLButtonElement>(null);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/aboutUs" },
//     { name: "Calculator", href: "/calculator" },
//     { name: "Contact Us", href: "/contactUs" },
//   ];

//   /* -------------------- MOUNT & SCREEN SIZE -------------------- */
//   useEffect(() => {
//     setIsMounted(true);

//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* -------------------- SCROLL HANDLER -------------------- */
//   useEffect(() => {
//     if (!isMounted) return;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (isDesktop) {
//         if (currentScrollY > lastScrollY && currentScrollY > 100) {
//           setIsNavVisible(false);
//         } else {
//           setIsNavVisible(true);
//         }
//       }

//       setScrolled(currentScrollY > 20);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isMounted, lastScrollY, isDesktop]);

//   /* -------------------- BODY LOCK + CLICK OUTSIDE -------------------- */
//   useEffect(() => {
//     if (!isMounted) return;

//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         hamburgerRef.current &&
//         !menuRef.current.contains(event.target as Node) &&
//         !hamburgerRef.current.contains(event.target as Node)
//       ) {
//         setIsMenuOpen(false);
//       }
//     };

//     if (isMenuOpen) {
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       const scrollY = document.body.style.top;
//       document.body.style.position = "";
//       document.body.style.top = "";
//       document.body.style.width = "";
//       if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMenuOpen, isMounted]);

//   /* -------------------- SAFETY -------------------- */
//   if (!isMounted) return null;

//   return (
//     <>
//       {/* ==================== NAVBAR ==================== */}
//       <motion.nav
//         initial={{ y: 0 }}
//         animate={{
//           y: isDesktop ? (isNavVisible ? 0 : -100) : 0,
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className={`fixed top-0 left-0 right-0 z-50 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg py-4"
//             : "bg-transparent py-6"
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* LOGO */}
//             <Link href="#" className="flex items-center space-x-2">
//               <div className="w-20 h-20  rounded-xl flex items-center ">
//                 <img src="DhanLY.png" alt="" />
//               </div>
//               {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//                 DhanLY
//               </span> */}
//             </Link>

//             {/* DESKTOP MENU */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 hover:text-blue-600 font-medium relative group"
//                 >
//                   {item.name}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all" />
//                 </Link>
//               ))}

//               <a
//                 href="https://loanapply.dhanly.in"
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md hover:shadow-lg"
//               >
//                 Get Started
//               </a>
//             </div>

//             {/* MOBILE BUTTON */}
//             <button
//               ref={hamburgerRef}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden w-12 h-12 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow"
//             >
//               <span
//                 className={`w-6 h-0.5 bg-blue-600 transition ${
//                   isMenuOpen ? "rotate-45 translate-y-2" : ""
//                 }`}
//               />
//               <span
//                 className={`w-6 h-0.5 bg-blue-600 transition ${
//                   isMenuOpen ? "opacity-0" : ""
//                 }`}
//               />
//               <span
//                 className={`w-6 h-0.5 bg-blue-600 transition ${
//                   isMenuOpen ? "-rotate-45 -translate-y-2" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ==================== MOBILE MENU ==================== */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-[9999]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMenuOpen(false)}
//             />

//             <motion.div
//               ref={menuRef}
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[10000] shadow-2xl"
//             >
//               <div className="p-6 space-y-6">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block text-lg font-medium text-gray-700 hover:text-blue-600"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold">
//                   Login / Sign Up
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/aboutUs" },
    { name: "Calculator", href: "/calculator" },
    { name: "Contact Us", href: "/contactUs" },
  ];

  /* -------------------- MOUNT & SCREEN SIZE -------------------- */
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* -------------------- SCROLL HANDLER -------------------- */
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isDesktop) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }

      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, lastScrollY, isDesktop]);

  /* -------------------- BODY LOCK + CLICK OUTSIDE -------------------- */
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      document.addEventListener("mousedown", handleClickOutside);
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }

      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isMounted]);

  /* -------------------- SAFETY -------------------- */
  if (!isMounted) return null;

  return (
    <>
      {/* ==================== NAVBAR ==================== */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: isDesktop ? (isNavVisible ? 0 : -100) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg py-3 md:py-4"
            : "bg-transparent py-3 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-auto">
            {/* ==================== LOGO ==================== */}
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <div className="relative w-32 h-12 md:w-20 md:h-20 flex items-center">
                <img
                  src="/DhanLY.png"
                  alt="DhanLY Logo"
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>

            {/* ==================== DESKTOP MENU ==================== */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium relative group transition"
                >
                  {item.name}

                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              <a
                // href="https://loanapply.dhanly.in"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                Get Started
              </a>
            </div>

            {/* ==================== MOBILE BUTTON ==================== */}
            <button
              ref={hamburgerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow-md"
            >
              <span
                className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ==================== MOBILE MENU ==================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[10000] shadow-2xl"
            >
              <div className="p-6">
                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between mb-10">
                  <img
                    src="/DhanLY.png"
                    alt="DhanLY Logo"
                    className="h-10 object-contain"
                  />

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                {/* MENU ITEMS */}
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* BUTTON */}
                <div className="mt-10">
                  <a
                    // href="https://loanapply.dhanly.in"
                    className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
