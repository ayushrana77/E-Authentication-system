import smtplib
import random

with open('email_cred.txt') as f:
    password = f.read()
server = smtplib.SMTP('smtp.gmail.com',587)

server.starttls()

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