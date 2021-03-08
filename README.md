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
7. Create a new remote DB on your Heroku app: `heroku addons:create heroku-postgresql:hobby-dev` (If that doesn't work, add a `-a {your-app-name}`` to the end of the command, no braces)
8. See the config vars set by Heroku for you: `heroku config`. Copy paste the value for DATABASE_URL
9. Set the value of `DATABASE_URL` as an environment variable by entering this in the terminal: `export DATABASE_URL='copy-paste-value-in-here'`
10. In terminal run `python` to open up an interactive session. Then type in these Python lines one by one:

```
>>> from app import db 
>>> import models 
>>> db.create_all()
>>> quit()
```

11. Now let's make sure this was written to our Heroku remote database! Let's connect to it using: `heroku pg:psql`
12. `\d` to list all our tables. Player should be in there now, if not make sure you're doing step 10 correctly. (`\q` to exit out of terminal)
13. Push to Heroku: `git push heroku main`
⋅⋅⋅(Note, the Heroku URL should be displayed in terminal after step 5 or use `heroku open` to get URL)
## My Heroku Deployment URL: [Here](https://thawing-eyrie-83157.herokuapp.com/)

### Technical Problems
1. How to store and pass on the data for leaderboard. Thinking of a dictionary was not a bad start, but it had its struggles when implementing and reading on the client side. JS dictionaries are not the same as Python so treating them as the same at first led to not loading the table correctly and not being able iterate through it to create the rows in a function like rendering. After debugging and learning about js dictionaries I found it was easier to pass the data as a List of List so each element was a List (Player) that included username and ranking. This meant I had to add a dictionary of usernames on the server to know which ones are already stored when different users connect and login so that there is no duplicates since the server runs query for table everytime someone connects. In the client side I still stored the data in a dictionary to avoid any duplicates that could have happened along the way. Afterwards using a list of the keys to easily iterate and create the rows for the table.
2. Having every client successfully update their leaderboard dictionary. Similar to Milestone 1 problems, but still struggled to come to a resolution fast mainly due to where to listen for event and how to update, used a function again for updating. I also searched for messages on Slack with similar problems and found some to refer to as I debugged my own code. 

### Known Problems
1. Currently you can login as the same user and it will break the game since the server will not assign Player O and neither tab/client will be able to play on O's turn. This would be fixed by checking who is logged in on server side and emitting an event that logs both out, or by checking who is logged in on the client side and only allowing one log in per username.
2. Display of data is plain. A future implementation should add css to clean up how data is displayed such as centering or client choosen styling (of predetermine type of styling). Simple className on the html parts that need styling and the .css file having such className should be all that is needed to implement this. Addition get requests of some type of form(s) or text input if client has the options to choose from for styling.