# Read whole content
with open('12_pi_digits.txt') as file_object:
    contents = file_object.read()
    print(contents.rstrip())

# Define a relative path
# with open('text_files/filename.txt') as file_object:

# Define an absolute path
#file_path = '/home/ehmatthes/other_files/text_files/filename.txt'
#file_path = 'C:\Users\ehmatthes\other_files\text_files\filename.txt'

# Read line by line
filename = '12_pi_digits.txt'
with open(filename) as file_object:
    for line in file_object:
        print(line)

with open(filename) as file_object:
    for line in file_object:
        print(line.rstrip())

# Store in a list
with open(filename) as file_object:
    lines = file_object.readlines()
print(lines)
for line in lines:
    print(line.rstrip())

pi_string = ''
for line in lines:
    pi_string += line.rstrip()
print(pi_string)
print(len(pi_string))

filename = '12_pi_million_digits.txt'
with open(filename) as file_object:
    lines = file_object.readlines()
pi_string = ''
for line in lines:
    pi_string += line.strip()
print(pi_string[:52] + "...")
print(len(pi_string))

birthday = input("Enter your birthday, in the form mmddyy: ")
if birthday in pi_string:
    print("Your birthday appears in the first million digits of pi!")
else:
    print("Your birthday does not appear in the first million digits of pi.")
