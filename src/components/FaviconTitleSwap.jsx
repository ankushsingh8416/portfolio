"use client";

import { useEffect } from "react";

export default function FaviconTitleSwap({ visibleTitle }) {
  useEffect(() => {
    function handleVisibilityChange() {
      const favicon = document.getElementById("favicon");
      if (document.visibilityState === "visible") {
        document.title = visibleTitle;
        if (favicon) favicon.setAttribute("href", "/assets/images/favicon.png");
      } else {
        document.title = "Come Back To Portfolio";
        if (favicon) favicon.setAttribute("href", "/assets/images/favhand.png");
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [visibleTitle]);

  return null;
}
