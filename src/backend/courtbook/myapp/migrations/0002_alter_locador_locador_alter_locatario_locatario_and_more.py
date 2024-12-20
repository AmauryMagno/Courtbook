# Generated by Django 5.1.4 on 2024-12-18 03:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='locador',
            name='locador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locador', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='locatario',
            name='locatario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locatario', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='locador',
            name='ativo',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='locatario',
            name='ativo',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]
