from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Beat, Cart
from .serializers import BeatSerializer, CartSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404

# Create your views here.

class BeatList(generics.ListAPIView):
    queryset = Beat.objects.all()
    serializer_class = BeatSerializer
    permission_classes = [permissions.IsAuthenticated]

def stream_beat(request, beat_id):
    beat = get_object_or_404(Beat, id=beat_id)
    return FileResponse(beat.audio_file, content_type='audio/mpeg')

class CartView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

    def retrieve(self, request, *args, **kwargs):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        cart = self.get_object()
        beat_id = request.data.get('beat_id')
        if beat_id:
            beat = Beat.objects.get(id=beat_id)
            cart.beats.add(beat)
        return Response(self.get_serializer(cart).data)
