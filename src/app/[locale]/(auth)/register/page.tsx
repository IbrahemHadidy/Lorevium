import RegisterForm from '@/components/forms/register-form';
import { AuthHeader } from '@/components/layout/header';
import Image from 'next/image';

import registerSideImage from '@/assets/register.webp';

export default function RegisterPage() {
  return (
    <>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={registerSideImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <AuthHeader />

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
