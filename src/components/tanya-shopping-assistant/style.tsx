import styled from "styled-components";

export const WidgetContainer = styled.div`
  width: 35%;
  height: 490px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 80px; /* Adjusted to avoid overlapping */
  right: 40px; /* Slightly away from the edge for better spacing */
  z-index: 3500; /* Increased to stay on top of other elements */
`;

export const HeaderControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ClearHistoryButton = styled.button`
  background-color: #7c74dd;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  margin-left: 280px;
  padding: 5px 10px;

  &:hover {
    background-color: #6861d1;
  }
`;

export const Header = styled.div`
  background-color: rgb(85 40 100 / var(--tw-bg-opacity, 1));
  color: black;
  font-size: 18px;
  font-weight: 700;
  padding: 15px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: white;

  &:hover {
    color: #ff6b6b;
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #fff;
`;

export const ChatFooter = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  margin-right: 10px;
  width: 260px;
`;

export const ResponseContainer = styled.div`
  margin-bottom: 20px;
`;

export const ShoppingAssistantButton = styled.div`
  position: fixed;
  bottom: 30px; /* Positioned slightly higher for better spacing */
  right: 55px; /* Matches chat window positioning */
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  z-index: 2500; /* Ensures the button stays above most elements */
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600px;
  margin-bottom: 10px;
  color: black;
`;

export const UserQuery = styled.div`
  padding: 15px;
  border-radius: 2px 12px 10px;
  margin-bottom: 10px;
  color: black;
  font-size: 0.875rem;
  background-color: rgb(241 220 255 / var(--tw-bg-opacity, 1));
  width: 200px;
  margin-top: 30px;
`;

export const GeneralResponse = styled.div`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: rgb(35 35 35 / var(--tw-text-opacity, 1));
  border-radius: 10px;
`;

export const SearchKeywords = styled.div`
  margin-bottom: 10px;
`;

export const PotentialQuestions = styled.div`
  margin-bottom: 10px;
`;

export const KeywordList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const KeywordItem = styled.li`
  margin-bottom: 5px;
`;

export const QuestionItem = styled.li`
  margin-bottom: 5px;
`;

export const KeywordLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const QuestionLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  width: "30%";
  height: "20px";

  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #5b50d6;
  }
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StaticMessage = styled.div`
  background-color: rgb(206 245 249);
  color: #333;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
`;

export const WelcomeMessage = styled(StaticMessage)`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(241 220 255 / var(--tw-bg-opacity, 1));
  font-size: 0.875rem;
  border-radius: 2px 12px 20px;
`;
