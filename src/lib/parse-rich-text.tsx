import React from "react";

export function parseRichText(text: string): React.ReactNode {
  if (!text) return null;

  const parts = text.split(
    /(<strong>.*?<\/strong>|<em>.*?<\/em>|<code>.*?<\/code>)/g
  );

  return parts.map((part, partIdx) => {
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      const inner = part.replace(/<\/?strong>/g, "");
      return (
        <strong
          key={partIdx}
          className="font-bold text-gray-900 dark:text-gray-100"
        >
          {inner}
        </strong>
      );
    }
    if (part.startsWith("<em>") && part.endsWith("</em>")) {
      const inner = part.replace(/<\/?em>/g, "");
      return (
        <em key={partIdx} className="italic text-gray-700 dark:text-gray-300">
          {inner}
        </em>
      );
    }
    if (part.startsWith("<code>") && part.endsWith("</code>")) {
      const inner = part.replace(/<\/?code>/g, "");
      return (
        <code
          key={partIdx}
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-sky-600 dark:text-sky-400"
        >
          {inner}
        </code>
      );
    }
    return <span key={partIdx}>{part}</span>;
  });
}
