<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;

        // ✨ Put YOUR Gmail credentials here
        $mail->Username   = 'markmellon39@gmail.com'; 
        $mail->Password   = 'giec eujs habc sodu'; // Gmail App Password (not your main Gmail pass!)
        
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email content
        $mail->setFrom($email, $name);
        $mail->addAddress('markmellon39@gmail.com'); // Your Gmail address to receive messages
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message from $name";
        $mail->Body    = "<h3>Name: $name</h3><h4>Email: $email</h4><p>Message: $message</p>";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>