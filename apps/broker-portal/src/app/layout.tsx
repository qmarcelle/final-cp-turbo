/* eslint-disable @next/next/no-sync-scripts */
import  WelcomeBanner  from "../../../../packages/ui/src/components/broker_portal_components/WelcomeBanner";
import Footer from "../../../../packages/ui/src/components/broker_portal_components/Footer";
import '../../../../packages/ui/src/styles/globals.css';
import SiteHeader from '../../../../packages/ui/src/components/broker_portal_components/SiteHeader';
import '../../../../packages/ui/src/styles/base.css';
//import '../../../../packages/ui/src/styles/checkbox.css';
import 'react-responsive-modal/styles.css';
//import 'slick-carousel/slick/slick-theme.css';
//import 'slick-carousel/slick/slick.css';

export default function RootLayout({
}: {
}) {
  const profile={
    id: '1',
    firstName: 'Kassim',
    lastName: 'Rasoulian',
    dob: '01/01/200BCE',
  }
  return (
    
    <html lang="en">
      <body>
        <SiteHeader profile={profile} />
        <WelcomeBanner titleText="Welcome, " name="James Kilney" />
        <Footer />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
