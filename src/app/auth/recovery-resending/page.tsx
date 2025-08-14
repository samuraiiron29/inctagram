"use client";
import { useSearchParams } from "next/navigation";
import { useForgotPasswordMutation } from "@/shared/api";
import { useState } from "react";
import { Button } from "@/shared/ui/base/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import Image from "next/image";

const ResendLinkPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; 
  const [forgotPassword] = useForgotPasswordMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email }).unwrap();
      showModal(`We have sent a link to confirm your email to ${email}`, "success");
    } catch (error: any) {
      showModal(error?.data?.error || "Failed to resend link", "error");
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-dark-800)] px-4">
      <div className="bg-[var(--color-dark-800)] rounded-[8px] flex flex-col items-center w-[378px] p-6">
      <p className="text-h1 text-center text-[var(--color-light-100)] font-bold mb-5">
      Email verification link expired</p>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        modalTitle={modalTitle}
      >
        {modalMessage}
      </Modal>
        <p className="text-regular_text14 text-center text-[var(--color-light-900)] mb-6">
          Looks like the verification link has expired. <br />
          Not to worry, we can send the link again.
        </p>
        <div className="mb-6">
        <Button
          type={"submit"}
          variant={"primary"}
          onClick={handleResend}
          disabled={!email}
           width={"300px"}
        >
          Resend Link
        </Button>
        </div>
        <Image src="/rafiki.png" alt="rafiki" width={473} height={352} style={{ marginTop: "8px", objectFit: "contain" }}/>
   </div>
      </div>
  );
};

export default ResendLinkPage;


















// const Page = () => {
//   return (
//     <div>
//       <button>Resend link</button>
//     </div>
//   )
// }

// export default Page
