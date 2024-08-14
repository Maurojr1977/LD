const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js')

const init = async () => {
    const lessonsToComplete = process.env.lessonsToComplete ?? 5;
    var token = process.env.token;
    var userId = process.env.userId;

    if (!token || !userId) {
        throw new Error('You must specify a user ID and token.')
    }

    token = removeQuotes(token)
    userId = removeQuotes(userId)

    const userLanguages = await getUserLanguages()

    console.log('Fetched User Languages: ', userLanguages)

    const attempt = async (formattedFraction) => {
        try {
            const initialSessionBody = {
                challengeTypes: [
                    "listen",
                ],
                fromLanguage: userLanguages.fromLanguage,
                isFinalLevel: false,
                isV2: true,
                juicy: true,
                learningLanguage: userLanguages.learningLanguage,
                smartTipsVersion: 2,
                type: "GLOBAL_PRACTICE"
            }

            const createdSession = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
                headers,
                body: JSON.stringify(initialSessionBody),
                method: 'POST'
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Couldn\'t create fake session. Verify your auth credentials.')
                }
                return res.json()
            });

            console.log('Created Fake Duolingo Practice Session: ' + createdSession.id)


            const rewards = await fetch(`https://www.duolingo.com/2017-06-30/sessions/${createdSession.id}`, {
                headers,
                body: JSON.stringify({
                    ...createdSession,
                    startTime: (+new Date() - 60000) / 1000,
                    enableBonusPoints: true,
                    endTime: +new Date() / 1000,
                    failed: false,
                    heartsLeft: 0,
                    hasBoost: true,
                    maxInLessonStreak: 15,
                    shouldLearnThings: true
                }),
                method: 'PUT'
            }).then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        console.log(`There was an error recieving your rewards. RES: ${text}`)
                    })
                }
                return res.json()
            })

            console.log('Submitted Spoof Practice Session Data - Recieved')
            console.log(`💪🏆🎉 Earned ${rewards.xpGain} XP!`)
        } catch (err) {
            console.log('Error while getting XP for lesson: ' + formattedFraction + 'ERR: ' + err)
        }
    }

    for (var i = 0; i < lessonsToComplete; i++) {
        const formattedFraction = i + 1 + '/' + lessonsToComplete;
        console.log('Running: ' + formattedFraction)
        await attempt(formattedFraction)
    }

}

init()