import { useEffect, useState, useContext } from "react";
import { getProjects } from "../utils/todoist-api";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import TasksList from "./TasksList";
import { UserContext } from "../utils/UserContext";

const TodoPage = ({ onSignout }) => {
  const user = useContext(UserContext);

  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const match = useRouteMatch("/projects/:projectId");
  const projectId = match?.params?.projectId;

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(projects);
        history.replace({
          pathname: `/projects/${projects[0].id}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  return (
    <UserContext.Provider value={user}>
    {/* 
     * Можно лучше: Если у вас есть родительский компонент,
     * то необязательно использовать React.Fragment(<></>) как обертку,
     * т.к у вас уже есть обёртка в виде тега <UserContext.Provider>
     * Подробнее об этом можно узнать здесь: 
     * https://ru.reactjs.org/docs/fragments.html
     */}
      <>
        <div className="page">
          {/* Можно лучше: в компонент Header передается props "email", 
          но внутри комопнента он никак не используется для чего он? */}
          <Header email="email" onSignout={onSignout} />
          <section className="todolist">
            <div className="projects">
              <p className="projects__title">Проекты: </p>
              <div className="projects__list">
                {projects.map((project) => {
                  return (
                    <NavLink
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="projects__project"
                      activeClassName="projects__project_active"
                    >
                      {project.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            {/* Отлично: Вы хорошо умеете использовать тернарный оператор! */}
            {projectId && <TasksList projectId={projectId} />}
          </section>
        </div>
      </>
    </UserContext.Provider>
  );
};

export default TodoPage;
