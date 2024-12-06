import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">
                            About Us
                        </h3>
                        <p className="text-sm">
                            Tracking and analyzing media sentiment to promote
                            fair and balanced reporting.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=anti_hindu_hate"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Anti-Hindu Hate
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=media_references"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Media References
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=benefits"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Benefits
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=about"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    About Hindumisia.ai
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=partners"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Partners
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=ethics"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Ethics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hindumisia.ai/?page=privacy"
                                    className="text-sm hover:text-orange-500"
                                    target="_blank"
                                >
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">
                            Contact
                        </h3>
                        <ul className="space-y-2">
                            <a
                                href="mailto:hindumisia.ai@gmail.com"
                                className="text-sm flex items-center gap-2 hover:text-orange-500"
                                target="_blank"
                            >
                                <HiOutlineMail className="text-xl" />
                                hindumisia.ai@gmail.com
                            </a>
                            <a
                                href="https://www.instagram.com/hindumisia.ai/"
                                className="text-sm flex items-center gap-2 hover:text-orange-500"
                                target="_blank"
                            >
                                <FaInstagram className="text-xl" />
                                @hindumisia.ai
                            </a>
                            <a
                                href="https://x.com/hindumisia"
                                className="text-sm flex items-center gap-2 hover:text-orange-500"
                                target="_blank"
                            >
                                <FaXTwitter className="text-xl" />
                                @hindumisia{' '}
                            </a>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Media Sentiment
                        Scorecard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
