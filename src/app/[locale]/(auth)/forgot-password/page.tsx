import ForgotPasswordForm from '@/components/forms/forgot-password-form';
import { AuthHeader } from '@/components/layout/header';
import Image from 'next/image';

import loginSideImage from '@/assets/login.webp';

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <AuthHeader />

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={loginSideImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </>
  );
}
