import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  WidgetContainer,
  ChatBody,
  ChatFooter,
  WelcomeMessage,
  Spinner,
  KeywordLink,
  SubmitButton,
  QuestionLink,
  QuestionItem,
  KeywordItem,
  QuestionList,
  KeywordList,
  PotentialQuestions,
  SearchKeywords,
  GeneralResponse,
  UserQuery,
  SectionTitle,
  ShoppingAssistantButton,
  ResponseContainer,
  InputField,
  ClearHistoryButton,
  Header,
  CloseButton,
} from "./style";
import useShareState from "./use-share-state";
import { useBetween } from "use-between";
import ProductCarousel from "./product-carousel";
import { getAccessToken } from "@/utils/getAccessToken";


// Define types for our response data
interface ResponseData {
  response: string;
  userQuery: string;
  keywords?: string;
  potentialQuestions?: string[];
}

// Define type for keyword results
interface KeywordResultsType {
  [key: string]: boolean | null;
}

const TanyaShoppingAssistant: React.FC = () => {
  const { setSelectedKeyword } = useBetween(useShareState);
  const [query, setQuery] = useState<string>("");
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatbotVisible, setChatbotVisible] = useState<boolean>(false);
  const [keywordResults, setKeywordResults] = useState<KeywordResultsType>({});
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [whom, setWhom] = useState("");

  useEffect(() => {
    const savedResponses = localStorage.getItem("chatHistory");
    const savedVisibility = localStorage.getItem("chatbotVisible");

    if (savedResponses) {
      try {
        setResponses(JSON.parse(savedResponses));
      } catch (error) {
        console.error("Error parsing chat history:", error);
        setResponses([]);
      }
    }

    if (savedVisibility) {
      setChatbotVisible(savedVisibility === "true");
    }
  }, []);

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

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (responses.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(responses));
    }
  }, [responses]);

  // Save chatbot visibility state
  useEffect(() => {
    localStorage.setItem("chatbotVisible", isChatbotVisible.toString());
  }, [isChatbotVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const result = await fetchBackendResponse(query);
    setResponses((prevResponses) => [
      ...prevResponses,
      { ...result, userQuery: query },
    ]);
    setQuery("");
  };

  const fetchBackendResponse = async (input: string): Promise<ResponseData> => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      console.log("getAccessTokenChatBot", token);

      if (!token) throw new Error("Failed to fetch token");
      const URL = `${import.meta.env.VITE_SERVER_BASE_URL}api/web-bff/assistant?pdp=false&whom=grandchild&userId=123456`;
      const response = await axios.post(
        URL,
        { prompt: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("chatbot res", response);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch backend response");
      }
    } catch (error) {
      console.error("Error sending message to Tanya:", error);
      // Return empty response object in case of error
      return {
        response: "Sorry, I couldn't process your request.",
        userQuery: input,
      };
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
    console.log("Selected keyword:", keyword); // Debug log
  };

  const handlePotentialQuestionClick = async (question: string) => {
    setQuery(question);
    const result = await fetchBackendResponse(question);
    // Append new response to the end of the responses array
    setResponses((prevResponses) => [
      ...prevResponses,
      { ...result, userQuery: question },
    ]);
    setQuery("");
  };

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const handleCarouselResultsUpdate = (
    keyword: string,
    hasResults: boolean
  ) => {
    console.log(`Keyword ${keyword} has results: ${hasResults}`); // Debug log
    setKeywordResults((prev) => ({
      ...prev,
      [keyword]: hasResults,
    }));
  };

  // Clear chat history
  const clearChatHistory = () => {
    setResponses([]);
    localStorage.removeItem("chatHistory");
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      const responseContainers = chatBodyRef.current.querySelectorAll(
        "div[data-response-index]"
      );
      const lastResponseContainer =
        responseContainers[responseContainers.length - 1];

      if (lastResponseContainer) {
        lastResponseContainer.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [responses]);

  return (
    <>
      <ShoppingAssistantButton onClick={toggleChatbot}>
        <img
          src="/images/chat-with-tanya.png"
          alt="Chat with Tanya"
          style={{
            width: "160px",
            height: "90px",
            marginRight: "-100px",
            borderRadius: "50%",
            marginBottom: "-40px",
          }}
          onClick={toggleChatbot}
        />
      </ShoppingAssistantButton>

      {isChatbotVisible && (
        <WidgetContainer>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: "rgb(85 40 100 / var(--tw-bg-opacity, 1))", // Adjust background color if needed
            }}
          >
            {/* Left Section - Profile Image & Name */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/chat-with-tanya.png"
                alt="Chat with Tanya"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
              />
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: ".75rem",
                    color: "white",
                    marginRight: "120px",
                    lineHeight: "1rem",
                  }}
                >
                  Chat with
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "white",
                    margin: 0,
                    lineHeight: "1.2rem",
                  }}
                >
                  TANYA
                  <span style={{ fontSize: ".75rem", marginLeft: "5px" }}>
                    (Shopping Assistant)
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section - Icons */}
            <div
              className="flex items-center gap-5"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src="/images/dots-horizontal.png" alt="Options" width={15} />
              <img
                src="/images/arrow-down.png"
                alt="Close Chat"
                width={15}
                className="cursor-pointer"
                onClick={toggleChatbot}
              />
            </div>
          </Header>

          <ChatBody ref={chatBodyRef}>
            <ClearHistoryButton onClick={clearChatHistory}>
              CLEAR HISTORY
            </ClearHistoryButton>
            <WelcomeMessage>
              Hey there! I'm Tanya, your new AI shopping assistant. Think of me
              as your super helpful friend who knows all the best stuff at
              Claire's. Ready to find something amazing?
            </WelcomeMessage>
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
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spinner />
              </div>
            ) : (
              responses.map((response, index) => (
                <ResponseContainer key={index} data-response-index={index}>
                  <UserQuery>{response.userQuery}</UserQuery>
                  <GeneralResponse
                    dangerouslySetInnerHTML={{
                      __html: response.response
                        ? response.response.replace("<pre>", "<div>")
                        : "",
                    }}
                  ></GeneralResponse>
                  {response.keywords && (
                    <SearchKeywords>
                      <SectionTitle style={{ marginTop: "20px" }}>
                        Explore these options to enhance your experience.
                      </SectionTitle>
                      <KeywordList>
                        {(typeof response.keywords === "string"
                          ? response.keywords.split(",")
                          : response.keywords
                        )?.map((keyword, index) => (
                          <KeywordItem key={index}>
                            <KeywordLink
                              onClick={() => handleKeywordClick(keyword.trim())}
                            >
                              {keyword.trim()}
                            </KeywordLink>
                            <ProductCarousel
                              keywords={keyword.trim()}
                              onResultsUpdate={(hasResults) =>
                                handleCarouselResultsUpdate(
                                  keyword.trim(),
                                  hasResults
                                )
                              }
                            />
                          </KeywordItem>
                        ))}
                      </KeywordList>
                    </SearchKeywords>
                  )}

                  {response.potentialQuestions && (
                    <PotentialQuestions>
                      <SectionTitle style={{ marginTop: "20px" }}>
                        Why not explore these inquiries...
                      </SectionTitle>
                      <QuestionList>
                        {response.potentialQuestions.map((question, index) => (
                          <QuestionItem
                            style={{
                              color: "black",
                              padding: "10px 0",
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                            key={index}
                          >
                            <QuestionLink
                              style={{
                                backgroundColor:
                                  "rgb(186 230 253 / var(--tw-bg-opacity, 1))",
                                borderRadius: "20px",
                                color:
                                  "rgb(4 120 87 / var(--tw-text-opacity, 1))",
                              }}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePotentialQuestionClick(question);
                              }}
                            >
                              {question}
                            </QuestionLink>
                          </QuestionItem>
                        ))}
                      </QuestionList>
                    </PotentialQuestions>
                  )}
                </ResponseContainer>
              ))
            )}
          </ChatBody>
          <ChatFooter>
            <form
              style={{ display: "flex", alignItems: "center" }}
              onSubmit={handleFormSubmit}
            >
              <InputField
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Ask me anything"
                style={{ color: "black" }}
              />
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          </ChatFooter>
        </WidgetContainer>
      )}
    </>
  );
};

export default TanyaShoppingAssistant;