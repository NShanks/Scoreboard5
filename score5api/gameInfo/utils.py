from gameInfo.models import Game, Stats, Team, Player

def clear_database():
    Game.objects.all().delete()
    Stats.objects.all().delete()
    Team.objects.all().delete()
    Player.objects.all().delete()
