import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tanyaChatBotIcon from "@/assets/tanya-chatbot/chat-with-tanya.png";
import dotsHorizontal from "@/assets/tanya-chatbot/dots-horizontal.png";
import arrowDown from "@/assets/tanya-chatbot/arrow-down.png";

const TanyaShoppingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded" onClick={() => setIsOpen(true)}>
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="absolute bottom-6 -right-4 w-96 h-96 bg-white p-0 rounded-xl">
        {/* header */}
        <div className="flex justify-between space-y-2 bg-[#552864] rounded-xl p-1">
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
        {/* body */}
        <div className="p-2">
          <p className="text-sm text-[#000000] bg-[#F1DCFF] rounded-r-xl p-3 m-3 rounded-bl-xl w-3/4">
            Hey there! I'm Tanya, your new AI shopping assistant. Think of me as
            your super helpful friend who knows all the best stuff at Claire's.
            Ready to find something amazing?
          </p>

          <div className="absolute w-80 bottom-3 left-9 drop-shadow-xl flex rounded">
            <input
              placeholder="Ask me anything"
              className="w-full h-10 rounded-full drop-shadow-xl p-4"
            />
            <button className="absolute right-6 bottom-3">Send</button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TanyaShoppingAssistant;
