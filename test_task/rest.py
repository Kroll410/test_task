from rest_framework.response import Response
from rest_framework.views import APIView

from .crud import update_table
from .models import User, Group


class UserView(APIView):
    def get(self, request):
        data = [x.values() for x in list(User.objects.all())]
        fields = [x.name for x in User._meta.fields]
        json = {
            'fields': fields,
            'data': data,
        }

        return Response(json)

    def post(self, request):
        if update_table(request.data, User):
            return Response()

    def delete(self, request):
        pass


class GroupView(APIView):
    def get(self, request):
        data = [x.values() for x in list(Group.objects.all())]
        fields = [x.name for x in Group._meta.fields]
        json = {
            'fields': fields,
            'data': data,
        }

        return Response(json)

    def post(self, request):
        pass

    def delete(self, request):
        pass