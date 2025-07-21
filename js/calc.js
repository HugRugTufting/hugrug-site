document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calcForm");
  const result = document.getElementById("calcResult");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const length = parseFloat(form.length.value);
    const width = parseFloat(form.width.value);
    const shape = form.shape.value;
    const complexity = form.complexity.value;

    let displayArea;
    let fabricArea;
    let fabricWasteCharge = 0;

    if (shape === "round") {
      const diameter = length;
      const radius = diameter / 2;
      displayArea = Math.PI * Math.pow(radius / 100, 2);
      fabricArea = (diameter * diameter) / 10000;
      const fabricLoss = fabricArea - displayArea;
      fabricWasteCharge = fabricLoss * 500;
    } else if (shape === "square") {
      displayArea = fabricArea = (length * length) / 10000;
    } else {
      displayArea = fabricArea = (length * width) / 10000;
    }

   // --- Дані для розрахунку ниток (YarnArt Baby)
    const yarnGramsPerM2 = 900; // 900 г на 1 м²
    const yarnWeightPerSkein = 50; // грам в одному мотку
    const yarnPricePerSkein = 32.99; // грн за моток

    const totalYarnGrams = displayArea * yarnGramsPerM2;

    // Мінімум 8 мотків, навіть якщо площа невелика
    const skeinsNeeded = Math.max(8, Math.ceil(totalYarnGrams / yarnWeightPerSkein));
    const threadTotal = skeinsNeeded * yarnPricePerSkein;
    // --- Інші матеріали та витрати
    const labor = 1000;
    const glue = 200;
    const glueSticks = 150;
    const fabricPricePerM2 = 580;
    const antiSlipPricePerM2 = 400;

    const fabricCost = fabricArea * fabricPricePerM2;
    const antiSlipCost = fabricArea * antiSlipPricePerM2;

    let baseCost = labor + glue + glueSticks + threadTotal + fabricCost + antiSlipCost;
    baseCost += fabricWasteCharge;

    // --- Ціна за складність
    let pricePerM2 = 2300;
    if (complexity === "simple") pricePerM2 = 1800;
    if (complexity === "complex") pricePerM2 = 2900;
    let visualComplexityCost = displayArea * pricePerM2;

    if (form.design.checked) visualComplexityCost *= 1.2;

    let total = baseCost + visualComplexityCost;

    if (form.edge.checked) total += 200;
    if (form.delivery.checked) total += 300;

    if (total < 900) total = 900;

    const shapeName = {
      "rectangle": "Прямокутний",
      "square": "Квадратний",
      "round": "Круглий",
      "runner": "Runner (довгий)"
    };

    result.innerHTML = `
      <p><strong>Форма:</strong> ${shapeName[shape]}</p>
      <p><strong>Площа килима:</strong> ${displayArea.toFixed(2)} м²</p>
      ${shape === "round" ? `
        <p><strong>Використано тканини:</strong> ${fabricArea.toFixed(2)} м²</p>
        <p><strong>Доплата за обрізки тканини:</strong> ${Math.round(fabricWasteCharge)} грн</p>
      ` : ""}
      <p><strong>Орієнтовна ціна:</strong> ${Math.round(total)} грн</p>
      <details><summary>Деталізація вартості</summary>
        <ul>
          <li>Робота: ${labor} грн</li>
          <li>Клей: ${glue} грн</li>
          <li>Клейові палички: ${glueSticks} грн</li>
          <li>Пряжа (YarnArt Baby): ${skeinsNeeded} мотків × ${yarnPricePerSkein} = ${threadTotal.toFixed(0)} грн</li>
          <li>Тканина: ${fabricArea.toFixed(2)} м² × ${fabricPricePerM2} = ${Math.round(fabricCost)} грн</li>
          <li>Антисліп: ${fabricArea.toFixed(2)} м² × ${antiSlipPricePerM2} = ${Math.round(antiSlipCost)} грн</li>
          <li>Складність дизайну: ${Math.round(visualComplexityCost)} грн</li>
          ${form.edge.checked ? `<li>Обробка країв лентою: 200 грн</li>` : ""}
          ${form.delivery.checked ? `<li>Доставка: 300 грн</li>` : ""}
        </ul>
      </details>
    `;
  });
});
