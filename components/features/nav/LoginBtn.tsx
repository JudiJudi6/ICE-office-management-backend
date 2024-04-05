"useClient";

import Link from "next/link";
import React from "react";

export default function LoginBtn() {
  const isAuth = false;

  return (
    <div>
      {isAuth ? (
        <div></div>
      ) : (
        <div className="flex justify-center items-center gap-4">
          <Link
            href="/login"
            className="w-[110px] text-sm text-center hover:bg-gradient-to-r  bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-main1 hover:text-main2  tracking-wide  rounded-full transition-all duration-300 px-6"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="w-[110px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-wide rounded-full transition-all duration-300 px-6"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
