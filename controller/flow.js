// Called whenever user types in field1 or field2
async function onFieldChange(formValues) {
  const { field1, field2 } = formValues;

  // Only call API when both fields have values
  if (field1?.trim() && field2?.trim()) {
    try {
      const response = await fetch("/api/unlock-fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field1, field2 })
      });

      if (!response.ok) throw new Error("Failed to fetch updated fields");

      const updatedScreen = await response.json();

      // Update your frontend form with enabled fields
      updateFormUI(updatedScreen.formFields); 
      // Note: backend should return an array like [{ name, enabled, value }]
    } catch (err) {
      console.error("Error unlocking fields:", err);
    }
  }
}

// Function to update UI dynamically
function updateFormUI(formFields) {
  formFields.forEach(field => {
    const inputEl = document.querySelector(`[name="${field.name}"]`);
    if (inputEl) {
      inputEl.disabled = field.enabled === false; // enable/disable field
      if ("value" in field && field.value !== undefined) inputEl.value = field.value;
    }
  });
}
