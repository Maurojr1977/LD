const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js')

const init = async () => {
    const userLanguages = await getUserLanguages()
    var token = process.env.token;
    var userId = process.env.userId;

    token = removeQuotes(token)
    userId = removeQuotes(userId)

    if (!token || !userId) {
        throw new Error('You must specify a user ID and token.')
    }

    let parsedLearningLanguage;
    if(userLanguages.learningLanguage == userLanguages.fromLanguage){
        if(userLanguages.learningLanguage != 'fr') parsedLearningLanguage = 'fr'
        else parsedLearningLanguage = 'en'
    }
    else parsedLearningLanguage = userLanguages.learningLanguage

    const classroom = await fetch("https://schools.duolingo.com/api/2/classrooms", {
        headers: headers,
        body: JSON.stringify({
            "classrooms": [
                {
                    "from_language": userLanguages.fromLanguage,
                    "learning_language": parsedLearningLanguage,
                    "name": "Unlimited Hearts Hack (Deletion will remove your unlimited hearts)"
                }
            ]
        }),
        method: "POST"
    }).then((res) => {
        if(!res.ok){
            return res.json().then((text) => {
                if(text.error == 'Classroom already exists'){
                    throw new Error('You have already done this hack. This hack is permanent. No need to run again.')
                }
                else throw new Error(`There was an error with the hack. RES: ${text}`)
            })
        }

        return res.json()
    });

    console.log("Sucess! To use your unlimited hearts, go to the Duolingo home page, click on your hearts, and under 'Unlimited Hearts' click Turn on or Enable.")
}

init()