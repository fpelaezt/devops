def gettotal(amount, years, interest_rate):
    total = amount
    for x in range(years):
        print("year = ", x)
        total = total + total*interest_rate
    return total

amount = float(input("Insert initial deposit : "))
years = int(input("Insert years : "))
interest_rate = 0.08

print("After", years, "years, you will have a total of $USD", gettotal(amount, years, interest_rate))
