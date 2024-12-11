import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AboutPage = () => {
    return (
        <div className="container h-screen px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">
                About hindumisia.ai
            </h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>What is hindumisia.ai?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="space-y-4 text-sm">
                            hindumisia.ai is a platform dedicated to monitoring
                            and countering anti-Hindu sentiment, utilizing the
                            evolving fields of Artificial Intelligence and
                            Natural Language Processing. The platform pioneered
                            the concept of AI-based approach to detecting
                            anti-Hindu hate sourcing tweets from X realtime and
                            visualizing them in The Global Anti-Hindu Scorecard
                            ®.
                            <br />
                            <br />
                            The platform shifted its focus in April 2024 to
                            tracking media sentiments across various media
                            outlets with the launch of Media Sentiment Scorecard
                            ® (briefly called Media Monitor Dashboard).
                            <br />
                            <br />
                            The AI-based approach was based on an NLP model that
                            has been greatly simplified and repurposed for use
                            with media portals.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How does the tool work?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            The platform functions by offering periodical
                            statistics and visualizations of general sentiments,
                            presenting an overview of the wider media
                            environment using Media Sentiment Scorecard ®.
                            Differing from its predecessor, the updated version
                            focuses on visualizing general sentiment for the
                            time being.
                            <br />
                            <br />
                            The analysis of anti-Hindu sentiments is conducted
                            using a custom-developed, streamlined NLP model, and
                            the insights will be incorporated into our routine
                            reports. As the model matures, the platform will be
                            updated to include anti-Hindu sentiments in the
                            Media Sentiment Scorecard ® online in the future.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Will additional portals be included in the future?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            Yes. There are over two dozen media outlets/portals
                            to be included in the analysis. Besides, there are
                            plans to offer API access to the AI model for use by
                            select dharmic organizations.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Do you store all articles?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            No, we do not store articles that we scan from
                            portals. We only read the URL of the article and use
                            the title to detect sentiments, for our reporting
                            needs. URL of the article and the Article Title is
                            stored for reference and reporting purposes.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How is anti-Hindu hate detected?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            Anti-Hindu hate is detected using an Artificial
                            Intelligence model and NLP techniques.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Is there a way to access all the stored data?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            There's no public access to the stored dataset. They
                            are meant for hindumisia.ai use only.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AboutPage
