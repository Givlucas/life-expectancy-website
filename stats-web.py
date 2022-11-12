from flask import Flask
from flask import render_template
import json

jsonFile = open("static/data.json")
data = json.load(jsonFile)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)
