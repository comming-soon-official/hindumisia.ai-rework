'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Helper function to get theme from localStorage
const getStoredTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('theme') as Theme) || 'light'
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Initialize theme from localStorage or use defaultTheme
    const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

    // Update localStorage when theme changes
    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
                ? 'dark'
                : 'light'
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return (
        <ThemeProviderContext.Provider
            value={{ theme, setTheme: handleThemeChange }}
        >
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider')

    return context
}
