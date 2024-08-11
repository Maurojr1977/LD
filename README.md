# Duolingo XP Hack
<img src="https://static.wikia.nocookie.net/duolingo/images/4/4a/Duo_waving.svg" alt="Duo waving" width="200px">

[View my other projects](https://github.com/cole-bauml)

Auto XP Farmer for Duolingo.

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
    1. Go to repository Settings > Secrets and variables > Actions
    2. Click "New repository secret"
    3. Once in the page, fill out the name for the secret.
        - If entering your token, name should be: TOKEN
        - If entering your user ID, name should be: USER_ID
    4. Click add secret
    5. Repeat for both token and user ID.

### How to use:
1. At the top of the page, navigate to the Actions button. 
2. If prompted, click the button to enable workflows.
3. On the left of the page, click the hack you want to run. (Currently only "Start XP Grinder," being an option.)
4. On the right of the page click the Run Workflow button. 
5. Enter how many fake lessons you want completed, and click Run Workflow.
6. The hack will start the attack, and you can refresh your Duolingo leaderboard to see it update in real-time.

### FAQ:
- Will this affect my Duolingo learning path (complete lessons?)
    - No, it will not. This project creates fake "practice" lessons so it won't affect your learning path.
- Is this hack detectable (will I get banned)?
    - No, it is not. I tested it all night the day of making the project and get 1,000,000 (1 million) XP. However, by doing extreme amounts there is a chance somebody will report you and you will get banned. Just be smart with it.