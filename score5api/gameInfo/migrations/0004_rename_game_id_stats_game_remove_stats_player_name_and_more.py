# Generated by Django 4.2 on 2023-05-24 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gameInfo', '0003_player_team'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stats',
            old_name='game_id',
            new_name='game',
        ),
        migrations.RemoveField(
            model_name='stats',
            name='player_name',
        ),
        migrations.RemoveField(
            model_name='stats',
            name='team_name',
        ),
    ]