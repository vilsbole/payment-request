import Image from "next/image";
import qr from "qr-encode";

import { cn } from "@/lib/utils";
import { Copyable } from "@/components/code";

type Props = {
  uri: string;
  className?: string;
};

export const PaymentQRCode = ({ uri, className }: Props) => {
  const dataURI = qr(uri, { type: 6, size: 6, level: "Q" });
  return (
    <div className={cn("max-w-full", className)}>
      <Image
        src={dataURI}
        className="w-full"
        width="50"
        height="50"
        alt="QR Code"
      />
      <Copyable className="mt-4" data={uri} />
    </div>
  );
};
