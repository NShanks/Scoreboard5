# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def create_game(request):
    print(request)
    if request.method == 'POST':
        print('hello')
        data = { 'message': 'Hello from the backend'}
        return JsonResponse(data)