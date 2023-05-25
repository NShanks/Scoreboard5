import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gameInfo.models import Game, Stats, Player, Team
from django.db import IntegrityError, transaction
from collections import defaultdict
from django.http import HttpRequest
import requests
from itertools import permutations

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

    player_stats = {}
    teams = defaultdict(list)
    for player in game_data:
        player_name = player['player']['username']
        player_id, _ = Player.objects.get_or_create(username=player_name)
        teams[player['player']['team']].append(player_id)

        player_stats[player_name] = {
            'kills': player['playerStats']['kills'],
            'place': player['playerStats']['teamPlacement']
        }

    for _, players in teams.items():
        existing_team = get_team_or_create(players)

        for player in players:
            stats, _ = Stats.objects.get_or_create(game=game, player=player, team=existing_team, kills=player_stats[str(player)]['kills'], place = player_stats[str(player)]['place'])
            stats.save()


    return JsonResponse({'message': 'Process succeeded'})



def retrieve_game(request, warzone_game_id):
    if request.method == 'GET':
        game = Game.objects.filter(warzone_match_string=warzone_game_id)
        if not game.exists():
            api_url = f'https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/{warzone_game_id}/it'
            response = requests.get(api_url)
            
            if response.status_code != 200:
                return JsonResponse({'message': 'Failed to fetch game data'})

            response_data = response.json()
            game_data = response_data.get('data', {}).get('allPlayers', [])

            # Create the game
            create_game_response = create_game(warzone_game_id, game_data)
            
            if create_game_response.status_code != 200:
                return JsonResponse({'message': 'Failed to create game'})
            
            game = Game.objects.filter(warzone_match_string=warzone_game_id)

        game_instance = game.first()
        
        teams = defaultdict(lambda: defaultdict(dict))
        teams['match_string'] = game_instance.warzone_match_string

        for stat in Stats.objects.filter(game=game_instance):
            team_name = stat.team.team_name
            player_name = stat.player.username
            teams[team_name]["placement"] = stat.place
            teams[team_name][player_name] = stat.kills

            if 'Score' not in teams[team_name]:
                teams[team_name]['Score'] = 0
            teams[team_name]['Score'] += stat.kills

        return JsonResponse({'message': 'Game retrieved', 'teams': teams})

def get_team_or_create(players):
    # Get teams that include any of the players
    team_qs = Team.objects.filter(players__in=players).distinct()

    # If no such teams exist, create a new one
    if not team_qs.exists():
        team_name = f"{players[0].username}'s team"  # You can adjust the team naming logic here
        new_team = Team.objects.create(team_name=team_name)
        new_team.players.set(players)
        return new_team

    # If teams exist, pick the one that has the maximum overlap with the current set of players
    max_overlap = 0
    best_team = None
    for team in team_qs:
        team_players_ids = set(team.players.values_list('id', flat=True))
        overlap = len(team_players_ids & set(players))
        if overlap > max_overlap:
            max_overlap = overlap
            best_team = team

    return best_team