// /* import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { Separator } from "@/components/ui/separator";
// import {
//   AlertCircle,
//   CheckCircle,
//   HelpCircle,
//   Mail,
//   Search as SearchIcon,
//   User,
// } from "lucide-react";
// import React from "react";

// export default function BrokerPortalPage(): JSX.Element {
//   // Navigation menu items data
//   const navItems = [
//     "Sales & Quoting",
//     "Client Support",
//     "Reporting",
//     "Materials & Forms",
//     "Learning Center",
//   ];

//   // Notification items data
//   const notificationItems = [
//     { icon: <Mail className="w-6 h-6" />, count: 1, text: "new notifications" },
//     {
//       icon: <CheckCircle className="w-6 h-6" />,
//       count: 1,
//       text: "new application approvals",
//     },
//     {
//       icon: <AlertCircle className="w-6 h-6" />,
//       count: 1,
//       text: "application needs your attention",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center relative bg-neutral-50">
//       <header className="flex flex-col items-start relative self-stretch w-full z-[3]">
//         {/* Top navigation bar */}
//         <div className="flex items-center justify-between pl-4 pr-0 py-0 relative self-stretch w-full bg-white border-b border-[#cccccc]">
//           <div className="inline-flex items-center gap-6">
//             <img
//               className="relative w-[159.59px] h-8"
//               alt="BlueCross BlueShield of Tennessee"
//               src=""
//             />
//           </div>

//           <div className="inline-flex h-[72px] items-center justify-end gap-2">
//             <Button
//               variant="ghost"
//               className="inline-flex items-center gap-2 p-4 text-[#005eb9]"
//             >
//               <HelpCircle className="w-6 h-6" />
//               <span className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                 Support
//               </span>
//             </Button>

//             <div className="inline-flex h-[72px] items-center gap-2 p-4 bg-[#00497e]">
//               <User className="w-6 h-6 text-white" />
//               <div className="inline-flex flex-col items-start justify-center">
//                 <div className="font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-white text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                   My Profile:
//                 </div>
//                 <div className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-white text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                   Kassim Rasoulian
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main navigation menu */}
//         <NavigationMenu className="flex items-center pl-4 pr-0 py-0 relative self-stretch w-full bg-white border-t border-b border-[#cccccc]">
//           <NavigationMenuList className="flex items-center relative flex-1 grow">
//             {navItems.map((item, index) => (
//               <NavigationMenuItem key={index}>
//                 <NavigationMenuTrigger className="inline-flex items-center gap-2 p-4 bg-white text-[#005eb9] font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                   {item}
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   {/* Dropdown content would go here */}
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//             ))}
//           </NavigationMenuList>

//           <Button
//             variant="ghost"
//             className="inline-flex items-center gap-2 p-4 bg-white text-[#005eb9]"
//           >
//             <span className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//               Search
//             </span>
//             <SearchIcon className="w-6 h-6" />
//           </Button>
//         </NavigationMenu>
//       </header>

//       <main className="flex flex-col items-center relative self-stretch w-full z-[2] bg-neutral-50">
//         {/* Hero section with notifications */}
//         <section className="items-center justify-center gap-4 pt-8 pb-16 px-4 w-full [background:radial-gradient(50%_50%_at_75%_50%,rgba(93,193,253,0.3)_0%,rgba(93,193,253,0)_100%),linear-gradient(245deg,rgba(6,125,172,1)_0%,rgba(0,73,126,1)_80%)]">
//           <div className="flex flex-col w-full max-w-[992px] items-start gap-4 mx-auto">
//             <h1 className="font-title-title-1 font-[number:var(--title-title-1-font-weight)] text-white text-[length:var(--title-title-1-font-size)] tracking-[var(--title-title-1-letter-spacing)] leading-[var(--title-title-1-line-height)]">
//               Welcome, Kassim
//             </h1>

