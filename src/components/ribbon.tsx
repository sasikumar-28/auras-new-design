const Ribbon = ({ text }: { text: string }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white text-center text-xs py-2 z-50 flex justify-center items-center font-semibold">
      <span>{text}</span>
      <a
        href="?shoppingassist=true"
        className="absolute right-4 underline text-xs "
      >
        AI Shopping Assistant
      </a>
    </div>
  );
};

export default Ribbon;
