
import React from 'react'
import { RxCross2 } from "react-icons/rx";

const UserProfileUpdate = ({data}) => {

    const {setEditProfile, editProfile} = data;

    return (
        <div className="flex-1 p-6 bg-white rounded-xl">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button onClick={() => setEditProfile(!editProfile)} className="text-[#013E70] cursor-pointer flex items-center gap-1 text-sm  top-4 right-4 ">
                     <RxCross2 size={20} />
                </button>
            </div>

            {/* Form */}
            <form className=" mt-6 grid grid-cols-2 gap-4 text-sm">
                {/* Full Name */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
                </div>

                {/* Company Name */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Company Name</label>
                    <input type="text" placeholder="Enter Company Name" className="w-full border p-2 rounded" />
                </div>

                {/* Mobile Number */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Mobile Number</label>
                    <input type="tel" placeholder="Enter Your Mobile Number" className="w-full border p-2 rounded" />
                </div>


                {/* WhatsApp Number */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">WhatsApp Number</label>
                    <input type="tel" placeholder="Enter Your WhatsApp Number" className="w-full border p-2 rounded" />
                </div>

                {/* Email Address */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Email Address</label>
                    <input type="email" placeholder="Enter Your Email Address" className="w-full border p-2 rounded" />
                </div>

                <div className="col-span-2 grid grid-cols-2">
                    {/* Address Label */}
                    <div className="col-span-2">
                        <label className="block mb-1 font-medium">Address</label>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        {/* Address Fields */}
                        <input type="text" placeholder="Enter Your Address" className="border p-2 rounded grid-cols-2 col-span-2" />
                        <input type="text" placeholder="City Name" className="border p-2 rounded" />
                        <input type="text" placeholder="District Name" className="border p-2 rounded" />
                        <input type="text" placeholder="State" className="border p-2 rounded" />
                        <input type="text" placeholder="Pin Code" className="border p-2 rounded" />
                        <div className="col-span-2">
                            <input type="text" placeholder="GST Number*" className="w-full border p-2 rounded" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default UserProfileUpdate