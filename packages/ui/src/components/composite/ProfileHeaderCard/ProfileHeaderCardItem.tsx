import { UserProfile } from '@/models/user_profile';
import { IComponent } from '../../IComponent';
import { Column } from '../../foundation/Column';
import { Spacer } from '../../foundation/Spacer';
import { TextBox } from '../../foundation/TextBox';
import { Card } from '../../foundation/Card';
import { Row } from '../../foundation/Row';
import { Header } from '../../foundation/Header';
import { Divider } from '../../foundation/Divider';
import { parentPageArrowIcon } from '../../foundation/Icons/Icons';
import Image from 'next/image';
import { AppLink } from '../../foundation/AppLink';

interface ProfileHeaderCardItemProps extends IComponent {
  profile: UserProfile;
  
}

export const ProfileHeaderCardItem = ({
  profile,
}: ProfileHeaderCardItemProps) => {
  const userLinks = [
    {
      label: 'All Profile Settings',
      className:
        'font-bold !flex primary-color underline underline-offset-3 title-3 ',
      icon: <Image src={parentPageArrowIcon} alt="link" />,
      url: '',
    },
    {
      label: 'Security Settings',
      className: 'font-bold primary-color body-bold body-1 manage-underline',
      url: '',
    },]
  return (
    <Column>
      <section>
        <Column className="flex flex-col">
          <section className="switchFilter">
          <Card
      type="elevated"
      className={`p-4 'selected'} app-base-font-color min-w-[100%]`}
    >
      <Column>
        <Column className="justify-between">
          <TextBox
            type="body-2"
            text='My Profile'
          />
          <Row className="justify-between">
            <Header
              text={`${profile.firstName} ${profile.lastName}`}
              type="title-3"
              className={`font-bold text-xl py-1 'primary-color'}`}
            />
          </Row>

          <TextBox
            type="body-1"
            text={`DOB: ${profile.dob}`}
            className="text-base"
          />
        </Column>
      </Column>
    </Card>
                 <Spacer size={24} />
                 <Column>
                   {userLinks.map((link) => (                   
                     <>
                       <AppLink
                         key={link.label}
                         className={link.className}
                         label={link.label}
                         icon={link.icon}
                         url={link.url}
                       />
                       <Spacer size={8} />
                       {link.label === 'All Profile Settings' && <Divider />}  
                     </>                    
                   ))}
                 </Column>
            <Spacer size={32} />
          </section>
        </Column>
      </section>
    </Column>
  );
};
