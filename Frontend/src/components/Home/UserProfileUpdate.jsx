
import React from 'react'
import { Pencil } from "lucide-react";

const UserProfileUpdate = ({ data }) => {

    const { otherAddress, setOtherAddress } = data

    return (
        <div className="flex-1 p-6 bg-white rounded-xl">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button className="text-[#013E70] cursor-pointer flex items-center gap-1 text-sm">
                    Edit <Pencil size={14} />
                </button>
            </div>

            {/* Form */}
            <form className=" mt-6 grid grid-cols-2 gap-4 text-sm">
                {/* Full Name */}
                <div className="col-span-1">
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input type="text" placeholder="First Name" className="w-full border p-2 rounded" />
                </div>
                <div className="col-span-1 mt-6 ">
                    <input type="text" placeholder="Last Name" className="w-full border p-2 rounded" />
                </div>

                {/* Company Name */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Company Name</label>
                    <input type="text" placeholder="Enter Company Name" className="w-full border p-2 rounded" />
                </div>

                {/* Email Address */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Email Address</label>
                    <input type="email" placeholder="Enter Your Email Address" className="w-full border p-2 rounded" />
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

                {/* Address Label */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Address</label>
                </div>

                {/* Address Fields */}
                <input type="text" placeholder="Enter Your Address" className="border p-2 rounded" />
                <input type="text" placeholder="City Name" className="border p-2 rounded" />
                <input type="text" placeholder="District Name" className="border p-2 rounded" />
                <input type="text" placeholder="Pin Code" className="border p-2 rounded" />
                <div className="col-span-2">
                    <input type="text" placeholder="GST Number*" className="w-full border p-2 rounded" />
                </div>

                {/* Checkboxes */}
                <div className="col-span-2 flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Ship to this Address
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" onClick={() => { setOtherAddress(!otherAddress) }} />
                        Ship to Other Address
                    </label>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default UserProfileUpdate