export const ngr = `
<div class="ngr-card">
  <div class="ngr-card-content">
    <img
      class="ngr-logo"
      src="https://imagedelivery.net/KrqWw3MfFI3Up2T0vHiP1g/7cf4d90f-00c0-4d92-5fd5-973c85e92200/public"
    />
    <div>
      <p class="ngr-card-number">1234567678</p>
      <p class="ngr-card-label">ACME Farms</p>
    </div>
  </div>
</div>
<style>
  .ngr-card {
    font-family:
      Public Sans,
      sans-serif;
    background-color: #9a3423;
    max-width: 100%;
    aspect-ratio: 1.586;
    border-radius: 16px;
    padding: 12px;
    border-radius: 16px;
  }
  .ngr-logo {
    width: 80px;
  }
  .ngr-card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }
  .ngr-card-number {
    text-align: left;
    font-size: large;
    margin-bottom: -20px;
  }
  .ngr-card-label {
    text-align: left;
    font-size: large;
    font-weight: bold;
    margin-bottom: 0px;
  }
</style>
`;
