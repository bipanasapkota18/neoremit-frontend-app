// useServiceWorkerUpdate.ts
import { useEffect, useState } from "react";

export function useServiceWorkerUpdate() {
  const [showReloadPrompt, setShowReloadPrompt] = useState(false);

  const onReload = () => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });

      if (navigator.serviceWorker.controller?.postMessage) {
        navigator.serviceWorker.controller.postMessage({
          type: "SKIP_WAITING"
        });
      }
    }
  };

  useEffect(() => {
    const onSWWaiting = () => {
      setShowReloadPrompt(true);
    };

    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", onSWWaiting);
    }

    return () => {
      if (navigator && navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onSWWaiting
        );
      }
    };
  }, []);

  return {
    showReloadPrompt,
    reload: () => {
      setShowReloadPrompt(false);
      onReload();
    }
  };
}
