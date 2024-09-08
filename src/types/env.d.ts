/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
  }
}

declare module "qr-encode" {
  export default function qr(
    data: string,
    options: { type: number; size: number; level: string }
  ): string;
}
declare module "coinkey" {
  export default Coinkey;
}
declare module "coininfo" {
  export default Coininfo;
}
