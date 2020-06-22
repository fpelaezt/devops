size = float(input("Insert the size of the container in liters : "))

if (size > 1):
    refund = 0.25
else:
    refund = 0.10

print("You will get $", "{:.2f}".format(refund))
