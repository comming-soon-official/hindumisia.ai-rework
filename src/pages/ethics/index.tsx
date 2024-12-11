import { AlertTriangle } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const EthicsPage = () => {
    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">Ethics</h1>

            <div className="max-w-3xl mx-auto space-y-6">
                <p className="mb-4">
                    We have been influenced by the writings of Professor
                    Virginia Dignum of Umea University in Sweden and Professor
                    Michael Wooldridge, University of Oxford in England to
                    explain our commitment to ethical AI.
                </p>

                <Alert variant="destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                        <span className="font-semibold">Disclaimer:</span> We do
                        not have any relationship (professional or personal)
                        with the Professors or their Universities, nor have they
                        been involved in the development of this tool in any
                        capacity or whatsoever.
                    </AlertDescription>
                </Alert>
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Accountability</h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Media Sentiment Scorecard ® uses information
                            collected to prepare metrics and reports to track
                            trends and gain insights about the nature of
                            anti-Hindu hate prevalent in media platforms.
                        </p>
                        <p className="mt-4">
                            We store all details that we source from media
                            portals that are deemed relevant for further
                            analysis and action. They are all publicly available
                            information. Please refer to our privacy policy for
                            additional information.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Responsibility</h2>
                    </CardHeader>
                    <CardContent>
                        <p>
                            hindumisia.ai automates the process of identifying
                            and flagging anti-Hindu articles based on an AI
                            model developed by its founder. The founder has
                            defined a proprietary anti-Hindu AI-based model to
                            detect and flag articles as anti-Hindu.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Transparency</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    AI based NLP Model
                                </h3>
                                <p>
                                    The model does not use any personally
                                    identifiable information or any form of
                                    demographic information (gender, religion,
                                    location etc) to determine anti-Hindu hate.
                                    Only the article title text, which is
                                    publicly available, is used to determine
                                    anti-Hindu hate.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    Data
                                </h3>
                                <p>
                                    hindumisia.ai uses publicly available
                                    information to determine anti-Hindu hate.
                                    Please refer to our privacy policy for
                                    additional information.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EthicsPage
