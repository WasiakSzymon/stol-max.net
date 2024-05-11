<?php
if($_POST){
	$from_name= $_POST["name"];
	$from_email = $_POST["email"];
	$message = $_POST["text"];
	
	$contact = "<p><strong>IMIE:</strong> $from_name</p>
							<p><strong>EMAIL:</strong> $from_email</p>";
	$content = "<p><strong>TRESC WIADOMOSCI:</strong> $message</p>";
	
	$email_body = "<html><body>";
	$email_body .= "$contact $content";
	$email_body .= "</body></html>";

	//Server settings
	try{
	$to = "stolmax.kontakt@gmail.com";
	$subject = "STOLMAX FORMULARZ KONTAKTOWY";
	$txt = $email_body;
	$headers = "From: stolmax.kontakt@gmail.com\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	
	$response = mail($to,$subject,$txt,$headers);
	echo "$response";
	echo "Message has been sent";
	} catch (Exception $e) {
	echo "Message could not be sent $e";
	}
}
?>