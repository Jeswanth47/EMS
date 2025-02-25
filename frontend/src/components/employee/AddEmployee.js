import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jeswanthnaidu7@gmail.com',
    pass: 'jtinflltenfagoib'
  }
});

var mailOptions = {
  from: 'jeswanthnaidu7@gmail.com',
  to: '2100032116cseh@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});