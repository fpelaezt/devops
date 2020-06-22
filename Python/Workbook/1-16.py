import math

def get_circle_area(radius):
    area = math.pi * pow(radius, 2)
    return area

def get_sphere_volume(radius):
    volume = (4/3) * math.pi * pow(radius, 3)
    return volume

radius = float(input("Insert radius circle : "))

print("Total area of the circle is ", get_circle_area(radius))
print("Total volume of the sphere is ", get_sphere_volume(radius))
