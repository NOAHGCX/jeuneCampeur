import React, { useState, useEffect } from "react";
import Select from "react-select";
import getAllCategories from "src/core/categories/queries/getAllCategories";

export const CategoriesSelect = ({ onSelectChange }) => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
      });
  }, []);

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    onSelectChange(selectedValues);
  };

  const options = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      options={options}
      isMulti
      onChange={handleSelectChange}
      placeholder="Categories"
      className="border-orange border w-295  text-sm mt-3 rounded-5"
    />
  );
};

export default CategoriesSelect;
