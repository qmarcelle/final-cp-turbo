import { UserProfile } from '@/models/user_profile';
import { PortalConfig } from '@/types/portal';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SiteHeaderNavSection } from '../SiteHeaderSubSection/SiteHeaderNavSection';
import { SiteHeaderSubNavSection } from '../SiteHeaderSubSection/SiteHeaderSubNavSection';
import { SiteHeaderMenuSection } from '../SiteHeaderSubSection/SiteHeaderMenuSection';
import {
  supportIcon, closeIcon, hamburgerMenuIcon,
  profileWhiteIcon
} from '../../foundation/Icons/Icons';

interface SiteHeaderProps {
  config: PortalConfig;
  profile: UserProfile;
  selectedProfile?: UserProfile;
}

export default function SiteHeader({
  config,
  profile,
  selectedProfile,
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubNavId, setActiveSubNavId] = useState<number | null>(null);
  const [pathname, setPathName] = useState<string>('/');
  const sitePathName = usePathname();

  useEffect(() => {
    setPathName(sitePathName);
  }, [sitePathName]);

  const toggleMenu = () => {
    if (!isOpen) {
      closeSubMenu();
    } else {
      setIsOpen(true);
      setActiveSubNavId(null);
    }
  };

  const openSubMenu = (itemId: number) => {
    setIsOpen(true);
    setActiveSubNavId((prevId) => (prevId === itemId ? null : itemId));
  };

  const closeSubMenu = () => {
    setIsOpen(false);
    setActiveSubNavId(null);
  };

  return (
    <nav className={`primary-color sm:pt-[74px] lg:pt-[134px]`}>
      {/* Header Top Bar */}
      <div className="h-18 w-full fixed top-0 left-0 right-0 flex justify-between border-b bg-white z-50">
        <div className="flex items-center">
          <div className="flex lg:hidden h-18 w-18 items-center justify-center border-r">
            <button
              data-collapse-toggle="menu-bar"
              type="button"
              className="p-0 justify-center"
              aria-controls="menu-bar"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <>
                  <span className="sr-only">Close main menu</span>
                  <Image
                    src={closeIcon}
                    alt="Close icon"
                    width="18"
                    height="18"
                  />
                </>
              ) : (
                <>
                  <span className="sr-only">Open main menu</span>
                  <Image
                    src={hamburgerMenuIcon}
                    alt="Menu icon"
                    width="32"
                    height="32"
                  />
                </>
              )}
            </button>
          </div>
          <Link className="ml-5 lg:px-0" href={`${config.basePath}/home`}>
            {useMediaQuery({ query: '(max-width: 1023px)' }) ? (
              <Image
                width="64"
                height="36"
                src={config.logo.stacked}
                alt={config.logo.alt}
              />
            ) : (
              <Image
                width="174"
                height="35"
                src={config.logo.full}
                alt={config.logo.alt}
              />
            )}
          </Link>
        </div>
        <SiteHeaderMenuSection
          profile={profile}
          icon={<Image src={profileWhiteIcon} alt="Profile Icon" />}
          items={[
            {
              title: 'Support',
              label: 'support',
              icon: <Image src={supportIcon} alt="Support Icon" />,
              url: '',
            },
          ]}
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[72px] bg-black bg-opacity-40 z-20"
          onClick={closeSubMenu}
        />
      )}

      <div
        id="menu-bar"
        className={`fixed top-[72px] h-full md:h-fit shadow-lg transition-transform duration-300 ease-in-out lg:block w-full md:w-1/2 lg:w-full bg-white z-20 ${
          activeSubNavId !== null ? 'block' : 'hidden'
        }`}
        data-accordion="collapse"
      >
        <div className="flex font-bold">
          <SiteHeaderNavSection
            parentPages={config.navigation}
            onOpenOverlay={openSubMenu}
            activeSubNavId={activeSubNavId}
            closeMenuAndSubMenu={closeSubMenu}
          />
        </div>
        <div className="absolute top-0 lg:static w-full lg:w-full bg-white z-50 border-r lg:border-0">
          {config.navigation.map((page) => (
            <div key={page.id}>
              {activeSubNavId === page.id && (
                <SiteHeaderSubNavSection
                  {...page}
                  activeSubNavId={activeSubNavId}
                  closeSubMenu={closeSubMenu}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
} 