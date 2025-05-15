import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

export const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) {
      alert("Please fill in all fields.");
      return;
    }
    onAddIncome(income);
    // Optionally reset the form
    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Source"
        placeholder="Enter income source"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
