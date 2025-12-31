"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift, Music, VolumeX, Heart } from "lucide-react";

// ==============================================
// 👇 YOUR CUSTOMIZATION ZONE 👇
// ==============================================

const RECIPIENT_NAME = "Bestie"; 
const CURRENT_YEAR = 2025;
const NEXT_YEAR = 2026;

// 1. OPENING SCREEN
const OPENING_LINES = [
  "Hey...",
  "Before the clock strikes twelve...",
  "I needed to stop for a moment.",
  "And just think about you.",
];

// 2. THE PHOTOS
const PHOTO_JOURNEY = [
  {
    id: 1,
    src: "/p1.jpg", 
    caption: "The Anchor. When everything felt chaotic this year, you were the one steady thing I could hold onto.",
  },
  {
    id: 2,
    src: "/p2.jpg",
    caption: "The Lightbringer. You have this frustratingly good ability to make me laugh even when I absolutely don't want to.",
  },
  {
    id: 3,
    src: "/p3.jpg",
    caption: "The Silent Supporter. You didn't always have to say much. Just knowing you were in my corner changed everything.",
  },
  {
    id: 4,
    src: "/p4.jpg",
    caption: "The Constant. Things changed, people drifted, but you remained. My best friend.",
  },
];

// 3. INTERLUDE (Between Photos and Box)
const INTERLUDE_LINES = [
  "We have walked a long way together.",
  "And even though years change...",
  "Some things remain timeless.",
];

// 4. THE FINAL LETTER 
const THE_LETTER = `Dearest ${RECIPIENT_NAME},<br/><br/>
As this year closes, I realized I couldn't let it end without acknowledging the massive impact you've had on my life.<br/><br/>
Looking back, there were so many moments where I might have crumbled if I didn't know you were just a text away. Some feelings are complicated and old, but what isn't complicated is how incredibly effective you are at being a beautiful human being in my life.<br/><br/>
You made the hard days bearable and the good days unforgettable. Thank you for being my safety net, my reality check, and my greatest cheerleader.<br/><br/>
I don't know what ${NEXT_YEAR} holds, but I know it will be okay as long as you are part of my world.<br/><br/>
Happy New Year. You mean the world to me.<br/><br/>
With all my love,<br/>
Muhammad`;

// ==============================================
// 👆 END OF CUSTOMIZATION 👆
// ==============================================

const fadeInSlow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
  exit: { opacity: 0, transition: { duration: 1 } }
};

