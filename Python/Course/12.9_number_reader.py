import json

filename = '12.8_numbers.json'
with open(filename) as f_obj:
    numbers = json.load(f_obj)

print(numbers)