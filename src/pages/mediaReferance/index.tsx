import { Card, CardFooter, CardHeader } from '@/components/ui/card'

const MediaReferencePage = () => {
    const articles = [
        {
            image: '/images/medias/Swarajya_logo.png',
            title: 'An AI-Based Approach To Monitor, Expose, And Counter Anti-Hindu Hate',
            href: 'https://swarajyamag.com/tech/an-ai-based-approach-to-monitor-expose-and-counter-anti-hindu-hate',
            footer: 'Swarajya'
        },
        {
            image: '/images/medias/INDIA-FACTS.png',
            title: '"This Month in Hinduphobia" Series sourced from hindumisia.ai platform',
            href: 'https://www.indiafacts.org.in/category/hinduphobia/',
            footer: 'IndiaFacts'
        },
        {
            image: '/images/medias/myindmakers.png',
            title: 'Monthly Anti-Hindu Scorecards',
            href: 'https://myind.net/Home/authorArchives/2736',
            footer: 'MyInd'
        },
        {
            image: '/images/medias/organiser-logo.png',
            title: 'The Global Anti-Hindu Report for 2022',
            href: 'https://organiser.org/2023/06/10/178261/world/hindumisia-ai-report-2022-ai-analyses-anti-hindu-ecosystem-lists-50-twitter-accounts-propagating-anti-hindu-sentiment/',
            footer: 'Organiser'
        }
    ]

    const webinars = [
        {
            image: '/images/medias/carvaka.jpg',
            title: 'Hindumisia.ai: The Global Anti-Hindu Scorecard',
            footer: 'The Carvaka Podcast',
            href: 'https://www.youtube.com/watch?v=fNsO4pf_6Jg'
        },
        {
            image: '/images/medias/Pgurus.png',
            title: 'The Need to Call out Anti-Hindu Hate in the Media',
            footer: 'PGurus',
            href: 'https://www.youtube.com/watch?v=A8rW2QZzjjs'
        },
        {
            image: '/images/medias/jaiur_dialogues.jpg',
            title: 'Hindumisia is Real',
            footer: 'The Jaipur Dialogues',
            href: 'https://www.youtube.com/watch?v=zURU_tZEqxo'
        },
        {
            image: '/images/medias/stop_hindudvesha.jpg',
            title: 'Psychological Impact of Colonialism',
            footer: 'Stop Hindu Dvesha',
            href: 'https://www.youtube.com/watch?v=MpKHW91BS5M'
        }
    ]

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">
                Media References
            </h1>
            <div className="">
                <div className="my-10">
                    <h1 className="text-3xl font-bold">Articles</h1>

                    <div className="grid grid-cols-2 gap-4">
                        {articles.map((article, index) => (
                            <Card
                                key={index}
                                className="p-4 transition-all border rounded hover:shadow-lg"
                            >
                                <CardHeader className="font-medium">
                                    <img
                                        className="object-contain w-20 h-20"
                                        src={article.image}
                                        alt={article.title}
                                    />
                                    <a
                                        href={article.href}
                                        className="transition-colors hover:underline hover:text-blue-600"
                                    >
                                        {article.title}
                                    </a>
                                </CardHeader>
                                <CardFooter>{article.footer}</CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold">Webinars</h1>

                    <div className="grid grid-cols-2 gap-4">
                        {webinars.map((webinar, index) => (
                            <Card
                                key={index}
                                className="p-4 transition-all border rounded hover:shadow-lg"
                            >
                                <CardHeader className="flex font-medium">
                                    <img
                                        className="object-contain w-20 h-20"
                                        src={webinar.image}
                                        alt={webinar.title}
                                    />
                                    <a
                                        href={webinar.href}
                                        className="transition-colors hover:underline hover:text-blue-600"
                                    >
                                        {webinar.title}
                                    </a>
                                </CardHeader>
                                <CardFooter>{webinar.footer}</CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaReferencePage
