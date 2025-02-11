import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; // Import DOMPurify
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { decode } from "html-entities";
import tanyaChatBotIcon from "@/assets/tanya-chatbot/chat-with-tanya.png";
import dotsHorizontal from "@/assets/tanya-chatbot/dots-horizontal.png";
import arrowDown from "@/assets/tanya-chatbot/arrow-down.png";
import { getAccessToken } from "@/utils/getAccessToken";

const TanyaShoppingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [whom, setWhom] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { query: string; response: string; potentialQuestions: string[] }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Shopping options
  const shoppingOptions = [
    "Myself",
    "My Child",
    "My Grandchild",
    "Niece/Nephew",
    "My Friends",
    "Others",
  ];

  // Handle selecting "whom" option
  const handleWhomSelection = (selected: string) => {
    setWhom(selected);
  };

  // Sanitize response before rendering
  const cleanResponse = (html: string) => {
    const decodedHtml = decode(html);
    return DOMPurify.sanitize(decodedHtml, {
      ALLOWED_TAGS: ["b", "i", "a", "p"],
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += 150; // Scrolls down by 50px
    }
  }, [chatHistory]);

  const handleSendMessage = async (question?: string) => {
    const newQuery = question || inputText.trim();
    if (!newQuery) return;

    setIsLoading(true);
    setInputText("");
    setChatHistory((prev) => [
      ...prev,
      { query: newQuery, response: "", potentialQuestions: [] },
    ]);

    try {
      const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
      if (!SERVER_BASE_URL) {
        console.error("Missing server base URL");
        throw new Error("Missing server base URL");
      }

      // converted whom opton to lowercase and remove spaces
      const sanatizedWhom = whom.replace(/\s/g, "").toLowerCase();

      const token = await getAccessToken();
      if (!token) throw new Error("Failed to fetch token");

      const URL = `${SERVER_BASE_URL}/api/web-bff/assistant`;
      const res = await axios.post(
        URL,
        { prompt: newQuery, storeCode: "commerce-catalyst" },
        {
          params: {
            userId: "1234544",
            pdp: "false",
            whom: sanatizedWhom,
            registered: "false",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { response, potentialQuestions } = res.data;

      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, response: cleanResponse(response), potentialQuestions }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message to Tanya:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded" onClick={() => setIsOpen(true)}>
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="absolute bottom-6 -right-4 w-96 h-96 bg-white p-0 rounded-xl">
        {/* Header */}
        <div className="flex justify-between bg-[#552864] rounded-xl p-1">
          <div className="flex">
            <img src={tanyaChatBotIcon} alt="Chat with Tanya" width={50} />
            <div>
              <p className="text-xs font-light text-white mt-1">Chat with</p>
              <p className="font-bold text-white">
                TANYA{" "}
                <span className="text-xs font-light">(Shopping Assistant)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 m-3">
            <img src={dotsHorizontal} alt="Options" width={15} />
            <img
              src={arrowDown}
              alt="Close Chat"
              width={15}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        {/* Chat Body */}
        <div
          ref={scrollRef}
          className="h-[calc(100vh-310px)] overflow-y-auto pr-5 pb-2 space-y-4 hide-scrollbar"
        >
          <p className="text-sm text-[#000000] bg-[#F1DCFF] rounded-r-xl p-3 m-3 rounded-bl-xl w-3/4">
            Hey there! I'm Tanya, your new AI shopping assistant. Think of me as
            your super helpful friend who knows all the best stuff at Claire's.
            Ready to find something amazing?
          </p>

          <div className="mx-3 bg-blue-800 p-3 rounded-2xl">
            <p className="font-semibold text-white">
              Who are you shopping for?
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {shoppingOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleWhomSelection(option)}
                  className={`px-4 py-2 text-sm border-2 rounded-xl ${
                    whom === option
                      ? "bg-pink-300 text-white"
                      : "bg-transparent text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {whom && (
              <p className="mt-2 text-sm text-white">Selected: {whom}</p>
            )}
          </div>

          {/* Display chat history */}
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <p className="text-sm text-[#000000] bg-[#F1DCFF] rounded-r-xl p-3 m-3 rounded-bl-xl inline-block max-w-[75%]">
                {chat.query}
              </p>
              {chat.response && (
                <div className="flex justify-end">
                  <div
                    className="text-sm text-[#232323] bg-[#FFFFFF] drop-shadow-md px-7 py-4 rounded-r-xl rounded-bl-2xl w-5/6"
                    dangerouslySetInnerHTML={{ __html: chat.response }}
                  />
                </div>
              )}
              {/* Render potential questions below each response */}
              <div className="mt-2 px-4 text-sm text-gray-700 ">
                {chat.potentialQuestions.length > 0 && (
                  <>
                    <p className="font-semibold">
                      Why not explore these inqueries...
                    </p>

                    {chat.potentialQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        className="cursor-pointer text-emerald-700 bg-sky-200 m-1 rounded-xl px-2 py-1"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="m-3 animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700" />
          )}
        </div>

        {/* Input Field */}
        <div className="absolute w-80 bottom-2 left-9 drop-shadow-xl flex rounded">
          <input
            placeholder="Ask me anything"
            className="w-full h-10 rounded-full drop-shadow-xl p-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-6 bottom-3 text-[#552864]"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TanyaShoppingAssistant;
