$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var phoneInput = $("input#phone-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var walletInput = $("input#wallet-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      phone: phoneInput.val().trim(),
      password: passwordInput.val().trim(),
      wallet: walletInput.val().trim()
    };
    console.log(userData);

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.phone || !userData.password) {
      alert("Oops! Something is missing. Please fill out all fields.");
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      userData.wallet
    );
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    phoneInput.val("");
    passwordInput.val("");
    walletInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, phone, password, wallet) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      wallet: wallet,
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
