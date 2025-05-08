import { UserProfile } from '@/models/user_profile';
import { toPascalCase } from '../../../utils/pascale_case_formatter';
import { IComponent } from '../../IComponent';
import { ProfileHeaderCardItem } from './ProfileHeaderCardItem';
import { useSideBarModalStore } from '../../foundation/SiteHeader/SideBarModal';

export interface ProfileHeaderCardProps extends IComponent {
  icon: JSX.Element;
  profile: UserProfile;
}

export const ProfileHeaderCard = ({
  icon,
  profile,
}: ProfileHeaderCardProps) => {
  const { showSideBar } = useSideBarModalStore();

  //const selectedProfile = profiles.find((item) => item.selected == true);

  const getSideBarContentModal = () => {
    showSideBar({
      content: (
        <ProfileHeaderCardItem profile={profile}  />
      ),
      footer: (<></>),
    });
  };

  return (
    <div
      className="flex h-full secondary-bg-color2 text-white px-4 py-1 hover:bg-info focus:bg-info focus:mr-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:h-[90%] "
      tabIndex={0}
      aria-label="Profile Card"
      onClick={() => getSideBarContentModal()}
    >
      {icon}
      <div className="hidden lg:block p-2">
        <span className="text-xs">My Profile:
        </span>
        <p>
          {toPascalCase(
            `${profile!.firstName} ${profile!.lastName}`,
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
