# Duolingo Hacks
<img src="/images/waving.gif" alt="Duo waving" width="200px">

[View cole_bauml other projects](https://github.com/cole-bauml)

Advanced and maintained Duolingo hacks.

Much faster than [rfoel/duolingo-hack](https://github.com/rfoel/duolingo-hack)

> [!IMPORTANT]
> **Read all** documents in this repo before doing anything!
> 
> - **Don't make this to your own tool**
> - **Must fork before use**
> - **Dont share your TOKEN or USER_ID to anyone**
> - Don't forget to star ⭐ this repository


### Preperation (required)
1. Duolingo Auth Token
    - To get this information run the following code in your web browser console:
```
    document.cookie
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.includes('jwt_token'))
        ?.split('=')[1];
```
2. Duolingo User ID
    - To get this information run the following code in your web browser console:
```
    document.cookie
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.includes('logged_out_uuid'))
        ?.split('=')[1];
```
3. After obtaining these values, store each of them as repository secrets. 
    - Go to repository Settings > Secrets and variables > Actions
    - Click "New repository secret"
    - Once in the page, fill out the name for the secret.
        - If entering your token, name should be: TOKEN
        - If entering your user ID, name should be: USER_ID
    - Click add secret
    - Repeat for both token and user ID.


This upgraded and Optimized Hack have
- Streak Freeze (Automatically do 1 lesson every day to keep your streak.)
- Solve every 45 minutes (Automatically does 50 lessons every 45 minutes.)
- Get Unlimited Hearts (Automatically gives your account unlimited hearts.)
- Get XP (Completes however many lessons specified. Each gives 200 XP. )

### How to use:
1. At the top of the page, navigate to the Actions button. 
2. If prompted, click the button to enable workflows.
3. On the left of the page, click the hack you want to run. 
4. On the right of the page click the Run Workflow button. 
5. Fill out all information requested by the hack, and click Run Workflow.
6. The hack will start the attack, and you can refresh your Duolingo website to see it's affect after it has been completed.

### FAQ:
- Will the XP hack affect my Duolingo learning path (complete lessons?)
    - No, it will not. This hack creates fake "practice" lessons so it won't affect your learning path.
- Is this hack detectable (will I get banned)?
    - No, it is not. I tested all functions and hacks overnight before I released them. I got 4,500,000 XP on Duolingo account in one night with the XP hack, and it's been weeks with no ban.
