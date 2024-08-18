const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js');

(async () => {
    const { learningLanguage, fromLanguage } = await getUserLanguages();
    const token = removeQuotes(process.env.token);
    const userId = removeQuotes(process.env.userId);

    if (!token || !userId) throw new Error('User ID and token are required.');

    const parsedLearningLanguage = (learningLanguage === fromLanguage)
        ? (learningLanguage === 'fr' ? 'en' : 'fr')
        : learningLanguage;

    try {
        const res = await fetch("https://schools.duolingo.com/api/2/classrooms", {
            headers,
            method: "POST",
            body: JSON.stringify({
                classrooms: [{
                    from_language: fromLanguage,
                    learning_language: parsedLearningLanguage,
                    name: "Unlimited Hearts Hack (Deletion will remove your unlimited hearts)"
                }]
            })
        });

        if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error === 'Classroom already exists'
                ? 'You have already done this hack. This hack is permanent. No need to run again.'
                : `Error: ${error}`);
        }

        console.log("Success! To use your unlimited hearts, go to the Duolingo home page, click on your hearts, and under 'Unlimited Hearts' click Turn on or Enable.");
    } catch (error) {
        console.error(error.message);
    }
})();
