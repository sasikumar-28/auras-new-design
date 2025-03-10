export const getShoppingAssistantForStore = (store: string) => {
  switch (store.toLowerCase()) {
    case "applebees":
      return appleBeesStoreConfig();
    case "auras":
      return aurasStoreConfig();
    case "claires":
      return clairesStoreConfig();
    default:
      return aurasStoreConfig();
  }
};

const appleBeesStoreConfig = () => {
  return {
    name: "Apple Bees",
    background: "bg-[#AB192D]",
    favicon: "/images/applebees-icon.png",
    tanyaAssistant: {
      flowId: "6OUUQHD3QR",
      aliasId: "1ONDJHZRVW",
    },
  };
};

const clairesStoreConfig = () => {
  return {
    name: "Claires",
    background: "bg-[#553D94]",
    favicon: "/images/auras_logo_white_large.png",
    tanyaAssistant: {
      flowId: "GM3RO4MJ3H",
      aliasId: "5OXE5BUELO",
    },
  };
};

const aurasStoreConfig = () => {
  return {
    name: "AURAS",
    background: "bg-[#A21CAF]",
    favicon: "/images/auras_logo_white_large.png",
    tanyaAssistant: {
      flowId: "GM3RO4MJ3H",
      aliasId: "5OXE5BUELO",
    },
  };
};
