import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if app is already installed (standalone mode)
  const checkInstalled = () => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);
    return isStandalone;
  };

  // Check iOS and set flag
  const checkIos = () => {
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIos(ios);
    return ios;
  };

  // Check dismissal from localStorage
  const checkDismissed = () => {
    const dismissedUntil = localStorage.getItem("pwa-dismissed-until");
    if (dismissedUntil && new Date().getTime() < parseInt(dismissedUntil, 10)) {
      setIsDismissed(true);
      return true;
    }
    setIsDismissed(false);
    return false;
  };

  // Dismiss banner for N days (default: 7)
  const dismissBanner = (days: number = 1) => {
    const until = new Date().getTime() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem("pwa-dismissed-until", until.toString());
    setIsDismissed(true);
  };

  // Trigger native install prompt (Chrome/Android only)
  const promptInstall = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setCanInstall(false);
        setIsInstalled(true);
      }

      return outcome === "accepted";
    } catch (error) {
      console.error("Install prompt failed:", error);
      return false;
    }
  };

  // Engagement threshold: only show after 2+ pages or 30+ seconds
  const shouldShowBanner = () => {
    if (isInstalled || isDismissed || !canInstall) return false;
    if (isIos) return true; // iOS always shows instructions

    // Check engagement
    const visitCount = parseInt(
      sessionStorage.getItem("pwa-visit-count") || "0",
      10
    );
    const firstVisitTime = parseInt(
      sessionStorage.getItem("pwa-first-visit") || Date.now().toString(),
      10
    );
    const timeElapsed = Date.now() - firstVisitTime;

    return visitCount >= 2 || timeElapsed >= 30000;
  };

  // Increment visit counter
  const incrementVisit = () => {
    const count = parseInt(
      sessionStorage.getItem("pwa-visit-count") || "0",
      10
    );
    sessionStorage.setItem("pwa-visit-count", (count + 1).toString());

    if (!sessionStorage.getItem("pwa-first-visit")) {
      sessionStorage.setItem("pwa-first-visit", Date.now().toString());
    }
  };

  useEffect(() => {
    checkIos();
    checkInstalled();
    checkDismissed();
    incrementVisit();
    // Listen for beforeinstallprompt (Chrome/Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setCanInstall(true);
    };

    // Listen for successful installation (via browser UI)
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return {
    canInstall,
    isInstalled,
    isIos,
    shouldShow: shouldShowBanner(),
    promptInstall,
    dismissBanner,
  };
}
