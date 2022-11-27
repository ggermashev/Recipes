from django.shortcuts import render


def main_page(request):
    return render(request, 'index.html')

def recipe(request, rec_id):
    return render(request, 'index.html')
