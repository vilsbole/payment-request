import { default as ci } from "coininfo"
import * as bip39 from "bip39"
import HDkey from "hdkey"
import { default as Coinkey } from "coinkey"

export const createHDWallet = async () => {
  const mnemonic = bip39.generateMnemonic()
  const seed = await bip39.mnemonicToSeed(mnemonic)
  // Derive the root key from the seed
  const root = HDkey.fromMasterSeed(seed)
  // Testnet derivation path
  const path = "m/44'/1'/0'/0/0"
  const derivedNode = root.derive(path)
  const ck = new Coinkey(derivedNode.privateKey, ci("BTC-TEST"))

  return {
    address: ck.publicAddress,
  }
}
