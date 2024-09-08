"use client";

import { useEffect, useRef, useState } from "react";

import { encodeBip21 } from "@/lib/bip21";
import { createHDWallet } from "@/lib/wallet";
import { Copyable } from "@/components/copyable";
import { PaymentQRCode } from "@/components/organisms/payment-qr-code";
import { PaymentRequestForm } from "@/components/organisms/payment-request-form";
import { PaymentStatus } from "@/components/organisms/payment-status";
import { ThemeToggle } from "@/components/theme-toggle";

export default function IndexPage() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [bip21Uri, setBip21Uri] = useState<string | undefined>();
  const addressRef = useRef<HTMLDivElement>(null);

  // Allow undefined uri to remove QR code when input field is empty
  const handleFormSubmit = (amount?: number) => {
    if (!walletAddress) {
      throw new Error("Wallet address is not set");
    }
    const uri = amount
      ? encodeBip21(walletAddress, { amount: amount })
      : undefined;
    setBip21Uri(uri);
  };

  useEffect(() => {
    async function generateWalletAddress() {
      const { address } = await createHDWallet();
      setWalletAddress(address);
    }
    generateWalletAddress();
  }, []);

  useEffect(() => {
    if (bip21Uri && addressRef.current) {
      addressRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (addressRef.current && !bip21Uri) {
      addressRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [bip21Uri]);

  return (
    <div className="container flex h-dvh max-w-prose flex-col">
      <header className="grid items-center gap-6 space-y-2 text-balance pb-4 pt-6 md:py-8">
        <ThemeToggle
          className="justify-self-end"
          variant="outline"
          size="icon"
        />
      </header>
      <main className="flex grow flex-col gap-4 text-balance pb-8 md:gap-6">
        <div className="flex min-h-[25vh] flex-col justify-center gap-3 sm:min-h-[15vh]">
          <h1 className="text-5xl font-bold">Request Payment</h1>
          <p className="text-slate-500">
            Next.js app which generates a testnet HD wallet and allows the user
            to create a QRcode with a payment request.
          </p>
        </div>
        <div className="grow">
          {!walletAddress ? (
            <div className="flex h-full">
              <div className="mb-6 place-self-center text-slate-500 md:mb-8">
                Generating HD Wallet...
              </div>
            </div>
          ) : (
            <div className="mx-auto flex flex-col gap-8 text-slate-500">
              <div ref={addressRef}>
                <span className="text-sm">Wallet address</span>
                <Copyable
                  data={walletAddress}
                  className="text-md dark:text-slate-100"
                  inline={true}
                />
                {bip21Uri && <PaymentStatus address={walletAddress} />}
              </div>

              <section className="md:max-w-md">
                <PaymentRequestForm onSubmit={handleFormSubmit} />
              </section>
              {bip21Uri && (
                <section className="my-8 md:max-w-md">
                  <PaymentQRCode
                    className="rounded-md border p-8"
                    uri={bip21Uri}
                  />
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="flex py-4 lg:py-6">
        <div className="self-start">
          <p className="text-sm text-gray-500">Made with ☕ in Paris</p>
        </div>
      </footer>
    </div>
  );
}
