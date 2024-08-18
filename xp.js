const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js');

const init = async () => {
    const lessonsToComplete = parseInt(process.env.lessonsToComplete) || 5;
    let token = process.env.token;
    let userId = process.env.userId;

    if (!token || !userId) {
        throw new Error('You must specify a user ID and token.');
    }

    token = removeQuotes(token);
    userId = removeQuotes(userId);

    const userLanguages = await getUserLanguages();
    console.log('Fetched User Languages:', userLanguages);

    const attempt = async (formattedFraction) => {
        try {
            const sessionBody = {
                challengeTypes: ["listen"],
                fromLanguage: userLanguages.fromLanguage,
                isFinalLevel: false,
                isV2: true,
                juicy: true,
                learningLanguage: userLanguages.learningLanguage,
                levelIndex: 1,
                shakeToReportEnabled: true,
                skillId: "20017c47905904a4bbdfa3ca1b4bd85e",
                smartTipsVersion: 2,
                type: "LEGENDARY_LEVEL",
            };

            const createdSession = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
                headers,
                method: 'POST',
                body: JSON.stringify(sessionBody),
            }).then(res => {
                if (!res.ok) {
                    throw new Error('Could not create fake session. Verify your auth credentials.');
                }
                return res.json();
            });

            console.log(`Created Fake Duolingo Practice Session: ${createdSession.id}`);

            const rewards = await fetch(`https://www.duolingo.com/2017-06-30/sessions/${createdSession.id}`, {
                headers,
                method: 'PUT',
                body: JSON.stringify({
                    ...createdSession,
                    beginner: false,
                    challengeTimeTakenCutoff: 6000,
                    startTime: (Date.now() - 60000) / 1000,
                    enableBonusPoints: true,
                    endTime: Date.now() / 1000,
                    failed: false,
                    heartsLeft: 0,
                    hasBoost: true,
                    maxInLessonStreak: 15,
                    shouldLearnThings: true,
                    level1Index: 1,
                    progressUpdates: [],
                    sessionExperimentRecord: [],
                    sessionStartExperiments: [],
                    showBestTranslationInGradingRibbon: true,
                    xpPromised: 201,
                }),
            }).then(res => {
                if (!res.ok) {
                    return res.text().then(text => {
                        console.log(`There was an error receiving your rewards. RES: ${text}`);
                    });
                }
                return res.json();
            });

            console.log(`Submitted Spoof Practice Session Data - Received`);
            console.log(`💪🏆🎉 Earned ${rewards.xpGain} XP!`);
        } catch (err) {
            console.log(`Error while getting XP for lesson: ${formattedFraction} - ERR: ${err}`);
        }
    };

    for (let i = 0; i < lessonsToComplete; i++) {
        const formattedFraction = `${i + 1}/${lessonsToComplete}`;
        console.log(`Running: ${formattedFraction}`);
        await attempt(formattedFraction);
    }
};

init();
