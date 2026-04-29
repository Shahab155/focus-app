"use client";

import { useActionState } from "react";
import { updateProfile, updatePassword } from "@/lib/actions/user";
import { Container } from "@/components/ui/Container";
import { useEffect, useState, useRef } from "react";

export default function ProfilePage() {
  const [profileState, profileAction, isProfilePending] = useActionState(updateProfile, null);
  const [passwordState, passwordAction, isPasswordPending] = useActionState(updatePassword, null);
  
  const [userData, setUserData] = useState<{ name: string; email: string; image: string; hasPassword?: boolean } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setPreviewImage(data.image);
      }
    }
    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Image size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative pb-20">
      {/* Ambient Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 opacity-10 blur-[100px] bg-primary -z-10 pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 opacity-5 blur-[120px] bg-secondary -z-10 pointer-events-none rounded-full" />

      <div className="max-w-2xl mx-auto relative z-10">
        <header className="mb-10">
          <h1 className="text-[32px] font-extrabold tracking-tight text-white font-heading">
            Your Profile
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your account settings and profile information.
          </p>
        </header>

        <div className="space-y-8">
          {/* General Information Card */}
          <section className="bg-bg-card/40 backdrop-blur-xl border border-border-subtle p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-[14px] font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              General Information
            </h2>
            
            <form action={profileAction} className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="relative group shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/40 relative">
                    {previewImage ? (
                      <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <input type="hidden" name="image" value={previewImage || ""} />
                </div>

                <div className="flex-1 space-y-6 w-full">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={userData.name || ""}
                      className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary font-bold tracking-tight shadow-inner"
                    />
                  </div>

                  <div className="space-y-2 opacity-60">
                    <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl outline-none text-text-primary font-bold tracking-tight cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {profileState?.error && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl">
                  <p className="text-warning text-sm font-bold text-center">{profileState.error}</p>
                </div>
              )}

              {profileState?.message && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-emerald-500 text-sm font-bold text-center">{profileState.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProfilePending}
                className="px-10 h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 uppercase text-[12px] tracking-[0.08em]"
              >
                {isProfilePending ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </section>

          {/* Password Management Card */}
          {userData.hasPassword && (
            <section className="bg-bg-card/40 backdrop-blur-xl border border-border-subtle p-8 rounded-[2rem] shadow-2xl">
              <h2 className="text-[14px] font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Security & Password
              </h2>
              
              <form action={passwordAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
                      Current Password
                    </label>
                    <input
                      name="currentPassword"
                      type="password"
                      required
                      className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary font-bold tracking-tight shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
                      New Password
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      required
                      className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary font-bold tracking-tight shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">
                      Confirm New Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-primary font-bold tracking-tight shadow-inner"
                    />
                  </div>
                </div>

                {passwordState?.error && (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl">
                    <p className="text-warning text-sm font-bold text-center">{passwordState.error}</p>
                  </div>
                )}

                {passwordState?.message && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <p className="text-emerald-500 text-sm font-bold text-center">{passwordState.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPasswordPending}
                  className="px-10 h-12 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-[0.98] disabled:opacity-50 uppercase text-[12px] tracking-[0.08em]"
                >
                  {isPasswordPending ? "Updating..." : "Update Password"}
                </button>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
