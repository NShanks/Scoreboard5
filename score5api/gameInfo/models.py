from django.db import models

class Game(models.Model):
    warzone_match_string = models.CharField(max_length=50, unique=True)
    match_date = models.DateTimeField("date published")

    def __str__(self):
        return self.warzone_match_string



class Player(models.Model):
    username = models.CharField(max_length=50)

    def __str__(self):
        return self.username

class Team(models.Model):
    players = models.ManyToManyField(Player)
    team_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.team_name

class Stats(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    kills = models.IntegerField(default=0)
    place = models.IntegerField(default=0)

    def __str__(self):
        return self.player.username