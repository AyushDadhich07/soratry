from django.urls import path
from .views import BeatList, stream_beat, CartView

urlpatterns = [
    path('beats/', BeatList.as_view(), name='beat-list'),
    path('beats/<int:beat_id>/stream/', stream_beat, name='stream-beat'),
    path('cart/', CartView.as_view(), name='cart'),
]
