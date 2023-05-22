import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats, Player, Team
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
            player_instances = []
            for player in team['players']:
                player_instance, _ = Player.objects.get_or_create(username=player['name'])
                player_instances.append(player_instance)

            team_instance, _ = Team.objects.get_or_create(players__in=player_instances)
            if team_instance.players.count() != len(player_instances):
                team_instance.players.set(player_instances)

            for player_instance in player_instances:
                stats = Stats(
                    game=game,
                    team=team_instance,
                    player=player_instance,
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
        teams['match_string'] = game_instance.warzone_match_string
        teams['game'] = defaultdict(dict)

        for stat in Stats.objects.filter(game_id=game_instance.pk):
            teams['game'][stat.team_name]["placement"] = stat.place
            teams['game'][stat.team_name][stat.player_name] = stat.kills

        return JsonResponse({'message': 'Game retrieved', 'teams': teams})
