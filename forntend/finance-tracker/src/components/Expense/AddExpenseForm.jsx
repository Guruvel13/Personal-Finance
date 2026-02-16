import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    title: "", // This will be the description/title
    category: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const predictCategory = (title) => {
    if (!title) return null;
    const text = title.toLowerCase();

    // Specific Keyword -> Icon Mappings
    if (text.match(/coffee|cafe|starbucks|tea/)) return { category: "Food & Drink", icon: "☕" };
    if (text.match(/pizza/)) return { category: "Food & Drink", icon: "🍕" };
    if (text.match(/burger|mcd/)) return { category: "Food & Drink", icon: "🍔" };
    if (text.match(/restaurant|dining|lunch|dinner|breakfast|food|swiggy|zomato/)) return { category: "Food & Drink", icon: "🍽️" };

    if (text.match(/uber|ola|taxi|cab/)) return { category: "Transportation", icon: "🚕" };
    if (text.match(/bus/)) return { category: "Transportation", icon: "🚌" };
    if (text.match(/metro|train/)) return { category: "Transportation", icon: "🚇" };
    if (text.match(/flight|air/)) return { category: "Transportation", icon: "✈️" };
    if (text.match(/fuel|petrol|diesel/)) return { category: "Transportation", icon: "⛽" };

    if (text.match(/amazon|flipkart|delivery/)) return { category: "Shopping", icon: "📦" };
    if (text.match(/clothes|shirt|jeans|shoes/)) return { category: "Shopping", icon: "👔" };
    if (text.match(/mall|store|shop|purchase/)) return { category: "Shopping", icon: "🛍️" };

    if (text.match(/electricity|power/)) return { category: "Bills", icon: "⚡" };
    if (text.match(/net|wifi|broadband/)) return { category: "Bills", icon: "🌐" };
    if (text.match(/rent/)) return { category: "Bills", icon: "🏠" };
    if (text.match(/recharge|mobile|bill|subscription/)) return { category: "Bills", icon: "🧾" };

    if (text.match(/movie|cinema|film|netflix|prime/)) return { category: "Entertainment", icon: "🎬" };
    if (text.match(/spotify|music/)) return { category: "Entertainment", icon: "🎵" };
    if (text.match(/game|entertainment/)) return { category: "Entertainment", icon: "🎮" };

    if (text.match(/doctor|med|pharmacy|health|hospital/)) return { category: "Health", icon: "🏥" };
    if (text.match(/gym|fitness/)) return { category: "Health", icon: "💪" };

    return null;
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    handleChange("title", title);

    // Auto-predict category if it's empty or user hasn't manually set a divergent one (simplification: just predict)
    const prediction = predictCategory(title);
    if (prediction) {
      handleChange("category", prediction.category);
      handleChange("icon", prediction.icon);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.title}
        onChange={handleTitleChange}
        label="Description"
        placeholder="e.g. Starbucks Coffee"
        type="text"
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Food, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
