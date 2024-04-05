"use client";

import PageCanvas from "@/components/features/login/PageCanvas";
import InputBox from "@/components/ui/InputBox";
import Spinner from "@/components/ui/Spinner";
import TextLink from "@/components/ui/TextLink";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full h-full">
      <div className="h-screen w-full bg-white p-6 flex justify-center items-center pt-[64px]">
        <div className="flex justify-center items-center w-full h-full xl:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.4)] xl:w-[1100px] xl:h-[620px] my-auto mx-auto">
          <div className="flex flex-col justify-center items-center  h-full xl:w-1/2 ">
            <div className="flex flex-col justify-center items-center mb-7">
              <h3 className="font-semibold text-2xl xs:text-3xl">
                Create account!
              </h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md400:gap-6 md600:gap-6 xs:w-full md600:px-10 md500:w-[450px]"
            >
              <div>
                <InputBox
                  id="name"
                  type="text"
                  label="Name"
                  error={errors?.name?.message}
                  register={register}
                />
              </div>
              <div>
                <InputBox
                  id="surname"
                  type="text"
                  label="Surname"
                  error={errors?.surname?.message}
                  register={register}
                />
              </div>
              <div>
                <InputBox
                  id="email"
                  type="email"
                  label="Email"
                  error={errors?.email?.message}
                  register={register}
                  validateFunction={() => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(getValues().email))
                      return "Incorrect e-mail";
                    else return true;
                  }}
                />
              </div>
              <div>
                <InputBox
                  id="password"
                  type="password"
                  label="Password"
                  error={errors?.password?.message}
                  register={register}
                  validateFunction={() => {
                    const passwordRegex = /^.{8,}$/;
                    if (!passwordRegex.test(getValues().password))
                      return "Incorrect password (min. 8 letters)";
                    else return true;
                  }}
                />
              </div>

              <div className="mb-6">
                <InputBox
                  id="passwordRep"
                  type="password"
                  label="Repeat Password"
                  error={errors?.passwordRep?.message}
                  register={register}
                  validateFunction={() => {
                    if (getValues().password !== getValues().passwordRep)
                      return "Passwords don't match";
                    else return true;
                  }}
                />
              </div>
              <button className="w-full bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
                submit
              </button>
            </form>
            <p className="text-sm mt-4">
              Already a member?
              <br className="xs:hidden" />
              <span className="xs:ml-2">
                <TextLink href="/login">Sign In</TextLink>
              </span>
            </p>
          </div>
          <div className="hidden xl:block w-1/2 h-full ">
            <PageCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
