'''
Models.py
Models that will be used in database to create Player model
with username and ranking attributes

'''
from app import DB


class Player(DB.Model):
    '''
    Class Player with attributes username, ranking, wins, and losses.
    '''
    username = DB.Column(DB.String(80),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    ranking = DB.Column(DB.Integer, default=100)

    def __repr__(self):
        return '<Player %r>' % self.username
