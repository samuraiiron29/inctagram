"use client";
import { useSearchParams } from "next/navigation";
import { useForgotPasswordMutation } from "@/shared/api";
import { useState } from "react";
import { Button } from "@/shared/ui/base/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import Image from "next/image";
import { useModal } from "@/features/auth/forgot-passwors/model/useModal";

const ResendLinkPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; 
  const [forgotPassword] = useForgotPasswordMutation();
   const {modal, showModal, closeModal} = useModal();

  const handleResend = async () => {
    try {
      await forgotPassword({ email }).unwrap();
      showModal(`We have sent a link to confirm your email to ${email}`, "success");
    } catch (error: any) {
      showModal(error?.data?.error || "Failed to resend link", "error");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 rounded-[8px] flex-col w-[378px] p-6">
      <p className="text-h1 text-center mb-5">
      Email verification link expired</p>
      <Modal
        open={modal.open}
        onClose={closeModal}
        modalTitle={modal.title}
      >
      </Modal>
        <p className="text-xs ">
          Looks like the verification link has expired. <br />
          Not to worry, we can send the link again.
        </p>
        <div className=" mt-6 mb-6">
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
  );
};

export default ResendLinkPage;



