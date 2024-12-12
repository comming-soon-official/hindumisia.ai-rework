import { Loader2 } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/internals/footer'
import Header from './components/internals/header'
import { ThemeProvider } from './components/theme/ThemeProvider'
import AboutPage from './pages/about'
import AntiHinduPage from './pages/antiHindu'
import BenefitsPage from './pages/benefits'
import EthicsPage from './pages/ethics'
import HomePage from './pages/home'
import MediaReferencePage from './pages/mediaReferance'
import PartnersPage from './pages/partners'
import PrivacyPage from './pages/privacy'
// import AboutPage from './pages/about'
// import CreditsPage from './pages/credits'
import { DataInit } from './store/init'

const App = () => {
    const { error, loading } = DataInit()
    return (
        <ThemeProvider defaultTheme="system">
            <BrowserRouter>
                <Header />
                <div>
                    {loading ? (
                        <div className="flex items-center justify-center h-screen">
                            <Loader2
                                className="text-orange-500 animate-spin"
                                size={'40'}
                            />
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route
                                path="/benefits"
                                element={<BenefitsPage />}
                            />
                            <Route
                                path="anti-hindu"
                                element={<AntiHinduPage />}
                            />
                            <Route
                                path="media-refernace"
                                element={<MediaReferencePage />}
                            />
                            <Route path="privacy" element={<PrivacyPage />} />

                            <Route path="partners" element={<PartnersPage />} />
                            <Route path="ethics" element={<EthicsPage />} />
                        </Routes>
                    )}
                    <div>{error}</div>
                </div>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
