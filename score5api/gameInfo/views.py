import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats, Player, Team
from django.db import IntegrityError, transaction
from collections import defaultdict
from django.http import HttpRequest
import requests

@csrf_exempt
@transaction.atomic
def create_game(warzone_match_string, game_data):
    try:
        game = Game.objects.create(
            warzone_match_string=warzone_match_string,
            match_date=datetime.now()
        )
    except IntegrityError:
        return JsonResponse({'message': 'Game already exists'}, status=400)

    teams = defaultdict(dict)
    for player in game_data:
        # fix this, overwriting array
        teams[player['player']['team']] = [player_name]
        team_id, _ = Team.objects.get_or_create(name=f"{player_name}'s team")

        player_name = player['player']['username']
        # fix this, players joining multiple teams
        player_id, created = Player.objects.get_or_create(username=player_name)
        if created:
            team_id.players.add(player_id)

        stats = Stats(
                game=game,
                team=team_id,
                player=player_id,
                kills=player['playerStats']['kills'],
                place=player['playerStats']['teamPlacement']
                )
        stats.save()

    return JsonResponse({'message': 'Process succeeded'})



def retrieve_game(request, warzone_game_id):
    if request.method == 'GET':
        game = Game.objects.filter(warzone_match_string=warzone_game_id)
        if not game.exists():
            # Fetch game data from API
            api_url = 'https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/752505576671720088/it'
            response = requests.get(api_url)
            
            if response.status_code != 200:
                return JsonResponse({'message': 'Failed to fetch game data'})

            response_data = response.json()  # Parse the JSON response into a Python dictionary
            game_data = response_data.get('data', {}).get('allPlayers', [])  # Get the 'allPlayers' data

            # Create the game
            create_game_response = create_game(warzone_game_id, game_data)
            
            if create_game_response.status_code != 200:
                return JsonResponse({'message': 'Failed to create game'})
            
            game = Game.objects.filter(warzone_match_string=warzone_game_id)

        game_instance = game.first()
        
        teams = defaultdict(lambda: defaultdict(dict))
        teams['match_string'] = game_instance.warzone_match_string

        for stat in Stats.objects.filter(game=game_instance):
            team_name = "Team " + str(stat.team.id)
            player_name = stat.player.username
            teams[team_name]["placement"] = stat.place
            teams[team_name][player_name] = stat.kills

        return JsonResponse({'message': 'Game retrieved', 'teams': teams})