//             <div className="items-start gap-2 flex flex-col relative self-stretch w-full">
//               {notificationItems.map((item, index) => (
//                 <div key={index} className="inline-flex items-start">
//                   <div className="flex w-80 items-start gap-2 p-2 relative rounded">
//                     {item.icon}
//                     <div className="flex items-start gap-1 relative flex-1 grow">
//                       <div className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-white text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                         [{item.count}]
//                       </div>
//                       <div className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-white text-[length:var(--body-interactive-button-body-1-font-size)] tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                         {item.text}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Member Search Card */}
//         <Card className="flex flex-col w-full max-w-[992px] -mt-8 mx-auto border border-solid border-[#cccccc]">
//           <CardHeader className="p-8 pb-0">
//             <CardTitle className="font-title-title-2 font-[number:var(--title-title-2-font-weight)] text-[#333333] text-[length:var(--title-title-2-font-size)] tracking-[var(--title-title-2-letter-spacing)] leading-[var(--title-title-2-line-height)]">
//               Member Search
//             </CardTitle>
//             <CardDescription className="font-body-body-1 font-[number:var(--body-body-1-font-weight)] text-[#333333] text-[length:var(--body-body-1-font-size)] tracking-[var(--body-body-1-letter-spacing)] leading-[var(--body-body-1-line-height)]">
//               Start a quick search using one of the fields below.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-8 pt-4">
//             <div className="flex items-start gap-4 w-full">
//               <div className="flex items-end gap-4 flex-1">
//                 <div className="flex flex-col items-start gap-2 flex-1">
//                   <label className="font-body-body-1 font-[number:var(--body-body-1-font-weight)] text-[#333333] text-[length:var(--body-body-1-font-size)] tracking-[var(--body-body-1-letter-spacing)] leading-[var(--body-body-1-line-height)]">
//                     Social Security Number
//                   </label>
//                   <Input
//                     className="px-4 py-2 bg-white rounded border border-solid border-neutral-500"
//                     placeholder="___ - __ - ____"
//                   />
//                 </div>

//                 <div className="font-body-body-1 font-[number:var(--body-body-1-font-weight)] text-[#333333] text-[length:var(--body-body-1-font-size)] tracking-[var(--body-body-1-letter-spacing)] leading-[var(--body-body-1-line-height)]">
//                   OR
//                 </div>

//                 <div className="flex flex-col items-start gap-2 flex-1">
//                   <label className="font-body-body-1 font-[number:var(--body-body-1-font-weight)] text-[#333333] text-[length:var(--body-body-1-font-size)] tracking-[var(--body-body-1-letter-spacing)] leading-[var(--body-body-1-line-height)]">
//                     Subscriber ID (#s only)
//                   </label>
//                   <Input className="px-4 py-2 bg-white rounded border border-solid border-neutral-500" />
//                 </div>
//               </div>

//               <div className="flex flex-col max-w-64 items-start justify-center gap-4 pt-8 flex-1">
//                 <Button className="flex items-center justify-center gap-2 px-8 py-2 w-full bg-[#7faedc] text-white rounded">
//                   <span className="font-body-interactive-button-body-1 font-[number:var(--body-interactive-button-body-1-font-weight)] text-white text-[length:var(--body-interactive-button-body-1-font-size)] text-right tracking-[var(--body-interactive-button-body-1-letter-spacing)] leading-[var(--body-interactive-button-body-1-line-height)]">
//                     Search
//                   </span>
//                 </Button>

//                 <Button
//                   variant="link"
//                   className="flex items-center justify-center gap-2 px-8 py-2 w-full"
//                 >
//                   <span className="font-body-interactive-link-body-1 font-[number:var(--body-interactive-link-body-1-font-weight)] text-[#005eb9] text-[length:var(--body-interactive-link-body-1-font-size)] tracking-[var(--body-interactive-link-body-1-letter-spacing)] leading-[var(--body-interactive-link-body-1-line-height)] underline">
//                     Use Advanced Search
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Custom component placeholder */}
//         <div className="flex flex-col items-center px-4 py-8 w-full z-[1]">
//           <div className="flex flex-col w-full max-w-[992px] items-start gap-8">
//             <div className="flex items-start justify-center p-4 w-full bg-[#0000000d] rounded-lg border-2 border-dashed border-[#cccccc]">
//               <div className="font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-[#333333] text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                 Replace with custom component
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="flex flex-col items-start self-stretch w-full z-0">
//         <div className="flex flex-col items-center pt-8 pb-[72px] px-4 w-full bg-[#333333]">
//           <div className="flex flex-col w-full max-w-[992px] items-center gap-8">
//             <div className="flex items-start justify-center gap-8 w-full">
//               <div className="w-[672px] font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-white text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                 ©1998-2025 BlueCross BlueShield of Tennessee, Inc., an
//                 Independent Licensee of the Blue Cross Blue Shield Association.
//                 BlueCross BlueShield of Tennessee is a Qualified Health Plan
//                 issuer in the Health Insurance Marketplace.&nbsp;&nbsp;1 Cameron
//                 Hill Circle, Chattanooga TN 37402-0001
//               </div>

