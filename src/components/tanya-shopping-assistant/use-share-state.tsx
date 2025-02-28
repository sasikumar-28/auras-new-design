import { useState } from "react";

function useShareState() {
  const [selectedKeyword, setSelectedKeyword] = useState("");

  return {
    selectedKeyword,
    setSelectedKeyword, // Expose method to update keyword state
  };
}

export default useShareState;
