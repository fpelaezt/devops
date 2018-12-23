import sys
sys.path.insert(0, 'c:/Users/fernando.pelaez.PRODUCTION/VisualStudio/devops/Python/Course/')
from class_car import Car, ElectricCar

#Importing an Entire Module. Recommended
import car

#Importing All Classes from a Module. Not recommended
from module_name import *

my_new_car = Car('audi', 'a4', 2016)
print(my_new_car.get_descriptive_name())

my_new_car.odometer_reading = 23
my_new_car.read_odometer()

my_tesla = ElectricCar('tesla', 'model s', 2016)
print(my_tesla.get_descriptive_name())
my_tesla.battery.describe_battery()
my_tesla.battery.get_range()