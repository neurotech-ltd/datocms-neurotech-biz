<script>
  let name = '';
  let email = '';
  let message = '';

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name,
      email,
      message,
    };
    console.log(formData);
    // Here you can add code to send formData to your server
  }
</script>

<div class="form-container">
  <form on:submit={handleSubmit}>
    <div class="form-field">
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} required />
    </div>
    <div class="form-field">
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div class="form-field">
      <label for="message">Message</label>
      <textarea id="message" bind:value={message} rows="5" required></textarea>
    </div>
    <div class="form-field">
      <button type="submit">Send</button>
    </div>
  </form>
</div>

<style>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .form-field {
    margin-bottom: 15px;
  }

  .form-field label {
    display: block;
    margin-bottom: 5px;
  }

  .form-field input,
  .form-field textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-field button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .form-field button:hover {
    background-color: #0056b3;
  }
</style>
