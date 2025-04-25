import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  themeColor?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  themeColor = "#333",
}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    showScrollButton && (
      <button
        onClick={scrollToTop}
        className="fixed right-3 bottom-5 p-3 rounded-full shadow-lg transition-all duration-300 z-[40]"
        style={{ color: "white", background: themeColor }}
      >
        <ArrowUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopButton;
