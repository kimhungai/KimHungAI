import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Zap, 
  Globe2, 
  RefreshCw 
} from 'lucide-react';

const TARGET_URL = 'https://KimHungAI.floot.app';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  const [progress, setProgress] = useState(0);

  const performRedirect = () => {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.replace(TARGET_URL);
      } else {
        window.location.replace(TARGET_URL);
      }
    } catch {
      try {
        window.location.href = TARGET_URL;
      } catch {
        // Fallback handled by manual click link
      }
    }
  };

  useEffect(() => {
    // Attempt instant redirect right away
    performRedirect();
    setRedirectAttempted(true);

    // Smooth visual progress bar over 1.8 seconds in case browser delays navigation
    const start = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        performRedirect();
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <main className="min-h-screen bg-radial-[at_top] from-slate-900 via-slate-950 to-black text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-cyan-500/20 selection:text-cyan-200 relative overflow-hidden font-sans">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-lg z-10">
        {/* Main Card */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 shadow-2xl shadow-cyan-950/30 rounded-3xl p-6 sm:p-8 text-center transition-all duration-300">
          
          {/* Animated Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Đang chuyển hướng tự động</span>
          </div>

          {/* Central Logo & Pulse Effect */}
          <div className="relative mx-auto w-20 h-20 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 blur-md opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center shadow-inner group">
              <Sparkles className="w-9 h-9 text-cyan-400 animate-spin-slow" />
            </div>
          </div>

          {/* Title and Explanation */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Kim Hưng <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            Hệ thống đang tự động kết nối và đưa bạn đến trang chính thức của tác giả.
          </p>

          {/* Target URL Display & Copy */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 sm:p-3.5 mb-6 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
              <Globe2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="truncate">
                <span className="text-xs text-slate-500 block">Địa chỉ đích</span>
                <span className="text-sm font-mono text-cyan-300 font-medium truncate block">
                  {TARGET_URL}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 transition-colors shrink-0 flex items-center gap-1 text-xs"
              title="Sao chép liên kết"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Chép</span>
                </>
              )}
            </button>
          </div>

          {/* Progress / Loading Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
                Tiến trình chuyển trang
              </span>
              <span className="font-mono text-cyan-400 font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={TARGET_URL}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-blue-600 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.98] group"
            >
              <span>Truy cập ngay</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở tab mới</span>
            </a>
          </div>

          {/* Security & Verification Note */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kết nối an toàn (SSL/TLS)</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Tốc độ cao</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-5 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Kim Hưng AI • Trang chuyển tiếp thông minh</p>
        </footer>
      </div>
    </main>
  );
}
