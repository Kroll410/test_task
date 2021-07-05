from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from test_task.service.crud import update_table, delete_from_table, add_to_table
from .models import User, Group


class UserView(APIView):
    def get(self, request):
        data = [x.values() for x in list(User.objects.all())]
        fields = {x.name: x.get_internal_type() for x in User._meta.fields}
        json = {
            'fields': fields,
            'data': data,
        }

        return Response(json)

    def patch(self, request):
        if update_table(request.data, User):
            return Response()
        else:
            return HttpResponse(status=304)

    def post(self, request):
        if add_to_table(request.data, User):
            return Response()
        else:
            return Response(500)

    def delete(self, request):
        if delete_from_table(request.data, User):
            return HttpResponse(204)
        else:
            return HttpResponse(status=500)


class GroupView(APIView):
    def get(self, request):
        data = [x.values() for x in list(Group.objects.all())]
        fields = {x.name: x.get_internal_type() for x in Group._meta.fields}
        json = {
            'fields': fields,
            'data': data,
        }

        return Response(json)

    def patch(self, request):
        if update_table(request.data, Group):
            return Response()
        else:
            return Response()

    def post(self, request):
        if add_to_table(request.data, Group):
            return Response(201)
        else:
            return Response(500)

    def delete(self, request):
        if delete_from_table(request.data, Group):
            return HttpResponse(204)
        else:
            return HttpResponse(status=500)

