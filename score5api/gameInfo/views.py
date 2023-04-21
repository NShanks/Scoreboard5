# from django.http import JsonResponse
import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats
from django.db import connection, IntegrityError

@csrf_exempt
def create_game(request):
    if request.method == 'POST':
        body = json.loads(request.body)

        if Game.objects.filter(warzone_match_string=body['warzoneMatchString']).exists():
            error = {'message': 'Game already exists'}
            return JsonResponse(error, status=400)

        game = Game(warzone_match_string = body['warzoneMatchString'],
                    match_date = datetime.now())

        try:
            game.save()
        except IntegrityError:
            error = {'message': 'Game already exists'}
            return JsonResponse(error, status=400)

        gameData = body['gameData']

        for team in gameData:
            team_name = team['name']
            for player in team['players']:
                stats = Stats(game_id = game,
                            team_name = team_name,
                            player_name = player['name'],
                            kills = player['kills'],
                            place = player['teamPlacement'])
                stats.save()


        connection.commit()

        success = { 'message': 'Process succeeded'}
        return JsonResponse(success)