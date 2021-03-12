'''

'''
from app import DB


class Player(DB.Model):
    '''
    '''
    username = DB.Column(DB.String(80),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    ranking = DB.Column(DB.Integer, default=100)

    def __repr__(self):
        return '<Player %r>' % self.username
