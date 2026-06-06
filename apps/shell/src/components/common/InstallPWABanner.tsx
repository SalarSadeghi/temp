import { usePWAInstall } from "@hooks/usePWAInstall";
import React, { useEffect, useState } from "react";
import PWAlogo from "/pwa-192.png";
export const InstallPWABanner: React.FC = () => {
  const { shouldShow, isIos, promptInstall, dismissBanner, isInstalled } =
    usePWAInstall();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after a small delay to prevent layout shift
    if (shouldShow && !isInstalled) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, isInstalled]);
  if (!visible || isInstalled) return null;

  const handleInstall = async () => {
    if (isIos) {
      // iOS: Can't trigger programmatically, show instructions modal instead
      alert(
        'To install this app on your iPhone/iPad:\n\n1. Tap the Share button\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top-right corner'
      );
      dismissBanner(1); // Don't show for 30 days
    } else {
      const installed = await promptInstall();

      if (installed) {
        setVisible(false);
      } else {
        // dismissBanner(1);
        setVisible(false);
      }
    }
  };

  const handleDismiss = () => {
    dismissBanner(1);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 p-4 bg-white border-t shadow-2xl md:hidden animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl">
          {/* Your app icon here */}
          <img src={PWAlogo} width={192} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">نصب</h3>
          <p className="text-sm text-gray-600">
            {isIos ? "افزودن به صفحه نمایش جهت دسترسی آسان" : "جهت دسترسی آسان"}
          </p>
        </div>
        <button
          onClick={handleInstall}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
        >
          {isIos ? "How to Install" : "نصب"}
        </button>
        <button
          onClick={handleDismiss}
          className="p-2 text-white text-sm font-medium bg-red-500 rounded-lg"
          aria-label="Dismiss"
        >
          لغو
        </button>
      </div>
    </div>
  );
};
