from flask import Flask, jsonify, request
import time, requests

api = Flask(__name__)

@api.route("/api/time")
def get_current_time():
    return {'time': time.time()}

# used to be hosted on Heroku, and is used in "itchy's games". i have now moved the proxy over here.
@api.route("/api/itchysgames", methods=["POST"])
def get_itchygames_info():
    game_ids = request.json.get("gameIds", [])

    if not isinstance(game_ids, list):
        return jsonify({"error": "'gameIds' must be an array."}), 400

    results = []
    for game_id in game_ids:
        universe_response = requests.get(
            f"https://apis.roproxy.com/universes/v1/places/{game_id}/universe"
        )
        universe_id = universe_response.json().get("universeId")

        game_response = requests.get(
            f"https://games.roproxy.com/v1/games?universeIds={universe_id}"
        )

        results.append({
            "gameId": game_id,
            "data": game_response.json(),
            "universeId": universe_id,
        })

    return jsonify({"results": results})
    

