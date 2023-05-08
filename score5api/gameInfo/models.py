from django.db import models

class Game(models.Model):
    warzone_match_string = models.CharField(max_length=50, unique=True)
    match_date = models.DateTimeField("date published")

    def __str__(self):
        return self.warzone_match_string

class Stats(models.Model):
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_name = models.CharField(max_length=50)
    team_name = models.CharField(max_length=50)
    kills = models.IntegerField(default=0)
    place = models.IntegerField(default=0)

    def __str__(self):
        return self.player_name