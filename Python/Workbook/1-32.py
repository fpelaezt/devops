a = input("Insert first number : ")
b = input("Insert second number : ")
c = input("Insert third number : ")

list = [a, b, c]
list.sort()

print("The number is order are : ", list)
print("The minimum number is : ", min(list))
print("The maximum number is : ", max(list))