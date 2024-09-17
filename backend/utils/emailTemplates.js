export const getResetPasswordTemplate=(userName,resetUrl)=>`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px 0;
      }
      .header h1 {
        margin: 0;
        color: #333;
      }
      .content {
        line-height: 1.6;
        color: #333;
      }
      .button {
        display: block;
        width: 200px;
        margin: 20px auto;
        text-align: center;
        background-color: #007bff;
        padding: 10px;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>E-CART</h1>
      </div>
      <div class="content">
        <p>Hi ${userName},</p>
        <p>
          You recently requested to reset your password for youraccount. Use the
          button below to reset it. This password reset is only valid for the
          next 30 minutes.
        </p>
        <a href="${resetUrl}" class="button">Reset your password</a>
        
      </div>
     
    </div>
  </body>
</html>`