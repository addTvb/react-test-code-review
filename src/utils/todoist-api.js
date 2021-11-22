const todoistApiConfig = {
  baseUrl: 'https://api.todoist.com/rest/v1',
  headers: {
    'Authorization': 'Bearer 793d9154e5507916cddbc96268c87fd082c634c6',
    'Content-Type': 'application/json'
  }
}
/**
 * Можно лучше: В auth-api.js вы использовали тернарный оператор для обработки ответа
 * в функции getResponse, будет лучше придерживаться одного кодового стиля, также
 * это занимает всего то одну строчку, вместо четырех. 
 */
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

export const getProjects = () => {
  return fetch(`${todoistApiConfig.baseUrl}/projects`, {
    headers: todoistApiConfig.headers
  }).then(getResponse)
  .catch((err) => {
    console.log(err);
  });
}

export const getProjectTasks = (projectId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks?project_id=${projectId}`, {
    headers: todoistApiConfig.headers
  }).then(getResponse)
  .catch((err) => {
    console.log(err);
  });
}

export const addTask = (taskText, projectId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks`, {
    method: 'POST',
    headers: todoistApiConfig.headers,
    body: JSON.stringify({
      content: taskText,
      project_id: projectId
    })
  }).then(getResponse)
  .catch((err) => {
    console.log(err);
  });
}

/**
 * Можно лучше: Так как вы уже создали функцию обработки ответа(getResponse)
 * её стоит использовать и в данной функции(deleteTask). Подробнее о дублировании
 * кода и принципе DRY вы можете узнать по данным ссылкам:
 * https://web-creator.ru/articles/dry
 * https://makedev.org/principles/dry.html
 */
export const deleteTask = (taskId) => {
  return fetch(`${todoistApiConfig.baseUrl}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: todoistApiConfig.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`ошибка ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}
