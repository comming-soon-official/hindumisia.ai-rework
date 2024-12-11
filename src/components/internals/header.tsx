import { ThemeToggle } from '../theme/ThemeToggle'

const Header = () => {
    return (
        <header className="bg-black border-b">
            <div className="flex items-center justify-between h-16 px-4 ">
                <div className="flex items-center justify-center">
                    <img
                        src="/hindumisia.png"
                        className="object-contain w-auto h-20"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-bold text-orange-500">
                        MEDIA SENTIMENT SCORECARD
                    </h1>
                </div>

                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header
