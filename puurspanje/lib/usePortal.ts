import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function usePortal(root?: Element) {
  const portalElRef = useRef<Element>(null);

  useEffect(() => {
    if (!portalElRef.current) {
      // @ts-ignore
      portalElRef.current = document.createElement("div");
    }
    const el = portalElRef.current;
    const mount = root || document.body;
    mount.appendChild(el);

    return () => {
      el && mount && mount.removeChild(el);
    };
  }, [portalElRef, root]);

  const Portal = useCallback(
    ({ children }) => {
      if (portalElRef.current != null)
        return createPortal(children, portalElRef.current);
      return null;
    },
    [portalElRef]
  );

  return Portal;
}
