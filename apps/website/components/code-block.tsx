"use client";

import { useRef, useState } from "react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Check, Clipboard } from "fumadocs-ui/internal/icons";
import { cn } from "fumadocs-ui/utils/cn";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function getCodeText(container: HTMLDivElement | null) {
  const pre = container?.getElementsByTagName("pre").item(0);
  if (!pre) {
    return "";
  }

  const clone = pre.cloneNode(true) as HTMLPreElement;
  clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
    node.replaceWith("\n");
  });

  return clone.textContent ?? "";
}

function CopyButton({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = async () => {
    const text = getCodeText(containerRef.current);
    if (!text) {
      return;
    }

    await copyText(text);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      data-checked={copied || undefined}
      className={cn(
        buttonVariants({
          className: "hover:text-fd-accent-foreground data-[checked]:text-fd-accent-foreground",
          size: "icon-xs"
        })
      )}
      aria-label={copied ? "Copied Text" : "Copy Text"}
      onClick={handleCopy}
    >
      {copied ? <Check /> : <Clipboard />}
    </button>
  );
}

export function MdxPre(props: React.ComponentProps<"pre">) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef}>
      <CodeBlock
        {...props}
        allowCopy={false}
        Actions={(actionProps) => (
          <div {...actionProps} className={cn("empty:hidden", actionProps.className)}>
            <CopyButton containerRef={containerRef} />
          </div>
        )}
      >
        <Pre>{props.children}</Pre>
      </CodeBlock>
    </div>
  );
}
