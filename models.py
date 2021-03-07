from app import db

class Player(db.Model):
    username = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    ranking = db.Column(db.Integer, default=100)
    
    def __repr__(self):
        return '<Player %r>' % self.username