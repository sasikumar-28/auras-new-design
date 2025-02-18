const TabCard = ({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex flex-col gap-2 border-2 border-[#BBBBBB] rounded-md p-2 cursor-pointer w-[240px] h-[120px] "
      style={{ borderRadius: "5px" }}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};

export default TabCard;
