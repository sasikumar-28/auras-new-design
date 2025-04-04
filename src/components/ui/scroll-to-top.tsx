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
    const scrollContainer = document.querySelector(
      ".scrollable-content",
    ) as HTMLElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setShowScrollButton(scrollContainer.scrollTop > 50);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    document
      .querySelector(".scrollable-content")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    showScrollButton && (
      <button
        onClick={scrollToTop}
        className="fixed right-3 bottom-5 p-3 rounded-full shadow-lg transition-all duration-300 z-[999]"
        style={{ color: "white", background: themeColor }}
      >
        <ArrowUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopButton;
