import React, { useState } from "react";
import { assets } from "../assets/assets";
import { createAddress } from "../api/api";
import toast from "react-hot-toast";
import {
  Mail,
  MapPin,
  Phone,
  User,
  Globe,
  Building2,
  Landmark,
  Hash,
} from "lucide-react";

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  name,
  handleChange,
  address,
}) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>

      <input
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:shadow-md"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
      />
    </div>
  );
};

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createAddress({ ...address });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating address");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden lg:flex">
          <img
            className="h-full w-full object-cover"
            src={assets.address}
            alt="Address"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-10 left-10 z-10 max-w-md text-white">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary/80">
              Delivery Information
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Fast & Secure Shipping Experience
            </h1>

            <p className="mt-5 text-sm leading-7 text-gray-200">
              Add your delivery address to enjoy smooth, reliable, and secure
              order shipping directly to your doorstep.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Shipping Address
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              Add New Address
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill in your address information below.
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                icon={User}
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />

              <InputField
                icon={User}
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              icon={Mail}
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            <InputField
              icon={MapPin}
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street Address"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                icon={Building2}
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />

              <InputField
                icon={Landmark}
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                icon={Hash}
                handleChange={handleChange}
                address={address}
                name="pinCode"
                type="text"
                placeholder="Pin Code"
              />

              <InputField
                icon={Globe}
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              icon={Phone}
              handleChange={handleChange}
              address={address}
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
            />

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
