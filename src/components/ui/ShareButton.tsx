import React, { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string; // optional override; defaults to current URL at click time
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url, className, style, label = 'Share' }) => {
  const [copied, setCopied] = useState(false);

  const doCopy = async (shareUrl: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback: temporary input
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const onClick = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const data: ShareData = { title, text, url: shareUrl };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // if user cancels or fails, fallback to copy
      }
    }
    await doCopy(shareUrl);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className || 'btn-hbcu-secondary'}
      style={style}
      aria-label={copied ? 'Link copied' : 'Share link'}
      title={copied ? 'Link copied' : 'Share'}
    >
      <span style={{ marginRight: 8 }} aria-hidden>📤</span>
      {copied ? 'Copied!' : label}
    </button>
  );
};

export default ShareButton;
