import { useEffect, useState } from "react";

const LOGO_TEXT = "UURJA";

const SplashScreen = ({ show,onFinish }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [blinkLogo, setBlinkLogo] = useState(false);
  const [exit, setExit] = useState(false);
  const [logoBlinkCount, setLogoBlinkCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  
  // Typing effect (slow + premium)
  useEffect(() => {
    if (index < LOGO_TEXT.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + LOGO_TEXT[index]);
        setIndex(index + 1);
      }, 200);
      return () => clearTimeout(timer);
    }

    //blinkcount
    if (index === LOGO_TEXT.length) {
      setTimeout(() => setShowWelcome(true), 500);

      const blinkInterval = setInterval(() => {
        setLogoBlinkCount((prev) => prev + 1);
      }, 400);

      setTimeout(() => {
        clearInterval(blinkInterval);
      }, 1600);

      setTimeout(() => setExit(true), 4200);
      setTimeout(() => onFinish(), 5200);
    }

    // After typing complete
    if (index === LOGO_TEXT.length && !typingDone) {
      setTimeout(() => setShowWelcome(true), 500);
      setTimeout(() => setBlinkLogo(true), 700);
      setTimeout(() => setBlinkLogo(false), 2500);
      setTimeout(() => setExit(true), 3000);
      setTimeout(() => onFinish(), 4200);
      setTypingDone(true);

    }
  }, [index, onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center
      bg-[#822761] transition-opacity duration-1000 ease-in-out ${exit ? "opacity-0" : "opacity-100"}`} >
      
      <div className={`text-center text-white transform transition-all duration-1000
        ${exit ? "-translate-x-[35vw] -translate-y-[35vh] scale-50 opacity-0" : ""}`} >
       
        {/* LOGO */}
        <h1 className={`text-5xl md:text-6xl font-heading tracking-widest drop-shadow-[0_4px_12px_rgba(212,175,55,0.55)]
        ${logoBlinkCount % 2 === 1 ? "opacity-60" : "opacity-100"} transition-opacity duration-200`}>
          {text}
          {!typingDone && (
            <span className="animate-blink ml-1">|</span>
          )}
        </h1>

        {/* WELCOME TEXT */}
        {showWelcome && (
          <p className="mt-4 text-xl tracking-wide animate-fadeIn">
            Welcome to UURJA
          </p>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;

