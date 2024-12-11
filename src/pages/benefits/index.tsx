import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BenefitsPage = () => {
    return (
        <div className="container h-screen px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">
                Benefits of hindumisia.ai
            </h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Advanced Media Monitoring Platform
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            hindumisia.ai offers a sophisticated platform for
                            daily monitoring and analysis of media sentiment
                            regarding India and Hinduism. Through advanced AI
                            and technology, it delivers crucial insights into
                            how these subjects are discussed across various
                            media portals.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Comprehensive Analysis & Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            The platform enables identification of trends,
                            tracking of sentiment changes, and promotes more
                            informed and respectful conversations. This enhanced
                            capability serves researchers, policymakers, and the
                            general public as a valuable tool for fostering
                            greater understanding.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Engagement & Advocacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            Platform reports can be used to engage with policy
                            makers, media professionals, law enforcement
                            agencies, government entities, think tanks and
                            social media influencers for meaningful action. This
                            facilitates positive dialogue in our increasingly
                            connected world.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Community Empowerment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            hindumisia.ai helps amplify Hindu voices, elevate
                            Hindu concerns, and sustain attention on important
                            issues. It promotes further research and analysis
                            while influencing positive action and change. The
                            tool is designed to empower the Hindu community in
                            countering anti-Hindu hate globally.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default BenefitsPage
