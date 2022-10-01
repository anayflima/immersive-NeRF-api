from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello"

@app.route('/trainModel')
def trainModel():
    return "Training model ..."

