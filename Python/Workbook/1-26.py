import time
from datetime import datetime

print(time.localtime())
print(datetime.now())

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
print("Current Time =", current_time)