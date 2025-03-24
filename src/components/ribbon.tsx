const Ribbon = ({ text }: { text: string }) => {
	return (
	  <div className="fixed top-0 left-0 right-0 bg-black text-white text-center text-xs py-2 z-50">
		{text}
	  </div>
	);
  };
  
export default Ribbon;
  