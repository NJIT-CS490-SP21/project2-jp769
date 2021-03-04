import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

players = []
spectators = []
PlayerX = ''
PlayerY = ''

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')


@socketio.on('board')
def on_play(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'board' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('board',  data, broadcast=True, include_self=True)


@socketio.on('login')
def on_login(player):
    print(str(player))
    global PlayerX
    global PlayerY
    if(len(players) < 2):
        players.append(player['player'])
        if(len(players) == 1):
            PlayerX = players[0];
        else:
            PlayerY = players[1]
    else:
        spectators.append(player['player'])
    print(len(players), players, spectators)
    
    data = {"players": players, "spectators": spectators}
    if(PlayerX != ''):
        data.update({"PlayerX": PlayerX})
    if(PlayerY != ''):
        data.update({"PlayerY": PlayerY})
    print(str(data))
    socketio.emit('login', data, broadcast=True, include_self=True)
    # socketio.emit('update', data, broadcast=True, include_self=False)


# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    debug=True
)