import { Card, CardContent, CardHeader } from '@/components/ui/card'

const PartnersPage = () => {
    const partners = [
        {
            image: '/images/medias/INDIA-FACTS.png',
            title: 'IndiaFacts',
            description:
                'IndiaFacts is a platform dedicated to presenting facts about Indian civilization, culture, and society. They regularly publish well-researched articles on Hinduism, history, and current affairs, including coverage of Hinduphobia through their collaboration with hindumisia.ai.'
        },
        {
            image: '/images/medias/myindmakers.png',
            title: 'MyInd Makers',
            description:
                'MyInd Makers is an independent media platform that provides in-depth analysis of Indian politics, society, and culture. They publish regular reports and analysis on anti-Hindu incidents worldwide, utilizing data from hindumisia.ai to create comprehensive monthly scorecards.'
        },
        {
            image: '/images/medias/hindupost.png',
            title: 'HinduPost',
            description:
                'HinduPost is a news portal that focuses on issues affecting Hindu society globally. They provide detailed coverage of Hindu persecution, discrimination, and bias incidents, working to bring awareness to these issues through factual reporting and analysis.'
        }
    ]

    return (
        <div className="container h-screen px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">
                Our Partners
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {partners.map((partner, index) => (
                    <Card
                        key={index}
                        className="transition-all hover:shadow-lg"
                    >
                        <CardHeader className="flex flex-col items-center space-y-4">
                            <img
                                src={partner.image}
                                alt={partner.title}
                                className="object-contain w-32 h-32"
                            />
                            <h2 className="text-xl font-bold">
                                {partner.title}
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                {partner.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default PartnersPage
