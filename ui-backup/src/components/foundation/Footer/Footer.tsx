import React from "react";
import { PortalConfig } from '@/types/portal';

interface FooterProps {
  config: Pick<PortalConfig, 'footer'>;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = config.footer.copyrightText.replace('[YEAR]', currentYear.toString());

  return (
    <footer className="bg-neutral pt-8 pr-4 pb-18 pl-4 text-base-100 w-[auto] h-[152px]">
      <div className="container mx-auto w-[992px] h-[48px] gap-8 flex text-sm">
        <p className="max-w-[672px] w-full text-[12px] leading-4" data-testid="footerText">
          {copyrightText}
          <br />
          {config.footer.address}
        </p>

        <div className="flex justify-end space-x-2 w-[288px] h-[16px] gap-2 text-[12px] leading-4">
          {config.footer.links.map((link, index) => (
            <React.Fragment key={link.url}>
              <a
                href={link.url}
                className="text-base-100 hover:underline hover:font-semibold"
              >
                {link.title}
              </a>
              {index < config.footer.links.length - 1 && (
                <span className="border-r pr-3" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 