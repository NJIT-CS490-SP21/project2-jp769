'''
Models.py
Models that will be used in database to create Player model
with username and ranking attributes

'''
from app import DB
# from flask_sqlalchemy import SQLAlchemy
# DB = SQLAlchemy()


class Player(DB.Model):
    '''
    Class Player with attributes username, ranking
    '''
    username = DB.Column(DB.String(80),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    ranking = DB.Column(DB.Integer, default=100)

    def __repr__(self):
        return '<Player %r>' % self.username
