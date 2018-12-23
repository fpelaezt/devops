class Restaurant():
    '''Model a restaurant'''

    def __init__(self, name, cuisine_type):
        '''Init method'''
        self.name = name
        self.cuisine_type = cuisine_type
        self.number_served = 0

    def describe_restaurant(self):
        '''Describe restarant'''
        print('\nWelcome to ' + self.name.title() + ' restaurant, where you can find the best '
        + self.cuisine_type + ' food')

    def open(self):
        '''Open restaurant'''
        print('Restaurant ' + self.name.title() + ' is openning')
    
    def set_number_served(self, number_served):
        '''Set number of users to serve'''
        self.number_served = number_served

    def increment_number_served(self, customers):
        '''Set number of users to serve'''
        self.number_served += customers


my_restaurant = Restaurant('xing Qu', 'Chinesse')
my_restaurant.describe_restaurant()
my_restaurant.open()

your_restaurant = Restaurant('la diva', 'Italian')
your_restaurant.describe_restaurant()
your_restaurant.open()

his_restaurant = Restaurant('XING Qu', 'Japanesse')
his_restaurant.describe_restaurant()
his_restaurant.open()

print("Number of users to served = " + str(my_restaurant.number_served))
my_restaurant.number_served = 3
print("Number of users to served = " + str(my_restaurant.number_served))
my_restaurant.set_number_served(6)
print("Number of users to served = " + str(my_restaurant.number_served))
my_restaurant.increment_number_served(2)
print("Number of users to served = " + str(my_restaurant.number_served))
my_restaurant.increment_number_served(2)
print("Number of users to served = " + str(my_restaurant.number_served))