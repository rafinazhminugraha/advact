import CodeBlock from "./CodeBlock";

interface MemorizeBlockProps {
  pattern: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function highlightPattern(pattern: string) {
  const tokenPattern =
    /(`[^`]*`|"[^"]*"|'[^']*'|\/\/.*$|\b(?:const|let|var|function|return|if|else|try|catch|finally|for|while|switch|case|default|break|continue|throw|new|async|await|useState|useEffect|useReducer|useRef|true|false|null|undefined|Record|Array|HTMLElement|number|string|boolean|void|unknown|type|interface)\b|=>|\b[A-Za-z_$][\w$]*(?=\s*\()|\b[A-Za-z_$][\w$]*(?=\s*:))/gm;

  let lastIndex = 0;
  let result = "";

  for (const match of pattern.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    result += escapeHtml(pattern.slice(lastIndex, index));

    if (token.startsWith("//")) {
      result += `<span class="cmt">${escapeHtml(token)}</span>`;
    } else if (
      token.startsWith("`") ||
      token.startsWith('"') ||
      token.startsWith("'")
    ) {
      result += `<span class="str">${escapeHtml(token)}</span>`;
    } else if (
      /^(const|let|var|function|return|if|else|try|catch|finally|for|while|switch|case|default|break|continue|throw|new|async|await|useState|useEffect|useReducer|useRef|true|false|null|undefined|Record|Array|HTMLElement|number|string|boolean|void|unknown|type|interface)$/.test(
        token,
      )
    ) {
      result += `<span class="kw">${escapeHtml(token)}</span>`;
    } else if (token === "=>") {
      result += `<span class="fn">${escapeHtml(token)}</span>`;
    } else if (
      /\(/.test(pattern.slice(index + token.length, index + token.length + 1))
    ) {
      result += `<span class="fn">${escapeHtml(token)}</span>`;
    } else {
      result += `<span class="tp">${escapeHtml(token)}</span>`;
    }

    lastIndex = index + token.length;
  }

  result += escapeHtml(pattern.slice(lastIndex));
  return result;
}

export default function MemorizeBlock({ pattern }: MemorizeBlockProps) {
  const highlighted = highlightPattern(pattern);

  return (
    <div className="my-4">
      <CodeBlock
        lang="tsx"
        file="pattern-blueprint.tsx"
        id={`memorize-${pattern
          .slice(0, 20)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`}
        html={highlighted}
      />
    </div>
  );
}
