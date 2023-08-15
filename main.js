const billAmount = document.querySelector(".bill_amount");

const resetButton = document.querySelector(".reset");

const customTip = document.querySelector(".custom_input");

const peopleCount = document.querySelector(".people_count");

const tipButtons = document.querySelectorAll(".tip_button");

const numberInputs = document.querySelectorAll("input[type='number']");

const totalAmount = document.querySelector(".total_amount");

const tipAmount = document.querySelector(".tip_amount");

const disabledNumberInputKeyCodes = [
  "ArrowUp",
  "ArrowDown",
  "NumpadSubtract",
  "NumpadAdd",
  "Equal",
  "Period",
  "NumpadDecimal",
];

const values = {
  tempBillAmount: 0,
  tempTip: 0,
  tempPeopleCount: 1,
};

function calculate() {
  if (parseInt(billAmount.value) === 0 || parseInt(peopleCount.value === 0)) {
    totalAmount.innerHTML = "Error";
    tipAmount.innerHTML = "Error";
  } else {
    const tipAmountPerPerson =
      ((values.tempTip / 100) * values.tempBillAmount) / values.tempPeopleCount;
    const totalPerPerson =
      values.tempBillAmount / values.tempPeopleCount + tipAmountPerPerson;
    tipAmount.innerHTML = `$${tipAmountPerPerson.toFixed(2)}`;
    totalAmount.innerHTML = `$${totalPerPerson.toFixed(2)}`;
  }
}

tipButtons.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".tip_button.active_tip_button")
      ?.classList.remove("active_tip_button");
    e.target.classList.add("active_tip_button");
    customTip.value = "";
    values.tempTip = parseInt(e.target.innerHTML);
    calculate();
  });
});

numberInputs.forEach((numberInput) => {
  numberInput.addEventListener("keydown", (e) => {
    if (disabledNumberInputKeyCodes.includes(e.code)) {
      e.preventDefault();
    }
  });
  const { name } = numberInput;
  if (name === "billAmount" || name === "peopleCount") {
    numberInput.addEventListener("input", (e) => {
      if (parseInt(e.target.value) === 0) {
        numberInput.previousElementSibling.children[1].style.display = "block";
        numberInput.style.borderColor = "#b77f70";
        calculate();
      } else {
        numberInput.previousElementSibling.children[1].style.display = "none";
        numberInput.style.borderColor = "unset";
        if (name === "billAmount") {
          values.tempBillAmount =
            e.target.value === "" ? 0 : parseInt(e.target.value);
        }
        if (name === "peopleCount") {
          values.tempPeopleCount =
            e.target.value === "" ? 1 : parseInt(e.target.value);
        }
        calculate();
      }
    });
  }
});

customTip.addEventListener("focus", () => {
  document
    .querySelector(".tip_button.active_tip_button")
    ?.classList.remove("active_tip_button");
  values.tempTip = 0;
  calculate();
});

customTip.addEventListener("input", (e) => {
  values.tempTip = parseInt(e.target.value);
  calculate();
});

resetButton.addEventListener("click", () => {
  billAmount.value = "";
  customTip.value = "";
  peopleCount.value = "";
  values.tempBillAmount = 0;
  values.tempTip = 0;
  values.tempPeopleCount = 1;
  totalAmount.innerHTML = "$0.00";
  tipAmount.innerHTML = "$0.00";
  document
    .querySelector(".tip_button.active_tip_button")
    ?.classList.remove("active_tip_button");
});
