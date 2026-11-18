import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'

import { ScrollToTop } from '@/components/ScrollToTop'
import { useTransition } from '@/context/TransitionContext'
import { TransitionOverlay } from '@/context/TransitionOverlay'
import { TransitionProvider } from '@/context/TransitionProvider'
import AboutPage from '@/pages/about'
import ContactPage from '@/pages/contact'
import LandingPage from '@/pages/index'
import NotFoundPage from '@/pages/not-found'
import PortfolioPage from '@/pages/portfolio'
import BeaverhausenPortfolioPage from '@/pages/portfolio/beaverhausen'
import WhiteHawkPortfolioPage from '@/pages/portfolio/whitehawk'
import WhiteHawkComplianceFrameworksPage from '@/pages/portfolio/whitehawk/compliance-frameworks'
import WhiteHawkCyberRiskPortfolioPage from '@/pages/portfolio/whitehawk/cyber-risk-portfolio'
import WhiteHawkCyberRiskRatingPage from '@/pages/portfolio/whitehawk/cyber-risk-rating'
import WhiteHawkRiskAssessmentPlatformPage from '@/pages/portfolio/whitehawk/risk-assessment-platform'
import WhiteHawkTprmPlatformPage from '@/pages/portfolio/whitehawk/tprm-platform'

function RootLayout() {
  const { state } = useTransition()
  return (
    <>
      <ScrollToTop />
      <TransitionOverlay state={state} />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: (
      <TransitionProvider>
        <RootLayout />
      </TransitionProvider>
    ),
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/portfolio', element: <PortfolioPage /> },
      {
        path: '/portfolio/beaverhausen',
        element: <BeaverhausenPortfolioPage />,
      },
      {
        path: '/portfolio/whitehawk',
        element: <WhiteHawkPortfolioPage />,
      },
      {
        path: '/portfolio/whitehawk/cyber-risk-rating',
        element: <WhiteHawkCyberRiskRatingPage />,
      },
      {
        path: '/portfolio/whitehawk/cyber-risk-portfolio',
        element: <WhiteHawkCyberRiskPortfolioPage />,
      },
      {
        path: '/portfolio/whitehawk/compliance-frameworks',
        element: <WhiteHawkComplianceFrameworksPage />,
      },
      {
        path: '/portfolio/whitehawk/risk-assessment-platform',
        element: <WhiteHawkRiskAssessmentPlatformPage />,
      },
      {
        path: '/portfolio/whitehawk/tprm-platform',
        element: <WhiteHawkTprmPlatformPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
