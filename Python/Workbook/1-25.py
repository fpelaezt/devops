import datetime

def get_time(seconds):
    days, hours = divmod(seconds, 86400)
    hours, minutes = divmod(hours, 3600)
    minutes, seconds = divmod(minutes, 60)
    print(days, hours, minutes, seconds)
    total_time = str(days) + ":" + str(datetime.time(hours, minutes, seconds))
    return total_time


seconds = int(input("Insert number of seconds : "))

print("The equivalent time is ", get_time(seconds))
