meal_cost = float(input("Enter the cost of the meal : "))

tip = meal_cost * 0.10
tax = meal_cost * 0.18

print("Tip $", "{:.2f}".format(tip))
print("Tax $", "{:.2f}".format(tax))
print("Grand total $", "{:.2f}".format(tax + tip + meal_cost))
