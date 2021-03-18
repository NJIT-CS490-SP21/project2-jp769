'''
App.py
Server side of application
Creating the app, running socket listeners and emitters
Loading database data with SQLAlchemy
'''
import os
from flask import Flask, send_from_directory, json  #, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import models

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating DB variable to prevent
# circular import issues
DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

# PLAYERS = []
# SPECTATORS = []
# PLAYER_X = ''
# PLAYER_Y = ''
DATA = {
    'player_x': None,
    'player_o': None,
    'spectators': [],
}
USERS = []
USERNAMES = {}


def add_player(username, data):
    '''
    Adding logged in user player or spectator based on server variables
    '''
    if data['player_x'] is None:
        data['player_x'] = username
    elif data['player_o'] is None:
        data['player_o'] = username
    else:
        data['spectators'].append(username)
    return data


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''
    Load files from their own static directories
    '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    '''
    SQL query for all players (username and ranking) that is then stored in global USERS
    as a List of Lists if not already in USERNAMESwhich is a dictionary of every username
    already in USERS which is emitted to all clients to use to populate leaderboard
    '''
    print('User connected!')
    all_players = models.Player.query.order_by(
        models.Player.ranking.desc()).all()
    global USERS
    for user in all_players:
        if user.username not in USERNAMES:
            USERS.append([user.username, user.ranking])
            USERNAMES.update({user.username: 1})
    print(USERS)
    SOCKETIO.emit('user_list', {'users': USERS}, broadcast=True)


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    '''
    Function prints out statement on the server side notifying of a user disconnecting
    '''
    print('User disconnected!')


@SOCKETIO.on('board')
def on_play(data):  # data is whatever arg you pass in your emit call on client
    '''
    When a client makes a move, it passes the new board state to the server who then broadcasts
    it to the rest of the clients to have the latest board state.
    '''
    print(str(data))
    # This emits the 'board' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('board', data, broadcast=True, include_self=False)


@SOCKETIO.on('login')
def on_login(player):
    '''
    When a client logs in, if its not already in the database (USERNAMES) it creates a new Player
    that gets added. Then it gets assigned to a player if available spot, else it becomes a
    spectator. This gets emitted to every client.
    '''
    global DATA
    global USERS
    if player['player'] not in USERNAMES:
        new_user = models.Player(username=player['player'])
        DB.session.add(new_user)
        DB.session.commit()
    # if len(PLAYERS) < 2:
    #     PLAYERS.append(player['player'])
    #     if len(PLAYERS) == 1:
    #         PLAYER_X = PLAYERS[0]
    #     else:
    #         PLAYER_Y = PLAYERS[1]
    # else:
    #     SPECTATORS.append(player['player'])
    add_player(player['player'], DATA)
    data = DATA
    # print(str(data))
    SOCKETIO.emit('login', data, broadcast=True, include_self=True)


@SOCKETIO.on("game_over")
def game_over(data):
    '''
    Endgame function that updates the rankings of the two players depending on the result,
    if tie this function is not called (currently)
    '''
    # print(data)
    player = data['winner']
    user = DB.session.query(models.Player).filter_by(username=player).first()
    user.ranking = user.ranking + 1
    player_2 = DATA['player_x'] if player == DATA['player_o'] else DATA[
        'player_o']
    user_2 = DB.session.query(
        models.Player).filter_by(username=player_2).first()
    user_2.ranking = user_2.ranking - 1
    DB.session.commit()
    DB.session.flush()


# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call SOCKETIO.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', '8081')),
        debug=True)
