import { Button } from "@/components/ui/button";

const creditCards = [
  { bank: "Visa", ending: "5079", holder: "Prasath Siva" },
  { bank: "Visa", ending: "6088", holder: "Prasath Siva" },
  { bank: "Axis Bank", ending: "6088", holder: "Prakash Gururajan" },
];

const paymentMethods = [
  { method: "Credit card", action: null },
  { method: "Net banking", action: <Button>Choose an option</Button> },
];

const Checkout = () => {
  return (
    <div className="mt-20 w-full">
      <div className="font-bold text-[24px]">Secure Checkout</div>
      <div className="text-[#B93284]">
        We secure your payment and personal information <br /> when you share or
        save it with us.
      </div>
      {/* outer div */}
      <div className="flex gap-8 mt-4">
        {/* left div */}
        <div className="w-full">
          {/* upper div */}
          <div className="flex justify-between p-4 shadow-lg shadow-[#00000029] rounded-[13px] h-[143px] mt-6 items-center">
            {/* left div */}
            <div className="flex flex-col justify-around h-full">
              <div className="font-bold text-[18px]">Delivering to Prasath</div>
              <div className="text[16px]">
                No 13, Vinayagar Nagar, 8th Street, Near Godson School Perambur,
                Chennai 99
              </div>
              <div className="text[16px]">Add delivery instructions</div>
            </div>
            {/* right div */}
            <div className="font-bold text-[#B93284]">Change</div>
          </div>
          {/* lower div */}
          <div className="border border-[#D1D1D1] mt-6 rounded-[13px] p-8 space-y-4">
            {/* Header */}
            <div className="flex justify-between">
              <div>Credit Cards</div>
              <div>Card Name</div>
            </div>

            {/* Separator */}
            <hr className="border-gray-300" />

            {/* Credit Card Details */}
            <div className="space-y-2">
              {creditCards.map((card, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    {card.bank} card ending {card.ending}
                  </div>
                  <div>{card.holder}</div>
                </div>
              ))}
              <div>Add another payment</div>
            </div>

            {/* Separator */}
            <hr className="border-gray-300" />

            {/* Payment Methods */}
            <div className="space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>{method.method}</div>
                  <div>{method.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right div */}
        <div className="flex h-full flex-col shadow-md shadow-[#00000029] rounded-[13px] p-6">
          {/* button */}
          <div>
            <Button className="bg-[#B93284] text-white hover:bg-[#9b286d] rounded-[6px] h-[47px]">
              Use this payment method
            </Button>
          </div>
          {/* seperator */}
          <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
          {/* details */}
          <div className="text-[16px] mt-4">
            <div>Items:</div>
            <div>Delivery:</div>
            <div className="font-bold">Order Total: 8989</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
