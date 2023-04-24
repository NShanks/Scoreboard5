import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats
from django.db import connection, IntegrityError
from django.core import serializers

@csrf_exempt
def create_game(request):
    if request.method == 'POST':
        body = json.loads(request.body)

        if Game.objects.filter(warzone_match_string=body['warzoneMatchString']).exists():
            return JsonResponse({'message': 'Game already exists'}, status=400)

        game = Game(warzone_match_string = body['warzoneMatchString'],
                    match_date = datetime.now())

        try:
            game.save()
        except IntegrityError:
            return JsonResponse({'message': 'Game already exists'}, status=400)

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

        return JsonResponse({ 'message': 'Process succeeded' })

def retrieve_game(request, warzone_game_id):
    if request.method == 'GET':
        game = Game.objects.filter(warzone_match_string=warzone_game_id)

        if not game.exists(): return JsonResponse({'message': 'No game found'})

        game_instance = game.first()

        gameData = Stats.objects.filter(game_id=game_instance.pk)
        print(gameData)

        for stat in gameData:
            print(stat.team_name)
            teams = {}
            if stat.team_name not in teams:
                teams[stat.team_name] = [{}]
            print("teams is here ", teams)


        return JsonResponse({'message': 'Game retrieved'})
