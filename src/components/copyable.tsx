import { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type Props = {
  data: string;
  className?: string;
  inline?: boolean;
};

export const Copyable = ({ data, className, inline }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      className={cn(
        "font-mono text-sm",
        "flex flex-row items-center gap-2",
        className
      )}
    >
      <span
        onClick={copyToClipboard}
        className={cn("cursor-pointer break-all", inline ? "mr-1" : "block")}
      >
        {data}
      </span>
      <Button
        onClick={copyToClipboard}
        size="icon"
        variant="ghost"
        className="h-4 w-4"
      >
        {copied ? <Icons.Check size="1em" /> : <Icons.Copy size="1em" />}
      </Button>
    </div>
  );
};
