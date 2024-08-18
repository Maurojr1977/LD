const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js');

const init = async () => {
    const lessonsToComplete = Number(process.env.lessonsToComplete) || 5;
    const token = removeQuotes(process.env.token);
    const userId = removeQuotes(process.env.userId);

    if (!token || !userId) {
        throw new Error('User ID and token must be specified.');
    }

    try {
        const userLanguages = await getUserLanguages();
        console.log('Fetched User Languages:', userLanguages);

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

        for (let i = 0; i < lessonsToComplete; i++) {
            const formattedFraction = `${i + 1}/${lessonsToComplete}`;
            console.log(`Running: ${formattedFraction}`);

            try {
                const createdSession = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(sessionBody),
                }).then(res => {
                    if (!res.ok) throw new Error('Failed to create session. Check your credentials.');
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
                        progressUpdates: [],
                        sessionExperimentRecord: [],
                        sessionStartExperiments: [],
                        showBestTranslationInGradingRibbon: true,
                        xpPromised: 201,
                    }),
                }).then(res => {
                    if (!res.ok) {
                        return res.text().then(text => {
                            console.error(`Error receiving rewards: ${text}`);
                        });
                    }
                    return res.json();
                });

                console.log(`Submitted Spoof Practice Session Data - Received`);
                console.log(`💪🏆🎉 Earned ${rewards.xpGain} XP!`);
            } catch (err) {
                console.error(`Error in lesson ${formattedFraction}: ${err}`);
            }
        }
    } catch (err) {
        console.error(`Initialization failed: ${err}`);
    }
};

init();
