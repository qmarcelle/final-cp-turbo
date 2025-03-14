import React from 'react';
import Link from 'next/link';
import { ROUTES, useNavigation, useBasePath } from '../';

/**
 * Example navigation component using the @cp/router package
 * This demonstrates how to use the package for a typical navigation bar
 */
export function ExampleNavBar() {
  const { isActive, navigate } = useNavigation();
  const basePath = useBasePath();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo with correct base path */}
              <img
                className="h-8 w-auto"
                src={`${basePath}/images/logo.svg`}
                alt="Logo"
              />
            </div>
            
            <div className="ml-6 flex space-x-8">
              {/* Using Link component with ROUTES constants */}
              <Link 
                href={ROUTES.AUTH.DASHBOARD}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive(ROUTES.AUTH.DASHBOARD) 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              
              <Link 
                href={ROUTES.AUTH.CLAIMS}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive(ROUTES.AUTH.CLAIMS) 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Claims
              </Link>
              
              {/* Programmatic navigation with params */}
              <button 
                onClick={() => navigate(ROUTES.AUTH.BENEFIT_DETAILS, { benefitId: 'dental' })}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive(ROUTES.AUTH.BENEFITS) 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dental Benefits
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <Link 
              href={ROUTES.AUTH.PROFILE}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Profile
            </Link>
            
            <button 
              onClick={() => {
                // Example logout action
                console.log('Logging out...');
                navigate(ROUTES.PUBLIC.LOGIN);
              }}
              className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 