import { useEffect, useState } from "react"

type Props = {
  address: string
}

export const PaymentStatus = ({ address }: Props) => {
  const [status, setStatus] = useState<any>()

  useEffect(() => {
    async function fetchAddressStatus() {
      return fetch(`https://blockstream.info/testnet/api/address/${address}`)
        .then((response) => response.json())
        .then((data) => {
          setStatus(data)
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }

    fetchAddressStatus()
    const intervalId = setInterval(fetchAddressStatus, 4000)
    return () => clearInterval(intervalId)
  }, [address])

  return (
    <>
      Rendered Status for: {JSON.stringify({ address })}
      {status && <div>{JSON.stringify(status, null, 2)}</div>}
    </>
  )
}
