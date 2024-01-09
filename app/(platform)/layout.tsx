import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/components/providers/modal-provider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </TanstackProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
