const Task = ({ task, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
     /**
     * Можно лучше: Если у вас есть родительский компонент,
     * то необязательно использовать React.Fragment(<></>) как обертку,
     * т.к у вас уже есть обёртка в виде тега <article>
     * Подробнее об этом можно узнать здесь: 
     * https://ru.reactjs.org/docs/fragments.html
     */
    <>
      <article className="todolist-item">
        <span className="todolist-item__text">{task.content}</span>
        <button className="todolist-item__del" onClick={handleDelete}></button>
      </article>
    </>
  );
};

export default Task;
