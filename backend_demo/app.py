from flask import render_template, request, jsonify, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
# from flask.ext.cors import CORS, cross_origin
from flask_cors import CORS


import os
import sys
if __package__ is None or __package__ == '':
    BASE_PATH = os.path.join(os.path.dirname(__file__),'..')
    sys.path.append(BASE_PATH)

app = Flask(__name__,static_url_path="", static_folder="templates")

CORS(app)
# the name of the database; add path if necessary
db_name = 'mydataset.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)

# each table in the database needs a class to be created for it
# db.Model is required - don't change it
# identify all columns by name and data type
class UserInfo(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    def __init__(self, username:str, password:str):
        self.username = username
        self.password = password
        


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/test_login')
def test_login():
    return render_template('test_login.html')

@app.route('/test_json', methods=['POST'])
def send_test_json():
    content = request.get_json()
    print(content)
    result = {"uuid":123}
    response = jsonify(result)
    return response

@app.route('/test_div', methods=['POST'])
def send_test_div():
    content = request.get_json()
    print(content)
    return f"<p>Got it {content['username']}!</p>"

@app.route('/login/sign_up', methods=['POST','GET'])
def sign_up():
    # print(request)
    if request.is_json:
        content = request.get_json()
    else:
        content = request.values
    print(content)
    
    username = content['username']
    password = content['password']

    users = UserInfo.query.filter_by(username=username).all()
    if len(users) == 0:
        new_user = UserInfo(username, password)
        db.session.add(new_user)
        db.session.commit() 
        result = {'erroCode':0, 'message':'user added successfully.'}
    else:
        # user already exist
        result = {'errorCode':1, 'message':'user already exist.'}
    response = jsonify(result)
    return response


@app.route('/login/sign_in', methods=['POST','GET'])
def sign_in():
    # print(request)
    if request.is_json:
        content = request.get_json()
    else:
        content = request.values
    print(content)
    
    username = content['username']
    password = content['password']

    users = UserInfo.query.filter_by(username=username).all()
    if len(users) == 0:
        new_user = UserInfo(username, password)
        db.session.add(new_user)
        db.session.commit() 
        result = {'erroCode':2, 'message':'user does not exist.'}
    else:
        if users[0].password == password:
            result = {'errorCode':0, 'message':'login info is correct.'}
        else:
            result = {'errorCode':3, 'message':'login info is not correct.'}
    response = jsonify(result)
    return response

@app.route('/login/delete_account', methods=['POST','GET'])
def delete_account():
    # print(request)
    if request.is_json:
        content = request.get_json()
    else:
        content = request.values
    print(content)
    
    username = content['username']
    password = content['password']
    
    users = UserInfo.query.filter_by(username=username).all()
    if len(users) == 0:
        result = {'erroCode':2, 'message':'user does not exist.'}
    else:
        UserInfo.query.filter_by(username=username).delete()
        db.session.commit() 
            
        if users[0].password == password:
            result = {'errorCode':0, 'message':'login info is correct. User deleted.'}
        else:
            result = {'errorCode':3, 'message':'login info is not correct. User deleted.'}

    response = jsonify(result)
    return response


@app.route('/sign_up/coffee', methods=['POST','GET'])
def signup_coffee():
    # print(request)
    if request.is_json:
        content = request.get_json()
    else:
        content = request.values
    print(content)

    
    name = content['name']
    address = content['address']
    phone = content['phone']
    email = content['email']
    username = content['uname']
    password = content['psw']

    users = UserInfo.query.filter_by(username=username).all()
    if len(users) > 0:
        return "sign_up_wrong!"
    

    new_user = UserInfo(username, password)
    db.session.add(new_user)
    db.session.commit() 
    result = "sign_up_ok!"
    return result

@app.route('/login/coffee', methods=['POST','GET'])
def login_coffee():
    print(request.values)

    username = request.values['username']
    password = request.values['password']

    users = UserInfo.query.filter_by(username=username).all()
    if len(users) == 0:
        return "user_not_found!"
    elif users[0].password == password:
        return "login_ok!"
    return "login_wrong!"
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio = SocketIO(app, cors_allowed_origins='*')

    app.run(host= '0.0.0.0',debug=True)
