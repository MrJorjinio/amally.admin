"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getPosts, approvePost, rejectPost } from "@/lib/api";

export default function ApprovalsPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const fetchPending = () => {
    getPosts(page, pageSize, "pending").then(r => { setPosts(r.items); setTotal(r.totalCount); });
  };

  useEffect(fetchPending, [page]);

  const handleApprove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await approvePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setTotal(t => t - 1);
  };

  const handleReject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await rejectPost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setTotal(t => t - 1);
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-bold">Tasdiqlash</h1>
        <span className="text-[13px] text-[#141414]/40">{total} ta kutilayotgan</span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-16 text-center">
          <p className="text-[14px] text-[#141414]/30">Kutilayotgan postlar yo&apos;q</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(p => (
            <div
              key={p.id}
              onClick={() => router.push(`/dashboard/approvals/${p.id}`)}
              className="bg-white rounded-2xl border border-black/[0.06] p-5 cursor-pointer hover:border-black/[0.1] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#141414] line-clamp-2 break-words">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#141414]/40 line-clamp-1 break-all">
                    {p.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[11px] sm:text-[12px] text-[#141414]/35 flex-wrap">
                    <span className="font-medium text-[#141414]/50">{p.author}</span>
                    <span>·</span>
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.region}</span>
                    <span>·</span>
                    <span>{new Date(p.createdAt).toLocaleDateString("uz")}</span>
                  </div>
                </div>
                {/* Desktop buttons */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleApprove(e, p.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[12px] font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <Check size={14} strokeWidth={2} />
                    Tasdiqlash
                  </button>
                  <button
                    onClick={(e) => handleReject(e, p.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-400 text-[12px] font-medium hover:bg-red-100 transition-colors"
                  >
                    <X size={14} strokeWidth={2} />
                    Rad etish
                  </button>
                </div>
              </div>
              {/* Mobile buttons */}
              <div className="flex sm:hidden items-center gap-2 mt-3">
                <button
                  onClick={(e) => handleApprove(e, p.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[12px] font-medium"
                >
                  <Check size={14} strokeWidth={2} />
                  Tasdiqlash
                </button>
                <button
                  onClick={(e) => handleReject(e, p.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-400 text-[12px] font-medium"
                >
                  <X size={14} strokeWidth={2} />
                  Rad etish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 rounded-lg hover:bg-black/[0.03] disabled:opacity-30 transition-colors">
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <span className="text-[13px] text-[#141414]/50 px-3">{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 rounded-lg hover:bg-black/[0.03] disabled:opacity-30 transition-colors">
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
