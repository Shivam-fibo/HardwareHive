import React from 'react'
import {  Pencil} from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";

const UserProfileAddressUpadte = () => {
    
    return (
        <div className="flex-1 p-6 bg-white rounded-xl">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">To Shipping Address </h2>
                <button className="text-[#013E70] cursor-pointer flex items-center gap-1 text-sm">
                    Edit <Pencil size={14} />
                </button>
            </div>

            <form className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Company Name</label>
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">GST Number</label>
                    <input
                        type="text"
                        placeholder="GST Number"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Address</label>
                </div>
                <input
                    type="text"
                    placeholder="Enter Your Address"
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="City Name"
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="District Name"
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Pin Code"
                    className="border p-2 rounded"
                />

                <div className="col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Saved Addresses */}
            <h3 className="text-md font-semibold mt-10 mb-4">Saved Address</h3>
            <div className="space-y-4">
                <div className="border border-gray-300 rounded-md p-4 shadow-sm relative">
                    <h4 className="font-semibold text-sm">S... SHOP</h4>
                    <p className="text-xs text-gray-600">
                        Suresh Das 7xxxxxxxxx <br />
                        Baradfmasi lane, Nafvgdfg Sdfg District, Odifgfa - 75fg69
                    </p>
                    <button className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-black">
                        <CiMenuKebab size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserProfileAddressUpadte