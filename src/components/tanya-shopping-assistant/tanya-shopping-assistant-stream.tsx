/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tanyaChatBotIcon from "@/assets/tanya-chatbot/chat-with-tanya.png";
import dotsHorizontal from "@/assets/tanya-chatbot/dots-horizontal.png";
import arrowDown from "@/assets/tanya-chatbot/arrow-down.png";
import { getAccessToken } from "@/utils/getAccessToken";
import { getSearchResults } from "@/utils";
import { SearchProduct } from "@/graphQL/queries/types";
import {
  // currencyFormatter,
  formatStringToHtml,
  // priceFormatter,
} from "@/utils/helper";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductDisplay from "../carousel/ProductDisplay";
import { useSelector } from "react-redux";

const TanyaShoppingAssistantStream = () => {
  // Shopping options
  const shoppingOptions = [
    "himself",
    "Myself",
    "My Child",
    "My Grandchild",
    "Niece/Nephew",
    "My Friends",
    "Others",
  ];
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [whom, setWhom] = useState(shoppingOptions[0]);
  const [chatHistory, setChatHistory] = useState<
    {
      query: string;
      response: string;
      potentialQuestions: string;
      products?: { keyword: string; items: SearchProduct[] }[];
      keywords: string;
    }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const storeDetails = useSelector((s: any) => s.store.store);

  // Handle selecting "whom" option
  const handleWhomSelection = (selected: string) => {
    setWhom(selected);
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
        potentialQuestions: "",
        products: [],
        keywords: "",
      },
    ]);

    try {
      const sanatizedWhom = whom.replace(/\s/g, "").toLowerCase();
      const token = await getAccessToken();
      if (!token) throw new Error("Failed to fetch token");

      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/web-bff/assistantStream`;
      const response = await fetch(`${URL}`, {
        signal: AbortSignal.timeout(30000),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          flowId: storeDetails.flowId,
          flowAliasId: storeDetails.aliasId,
          input: {
            userPrompt: newQuery,
            whom: sanatizedWhom,
          },
        }),
      });

      if (!response.body) throw new Error("Readable stream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let keywords = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data:")) {
            // Extract the JSON data from the "data" field
            const jsonData = line.slice(5).trim();
            try {
              const parsedData = JSON.parse(jsonData);
              if (parsedData.index == 1) keywords = parsedData.data;

              setChatHistory((prev) =>
                prev.map((msg, idx) =>
                  idx === prev.length - 1
                    ? {
                        ...msg,
                        [parsedData.index == 0
                          ? "response"
                          : parsedData.index == 1
                          ? "keywords"
                          : "potentialQuestions"]: parsedData.data,
                      }
                    : msg
                )
              );
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }
      getKeywords(sanitizeKeywords(keywords));
    } catch (error) {
      console.error("Error sending message to Tanya:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizeKeywords = (response: string) => {
    const keywordMatch = response.match(
      /top five relevant product or category names are: (.*)/i
    );
    const keywordsString = keywordMatch ? keywordMatch[1] : response;
    const keywordsArray = keywordsString.split(", ");
    const sanitizedKeywords = keywordsArray.map((keyword) => {
      return keyword.replace(/\s*(Toys|Bags|Miniature|etc\.*)\s*/gi, "").trim();
    });
    const uniqueKeywords = [...new Set(sanitizedKeywords)].filter(Boolean);
    return uniqueKeywords.join(",");
  };

  const getKeywords = async (keywords: string[] | string) => {
    if (typeof keywords === "string") {
      console.log("in one string");
      const splitedKeywords = keywords.split(",");
      for (const keyword of splitedKeywords) {
        const results = await getSearchResults(
          keyword,
          storeDetails.searchConfigs
        );
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
      console.log("in two string");
      for (const keyword of keywords) {
        const results = await getSearchResults(
          keyword,
          storeDetails.searchConfigs
        );
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
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded" onClick={() => setIsOpen(true)}>
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="absolute bottom-6 -right-4 w-[646px] h-[564px] border-0 bg-white p-0 rounded-xl">
        {/* Header */}
        <div
          className={`flex justify-between rounded-xl p-1`}
          style={{ background: storeDetails.tanyaThemeColor }}
        >
          <div
            className="flex"
            style={{ color: storeDetails.themeContrastColor }}
          >
            <img src={tanyaChatBotIcon} alt="Chat with Tanya" width={50} />
            <div>
              <p className="text-xs font-light mt-1">Chat with</p>
              <p className="font-bold">
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
          className="h-[440px] overflow-y-auto pr-5 pb-2 space-y-4 hide-scrollbar"
        >
          <div
            className={`text-sm text-[16px]
               rounded-r-xl p-3 m-3 rounded-bl-xl w-3/4`}
            style={{
              backgroundColor: storeDetails.tanyaThemeColorLight,
              // color: storeDetails.themeContrastColor,
            }}
          >
            Hey there! I'm Tanya, your new AI shopping assistant. Think of me as
            your super helpful friend who knows all the best stuff at{" "}
            {storeDetails.websiteTitle}. Ready to find something amazing?
          </div>
          {storeCode != "applebees" && (
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
          )}

          {/* Display chat history */}
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="flex justify-end">
                <p
                  style={{
                    color: storeDetails.themeContrastColor,
                    backgroundColor: storeDetails.themeColor,
                  }}
                  className={`text-sm rounded-l-xl p-3 m-3 mb-4 rounded-br-xl roud inline-block max-w-[75%]`}
                >
                  {chat.query}
                </p>
              </div>
              {chat.response && (
                <div className="mt-4">
                  <div
                    className="text-sm text-[#232323] bg-[#FFFFFF] px-7 py-4 rounded-r-xl rounded-bl-2xl w-full"
                    dangerouslySetInnerHTML={{
                      __html: formatStringToHtml(chat.response),
                    }}
                  />
                </div>
              )}
              {chat?.products && chat?.products?.length > 0 && (
                // <ProductCarousel products={chat.products} navigate={navigate} />
                <ProductDisplay
                  chat={chat.products}
                  storeDetails={storeDetails}
                />
              )}

              {/* Render potential questions below each response */}

              {chat.potentialQuestions.length > 0 && (
                <div className="my-2 mb-8 px-4 text-sm text-gray-700 ">
                  <p
                    className={`font-semibold text-${storeDetails.themeDarkColor}`}
                    style={{
                      color: storeDetails.themeDarkColor,
                    }}
                  >
                    Why not explore these inqueries...
                  </p>

                  {chat?.potentialQuestions
                    ?.split(",")
                    // .split(`\\n`)
                    .map((question: string, idx: number) => (
                      <button
                        key={idx}
                        className={`cursor-pointer text-[#232323] border bg-[#804C9E0D] border-${storeDetails.themeDarkColor} m-1 rounded-xl px-2 py-1`}
                        onClick={() => handleSendMessage(question)}
                        style={{
                          color: storeDetails.themeDarkColor,
                        }}
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
        <div className="absolute w-4/5 bottom-2 left-20 drop-shadow-xl flex items-center rounded-full bg-white">
          <input
            placeholder="Ask me anything"
            className="w-full rounded-full p-4 h-[61px] outline-none border-none focus:ring-0 focus:border-transparent"
            value={inputText}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`mr-6 text-[${storeDetails.themeDarkColor}] font-medium`}
            style={{
              color: storeDetails.themeDarkColor,
            }}
            onClick={() => handleSendMessage()}
          >
            {isLoading ? (
              <div
                className={`m-3 animate-spin rounded-full h-6 w-6 border-b-2`}
                style={{
                  border: storeDetails.tanyaThemeColor,
                  borderBottom: "2px solid",
                }}
              />
            ) : (
              <Icon
                icon="fluent:send-48-filled"
                color={storeDetails.tanyaThemeColor}
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

export default TanyaShoppingAssistantStream;
