import { useEffect, useState } from "react";

import { Icons } from "@/components/icons";

type Props = {
  address: string;
};

type AddressInfoResponse = {
  address: string;
  // Sums in satoshi
  chain_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  };
  mempool_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  };
};

export const PaymentStatus = ({ address }: Props) => {
  const [info, setInfo] = useState<AddressInfoResponse>();

  useEffect(() => {
    async function fetchAddressInfo() {
      return fetch(`https://blockstream.info/testnet/api/address/${address}`)
        .then((response) => response.json())
        .then((data: AddressInfoResponse) => {
          setInfo(data);
        })
        .catch((error) => {
          console.error("Error while fetching address info:", error);
        });
    }

    fetchAddressInfo();
    const intervalId = setInterval(fetchAddressInfo, 4000);
    return () => clearInterval(intervalId);
  }, [address]);

  function getTransactionStatus(info: AddressInfoResponse | undefined) {
    if (!info) {
      return <span>"Loading..."</span>;
    } else if (
      info.chain_stats.tx_count === 0 &&
      info.mempool_stats.tx_count === 0
    ) {
      return (
        <>
          <Icons.Loader size="1em" className="animate-spin-slow" />
          <span className="ml-1">Listening for transactions...</span>
        </>
      );
    } else if (info.chain_stats.tx_count > 0) {
      return <span>"Transaction received ! 🚀💸"</span>;
    } else if (info.mempool_stats.tx_count > 0) {
      return (
        <>
          <Icons.Loader size="1em" className="animate-spin-slow" />
          <span className="ml-1">{`${info.mempool_stats.tx_count} transaction${info.mempool_stats.tx_count > 1 ? "s" : ""} pending in Mempool...`}</span>
        </>
      );
    } else {
      return "No transactions found";
    }
  }

  return (
    <div className="space-2 flex flex-row items-center text-sm">
      {getTransactionStatus(info)}
    </div>
  );
};
