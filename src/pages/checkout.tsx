import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAddress } from "@/hooks/useAddress";
import { Address, Product } from "@/graphQL/queries/types";
import { initialCapital, laterDate } from "@/utils/helper";
import { useSelector } from "react-redux";
import CheckoutProductCard from "@/components/cart/checkoutProductCard";

const creditCards = [
  { bank: "Visa", ending: "5079", holder: "User one" },
  { bank: "Visa", ending: "6088", holder: "User one" },
  { bank: "Axis Bank", ending: "6088", holder: "User one" },
];

const paymentMethods = [
  {
    method: "Credit card",
    action: (
      <div className="flex gap-2">
        <Icon icon="logos:visa" width="35" height="35" />
        <Icon icon="logos:mastercard" width="35" height="35" />
        <Icon icon="logos:cirrus" width="35" height="35" />
      </div>
    ),
  },
  {
    method: "Net banking",
    action: (
      <Button className="bg-[#F3F3F3] border border-[#B5B5B5] hover:bg-gray-200 rounded text-black">
        Choose an option
      </Button>
    ),
  },
];

const Checkout = () => {
  const selectedProduct = useSelector((state: any) => state.cart.cart);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [enablePay, setEnablePay] = useState<boolean>(false);
  const { itemShippingAddresses: addressList } = useAddress();
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    addressList[0]
  );
  useEffect(() => {
    setSelectedAddress(addressList[0]);
  }, [addressList]);

  return (
    <div className="w-full h-[95vh] overflow-y-scroll">
      <div className="font-bold text-[24px]">Secure Checkout</div>
      <div className="text-[#B93284]">
        We secure your payment and personal information <br /> when you share or
        save it with us.
      </div>
      {/* outer div */}
      <div className="flex gap-8 mt-4 p-3">
        {/* left div */}
        <div className="w-full">
          {/* upper div */}
          <div className="flex justify-between p-4 shadow-lg shadow-[#00000029] rounded-[13px] h-[143px] mt-6 items-center">
            {/* left div */}
            <div className="flex flex-col justify-around h-full">
              <div className="font-bold text-[18px]">
                Delivering to {initialCapital(selectedAddress?.firstName || "")}
              </div>
              <div className="text[16px]">
                {selectedAddress?.streetName}, {selectedAddress?.city},{" "}
                {selectedAddress?.state}
              </div>
              <div className="text[16px]">Add delivery instructions</div>
            </div>
            {/* right div */}
            <div className="font-bold text-[#B93284]">Change</div>
          </div>
          {/* lower div */}
          {enablePay ? (
            <>
              <div className="border border-[#D1D1D1] mt-6 rounded-[13px] p-8 space-y-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-[18px]">
                    Paying with {creditCards[selectedOption].bank}{" "}
                    {creditCards[selectedOption].ending}
                  </div>
                  <div>Use a gift card, voucher or promo code</div>
                </div>
                <div className="h-full">
                  <div
                    className="font-bold text-[#B93284] cursor-pointer"
                    onClick={() => setEnablePay(false)}
                  >
                    Change
                  </div>
                </div>
              </div>
              <div className="border border-[#D1D1D1] mt-6 rounded-[13px] p-8 space-y-4 max-h-[50vh] overflow-y-auto">
                <div>
                  <div className="font-bold text-[18px]">
                    Arriving at {laterDate(5)}
                  </div>
                  <div className=" text-[14px] mt-2">
                    Eligible for FREE Shipping
                  </div>
                </div>
                {selectedProduct.map((product: Product, i: number) => (
                  <CheckoutProductCard product={product} key={i} />
                ))}
              </div>
            </>
          ) : (
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
                <RadioGroup>
                  {creditCards.map((card, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <RadioGroupItem
                          onClick={() => setSelectedOption(index)}
                          value={String(index)}
                          id="r1"
                        />{" "}
                        {card.bank} card ending {card.ending}
                      </div>
                      <div>{card.holder}</div>
                    </div>
                  ))}
                </RadioGroup>
                <div>Add another payment</div>
              </div>

              {/* Separator */}
              <hr className="border-gray-300" />

              {/* Payment Methods */}
              <div className="space-y-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>{method.method}</div>
                    <div>{method.action}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* right div */}
        <div className="flex h-full w-[310px] flex-col shadow-md shadow-[#00000029] rounded-[13px] p-6">
          {/* button */}
          <div>
            <Button
              disabled={selectedOption == -1}
              onClick={() => {
                setEnablePay(!enablePay);
              }}
              className="bg-[#B93284] text-white hover:bg-[#9b286d] rounded-[6px] h-[47px] w-full"
            >
              {enablePay != false ? "Pay now" : "Use this payment method"}
            </Button>
          </div>
          {/* seperator */}
          <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
          {/* details */}
          <div className="text-[16px] mt-4">
            <div>Items:</div>
            <div>Delivery:</div>
            <div className="font-bold flex justify-between">
              <div> Order Total: </div>
              <div>
                {selectedProduct
                  .reduce(
                    (acc: number, item: Product) =>
                      acc +
                      (item?.masterVariant?.prices[0]?.value?.centAmount || 0) *
                        (item.quantity || 1),
                    0
                  )
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency:
                      selectedProduct[0]?.masterVariant?.prices[0].value
                        .currencyCode || "USD",
                    minimumFractionDigits: 0, // Ensure no decimal points
                    maximumFractionDigits: 0, // Limit to whole numbers only
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
