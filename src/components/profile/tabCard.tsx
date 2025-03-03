const TabCard = ({
  title,
  description,
  icon,
  onClick,
  active,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <div
      className={`flex flex-col border-2 ${
        active ? "border-[#B93284]" : "border-[#BBBBBB]"
      } rounded-md p-6 cursor-pointer w-[240px] h-[120px] ${
        active ? "bg-[#FCF4F9]" : "bg-[#F5F5F5]"
      }`}
      style={{ borderRadius: "5px" }}
      onClick={onClick}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
};

export default TabCard;
