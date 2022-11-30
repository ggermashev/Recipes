# Generated by Django 4.1.3 on 2022-11-29 18:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shopper', '0015_delete_likedpost'),
    ]

    operations = [
        migrations.CreateModel(
            name='LikedPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recept', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopper.recept')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to='shopper.customuser', to_field='key')),
            ],
        ),
    ]