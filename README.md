<h1 align="center">Tips</h1>

<p align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207" width="50" heigth="50">
<img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" width="50" heigth="50">
<img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" width="50" heigth="50">
<img src="https://wsofter.ru/wp-content/uploads/2017/12/node-express.png" width="50" heigth="50">
<img src="https://www.desuvit.com/wp-content/uploads/2021/03/mongodb-icon.png" width="50" heigth="50">
</p>

# Используемые технологии
- React
- Redux
- NodeJS
- Express
- MongoDB
- Axios

# Оригинальность
Чуть ниже в данном Readme описываются причины, по которым приложение актуально. Возможно, слово "Актуальность" тут звучит очень громко, 
так как задача, решаемая приложением, является довольно прикладной, и с ней сталкивается
узкий (очень) круг людей. Однако именно это делает приложение уникальным, не похожим ни на что. 
Люди до сих пор полюзуются этим приложением, и оно им очень помогает.

Весь проект - материализация чистой фантазии и энтузиазма автора, стремящегося создать удобный и эффективный инструмент для решения одной из задач,
с которыми ему когда-то приходилось сталкиваться в жизни. Enjoy!

# О проекте
Проект был создан для оптимизации рутинного процесса, с которым я (автор) и мои коллеги сталкивались на моей временной подработке (официантом).
В конце дня все чаевые должны быть распределены между официантами и прочими сотрудниками ресторана, подсчеты всего этого дела и оптимизируются.

Но это не просто калькулятор, все немного интересней.

Проект создан прежде всего для мобильных устройств, поэтому его интерфейс не адаптирован к большим экранам. 
Но все равно юзабельно.

## Правила распределения чаевых:
- Деньги относятся к разным категориям в зависимости от их источника: они могут быть получены с банкетов (с предзаказа или дозаказа)
или от гостей, посетивших ресторан без брони. Разные категории - разные правила распределения;
- Кухня получает 20% от предзаказов на банкетах;
- Бар получает 10% от всей суммы денег с банкетов и 10% от суммы денег с гостей без брони;
- Менеджер получает 10% от всей суммы денег с банкетов;
- Все остальное делится между всеми официантами поровну.

## Но это не все... еще пару нюансов:
- Бывает так, что чаевые официант получает переводом карту, в таком случае они должны быть учтены как заранее полученные им,
другими словами, в финальном распределении он должен получить меньше других на ту сумму, которая у него на карте и тогда в сумме 
у всех будет одинаково;
- Другой распространенный кейс - рабочий день длится 12 часов, но официант ушел домой раньше. Нужно посчитать его пропорционально отработанному им времени.

# Актуальность
Руками все это делать сложно. Особенно, когда официантов 15, банкетов 30, это может занимать много времени. Отсюда и актуальность данного приложения:
оно помогает избежать ошибок при расчетах, а также экономит его пользователям большое количество времени.

# Функционал

## Формирование списка официантов для изменения данных, необходимых для расчетов:
![sideMenu](https://user-images.githubusercontent.com/103051547/215126893-03a9e545-ee4a-41b3-b7ec-c926319f76f7.gif)
## Динамическое изменение количества банкетов:
![feteList](https://user-images.githubusercontent.com/103051547/215128026-a4d4eac7-464c-4234-9fb2-0cfdb101f4be.gif)
Приложение предназначено для мобилок, так что чем меньше скролла по странице, тем лучше. С этими соображениями список банкетов помещен в контейнер
с ограниченной высотой и собственным скроллом.
## Изменение списка сотрудников:
![image](https://user-images.githubusercontent.com/103051547/215128913-229eac90-7900-4905-b9d7-82a879acc648.png)
Список сотрудников хранится в БД. Его можно изменять через интерфейс приложения, попасть в который можно, нажав эту кнопочку в боковом меню.
## Авторизация:
![auth](https://user-images.githubusercontent.com/103051547/215131190-16dcdb46-c980-40ce-b2d3-b483c6e71ec9.gif)
Только админ имеет доступ к изменению списка сотрудников, поэтому, если пользователь не авторизован, при попытке
изменить список сотрудников его перекинет на страницу авторизации.
## Добавление нового сотрудника:
![new](https://user-images.githubusercontent.com/103051547/215134033-3194e608-fa40-4920-b370-c334507c289a.gif)
Запрос улетает на сервер, и пользователь добавляется в БД. Все имена должны быть уникальными, это валидируется.
## Удаление сотрудника:
![remove](https://user-images.githubusercontent.com/103051547/215134494-7a60a5a2-f5fb-4e1a-94af-e44ce9df179a.gif)

## Дополнительные фишки
- Все данные сохраняются в localStorage, чтобы иметь удобную возможность частично заполнять известную информацию,
а позже возвращаться к остальному.
- Есть возможность сбросить сохраненные данные, для этого есть соответствующая кнопка ресета.
Сбрасываются все данные, кроме данных авторизации и данных о выбранной теме (светлой или темной)


