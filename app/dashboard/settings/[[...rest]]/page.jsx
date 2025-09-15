import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-normal h-auto w-auto">
      <UserProfile />  {/* Use UserProfile inside a React component */}
    </div>
  );
}
