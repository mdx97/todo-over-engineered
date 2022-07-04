import "../styles/globals.css";
import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import NiceModal from "@ebay/nice-modal-react";
import Toaster from "../components/Toaster";
import { AppRouter } from "./api/trpc/[trpc]";

// Called for a11y reasons, see https://reactcommunity.org/react-modal/accessibility/ for more.
Modal.setAppElement("#__next");

/**
 * The main App component for the site.
 *
 * https://nextjs.org/docs/advanced-features/custom-app
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
      <Toaster />
    </NiceModal.Provider>
  );
}

// Wrap our App component with the necessary functionality needed to execute tRPC
// queries throughout the application.
export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },
  ssr: true,
})(App);
