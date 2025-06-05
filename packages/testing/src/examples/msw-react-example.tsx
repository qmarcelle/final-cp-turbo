/**
 * Example React components for use with MSW
 * 
 * These components demonstrate how to fetch data from an API
 * that can be mocked with MSW during tests.
 */
import React, { useState, useEffect } from 'react';

// Types for our API responses
interface UserData {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface ClientData {
  id: string;
  name: string;
  status: string;
}

// User profile component that loads data on button click
export function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.example.com/user');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="user-profile">
      <h2>User Profile</h2>
      
      {loading && <div data-testid="loading-indicator">Loading...</div>}
      
      {error && (
        <div data-testid="error-message" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {userData && (
        <div data-testid="user-data">
          <p data-testid="user-name">Name: {userData.name}</p>
          <p data-testid="user-email">Email: {userData.email}</p>
          {userData.role && <p data-testid="user-role">Role: {userData.role}</p>}
        </div>
      )}
      
      <button 
        data-testid="load-profile-button"
        onClick={loadUserData}
        disabled={loading}
      >
        {userData ? 'Reload Profile' : 'Load Profile'}
      </button>
    </div>
  );
}

// User dashboard that loads user and clients on mount
export function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://api.example.com/user');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setUserData(data);
        
        // Load clients if user is admin
        if (data.role === 'admin') {
          await loadClients();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const loadClients = async () => {
    try {
      const response = await fetch('https://api.example.com/clients');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    }
  };

  if (loading) {
    return <div data-testid="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div data-testid="dashboard-error" style={{ color: 'red' }}>
        Dashboard Error: {error}
      </div>
    );
  }

  return (
    <div data-testid="user-dashboard">
      <h1>Dashboard</h1>
      
      {userData && (
        <div data-testid="dashboard-welcome">
          Welcome, {userData.name} ({userData.role || 'user'})
        </div>
      )}
      
      {clients.length > 0 && (
        <>
          <h2>Your Clients</h2>
          <ul data-testid="client-list">
            {clients.map(client => (
              <li key={client.id} data-testid={`client-${client.id}`}>
                {client.name} - {client.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
} 