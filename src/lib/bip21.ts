import { type Bip21Options, encode } from "bip21"

export function encodeBip21(address: string, options: Bip21Options): string {
  return encode(address, options)
}
