from django.db import models

class Game(models.Model):
    warzone_match_string = models.CharField(max_length=50)
    match_date = models.DateTimeField("date published")
    
class Player(models.Model):
    player_name = models.CharField(max_length=50)

class Stats(models.Model):
    player_id = models.ForeignKey(Player)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    kills = models.IntegerField(default=0)
    place = models.IntegerField(default=0)
    
class Team(models.Model):
    team_name = models.CharField(max_length=50)
    player_id = models.ForeignKey(Player)