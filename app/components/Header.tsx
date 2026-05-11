"use client";

interface HeaderProps {
  title: string;
  userName: string | undefined;
}

export default function Header({ title, userName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-[#e1e9e8]">
      <h1 
        className="text-xl font-medium text-[#161734]" 
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="text-[#161734] font-medium">{userName}</div>
    </header>
  );
}
