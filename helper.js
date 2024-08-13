var token = process.env.token;
var userId = process.env.userId;

const headers = {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.7",
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
    "Referer": "https://www.duolingo.com/practice",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

function removeQuotes(str) {
    if ((str.charAt(0) === '"' || str.charAt(0) === "'") && 
        (str.charAt(str.length - 1) === '"' || str.charAt(str.length - 1) === "'")) {
        return str.slice(1, -1);
    }
    return str;
}

async function getUserLanguages(){
    const userLanguages = await fetch(`https://www.duolingo.com/2017-06-30/users/${userId}?fields=fromLanguage,learningLanguage`, {
        headers: headers,
        body: null,
        method: "GET",
    }).then((res) => {
        if (!res.ok) {
             throw new Error('There was an error getting your languages. Verify your credentials.' + res.text())
        }
        return res.json()
    });
    return userLanguages
}

module.exports = {
    headers,
    removeQuotes,
    getUserLanguages
}