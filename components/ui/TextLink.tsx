import Link from "next/link";
import React from "react";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="text-main2 hover:text-main1 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
