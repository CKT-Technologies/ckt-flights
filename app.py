from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import requests
import json
import os

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
token_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
token_payload = f"grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}"
token_headers = {"Content-Type": "application/x-www-form-urlencoded"}
flight_url = "https://test.api.amadeus.com/v2/shopping/flight-offers"


def get_token():
    token_respone = requests.post(
        token_url, data=token_payload, headers=token_headers).json()
    print(token_respone)
    print("\n")
    ACCESS_TOKEN = token_respone['access_token']
    return ACCESS_TOKEN

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
@cross_origin()
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/api', methods=['POST'])
@cross_origin()
def api():
    ACCESS_TOKEN = get_token()
    postData = json.loads(request.data)
    
    print(postData)
    print("\n")
    
    departCode = postData['departCode']
    arriveCode = postData['arriveCode']
    departDate = postData['departDate']
    returnDate = postData['returnDate']
    passengers = postData['passengers']

    params = {"originLocationCode": departCode,
              "destinationLocationCode": arriveCode,
              "departureDate": departDate,
              "returnDate": returnDate,
              "adults": passengers,
              "nonStop": "false",
              "max": "25",
              "currencyCode": "USD"}

    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = requests.get(flight_url, headers=headers,
                            params=params).json()
    print(response)
    print("\n")
    
    data = response['data']
    print(data)
    print("\n")
    
    dict_list = []
    for d in range(len(data)):
        flight = d+1
        id = data[d]['id']
        price = data[d]['price']['total']
        itinerary_list = []
        for i in range(len(data[d]['itineraries'])):
            itinerary = i+1
            segment_list = []
            iDuration = data[d]['itineraries'][i]['duration']
            segments = len(data[d]['itineraries'][i]['segments'])
            for s in range(len(data[d]['itineraries'][i]['segments'])):
                segment = s+1
                departureCode = data[d]['itineraries'][i]['segments'][s]['departure']['iataCode']
                departureDate = data[d]['itineraries'][i]['segments'][s]['departure']['at'].split('T')[0]
                departureTime = data[d]['itineraries'][i]['segments'][s]['departure']['at'].split('T')[1][:-3]
                arrivalCode = data[d]['itineraries'][i]['segments'][s]['arrival']['iataCode']
                arrivalDate = data[d]['itineraries'][i]['segments'][s]['arrival']['at'].split('T')[0]
                arrivalTime = data[d]['itineraries'][i]['segments'][s]['arrival']['at'].split('T')[1][:-3]
                carrierCode = data[d]['itineraries'][i]['segments'][s]['carrierCode']
                sDuration = data[d]['itineraries'][i]['segments'][s]['duration']

                segment_dict = {
                                'itinerary': itinerary,
                                'segment': segment, 
                                'segments': segments, 
                                'segDuration': sDuration,
                                'departureCode': departureCode,
                                'departureDate': departureDate, 
                                'departureTime': departureTime, 
                                'arrivalCode': arrivalCode, 
                                'arrivalDate': arrivalDate, 
                                'arrivalTime': arrivalTime, 
                                'carrierCode': carrierCode, 
                                'itinDuration': iDuration
                                }
                segment_list.append(segment_dict)
            itinerary_list.append({f"{'departureLegs' if itinerary == 1 else 'returnLegs'}": segment_list})
        dict_list.append({f'id': id, 'price': price, "direction": itinerary_list })

    print(dict_list)
    print("\n")
    return jsonify(dict_list)

if __name__ == '__main__':
    app.run()
