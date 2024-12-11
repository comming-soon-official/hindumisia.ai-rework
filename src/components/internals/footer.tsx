import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'

const quickLinks = [
    { title: 'Home', href: '/#' },
    {
        title: 'Anti-Hindu Hate',
        href: '/anti-hindu'
    },
    {
        title: 'Media References',
        href: '/media-refernace'
    },
    { title: 'Benefits', href: '/benefits' }
]
const company = [
    {
        title: 'About Hindumisia.ai',
        href: '/about'
    },
    {
        title: 'Partners',
        href: '/partners'
    },
    {
        title: 'Ethics',
        href: '/ethics'
    },
    {
        title: 'Privacy',
        href: '/privacy'
    }
]
const contacts = [
    {
        title: 'contact@hindumisia.ai',
        href: 'mailto:hindumisia.ai@gmail.com',
        icon: HiOutlineMail
    },
    {
        title: '@hindumisia.ai',
        href: 'https://www.instagram.com/hindumisia.ai/',
        icon: FaInstagram
    },
    {
        title: '@hindumisia',
        href: 'https://x.com/hindumisia',
        icon: FaXTwitter
    }
]
const Footer = () => {
    return (
        <footer className="py-12 mt-auto text-gray-300 bg-black">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            About Us
                        </h3>
                        <p className="text-sm">
                            Tracking and analyzing media sentiment to promote
                            fair and balanced reporting.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((links, i) => (
                                <li key={i}>
                                    <a
                                        href={links.href}
                                        className="text-sm hover:text-orange-500"
                                        target="_blank"
                                    >
                                        {links.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {company.map((items, i) => (
                                <li key={i}>
                                    <a
                                        href={items.href}
                                        className="text-sm hover:text-orange-500"
                                        target="_blank"
                                    >
                                        {items.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                            Contact
                        </h3>
                        <ul className="space-y-2">
                            {contacts.map((contact, i) => {
                                const Icon = contact.icon
                                return (
                                    <a
                                        key={i}
                                        href={contact.href}
                                        className="flex items-center gap-2 text-sm hover:text-orange-500"
                                        target="_blank"
                                    >
                                        <Icon className="text-xl" />
                                        {contact.title}
                                    </a>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 mt-8 text-sm text-center border-t border-gray-700">
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
