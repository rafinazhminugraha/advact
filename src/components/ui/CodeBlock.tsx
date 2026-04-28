import { useRef } from "react";
import { useCopyCode } from "../../hooks/useCopyCode";

interface CodeBlockProps {
  lang: string;
  file: string;
  id: string;
  /** Raw HTML string with syntax-highlighted spans */
  html: string;
  code?: string;
}

export default function CodeBlock({
  lang,
  file,
  id,
  html,
  code,
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const { copiedId, copyCode } = useCopyCode();

  const handleCopy = () => {
    if (preRef.current) {
      copyCode(preRef.current.innerText, id);
    }
  };

  const isCopied = copiedId === id;

  return (
    <div className="my-5">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface3 border border-border border-b-0 rounded-t-[10px] px-4 py-2">
        <span className="font-mono text-[11px] text-muted">{lang}</span>
        <span className="font-mono text-[11px] text-accent3">{file}</span>
        <button
          onClick={handleCopy}
          className={`font-mono text-[11px] border rounded-[5px] px-2 py-0.5 cursor-pointer transition-all duration-150 bg-transparent ${
            isCopied
              ? "text-accent3 border-border2"
              : "text-muted border-border2 hover:text-text"
          }`}
        >
          {isCopied ? "copied!" : "copy"}
        </button>
      </div>
      {/* Code */}
      <pre
        ref={preRef}
        className="bg-surface2 border border-border rounded-b-[10px] rounded-t-none px-6 py-5 overflow-x-auto m-0"
      >
        {code ? (
          <code className="font-mono text-[13px] leading-[1.85] text-text whitespace-pre-wrap">
            {code}
          </code>
        ) : (
          <code
            className="font-mono text-[13px] leading-[1.85] text-text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </pre>
    </div>
  );
}
