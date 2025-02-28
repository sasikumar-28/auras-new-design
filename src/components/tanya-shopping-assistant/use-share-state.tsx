import { useState } from "react";

function useShareState() {
  const [selectedKeyword, setSelectedKeyword] = useState("");

  return {
    selectedKeyword, // Expose keyword state
    setSelectedKeyword, // Expose method to update keyword state
  };
}

export default useShareState;
