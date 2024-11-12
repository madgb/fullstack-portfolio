# portfolio/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Portfolio
from .serializers import PortfolioSerializer

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs.get('username')
        if username:
            return Portfolio.objects.filter(user__username=username)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
