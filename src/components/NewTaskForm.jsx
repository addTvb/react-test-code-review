import { useState } from "react";

const NewTaskForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputValue, () => setInputValue(""));
  };

  return (
    /**
     * Можно лучше: Если у вас есть родительский компонент,
     * то необязательно использовать React.Fragment(<></>) как обертку,
     * т.к у вас уже есть обёртка в виде тега <form>
     * Подробнее об этом можно узнать здесь: 
     * https://ru.reactjs.org/docs/fragments.html
     */
    <>
      <form className="todolist-form" onSubmit={handleSubmit}>
        {/* Надо исправить: В input не передается значение inputValue в аттрибут value
        поэтому при отпарвке(handleSubmit) визуально поле остается заполненным, 
        а значение на бэкенд отправялется пустым(т.е "").
        */}
        <input
          type="text"
          className="todolist-form_input"
          placeholder="Введите текст задачи"
          onChange={handleInputChange}
        />
        <button type="submit" className="todolist-form_submit">
          Добавить
        </button>
      </form>
    </>
  );
};

export default NewTaskForm;
