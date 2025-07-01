document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calcForm");
  const result = document.getElementById("calcResult");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const length = parseFloat(form.length.value);
    const width = parseFloat(form.width.value);
    const area = (length * width) / 10000; // м²

    let pricePerM2 = 1500; // базова ціна за м²
    let total = area * pricePerM2;

    if (form.complex.checked) total *= 1.5;
    if (form.design.checked) total *= 1.2;
    if (form.edge.checked) total += 200;
    if (form.delivery.checked) total += 300;

    result.innerHTML = `
      <p><strong>Площа:</strong> ${area.toFixed(2)} м²</p>
      <p><strong>Орієнтовна ціна:</strong> ${Math.round(total)} грн</p>
    `;
  });
});
