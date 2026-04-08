"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, FileText, ShieldCheck, LogOut, Menu, X } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Foydalanuvchilar", icon: Users },
  { href: "/dashboard/posts", label: "Postlar", icon: FileText },
  { href: "/dashboard/approvals", label: "Tasdiqlash", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/");
  };

  const navContent = (
    <>
      <div className="px-3 mb-8">
        <h1 className="text-[16px] font-bold text-[#141414]">Amally</h1>
        <p className="text-[11px] text-[#141414]/30 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                active
                  ? "bg-[#69824F]/10 text-[#69824F]"
                  : "text-[#141414]/50 hover:bg-black/[0.02] hover:text-[#141414]/70"
              }`}
            >
              <Icon size={17} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400/60 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <LogOut size={17} strokeWidth={1.5} />
        Chiqish
      </button>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-black/[0.06] px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-bold text-[#141414]">Amally</h1>
          <p className="text-[10px] text-[#141414]/30 -mt-0.5">Admin Panel</p>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-xl hover:bg-black/[0.03] transition-colors">
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20" onClick={() => setOpen(false)} />
      )}

      {/* Mobile slide-out drawer */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-50 flex flex-col py-6 px-3 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-black/[0.06] flex-col py-6 px-3">
        {navContent}
      </aside>
    </>
  );
}
