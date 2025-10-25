// import { useState } from "react";
// import CustomButton from "./CustomButton";
// import CustomItem from "./CustomItem";

// function CustomSection({ onDelete }) {
//     const [title, setTitle] = useState("");
//     const [isEditingTitle, setIsEditingTitle] = useState(true);
//     const [items, setItems] = useState([]);

//     const handleAddItem = () => {
//         setItems([...items, { id: Date.now() }]);
//     };

//     const handleDeleteItem = (id) => {
//         setItems(items.filter((item) => item.id !== id));
//     };

//     const handleSaveTitle = (e) => {
//         e.preventDefault();
//         if (title.trim()) setIsEditingTitle(false);
//     };

//     return (
//         <section className="custom-section">
//             {isEditingTitle ? (
//                 <form onSubmit={handleSaveTitle}>
//                     <div className="form-row">
//                         <label htmlFor="section-title">Section Title:</label>
//                         <input
//                             id="section-title"
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             required
//                             placeholder="e.g. Projects, Awards"
//                         />
//                     </div>
//                     <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
//                         <CustomButton text="Save" type="submit" />
//                         <CustomButton text="Cancel" handleClick={onDelete} />
//                     </div>
//                 </form>
//             ) : (
//                 <>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         <h2>{title}</h2>
//                         <div style={{ display: "flex", gap: 8 }}>
//                             <CustomButton text="Edit Title" handleClick={() => setIsEditingTitle(true)} />
//                             <CustomButton text="Delete Section" handleClick={onDelete} />
//                         </div>
//                     </div>

//                     <div className="section-items">
//                         {items.map((item) => (
//                             <CustomItem
//                                 key={item.id}
//                                 onDelete={() => handleDeleteItem(item.id)}
//                             />
//                         ))}
//                     </div>

//                     <div style={{ marginTop: "8px" }}>
//                         <CustomButton text="Add Item" handleClick={handleAddItem} />
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// }

// export default CustomSection;
