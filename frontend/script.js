const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("FORM SUBMITTED"); // ✅ debug

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    const response = await fetch("/api/messages",s {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    console.log("RESPONSE:", data);

    alert("Message Sent ✅");
    form.reset();

  } catch (error) {
    console.error(error);
  }
});
