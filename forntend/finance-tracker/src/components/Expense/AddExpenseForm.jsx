import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    title: "", // This will be the description/title
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const predictCategory = (title) => {
    if (!title) return null;
    const text = title.toLowerCase();

    const rules = [
      {
        category: "Food & Drink",
        icon: "🍔",
        keywords: [
          "coffee", "cafe", "starbucks", "tea", "pizza", "burger",
          "restaurant", "food", "lunch", "dinner", "breakfast"
        ]
      },
      {
        category: "Transportation",
        icon: "🚗",
        keywords: [
          "uber", "ola", "taxi", "bus", "metro", "train",
          "fuel", "petrol", "diesel", "flight"
        ]
      },
      {
        category: "Shopping",
        icon: "🛍️",
        keywords: [
          "amazon", "flipkart", "mall", "clothes",
          "shirt", "shoes", "purchase"
        ]
      },
      {
        category: "Bills",
        icon: "🧾",
        keywords: [
          "electricity", "wifi", "internet", "rent",
          "bill", "subscription", "recharge"
        ]
      },
      { keywords: ["movie", "cinema", "film", "netflix", "prime", "spotify", "music", "game", "entertainment"], category: "Entertainment", icon: "🎬" },
      { keywords: ["doctor", "pharmacy", "medicine", "health", "gym", "fitness", "hospital", "clinic"], category: "Health", icon: "💊" },
    ];

    for (let rule of rules) {
      for (let word of rule.keywords) {
        if (text.includes(word)) {
          return { category: rule.category, icon: rule.icon };
        }
      }
    }
    return null;
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    handleChange("title", title);

    // Auto-predict category if it's empty or user hasn't manually set a divergent one (simplification: just predict)
    const prediction = predictCategory(title);
    if (prediction && !expense.category) {
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
