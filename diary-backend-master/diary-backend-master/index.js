/* eslint-disable no-console */
// импорт стандартных библиотек Node.js
const { existsSync, readFileSync, writeFileSync } = require("fs");
const { createServer } = require("http");

// файл для базы данных
const DB_FILE = process.env.DB_FILE || "./db.json";
// номер порта, на котором будет запущен сервер
const PORT = process.env.PORT || 3000;
// префикс URI для всех методов приложения
const URI_PREFIX = "/api/books";

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Асинхронно считывает тело запроса и разбирает его как JSON
 * @param {Object} req - Объект HTTP запроса
 * @throws {ApiError} Некорректные данные в аргументе
 * @returns {Object} Объект, созданный из тела запроса
 */
function drainJson(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
}

/**
 * Проверяет входные данные и создаёт из них корректный объект клиента
 * @param {Object} data - Объект с входными данными
 * @throws {ApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ name: string, surname: string, lastName: string, contacts: object[] }} Объект клиента
 */
function makeBookFromData(data) {
  const errors = [];

  function asString(v) {
    return (v && String(v).trim()) || "";
  }

  // составляем объект, где есть только необходимые поля
  const book = {
    //id: asString(data.id),
    title: asString(data.title),
    read: asString(data.read),
    picture: asString(data.picture),
    plot: asString(data.plot),
    review: asString(data.review),
    quotes: Array.isArray(data.quotes)
      ? data.quotes.map((quote) => ({
          number: asString(quote.number),
          value: asString(quote.value),
        }))
      : [],
  };

  // проверяем, все ли данные корректные и заполняем объект ошибок, которые нужно отдать клиенту
  if (!book.title)
    errors.push({ field: "title", message: "Не указано название" });

  // если есть ошибки, то бросаем объект ошибки с их списком и 422 статусом
  if (errors.length) throw new ApiError(422, { errors });

  return book;
}

/**
 * Возвращает список книг из базы данных
 * @param {{ search: string }} [params] - Поисковая строка
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[] }[]} Массив клиентов
 */
function getBookList(params = {}) {
  const books = JSON.parse(readFileSync(DB_FILE) || "[]");
  if (params.search) {
    const search = params.search.trim().toLowerCase();
    return books.filter((book) => [
      book.title,
      book.read,
      book.picture,
      book.plot,
      book.review,
      book.quotes,
    ]);
  }
  return books;
}

/**
 * Создаёт и сохраняет книгу в базу данных
 * @throws {ApiError} Некорректные данные в аргументе, клиент не создан (statusCode 422)
 * @param {Object} data - Данные из тела запроса
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function createBook(data) {
  const newItem = makeBookFromData(data);
  newItem.id = Date.now().toString();
  writeFileSync(DB_FILE, JSON.stringify([...getBookList(), newItem]), {
    encoding: "utf8",
  });
  return newItem;
}

/**
 * Возвращает объект клиента по его ID
 * @param {string} itemId - ID клиента
 * @throws {ApiError} Клиент с таким ID не найден (statusCode 404)
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function getBook(itemId) {
  const book = getBookList().find(({ id }) => id === itemId);
  if (!book) throw new ApiError(404, { message: "Book Not Found" });
  return book;
}

/**
 * Изменяет клиента с указанным ID и сохраняет изменения в базу данных
 * @param {string} itemId - ID изменяемого клиента
 * @param {{ name?: string, surname?: string, lastName?: string, contacts?: object[] }} data - Объект с изменяемыми данными
 * @throws {ApiError} Клиент с таким ID не найден (statusCode 404)
 * @throws {ApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function updateBook(itemId, data) {
  const books = getBookList();
  const itemIndex = books.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: "Book Not Found" });
  Object.assign(
    books[itemIndex],
    makeBookFromData({ ...books[itemIndex], ...data })
  );
  //books[itemIndex].updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify(books), { encoding: "utf8" });
  return books[itemIndex];
}

/**
 * Удаляет книгу из базы данных
 * @param {string} itemId - ID книги
 * @returns {{}}
 */
function deleteBook(itemId) {
  const books = getBookList();
  const itemIndex = books.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: "Book Not Found" });
  books.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(books), { encoding: "utf8" });
  return {};
}

// создаём новый файл с базой данных, если он не существует
if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, "[]", { encoding: "utf8" });

// создаём HTTP сервер, переданная функция будет реагировать на все запросы к нему
module.exports = createServer(async (req, res) => {
  // req - объект с информацией о запросе, res - объект для управления отправляемым ответом

  // этот заголовок ответа указывает, что тело ответа будет в JSON формате
  res.setHeader("Content-Type", "application/json");

  // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // запрос с методом OPTIONS может отправлять браузер автоматически для проверки CORS заголовков
  // в этом случае достаточно ответить с пустым телом и этими заголовками
  if (req.method === "OPTIONS") {
    // end = закончить формировать ответ и отправить его клиенту
    res.end();
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  // убираем из запроса префикс URI, разбиваем его на путь и параметры
  const [uri, query] = req.url.substr(URI_PREFIX.length).split("?");
  const queryParams = {};

  // параметры могут отсутствовать вообще или иметь вид a=b&b=c
  // во втором случае наполняем объект queryParams { a: 'b', b: 'c' }
  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }

  try {
    // обрабатываем запрос и формируем тело ответа
    const body = await (async () => {
      if (uri === "" || uri === "/") {
        // /api/books
        if (req.method === "GET") return getBookList(queryParams);
        if (req.method === "POST") {
          const createdItem = createBook(await drainJson(req));
          res.statusCode = 201;
          res.setHeader("Access-Control-Expose-Headers", "Location");
          res.setHeader("Location", `${URI_PREFIX}/${createdItem.id}`);
          return createdItem;
        }
      } else {
        // /api/books/{id}
        // параметр {id} из URI запроса
        const itemId = uri.substr(1);
        if (req.method === "GET") return getBook(itemId);
        if (req.method === "PATCH")
          return updateBook(itemId, await drainJson(req));
        if (req.method === "DELETE") return deleteBook(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    // обрабатываем сгенерированную нами же ошибку
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Server Error" }));
      console.error(err);
    }
  }
})
  // выводим инструкцию, как только сервер запустился...
  .on("listening", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        `Сервер дневника запущен. Вы можете использовать его по адресу http://localhost:${PORT}`
      );
      console.log("Нажмите CTRL+C, чтобы остановить сервер");
      console.log("Доступные методы:");
      console.log(
        `GET ${URI_PREFIX} - получить список книг, в query параметр search можно передать поисковый запрос`
      );
      console.log(
        `POST ${URI_PREFIX} - создать книгу, в теле запроса нужно передать объект { title: string, plot: string, picture?: string, review?: string, quotes?: object[] }`
      );
      console.log(
        `\tcontacts - массив объектов контактов вида { type: string, value: string }`
      );
      console.log(`GET ${URI_PREFIX}/{id} - получить клиента по его ID`);
      console.log(
        `PATCH ${URI_PREFIX}/{id} - изменить клиента с ID, в теле запроса нужно передать объект { title: string, plot: string, picture?: string, review?: string, quotes?: object[] }`
      );
      console.log(
        `\tcontacts - массив цитат вида { number: number, value: string }`
      );
      console.log(`DELETE ${URI_PREFIX}/{id} - удалить клиента по ID`);
    }
  })
  // ...и вызываем запуск сервера на указанном порту
  .listen(PORT);
