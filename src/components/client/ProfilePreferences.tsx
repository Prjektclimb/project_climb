'use client'

import React, { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export function ProfilePreferences() {
  const [formData, setFormData] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., sending data to a server
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center h-screen'
    >
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit
      </button>
    </form>
  );
};


