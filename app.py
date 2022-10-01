from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello"

@app.route('/trainModel')
def trainModel():
    return "Training model ..."

@app.route('/sample')
def sampleHTML():
    return render_template('index.html')

