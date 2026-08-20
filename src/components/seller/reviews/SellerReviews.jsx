import React, { useState } from "react";
import { Star, BadgeCheck, MessageSquare, X } from "lucide-react";
import { MOCK_REVIEWS } from "../SellerConstants";

function StarRow({ rating, total = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} size={13} className={i < rating ? "fill-amber-400 text-amber-400" : "text-slate-700"} />
      ))}
    </div>
  );
}

function ReviewCard({ review, onReply }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState(review.reply || "");
  const [submitted, setSubmitted] = useState(!!review.reply);

  const handleSubmit = () => {
    if (!replyText.trim()) return;
    setSubmitted(true);
    setShowReply(false);
    onReply(review.id, replyText);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-extrabold text-indigo-400">{review.customer[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-slate-200">{review.customer}</span>
              {review.verified && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <BadgeCheck size={10} /> Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRow rating={review.rating} />
              <span className="text-[10px] text-slate-600">{review.date}</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-600 flex-shrink-0">{review.product}</span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-3">{review.review}</p>

      {/* Seller Reply */}
      {(submitted || review.reply) && (
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3 mb-3">
          <div className="text-[10px] font-bold text-indigo-400 mb-1">Your Reply</div>
          <p className="text-xs text-slate-300">{replyText || review.reply}</p>
        </div>
      )}

      {/* Reply Action */}
      {!submitted && !review.reply && !showReply && (
        <button onClick={() => setShowReply(true)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 font-semibold transition-colors">
          <MessageSquare size={13} /> Reply to Review
        </button>
      )}

      {showReply && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a polite and helpful reply…"
            rows={2}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
          />
          <div className="flex gap-2">
            <button onClick={() => setShowReply(false)} className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-500 text-xs font-semibold hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={!replyText.trim()}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 disabled:opacity-40 transition-colors">
              Post Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SellerReviews() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStar = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPct = Math.round((fiveStar / reviews.length) * 100);

  const handleReply = (id, reply) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, reply } : r));
  };

  return (
    <div className="space-y-5 gd-rise">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">Reviews & Ratings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Customer reviews for your shop and products.</p>
      </div>

      {/* Rating Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Big Rating */}
          <div className="text-center">
            <div className="font-mono text-6xl font-extrabold text-amber-400">{avgRating}</div>
            <div className="flex gap-1 justify-center mt-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={16} className={s <= Math.round(parseFloat(avgRating)) ? "fill-amber-400 text-amber-400" : "text-slate-700"} />
              ))}
            </div>
            <div className="text-xs text-slate-500 mt-1">{reviews.length} total reviews</div>
            <div className="text-xs text-emerald-400 font-bold mt-0.5">{fiveStarPct}% five-star</div>
          </div>
          {/* Star Distribution */}
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-10 flex-shrink-0">
                    <span className="text-xs text-slate-500 font-mono">{stars}</span>
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-500">
        ℹ️ You can reply to customer reviews, but cannot edit or delete them. Keep replies professional and helpful.
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-600">
          <Star size={40} className="mx-auto mb-4 opacity-30" />
          <div className="text-sm font-bold">No reviews yet</div>
          <div className="text-xs mt-1">Reviews will appear after eligible purchases.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onReply={handleReply} />
          ))}
        </div>
      )}
    </div>
  );
}
