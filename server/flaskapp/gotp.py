import smtplib
import random
from dotenv import load_dotenv
import os

load_dotenv()


server = smtplib.SMTP('smtp.gmail.com',587)

server.starttls()

password = os.getenv("EMAIL_PASSWORD")
server.login('ayushranamini2022@gmail.com',password)

class gotp:
    def __init__(self):
        self.num = 0

    def genrate(self,email):
        self.num = random.randint(100000, 999999)
        server.sendmail('ayushranamini2022@gmail.com',email,str(self.num))
        print("Mail send")

    def getotp(self,email,newUser):
        if newUser:
            self.genrate(email)
        return self.num