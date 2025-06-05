import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Gets the current year
  return (
    <footer className="bg-neutral pt-8 pr-4 pb-18 pl-4 text-base-100 w-[auto] h-[152px]">
      {/* Footer */}
      <div className="container mx-auto w-[992px] h-[48px] gap-8 flex text-sm">
        <p
          className="max-w-[672px] w-full text-[12px] leading-4"
          data-testid="footerText"
        >
          ©1998-{currentYear} BlueCross BlueShield of Tennessee, Inc., an
          Independent Licensee of the Blue Cross Blue Shield Association.
          BlueCross BlueShield of Tennessee is a Qualified Health Plan issuer in
          the Health Insurance Marketplace.
          <br />1 Cameron Hill Circle, Chattanooga TN 37402-0001
        </p>

        <div className="flex justify-end space-x-2 w-[288px] h-[16px] gap-2 text-[12px] leading-4">
          <a
            href="/broker/sitemap"
            className=" text-base-100 border-r pr-3 hover:underline hover:font-semibold"
          >
            Sitemap
          </a>
          <a
            href="/broker/privacy"
            className="text-base-100 border-r pr-3 hover:underline hover:font-semibold"
          >
            Privacy & Security
          </a>
          <a
            href="/broker/legal"
            className=" text-base-100 hover:underline hover:font-semibold"
          >
            Legal
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
