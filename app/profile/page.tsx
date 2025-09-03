"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock user data to simulate fetching from a database
const MOCK_USER_DATA = {
  name: "สมชาย รักสุขภาพ",
  email: "somchai@example.com",
  gender: "male",
  profileImage: "/default-profile.png", // Default image or a user's image URL
};

export default function Profile() {
  const [formData, setFormData] = useState({
    name: MOCK_USER_DATA.name,
    email: MOCK_USER_DATA.email,
    password: "",
    gender: MOCK_USER_DATA.gender,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    MOCK_USER_DATA.profileImage
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Revert to original image if selection is cleared
      setPreviewImage(MOCK_USER_DATA.profileImage);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to update user profile goes here
    console.log("Profile updated!", {
      ...formData,
      profileImage: previewImage,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          แก้ไขข้อมูลโปรไฟล์
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview */}
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-gray-700">รูปโปรไฟล์</p>
            <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-blue-500 shadow-md">
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Profile Preview"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>

            <label
              htmlFor="profileImage"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-500 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition-colors hover:bg-blue-100"
            >
              เลือกรูปภาพใหม่
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          {/* Form Inputs */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ชื่อ-สกุล
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              อีเมล์
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              id="password"
              type="password"
              placeholder="กรอกรหัสผ่านใหม่ (หากต้องการเปลี่ยน)"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              เพศ
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">ชาย</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">หญิง</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4">
            <Link href="/dashboard" className="w-1/2">
              <div className="transform rounded-full border border-gray-300 bg-white py-2.5 text-center font-semibold text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100">
                ย้อนกลับ
              </div>
            </Link>
            <button
              type="submit"
              className="w-1/2 transform rounded-full bg-blue-600 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
