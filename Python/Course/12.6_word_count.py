def count_words(filename):
    """Count the approximate number of words in a file."""
    try:
        with open(filename) as f_obj:
            contents = f_obj.read()
    except FileNotFoundError:
        #msg = "Sorry, the file " + filename + " does not exist."
        #print(msg)
        pass
    else:
        # Count approximate number of words in the file.
        words = contents.split()
        num_words = len(words)
        print("The file " + filename + " has about " + str(num_words) +
        " words.")

filenames = ['alice in wonderland.txt', '12.3_programming.txt', 'moby_dick.txt', '12.4_division.py']
for filename in filenames:
    count_words(filename)