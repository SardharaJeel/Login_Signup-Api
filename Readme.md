!! Link
~ Link = subdomain.websitename.domain


!! Paths
~ Link/Api/Register = For Register User "Name & Email & Password"
~ Link/Api/Login = For Login User "Email & Password"
~ Link/Api/OtpSent = For Otp Send User "Email"
~ Link/Api/OtpVerify = For Verify Otp "Email & Otp"
~ Link/Api/PassForgot = For Forgot Password "Email & Password & confirmPassword"


!! Instructions
~ When User Register Or Login User Got A Mail In Users Email...
~ Use `npm run dev` For Starting Development Server...


!! How To Forgot A Password
~ First Of All You Go To `Link/Api/OtpSent` And Enter Email And You Got Otp In This Email...
~ After You Go In `Link/Api/OtpVerify` This Path To Verify And Enter The Otp And Email For Verification...
~ And Last Step Go To `Link/Api/PassForgot` This Path And Enter A Email Password And Confirm Password For Forgot Password...