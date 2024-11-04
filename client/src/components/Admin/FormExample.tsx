import React from "react";
import emailjs from "emailjs-com";

export default function FormExample() {
  function sendAcceptance(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ee1ryzf",
        "template_jmemw38",
        e.target,
        "UdOl1mlaGbsuxfXrd"
      );
  }
  function sendRejection(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ee1ryzf",
        "template_ffg6p8r",
        e.target,
        "UdOl1mlaGbsuxfXrd"
      );
  }
  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);}

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="text" name="from_name" value={} />
      <input type="email" name="to_email" /> 
      <input type="submit" value="Send" />
    </form>
  );
}