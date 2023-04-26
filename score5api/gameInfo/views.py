import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats
from django.db import IntegrityError, transaction
from collections import defaultdict

@csrf_exempt
@transaction.atomic
def create_game(request):
    if request.method == 'POST':
        body = json.loads(request.body)

        try:
            game = Game.objects.create(
                warzone_match_string=body['warzoneMatchString'],
                match_date=datetime.now()
            )
        except IntegrityError:
            return JsonResponse({'message': 'Game already exists'}, status=400)

        for team in body['gameData']:
            team_name = team['name']
            for player in team['players']:
                stats = Stats(
                    game_id=game,
                    team_name=team_name,
                    player_name=player['name'],
                    kills=player['kills'],
                    place=player['teamPlacement']
                )
                stats.save()

        return JsonResponse({'message': 'Process succeeded'})

def retrieve_game(request, warzone_game_id):
    if request.method == 'GET':
        game = Game.objects.filter(warzone_match_string=warzone_game_id)

        if not game.exists(): return JsonResponse({'message': 'No game found'})

        game_instance = game.first()
        
        teams = defaultdict(dict)

        for stat in Stats.objects.filter(game_id=game_instance.pk):
            teams[stat.team_name]["placement"] = stat.place
            teams[stat.team_name][stat.player_name] = stat.kills

        return JsonResponse({'message': 'Game retrieved', 'teams': teams})