//               <div className="flex w-72 items-center justify-end gap-2">
//                 <div className="inline-flex h-4 items-center justify-center gap-2">
//                   <div className="font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-white text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                     Sitemap
//                   </div>
//                 </div>

//                 <Separator orientation="vertical" className="h-4 bg-white" />

//                 <div className="inline-flex h-4 items-center justify-center gap-2">
//                   <div className="font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-white text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                     Privacy &amp; Security
//                   </div>
//                 </div>

//                 <Separator orientation="vertical" className="h-4 bg-white" />

//                 <div className="inline-flex h-4 items-center justify-center gap-2">
//                   <div className="font-body-body-2 font-[number:var(--body-body-2-font-weight)] text-white text-[length:var(--body-body-2-font-size)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)]">
//                     Legal
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// } */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '18': '4.5rem',
      },
      rotate: {
        '270': '270deg',
      },
      inset: {
        '72px': '72px',
      },
      width: {
        '18': '4.5rem',
      },
      colors: {
        primary: '#005EB9',
        'primary-focus': '#00497E',
        'primary-content': '#ffffff',
        secondary: '#5DC1FD',
        'secondary-focus': '#E7F6FF',
        'secondary-content': '#ffffff',
        'tertiary-4': '#cccccc',
        'tertiary-5': '#f2f2f2',
        neutral: '#333333',
        'base-100': '#FFFFFF',
        'base-200': '#F2F2F2',
        info: '#067DAC',
        success: '#508316',
        'success-content': '#ffffff',
        warning: '#FFA500',
        'warning-content': '#ffffff',
        error: '#EB001B',
        'error-content': '#ffffff',
      },
      fontFamily: {
        base: ['Univers-45', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        default: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
        large: '12px',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
        hard: '0 4px 6px rgba(0,0,0,.3), 0 2px 4px rgba(0,0,0,.06)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  //plugins: [require('flowbite/plugin')],
};
export default config;

// module.exports = {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       height: {
//         '18': '4.5rem',
//       },
//       rotate: {
//         '270': '270deg',
//       },
//       inset: {
//         '72px': '72px',
//       },
//       width: {
//         '18': '4.5rem',
//       },
//       colors: {
//         primary: '#005EB9',
//         'primary-focus': '#00497E',
//         'primary-content': '#ffffff',
//         secondary: '#5DC1FD',
//         'secondary-focus': '#E7F6FF',
//         'secondary-content': '#ffffff',
//         'tertiary-4': '#cccccc',
//         'tertiary-5': '#f2f2f2',
//         neutral: '#333333',
//         'base-100': '#FFFFFF',
//         'base-200': '#F2F2F2',
//         info: '#067DAC',
//         success: '#508316',
//         'success-content': '#ffffff',
//         warning: '#FFA500',
//         'warning-content': '#ffffff',
//         error: '#EB001B',
//         'error-content': '#ffffff',
//       },
//       fontFamily: {
//         base: ['Univers-45', 'sans-serif'],
//       },
//       borderRadius: {
//         none: '0',
//         sm: '0.125rem',
//         default: '0.25rem',
//         md: '0.375rem',
//         lg: '0.5rem',
//         full: '9999px',
//         large: '12px',
//       },
//       boxShadow: {
//         soft: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
//         hard: '0 4px 6px rgba(0,0,0,.3), 0 2px 4px rgba(0,0,0,.06)',
//         inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
//       },
//     },
//   },
//   plugins: [],
// }; 