# project2-jp769 Tic Tac Toe!

## Cloning this Repo
1. On https://github.com/new, create a new repository. (Name should not matter, but will be needed for step 4!)
2. In Cloud9 terminal, in your home directory, clone the repo: `git clone https://github.com/NJIT-CS490-SP21/project2-jp769.git`
3. cd into the repository that is created and you should see all the files. `cd {repository_name}`
4. Then, connect this cloned repo to your new personal repo made in Step 1: `git remote set-url origin https://www.github.com/{your-username}/{repo-name}` (be sure to change your-username and repo-name, and remove the curly braces)
5. Run `git push origin main` to push the local repo to remote. You should now see this same code in your personal repo.

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`
⋅⋅⋅(Note, if pip install does not work try: sudo pip install or use pip3 instead of pip)

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku (Skip to step 4 if you already have a Heroku account)
1. Install Heroku CLI: `npm install -g heroku`.
2. Create a free account on [Heroku](https://signup.heroku.com/login) if you do not have an account already
3. Add + commit all changed files with git
4. Log in to Heroku: `heroku login -i`
5. Create a Heroku app: `heroku create --buildpack heroku/python`
6. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
7. Push to Heroku: `git push heroku main`
⋅⋅⋅(Note, the Heroku URL should be displayed in terminal after step 1)
## My Heroku Deployment URL: [Here](https://quiet-mesa-42573.herokuapp.com/)

### Technical Problems
1. Giving every client/user an updated list of Players and Spectators every time someone logged in. I started with socket.emit and useEffect in my App.js but found it trying to load the board before getting the updated list back which meant that user was not given the right information of the game. First i created a new .js file to add as a buffer from login screen to logged in screen. This did not fix the issue so instead of updating in useEffect i created a function that updates both lists depending on a list the server (app.py) was broadcasting. After many other attempts from Slack and internet lookups I found that creating a Players and Spectators list at the server side was better and using those to update the state on each user when someone logs in. Turning on include_self also helped since that way it will always have the latest lists the server keeps.
2. Handling who can play, who is playing, and who is next were all similar problems with almost the same fix. At first I was using client side variables but found that what a user might think is correct actually isnt. After many days of trying to reinvent the wheel I found that using state changes based on the server information of who is playing or spectating was best. At first I was rerendering too many times so I had to figure out when was the best time to update any variable I needed to be updated. Creating the function for Technical Problems #1 helped since this would be when the game is given the information of players and spectators. Setting most things to false as initial state helped since spectators have a higher roof than players therefore the number of times I'm rerendering/changing states are lowered. Both Problems 1 and 2 went hand in hand, I spent a long time debugging things that I had oversimplified. 

### Known Problems (None for this milestone that I can think of)
1. Currently the first player to join will be able to play since the first move goes to X and X will always be the first user to join. One additional feature to implement would be to hide the board until two players are connected. This would be implemented by setting a Boolean to check how many players are connected. False would be its initial state and turn it to true when the second player joins allowing the board to be displayed. One issue that could arise would be that when a new user joins it will have its initial state of false so it would need to be updated once joined with any current states of the game.
2. Another feature to implement would be board styling. This would be more of a visual presentation feature giving each player the option to change the board style they are viewing but keeping the board state the same for all users. This would be implemented on the client side having a variable that has the .css file name to use for styling. If its simple styling then there could be a state change after login but before starting a game that you can select between options and would use those styles for the duration of that session.  