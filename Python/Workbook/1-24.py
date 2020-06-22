def get_seconds(days, hours, minutes):
    seconds_per_day = days * 24 * 3600
    seconds_per_hour = hours * 3600
    seconds_per_minute = minutes * 60
    total_seconds = seconds_per_day + seconds_per_hour + seconds_per_minute
    return total_seconds


days = float(input("Insert number of days : "))
hours = float(input("Insert number of hours : "))
minutes = float(input("Insert number of minutes : "))

print("The total number of seconds is ", get_seconds(days, hours, minutes))
