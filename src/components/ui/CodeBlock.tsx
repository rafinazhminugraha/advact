import { useRef } from "react";
import { useCopyCode } from "../../hooks/useCopyCode";

interface CodeBlockProps {
  lang: string;
  file: string;
  id: string;
  /** Raw HTML string with syntax-highlighted spans */
  html: string;
}

export default function CodeBlock({ lang, file, id, html }: CodeBlockProps) {
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
      <div className="flex justify-between items-center bg-[#222736] border border-[rgba(255,255,255,0.07)] border-b-0 rounded-t-[10px] px-4 py-2">
        <span className="font-mono text-[11px] text-[#7a8099]">{lang}</span>
        <span className="font-mono text-[11px] text-[#34d399]">{file}</span>
        <button
          onClick={handleCopy}
          className={`font-mono text-[11px] border rounded-[5px] px-2 py-0.5 cursor-pointer transition-all duration-150 bg-transparent ${
            isCopied
              ? "text-[#34d399] border-[rgba(52,211,153,0.3)]"
              : "text-[#7a8099] border-[rgba(255,255,255,0.12)] hover:text-[#e8eaf0]"
          }`}
        >
          {isCopied ? "copied!" : "copy"}
        </button>
      </div>
      {/* Code */}
      <pre
        ref={preRef}
        className="bg-[#1a1e2a] border border-[rgba(255,255,255,0.07)] rounded-b-[10px] rounded-t-none px-6 py-5 overflow-x-auto m-0"
      >
        <code
          className="font-mono text-[13px] leading-[1.85] text-[#e8eaf0]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
