# Makes a function that will contain the
# desired program.
def example():

    # Calls for an infinite loop that keeps executing
    # until an exception occurs
    while True:
        test4word = input("What's your name? ")

        try:
            test4num = int(input("From 1 to 7, how many hours do you play in your mobile?" ))

        # If something else that is not the string
        # version of a number is introduced, the
        # ValueError exception will be called.
        except ValueError:
            # The cycle will go on until validation
            print("Error! This is not a number. Try again.")

        # When successfully converted to an integer,
        # the loop will end.
        else:
            print("Impressive, ", test4word, "! You spent", test4num*60, "minutes or", test4num*60*60, "seconds in your mobile!")
            break

# The function is called
example()