import React, { useState } from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { useAuthStore } from '../store/authStore';
import { useDataLoadingStore } from '../store/dataLoadingStore';

/**
 * Props for the RouterDevtools component
 */
interface RouterDevtoolsProps {
  initialIsOpen?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * RouterDevtools component for debugging router state
 * 
 * This component provides a developer-friendly UI for inspecting:
 * - Current navigation state
 * - Authentication state
 * - Route data cache
 * 
 * It should only be used in development mode
 */
export const RouterDevtools: React.FC<RouterDevtoolsProps> = ({
  initialIsOpen = false,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [activeTab, setActiveTab] = useState<'navigation' | 'auth' | 'data'>('navigation');
  
  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  // Get states from stores
  const navigationState = useNavigationStore();
  const authState = useAuthStore();
  const dataLoadingState = useDataLoadingStore();
  
  // Determine position styles
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    ...(position.includes('top') ? { top: '20px' } : { bottom: '20px' }),
    ...(position.includes('right') ? { right: '20px' } : { left: '20px' }),
  };
  
  // Toggle button style
  const toggleButtonStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10000,
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: '#606060',
    color: 'white',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    ...(position.includes('top') ? { top: '10px' } : { bottom: '10px' }),
    ...(position.includes('right') ? { right: '10px' } : { left: '10px' }),
  };
  
  // Tab style
  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#444' : '#333',
    border: 'none',
    color: 'white',
    borderBottom: isActive ? '2px solid #0088ff' : 'none',
    outline: 'none',
  });
  
  // Panel style
  const panelStyle: React.CSSProperties = {
    width: '380px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflow: 'auto',
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    padding: '16px',
    fontSize: '14px',
    ...positionStyles,
  };
  
  // JSON display style
  const jsonDisplayStyle: React.CSSProperties = {
    backgroundColor: '#333',
    padding: '8px 12px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '300px',
    fontSize: '12px',
    fontFamily: 'monospace',
    marginBottom: '8px',
    marginTop: '8px',
  };
  
  // Get navigation tab content
  const renderNavigationTab = () => (
    <div>
      <h3>Navigation State</h3>
      <div style={jsonDisplayStyle}>
        <pre>
          {JSON.stringify({
            currentPath: navigationState.currentPath,
            previousPath: navigationState.previousPath,
            isNavigating: navigationState.isNavigating,
            portalContext: navigationState.portalContext,
            breadcrumbs: navigationState.breadcrumbs
          }, null, 2)}
        </pre>
      </div>
      
      <h4>Breadcrumbs</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {navigationState.breadcrumbs.map((crumb, i) => (
          <div 
            key={i} 
            style={{ 
              padding: '4px 8px', 
              backgroundColor: crumb.isActive ? '#0088ff' : '#444',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            {crumb.label}
          </div>
        ))}
      </div>
    </div>
  );
  
  // Get auth tab content
  const renderAuthTab = () => {
    // Don't show sensitive data, only auth status
    const safeAuthState = {
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      userInfo: authState.user ? {
        id: authState.user.id,
        email: authState.user.email,
        roles: authState.user.roles,
        permissions: authState.user.permissions,
      } : null,
      error: authState.error,
    };
    
    return (
      <div>
        <h3>Authentication State</h3>
        <div style={jsonDisplayStyle}>
          <pre>
            {JSON.stringify(safeAuthState, null, 2)}
          </pre>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <button 
            style={{
              padding: '6px 12px',
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
            onClick={() => console.log('Auth state:', authState)}
          >
            Log Auth State
          </button>
        </div>
      </div>
    );
  };
  
  // Get data loading tab content
  const renderDataLoadingTab = () => {
    const { routeData, prefetchedRoutes } = dataLoadingState;
    
    return (
      <div>
        <h3>Route Data Cache</h3>
        {Object.keys(routeData).length === 0 ? (
          <p>No cached route data</p>
        ) : (
          <div>
            {Object.entries(routeData).map(([route, data]) => (
              <div key={route} style={{ marginBottom: '16px' }}>
                <h4>{route}</h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '2px 6px', 
                    backgroundColor: data.isLoading ? '#ffbb00' : (data.error ? '#ff4444' : '#44aa44'),
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {data.isLoading ? 'Loading' : (data.error ? 'Error' : 'Loaded')}
                  </span>
                  
                  {data.lastUpdated && (
                    <span style={{ fontSize: '12px', color: '#aaa' }}>
                      Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                
                <div style={jsonDisplayStyle}>
                  <pre>
                    {JSON.stringify(data.data, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <h4>Prefetched Routes</h4>
        {prefetchedRoutes.length === 0 ? (
          <p>No prefetched routes</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {prefetchedRoutes.map((route, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '4px 8px', 
                  backgroundColor: '#555',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              >
                {route}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ marginTop: '16px' }}>
          <button 
            style={{
              padding: '6px 12px',
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
            onClick={() => dataLoadingState.clearAllData()}
          >
            Clear All Cached Data
          </button>
        </div>
      </div>
    );
  };
  
  // Render toggle button
  if (!isOpen) {
    return (
      <button 
        style={toggleButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        Open Router Devtools
      </button>
    );
  }
  
  // Render full devtools
  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '16px' }}>Router Devtools</h2>
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
      </div>
      
      <div style={{ display: 'flex', borderBottom: '1px solid #444', marginBottom: '16px' }}>
        <button 
          style={tabStyle(activeTab === 'navigation')}
          onClick={() => setActiveTab('navigation')}
        >
          Navigation
        </button>
        <button 
          style={tabStyle(activeTab === 'auth')}
          onClick={() => setActiveTab('auth')}
        >
          Auth
        </button>
        <button 
          style={tabStyle(activeTab === 'data')}
          onClick={() => setActiveTab('data')}
        >
          Route Data
        </button>
      </div>
      
      {activeTab === 'navigation' && renderNavigationTab()}
      {activeTab === 'auth' && renderAuthTab()}
      {activeTab === 'data' && renderDataLoadingTab()}
    </div>
  );
};

export default RouterDevtools; 