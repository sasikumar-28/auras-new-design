"use client"
import cartIcon from '@/assets/header-icons/cart-icon.png'
import profileImage from '@/assets/header-icons/profile-image.png'

export default function Header() {
  return (
    <div className= " w-[88vw] bg-white p-4 flex justify-between items-center gap-4">
      <div className=" w-full">
        <input type="text" placeholder="Search" className="border rounded-full w-full bg-gray-200 px-6 py-3 " />
      </div>
      
    <div className="flex gap-6">
      <div className="flex items-center gap-2 bg-[#2C2C2C] rounded-full px-2 ">

      <div className="p-2  bg-[#B93284] rounded-full ">
        <img width={45} src={cartIcon}  alt="cart" />
      </div>
      <p className='text-white text-sm'>4</p>
      <p className='text-gray-500 text-sm'>|</p>
      <p  className='text-white text-sm'>$2309</p>
      </div>
      <div className="">
        <img src={profileImage} alt="profile"  />
      </div>
    </div>
    </div>
  );
}