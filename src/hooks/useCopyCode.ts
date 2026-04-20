import { useState, useCallback } from "react";

export function useCopyCode() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  return { copiedId, copyCode };
}
