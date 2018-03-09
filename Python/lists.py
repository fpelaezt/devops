bicycles = ['trek','cannondale','redline','specialized']
print(bicycles)
print(bicycles[0])
print(bicycles[0].title())
print("This is the last item in the list" + ": " + bicycles[-1].title())

motorcycles = ['honda','yamaha','suzuki']
print(motorcycles[0])
motorcycles[0] = 'ducati'
print(motorcycles)
motorcycles.append('honda')
print(motorcycles)
motorcycles.insert(2,'pulsar')
print(motorcycles)
del motorcycles[2]
print(motorcycles)

#Use pop to delete an item and keep working with it
cars = ['mazda','chevrolet','renault']
print("Orginal Car List: " + str(cars))
popped_car = cars.pop()
print("Car List after pop: " + str(cars))
print("Popped_car: " + popped_car)
popped_car = cars.pop(1)
print("Car List after pop item '1': " + str(cars))
print("Popped_car in item 1: " + popped_car)


#Delete items by Name
games = ['golf','squash','football','tennis']
print(games)
games.remove('golf')
print(games)
games.append('golf')
games.append('golf')
print(games)
games.remove('golf')
print("Remove golf from the list sports")
print(games)

#Ordering a lists
cars = ['bmw', 'audi', 'toyota', 'subaru']
print("Original order")
print(cars)
print("Order alphabetical")
cars.sort()
print(cars)
print("Order reverse alphabetical")
cars.sort(reverse=True)
print(cars)

cars = ['bmw', 'audi', 'toyota', 'subaru']
print("Here is the original list:")
print(cars)
print("Here is the sorted list:")
print(sorted(cars))
print("Here is the sorted backward list:")
print(sorted(cars,reverse=True))
print("Here is the original list again:")
print(cars)
print("Here is the reverse list:")
cars.reverse()
print(cars)
lenght_cars = len(cars)
print(lenght_cars)
