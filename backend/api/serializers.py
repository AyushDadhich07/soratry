from rest_framework import serializers
from .models import Beat, Cart

class BeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beat
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    beats = BeatSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'beats']