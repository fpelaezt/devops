#For loop
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
    print(magician)

for magician in magicians:
    print(magician.title() + " that was a great trick!!")
    print("===")
print("///")

for number in range(2,9):
    print(number)
print("That was it")

print("###############")
numbers = list(range(1,6))
print(numbers)
print(numbers[-1])
print("###############")
print("The following are the square numbers")
sq_numbers = []
for number in range(1,11):
    sq_numbers.append(number**2)
print(sq_numbers)
print("Minimun value: " + str(min(sq_numbers)))
print("Maximun value: " + str(max(sq_numbers)))
print("Sum value: " + str(sum(sq_numbers)))

print("###############")
print("###############")
#List Comprehension
sq_numbers = [value**2 for value in range(1,5)]
print(sq_numbers)
print("###############")
print("###############")
#LAB
numbers = [value for value in range(1,21)]
print(numbers)
#numbers = [value for value in range(1,1000000)]
#for number in numbers:
#    print(number)
print(min(numbers))
print(sum(numbers))
print("###############")
odd_numbers = list(range(1,21,2))
print(odd_numbers)
print("###############")
#List Comprehension
cube_numbers = [value**3 for value in range(1,5)]
print(cube_numbers)
print("###############")




players = ['charles', 'martina', 'michael', 'florence', 'eli']
print(players[0:1])
print(players[:2])
print(players[2:])

my_foods = ['pizza', 'falafel', 'carrot cake']
friend_foods = my_foods[:]
print("My favorite foods are:")
print(my_foods)
print("\nMy friend's favorite foods are:")
print(friend_foods)
