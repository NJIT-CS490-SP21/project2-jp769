import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

PLAYERS = []
SPECTATORS = []
PLAYERX = ''
PLAYERY = ''
USERS = []
USERNAMES = {}

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    all_players = models.Player.query.order_by(models.Player.ranking.desc()).all()
    global USERS
    for user in all_players:
        if user.username not in USERNAMES:
            USERS.append([user.username, user.ranking])
            USERNAMES.update({user.username: 1})
    print(USERS)
    socketio.emit('user_list', {'users': USERS}, broadcast=True)

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')


@socketio.on('board')
def on_play(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'board' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('board', data, broadcast=True, include_self=False)


@socketio.on('login')
def on_login(player):
    global PLAYERX
    global PLAYERY
    global USERS
    if player['player'] not in USERNAMES:
        new_user = models.Player(username=player['player'])
        db.session.add(new_user)
        db.session.commit()
    if len(PLAYERS) < 2:
        PLAYERS.append(player['player'])
        if len(PLAYERS) == 1:
            PLAYERX = PLAYERS[0]
        else:
            PLAYERY = PLAYERS[1]
    else:
        SPECTATORS.append(player['player'])
    data = {"players": PLAYERS, "spectators": SPECTATORS}
    if PLAYERX != '':
        data.update({"PlayerX": PLAYERX})
    if PLAYERY != '':
        data.update({"PlayerY": PLAYERY})
    # print(str(data))
    socketio.emit('login', data, broadcast=True, include_self=True)

@socketio.on("game_over")
def game_over(data):
    # print(data)
    player = data['winner']
    user=db.session.query(models.Player).filter_by(username=player).first()
    user.ranking = user.ranking + 1
    player_2 = PLAYERX if player == PLAYERY else PLAYERY
    user_2=db.session.query(models.Player).filter_by(username=player_2).first()
    user_2.ranking = user_2.ranking - 1
    db.session.commit()
    db.session.flush()

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True
    )
