# Generated by Django 4.1.3 on 2022-11-27 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopper', '0008_alter_basket_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='basket',
            name='status',
            field=models.IntegerField(default=1, null=True),
        ),
    ]
