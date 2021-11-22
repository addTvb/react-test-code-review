import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const Header = ({ onSignout }) => {
    const user = useContext(UserContext);

    return (
        <header className="header">
            <h1 className="header__logo">Todo List</h1>
            <p className="header__user">{user?.email}</p>
            {/* Можно лучше: Функционально все работает отлично,
            но для лучшей достуности лучше использовать тег <button> 
            вместо тега <p>. Так как тег <button> создан именно 
            для того чтобы обрабатывать клики пользователя. 
            Подробнее узнать о доступности и теге <button> можно здесь: 
            https://habr.com/ru/post/309288/
            https://developer.mozilla.org/ru/docs/Web/HTML/Element/button
            */}
            <p onClick={onSignout} className="header__signout">
                Выход
            </p>
        </header>
    );
};

export default Header;
