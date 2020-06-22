name = input("Please insert your name : ")
print ("Hello", name, "welcome to my first program")

print (name, end=' ')
age = input("please enter your age : ")

try:
    int_age = int(age)
    print ("Next year you will have", int_age+1, "years old")
except ValueError:
    print ("You enter an invalid age")