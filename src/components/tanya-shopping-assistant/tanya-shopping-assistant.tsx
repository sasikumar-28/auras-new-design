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
import { getSearchResults } from "@/utils";
import { SearchProduct } from "@/graphQL/queries/types";
import {
  currencyFormatter,
  displayData,
  imageUrlArray,
  initialCapital,
  priceFormatter,
  stringReducer,
} from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const TanyaShoppingAssistant = () => {
  // Shopping options
  const shoppingOptions = [
    "Myself",
    "My Child",
    "My Grandchild",
    "Niece/Nephew",
    "My Friends",
    "Others",
  ];
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [whom, setWhom] = useState(shoppingOptions[0]);
  const [chatHistory, setChatHistory] = useState<
    {
      query: string;
      response: string;
      potentialQuestions: string[];
      products?: { keyword: string; items: SearchProduct[] }[];
      keywords: string;
    }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      {
        query: newQuery,
        response: "",
        potentialQuestions: [],
        products: [],
        keywords: "",
      },
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
          timeout: 20000,
        }
      );
      const { response, potentialQuestions, keywords } = res.data;
      if (res.data.keywords) {
        getKeywords(res.data.keywords);
        // getKeywords("sofa,sofa");
      }
      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? {
                ...msg,
                response: cleanResponse(response),
                potentialQuestions,
                keywords,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message to Tanya:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getKeywords = async (keywords: string[] | string) => {
    if (typeof keywords === "string") {
      const splitedKeywords = keywords.split(",");
      for (const keyword of splitedKeywords) {
        const results = await getSearchResults(keyword);
        if (results.length > 0) {
          setChatHistory((prev) =>
            prev.map((msg, idx) =>
              idx === prev.length - 1
                ? {
                    ...msg,
                    products: [
                      ...(msg.products || []),
                      { keyword: keyword, items: results },
                    ],
                  }
                : msg
            )
          );
        }
      }
    } else {
      for (const keyword of keywords) {
        const results = await getSearchResults(keyword);
        console.log(results, "result one");
        if (results.length > 0) {
          setChatHistory((prev) =>
            prev.map((msg, idx) =>
              idx === prev.length - 1
                ? {
                    ...msg,
                    products: [
                      ...(msg.products || []),
                      { keyword: keyword, items: results },
                    ],
                  }
                : msg
            )
          );
        }
      }
    }
  };
  console.log(chatHistory, "chat history");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded" onClick={() => setIsOpen(true)}>
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="absolute bottom-6 -right-4 w-[436px] h-[524px] border-0 bg-white p-0 rounded-xl">
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
          className="h-5/6 overflow-y-auto pr-5 pb-2 space-y-4 hide-scrollbar"
        >
          <p className="text-sm text-[#000000] text-[16px] bg-[#F1DCFF] rounded-r-xl p-3 m-3 rounded-bl-xl w-3/4">
            Hey there! I'm Tanya, your new AI shopping assistant. Think of me as
            yoursuper helpful friend who knows all the best stuff at Claire's.
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
              <div className="flex justify-end">
                <p className="text-sm text-[white] bg-[#804C9E] rounded-l-xl p-3 m-3 mb-4 rounded-br-xl roud inline-block max-w-[75%]">
                  {chat.query}
                </p>
              </div>
              {chat.response && (
                <div className="mt-4">
                  <div
                    className="text-sm text-[#232323] bg-[#FFFFFF] px-7 py-4 rounded-r-xl rounded-bl-2xl w-full"
                    dangerouslySetInnerHTML={{ __html: chat.response }}
                  />
                </div>
              )}
              {chat?.products && chat?.products?.length > 0 && (
                <div className="flex">
                  <div className="text-sm text-[#232323] bg-[#FFFFFF] px-7 py-4 rounded-r-xl rounded-bl-2xl w-full">
                    <div className="font-semibold text-[#804C9E]">
                      Explore these options to enhance your experience
                    </div>
                    {chat?.products &&
                      chat?.products?.map((product) => (
                        <div>
                          <div className="border border-[#804C9E] text-[#804C9E] w-fit rounded-[17px] p-2 my-2 bg-[#F1DCFF] font-bold">
                            {initialCapital(product.keyword)}
                          </div>
                          <div className="flex gap-2">
                            {product.items.slice(0, 5).map((item, e) => (
                              <div
                                key={e}
                                className="flex flex-col w-[100px] h-[80px] items-center gap-2 cursor-pointer relative shadow-lg"
                                onClick={() => {
                                  localStorage.setItem(
                                    "product",
                                    JSON.stringify(item)
                                  );
                                  navigate(
                                    `/product/${item?.objectID}?category=${item?.categoryPageId[0]}&productCard=true`
                                  );
                                }}
                              >
                                <img
                                  src={imageUrlArray(item)[0]}
                                  alt={displayData(item?.name["en-US"])}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div className="absolute flex flex-col items-center justify-center text-black bg-[#E9D2F9] w-full rounded-[3px] bottom-0 h-[33px] text-[8px] font-bold">
                                  <div>
                                    {currencyFormatter(
                                      priceFormatter(item).centAmount || 0,
                                      priceFormatter(item).currencyCode || "USD"
                                    )}
                                  </div>
                                  <div>
                                    {stringReducer(
                                      displayData(item?.name["en-US"]),
                                      10
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Render potential questions below each response */}

              {chat.potentialQuestions.length > 0 && (
                <div className="my-2 mb-8 px-4 text-sm text-gray-700 ">
                  <p className="font-semibold text-[#804C9E]">
                    Why not explore these inqueries...
                  </p>

                  {chat.potentialQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      className="cursor-pointer text-[#232323] border bg-[#804C9E0D] border-[#804C9E] m-1 rounded-xl px-2 py-1"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="absolute w-4/5 bottom-2 left-9 drop-shadow-xl flex items-center rounded-full bg-white">
          <input
            placeholder="Ask me anything"
            className="w-full rounded-full p-4 h-[61px] outline-none border-none focus:ring-0 focus:border-transparent"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mr-6 text-[#552864] font-medium"
            onClick={() => handleSendMessage()}
          >
            {isLoading ? (
              <div className="m-3 animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700" />
            ) : (
              <Icon
                icon="fluent:send-48-filled"
                color="purple-700"
                width="24"
                height="24"
              />
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TanyaShoppingAssistant;
