import { Card, CardContent, CardHeader } from '@/components/ui/card'

const PrivacyPage = () => {
    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">Privacy</h1>

            <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Policy Brief</h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            hindumisia.ai collects only publicly available
                            information from portals for use.
                        </p>
                        <p className="mt-4">
                            There's no user registration requirements for using
                            the website. So no personal information is collected
                            in that regard. Please read on to know more about
                            how we store and use the information we collect.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Cookies</h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            We do not track website user behavior when they
                            browse the website. So we don't use cookies. As
                            simple as that.
                        </p>
                        <p className="mt-4">
                            This privacy policy is subject to modifications from
                            time to time in alignment with our evolving needs.
                            We will update this section as and when our privacy
                            policy changes.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">
                            Information we collect and use
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            We collect, process and store the following publicly
                            available information:
                        </p>
                        <ul className="pl-6 mt-2 list-disc">
                            <li>Portal Name</li>
                            <li>Article Title</li>
                            <li>Article URL</li>
                            <li>Author Name</li>
                            <li>Publish Date</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">
                            How we use this information
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            We retain all the information that we collect for
                            further use in following ways:
                        </p>
                        <ul className="pl-6 mt-2 list-disc">
                            <li>
                                We will use the information to calculate metrics
                                for the Media Monitor Dashboard ®
                            </li>
                            <li>
                                We may publish specific anti-Hindu article
                                links, corresponding author and portal after
                                suitable review to expose anti-Hindu content.
                            </li>
                            <li>
                                We may share the information we retain with our
                                partner dharmic organizations in support of
                                their advocacy efforts and research.
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PrivacyPage
