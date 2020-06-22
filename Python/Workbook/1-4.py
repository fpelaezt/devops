lenght = input("Please insert the lenght of the field : ")
lenght_float = float(lenght)
widht = input("Please insert the widht of the field : ")
widht_float = float(widht)
area = lenght_float * widht_float
acrefactor = 43560
print("The area of the field is", area, "square feet")
print("This is equivalent to", area/acrefactor, "acres")
