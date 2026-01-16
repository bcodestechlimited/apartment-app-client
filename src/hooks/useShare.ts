import { toast } from "sonner";

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export const useShare = () => {
  const handleShare = async (options?: ShareOptions) => {
    // 1. Ensure we have a valid absolute URL
    const shareUrl = options?.url || window.location.href;
    const shareTitle = options?.title || "Check out this property";

    // 2. Combine text and URL for apps that don't handle 'url' field well
    const shareText = options?.text
      ? `${options.text}\n${shareUrl}`
      : `Check out this property on our platform: ${shareUrl}`;

    const shareData: ShareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    try {
      // Check if the browser actually supports sharing this specific data
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.share) {
        // Fallback for browsers that support share but not canShare
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        toast.error("Sharing failed. Link copied to clipboard instead.");
        await navigator.clipboard.writeText(shareUrl);
      }
    }
  };

  return { handleShare };
};
