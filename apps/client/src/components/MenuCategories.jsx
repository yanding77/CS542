import React, { useEffect, useState, } from 'react';


function MenuCategories({ selectedCategory, onSelectCategory }) {
    const [MenuCategories, setMenuCategories] = useState([]);


    return (
        <div>
            <ul style={{ listStyleType: 'none'}}>
                {MenuCategories.map((category, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onSelectCategory(category)}
                            className={`category-button ${category === selectedCategory ? 'highlight' : ''}`}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuCategories;
