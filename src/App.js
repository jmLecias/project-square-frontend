import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/variables.css'
import './css/header-styles.css'
import './css/sidebar-styles.css'
import './css/feed-styles.css'
import './css/item-styles.css'
import './css/main-container-styles.css'
import './css/not-found-page-styles.css'
import './css/landing-page-styles.css'
import './css/auth-page-styles.css'
import './css/dashboard-page-styles.css'
import './css/location-page-styles.css'
import './css/groups-page-styles.css'
import './css/group-page-styles.css'
import './css/id-setup-page-styles.css'
import './css/settings-page-styles.css'
import './css/dropzone-styles.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage.js';

import IdentityPage from './pages/identity/IdentityPage.js';

import GroupsPage from './pages/groups/GroupsPage';
import GroupPage from './pages/groups/GroupPage.js';

import SettingsPage from './pages/settings/SettingsPage.js';

import LocationPage from './pages/locations/LocationPage.js';

import AuthenticatedRoute from './routes/AuthenticatedRoute';
import PublicRoute from './routes/PublicRoute';

import StreamTest from './pages/StreamTest.js';

import { AuthProvider } from './hooks/useAuth';
import { RecognizeProvider } from './hooks/useRecognize';
import { SidebarProvider } from './hooks/useSidebar';
import { GroupProvider } from './hooks/useGroup';
import { LocationProvider } from './hooks/useLocation';
import { BreadcrumbsProvider } from './hooks/useBreadcrumbs.js';
import { FeedsProvider } from './hooks/useFeeds.js';
import { IdentityProvider } from './hooks/useIdentity.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecognizeProvider>
          <GroupProvider>
            <LocationProvider>
              <SidebarProvider>
                <BreadcrumbsProvider>
                  <FeedsProvider>
                    <IdentityProvider>
                      <Routes>
                        <Route
                          index
                          element={
                            <PublicRoute>
                              <LandingPage />
                            </PublicRoute>
                          }
                        />
                        <Route
                          path="/test-stream"
                          element={
                            <StreamTest />
                          }
                        />
                        <Route
                          path="auth/*"
                          element={
                            <PublicRoute>
                              <Routes>
                                <Route path="login" element={<AuthPage type="login" />} />
                                <Route
                                  path="register/*"
                                  element={
                                    <Routes>
                                      <Route path="/" element={<AuthPage type="register" />} />
                                      <Route path="identity/info" element={<IdentityPage content="info" />} />
                                      <Route path="identity/face" element={<IdentityPage content="face" />} />
                                      <Route path="identity/verify" element={<IdentityPage content="verify" />} />
                                      <Route path="identity/finish" element={<IdentityPage content="finish" />} />
                                      <Route path="*" element={<NotFoundPage content="noHeader" />} />
                                    </Routes>
                                  }
                                />
                                <Route path="*" element={<NotFoundPage content="noHeader" />} />
                              </Routes>
                            </PublicRoute>
                          }
                        />
                        <Route
                          path="/*"
                          element={
                            <AuthenticatedRoute>
                              <Routes>
                                <Route path="dashboard" element={<DashboardPage />} />
                                <Route
                                  path="groups/*"
                                  element={
                                    <Routes>
                                      <Route path="/" element={<GroupsPage />} />
                                      <Route path=":id" element={<GroupPage content="index" />} />
                                      <Route path=":id/members" element={<GroupPage content="members" />} />
                                      <Route path=":id/settings" element={<GroupPage content="settings" />} />
                                      <Route path="*" element={<NotFoundPage content="header" />} />
                                    </Routes>
                                  }
                                />
                                <Route
                                  path="locations/*"
                                  element={
                                    <Routes>
                                      <Route path=":id" element={<LocationPage />} />
                                      <Route path="*" element={<NotFoundPage content="header" />} />
                                    </Routes>
                                  }
                                />
                                <Route
                                  path="settings/*"
                                  element={
                                    <Routes>
                                      <Route path="/" element={<SettingsPage />} />
                                      <Route path="*" element={<NotFoundPage content="header" />} />
                                    </Routes>
                                  }
                                />
                                <Route path="*" element={<NotFoundPage content="header" />} />
                              </Routes>
                            </AuthenticatedRoute>
                          }
                        />
                      </Routes>
                    </IdentityProvider>
                  </FeedsProvider>
                </BreadcrumbsProvider>
              </SidebarProvider>
            </LocationProvider>
          </GroupProvider>
        </RecognizeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
