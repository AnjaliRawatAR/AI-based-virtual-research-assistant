from flask import Flask, request, jsonify
from extract_highlights_model import extract_key_sentences

app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def extract():
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text.strip():
            return jsonify({'error': 'Empty text received'}), 400

        highlights = extract_key_sentences(text)
        return jsonify({'highlights': highlights})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
