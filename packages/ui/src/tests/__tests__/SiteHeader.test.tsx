import SiteHeader from '../../components/broker_portal_components/SiteHeader';
import { UserProfile } from '@/models/user_profile';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const mockUserProfile: UserProfile = {
  id: '1',
  firstName: 'Kassim',
  lastName: 'Rasoulian',
  dob: '01/01/200BCE',
};

describe('SiteHeader', () => {
  it('should render the Header UI correctly', async () => {
    const { container } = render(
      <SiteHeader profile={mockUserProfile} />,
    );

    expect(
      screen.getByText('Sales & Quoting'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Client Support'),
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
