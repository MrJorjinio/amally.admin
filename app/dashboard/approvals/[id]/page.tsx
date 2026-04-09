"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, X, Loader2 } from "lucide-react";
import { getPost, approvePost, rejectPost } from "@/lib/api";

export default function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    getPost(id).then(p => { setPost(p); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const handleApprove = async () => {
    setActing(true);
    await approvePost(id);
    router.push("/dashboard/approvals");
  };

  const handleReject = async () => {
    setActing(true);
    await rejectPost(id);
    router.push("/dashboard/approvals");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={22} className="animate-spin text-[#141414]/20" /></div>;
  if (!post) return <div className="text-center py-20 text-[14px] text-[#141414]/30">Post topilmadi</div>;

  return (
    <div className="max-w-3xl pt-4">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[13px] text-[#141414]/40 hover:text-[#141414]/60 transition-colors mb-6">
        <ArrowLeft size={16} strokeWidth={1.5} />
        Orqaga
      </button>

      {/* Status badge */}
      <div className="mb-4">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
          post.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
          post.status === "Rejected" ? "bg-red-50 text-red-400" :
          "bg-amber-50 text-amber-600"
        }`}>{post.status}</span>
      </div>

      {/* Cover image */}
      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.title} className="w-full rounded-2xl object-cover max-h-80 mb-6" />
      )}

      {/* Title */}
      <h1 className="text-[22px] sm:text-[26px] font-bold text-[#141414] leading-tight break-words">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-2 mt-3 text-[13px] text-[#141414]/40 flex-wrap">
        <span className="font-medium text-[#141414]/60">{post.author}</span>
        <span>·</span>
        <span>{post.category}</span>
        <span>·</span>
        <span>{post.region}</span>
        <span>·</span>
        <span>{new Date(post.createdAt).toLocaleDateString("uz")}</span>
      </div>

      {/* Content */}
      <div className="mt-6 pt-6 border-t border-black/[0.04]">
        <p className="text-[15px] text-[#141414]/65 leading-relaxed whitespace-pre-wrap break-words">
          {post.content || "Matn kiritilmagan"}
        </p>
      </div>

      {/* Actions */}
      {post.status === "Pending" && (
        <div className="mt-8 pt-6 border-t border-black/[0.04] flex items-center gap-3">
          <button
            onClick={handleApprove}
            disabled={acting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-[13px] font-medium hover:bg-emerald-100 transition-colors disabled:opacity-40"
          >
            <Check size={16} strokeWidth={2} />
            Tasdiqlash
          </button>
          <button
            onClick={handleReject}
            disabled={acting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-50 text-red-400 text-[13px] font-medium hover:bg-red-100 transition-colors disabled:opacity-40"
          >
            <X size={16} strokeWidth={2} />
            Rad etish
          </button>
        </div>
      )}
    </div>
  );
}
