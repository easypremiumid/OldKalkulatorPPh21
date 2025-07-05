// PTKP for 2024
const PTKP_BASE = 54000000; // Single
const PTKP_MARRIED = 4500000;
const PTKP_DEPENDENT = 4500000;

function calculatePTKP(isMarried, dependents) {
  let totalPTKP = PTKP_BASE;
  if (isMarried) {
    totalPTKP += PTKP_MARRIED;
  }
  totalPTKP += Math.min(dependents, 3) * PTKP_DEPENDENT;
  return totalPTKP;
}

function calculatePKP(annualIncome, PTKP) {
  return Math.max(annualIncome - PTKP, 0);
}

function calculatePPh21(PKP) {
  let tax = 0;

  if (PKP <= 60000000) {
    tax = PKP * 0.05;
  } else if (PKP <= 250000000) {
    tax = (60000000 * 0.05) + ((PKP - 60000000) * 0.15);
  } else if (PKP <= 500000000) {
    tax = (60000000 * 0.05) + (190000000 * 0.15) + ((PKP - 250000000) * 0.25);
  } else {
    tax = (60000000 * 0.05) + (190000000 * 0.15) + (250000000 * 0.25) + ((PKP - 500000000) * 0.30);
  }

  return tax;
}

function formatRupiah(number) {
  return "Rp " + number.toLocaleString('id-ID');
}

function calculate() {
  let monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;
  let isMarried = document.getElementById('married').checked;
  let dependents = parseInt(document.getElementById('dependents').value) || 0;

  let annualIncome = monthlyIncome * 12;
  let PTKP = calculatePTKP(isMarried, dependents);
  let PKP = calculatePKP(annualIncome, PTKP);
  let annualTax = calculatePPh21(PKP);
  let monthlyTax = annualTax / 12;

  document.getElementById('annualIncome').innerText = formatRupiah(annualIncome);
  document.getElementById('PTKP').innerText = formatRupiah(PTKP);
  document.getElementById('PKP').innerText = formatRupiah(PKP);
  document.getElementById('annualTax').innerText = formatRupiah(annualTax);
  document.getElementById('monthlyTax').innerText = formatRupiah(monthlyTax);
}
