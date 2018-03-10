#Test with If statements
cars = ['audi', 'bmw', 'subaru', 'toyota']
for car in cars:
    if car == 'bmw':
        print(car.upper())
    else:
        print(car.title())

if 'bmw' in cars:
    print("bmw is in cars")
else:
    print("bww isn't in cars")

if 'bmwa' not in cars:
    print("bmwa is not in cars")
else:
    print("bwwa is in cars")
