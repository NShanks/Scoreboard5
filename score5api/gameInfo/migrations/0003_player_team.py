# Generated by Django 4.2 on 2023-05-23 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameInfo', '0002_alter_game_warzone_match_string'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.CharField(max_length=100, unique=True)),
                ('players', models.ManyToManyField(to='gameInfo.player')),
            ],
        ),
    ]
