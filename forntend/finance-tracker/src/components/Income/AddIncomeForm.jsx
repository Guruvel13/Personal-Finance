// import React, { useState } from 'react';
// import Input from '../inputs/Input';
// import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

// export const AddIncomeForm = ({ onAddIncome }) => {
//   const [income, setIncome] = useState({
//     title: "", // Description
//     source: "", // Category
//     amount: "",
//     date: new Date().toISOString().split('T')[0],
//     icon: "",
//   });

//   const handleChange = (key, value) => {
//     setIncome(prev => ({ ...prev, [key]: value }));
//   };

//   const predictCategory = (title) => {
//     if (!title) return null;
//     const text = title.toLowerCase();

//     // Income Auto-Categorization Rules
//     if (text.match(/salary|wage|paycheck|bonus|commission/)) return { source: "Salary", icon: "💰" };
//     if (text.match(/freelance|contract|gig|upwork|fiverr/)) return { source: "Freelance", icon: "👨‍💻" };
//     if (text.match(/dividend|interest|stock|crypto|investment|trade/)) return { source: "Investment", icon: "📈" };
//     if (text.match(/business|revenue|sales|profit|shop/)) return { source: "Business", icon: "💼" };
//     if (text.match(/gift|donation|received/)) return { source: "Gift", icon: "🎁" };
//     if (text.match(/refund|cashback|reimbursement/)) return { source: "Refund", icon: "💸" };
//     if (text.match(/rent|tenant/)) return { source: "Rental Income", icon: "🏠" };

//     return null;
//   };

//   const handleTitleChange = (e) => {
//     const title = e.target.value;
//     handleChange("title", title);

//     const prediction = predictCategory(title);
//     if (prediction) {
//       handleChange("source", prediction.source);
//       handleChange("icon", prediction.icon);
//     }
//   };

//   const handleSubmit = () => {
//     if (!income.source || !income.amount || !income.date) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     // Pass description as title
//     onAddIncome({ ...income, description: income.title });
//     // Optionally reset the form
//     setIncome({ title: "", source: "", amount: "", date: new Date().toISOString().split('T')[0], icon: "" });
//   };

//   return (
//     <div>
//       <EmojiPickerPopup
//         icon={income.icon}
//         onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//       />

//       <Input
//         value={income.title}
//         onChange={handleTitleChange}
//         label="Description"
//         placeholder="e.g. January Salary"
//         type="text"
//       />

//       <Input
//         value={income.source} // 'source' corresponds to Category
//         onChange={({ target }) => handleChange("source", target.value)}
//         label="Source" // Could trigger confusion if user thinks Source == Description, but keeping consistent with data model
//         placeholder="Salary, Freelance, etc."
//         type="text"
//       />

//       <Input
//         value={income.amount}
//         onChange={({ target }) => handleChange("amount", target.value)}
//         label="Amount"
//         placeholder="Enter amount"
//         type="number"
//       />

//       <Input
//         value={income.date}
//         onChange={({ target }) => handleChange("date", target.value)}
//         label="Date"
//         type="date"
//       />

//       <div className="flex justify-end mt-6">
//         <button
//           type="button"
//           className="add-btn add-btn-fill"
//           onClick={handleSubmit}
//         >
//           Add Income
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddIncomeForm;
