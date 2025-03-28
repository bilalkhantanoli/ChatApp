import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const baseImage64 = reader.result;
      setSelectedImage(baseImage64);
      await updateProfile({ profilePicture: baseImage64 });
    };
  };

  return (
    <div className="h-screen pt-20 ">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-lg p-6 space-y-8 ">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || user?.profilePicture || '../../public/vite.svg'}
                alt="Profile Picture"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="uploadProfilePicture"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 
                ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  id="uploadProfilePicture"
                  type="file"
                  className="hidden"
                  disabled={isUpdatingProfile}
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? 'Uploading...' : 'Click icon to Upload Profile Picture'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center text-sm text-zinc-400 gap-2">
                <User className="w-5 h-5" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.fullName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center text-sm text-zinc-400 gap-2">
                <Mail className="w-5 h-5" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 p-6 rounded-xl">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user?.createdAt?.split('T')[0]}</span>
              </div>
              <div className="flex justify-between items-center py-2 ">
                <span>Active Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