export default function Home() {
  const [stage, setStage] = useState<'opening' | 'journey' | 'interlude' | 'box'>('opening');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio autoplay blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (stage === 'opening') {
      const timer = setTimeout(() => {
        setStage('journey');
      }, OPENING_LINES.length * 1000 + 3000); 
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // --- STAGE 1: OPENING ---
  const OpeningView = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    return (
      <motion.div 
        key="opening"
        variants={fadeInSlow}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10"
      >
         <div className="absolute inset-0 z-0 overflow-hidden">
            {isMounted && [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, Math.random() * 1 + 0.5, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute top-0 left-0"
              >
                <Sparkles className="text-yellow-200/40 w-4 h-4" />
              </motion.div>
            ))}
         </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 relative z-10">
          Goodbye {CURRENT_YEAR}
        </h1>
        
        <div className="space-y-6 relative z-10">
          {OPENING_LINES.map((line, index) => (
            <motion.p 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.8), duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    );
  };

  // --- STAGE 2: JOURNEY ---
  const JourneyView = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
           setTimeout(() => setStage('interlude'), 1000);
        }
      };
      
      const container = containerRef.current;
      if (container) container.addEventListener('scroll', handleScroll);
      return () => { if (container) container.removeEventListener('scroll', handleScroll); }
    }, []);

    return (
    <motion.div 
      key="journey"
      variants={fadeInSlow}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory relative z-10 scroll-smooth"
    >
      <div className="fixed top-4 left-0 w-full flex justify-center z-20 pointer-events-none">
         <p className="text-sm text-slate-500 animate-pulse">Scroll gently down ↓</p>
      </div>
      
      {PHOTO_JOURNEY.map((photo, index) => (
        <div key={photo.id} className="h-screen w-full snap-center relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 w-full h-full">
            <Image 
              src={photo.src} 
              alt="blur-bg" 
              fill 
              sizes="100vw"
              className="object-cover blur-3xl opacity-40 scale-110" 
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             viewport={{ once: false, amount: 0.5 }}
             className="relative z-10 max-w-md md:max-w-2xl mx-4 p-6 md:p-10 bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl"
          >
             <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
               <Image 
                 src={photo.src} 
                 alt="Memory" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 800px"
                 className="object-cover" 
               />
             </div>
             <div className="pt-4">
                <Heart className="w-6 h-6 text-pink-400 mx-auto mb-4" />
                <p className="text-lg md:text-2xl text-white font-medium leading-relaxed">
                  "{photo.caption}"
                </p>
             </div>
          </motion.div>
        </div>
      ))}
       <div className="h-[10vh] snap-center"></div>
    </motion.div>
  )};

  // --- STAGE 3: INTERLUDE ---
  const InterludeView = () => {
    useEffect(() => {
        const totalDuration = INTERLUDE_LINES.length * 2500 + 1000;
        const timer = setTimeout(() => {
            setStage('box');
        }, totalDuration);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            key="interlude"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10 bg-black"
        >
            <div className="max-w-2xl space-y-8">
                {INTERLUDE_LINES.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ 
                            delay: i * 2.5, 
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                        className="text-2xl md:text-3xl font-light text-pink-100/90 italic"
                    >
                        {line}
                    </motion.p>
                ))}
            </div>
        </motion.div>
    );
  };


  // --- STAGE 4: BOX (NUCLEAR FIX) ---
  const BoxView = () => (
    <motion.div 
      key="box"
      variants={fadeInSlow}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center items-center relative z-10 px-4 py-20"
    >
      <AnimatePresence mode="wait">
        {!isBoxOpen ? (
          <motion.div 
            key="closed-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center cursor-pointer group"
            onClick={() => setIsBoxOpen(true)}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -2, 2, 0]
               }}
               transition={{ 
                 duration: 4,
                 repeat: Infinity,
                 repeatType: "reverse",
                 ease: "easeInOut"
                }}
              className="relative"
            >
              <Gift strokeWidth={1} className="w-40 h-40 md:w-60 md:h-60 text-pink-300 group-hover:text-pink-200 transition-colors duration-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]" />
              <Sparkles className="absolute -top-4 -right-4 text-yellow-200 w-12 h-12 animate-pulse" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xl text-pink-200 font-light tracking-widest uppercase"
            >
              Tap to open your gift
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            // We use inline style for background to be safe
            style={{ backgroundColor: '#fdfbf7' }}
            className="max-w-2xl w-full p-8 md:p-12 rounded-xl shadow-2xl border-2 border-pink-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
            <Sparkles className="absolute top-4 right-4 text-pink-300/30 w-20 h-20" />
            
            <div className="relative z-10 text-left">
              {/* Force header color */}
              <h2 style={{ color: '#db2777' }} className="text-3xl font-bold mb-8 font-serif">
                Happy New Year, {NEXT_YEAR}
              </h2>
              
              {/* ☢️ NUCLEAR FIX: Inline style color: #000000 */}
              <div 
                className="font-serif leading-loose text-lg"
                style={{ color: '#000000' }} 
                dangerouslySetInnerHTML={{ __html: THE_LETTER }} 
              />
               <div className="mt-12 flex justify-center">
                  <Heart fill="#f87171" className="text-red-400 w-8 h-8" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#050510] text-white relative font-sans selection:bg-pink-500/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
      </div>

      <div className="fixed top-4 right-4 z-50">
         <button onClick={toggleMusic} className="p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition">
           {isPlaying ? <Music className="text-pink-300 w-5 h-5 animate-pulse" /> : <VolumeX className="text-slate-400 w-5 h-5" />}
         </button>
         <audio ref={audioRef} src="/music.mp3" loop />
      </div>
        
      <AnimatePresence mode="wait">
        {stage === 'opening' && <OpeningView key="view-opening" />}
        {stage === 'journey' && <JourneyView key="view-journey" />}
        {stage === 'interlude' && <InterludeView key="view-interlude" />}
        {stage === 'box' && <BoxView key="view-box" />}
      </AnimatePresence>

    </main>
  );
}