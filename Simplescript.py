# A super simple Python script
# It's not like it does much, just says hello

def greet_user():
    user_name = input("Hello! What's your name? ")
    print(f"Hey there, {user_name}!")

# Call the function to run the script
if __name__ == "__main__":
    greet_user()