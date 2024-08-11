import fetch from 'node-fetch'

const lessonsToComplete = process.env.lessonsToComplete ?? 5;
var token = process.env.token;
var userId = process.env.userId;

function removeQuotes(str) {
    if ((str.charAt(0) === '"' || str.charAt(0) === "'") && 
        (str.charAt(str.length - 1) === '"' || str.charAt(str.length - 1) === "'")) {
        return str.slice(1, -1);
    }
    return str;
}

if(!token || !userId){
    throw new Error('You must specify a user ID and token.')
}

token = removeQuotes(token)
userId = removeQuotes(userId)

const headers = {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.7",
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
    "Referer": "https://www.duolingo.com/practice",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}


const initScript = async (formattedFraction) => {
    try {
        const userLanguages = await fetch(`https://www.duolingo.com/2017-06-30/users/${userId}?fields=fromLanguage,learningLanguage`, {
            headers,
            body: null,
            method: "GET",
        }).then((res) => {
            if (!res.ok) {
                throw new Error('There was an error getting your languages. Verify your credentials.')
            }
            return res.json()
        });
    
        console.log('Fetched User Languages: ', userLanguages)
    
    
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
                maxInLessonStreak: 10,
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

for(var i = 0; i < lessonsToComplete; i++ ){
    const formattedFraction = i+1 + '/' + lessonsToComplete;
    console.log('Running: ' + formattedFraction)
    await initScript(formattedFraction)
}