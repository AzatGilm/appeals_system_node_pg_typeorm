# Appeals System API

Микросервис для управления обращениями (appeals) с возможностью:
- Создания обращений
- Изменения их статусов
- Фильтрации по датам
- Автоматической отмены "зависших" обращений

## Технологии
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + TypeORM

## Установка
npm install

## Запустить в дев режиме
```
bash
npm run dev
```
```
## Параметры .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=appeals_system
SERVER_PORT=3000

```
```
Endpoints
Метод	Путь	Действие
POST	/appeals	Создать обращение
PATCH	/appeals/:id/take-to-work	Взять в работу
PATCH	/appeals/:id/complete	Завершить с решением
PATCH	/appeals/:id/cancel	Отменить с причиной
GET	/appeals?date=YYYY-MM-DD	Фильтр по дате/диапазону
PATCH	/appeals/cancel-all-in-progress	Отменить все "в работе"
```