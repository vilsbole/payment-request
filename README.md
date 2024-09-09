# Bitcoin Testnet Payement Request

This is a simple web application that allows users to create a payment request on testnet.

## Getting started

1. ```sh
   git clone https://github.com/vilsbole/payment-request.git
   ```

2. ```sh
   cd payment-request
   pnpm install
   ```
3. ```sh
    pnpm dev
   ```

## Heuristics

1. The code is meant to run in a browser environment with a stable internet connection. It is written to handle this specific bitcoin testnet use case. Additional modularity may be considered if integrated into a wallet or larger application.
2. The application is designed for an able english speaking persona with a basic understanding of cryptocurrency.
3. Responsive design is tested on Chrome only.
4. Since an address may receive other transactions then the created request, the payment status UX is intentionally minimal. We poll an explorer api and display a status message when polling, when a transactgion is found in the mempool or when it is confirmed.
5. To be production ready the application would also need to consider, among other things:

   - SEO and social media sharing considerations
   - Core web vitals and performance optimization.
   - Accessibility standards & Internationalization
   - Consider an isolated execution environment for generating the HD wallet.
   - Acceptance tests and CI/CD pipeline (can be added on request)
   - Opt for a more stable explorer api (blockstream testnet results are inconsistent)
   - Include request options such as an expiration date.
