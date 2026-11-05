# Как обновить сайт autoklass42.ru

Сайт — Next.js. Исходники лежат в GitHub (`WWork777/autoclass`, ветка `main`), работает он на VPS. Обновление идёт в три шага: правка кода → заливка на сервер → сборка и перезапуск.

## Где что находится

| Что | Где |
|---|---|
| Сервер | `201.51.31.143` (Timeweb Cloud), вход по SSH под `root` (пароль у владельца) |
| Код сайта на сервере | `/srv/autoklass42/app` (владелец файлов — пользователь `autoklass`) |
| Сервис | systemd-юнит `autoklass42` (Next.js, порт 3042, наружу не открыт) |
| Веб-сервер | nginx проксирует домен на порт 3042, конфиг `/etc/nginx/sites-available/autoklass42` |
| SSL | Let's Encrypt (certbot), продлевается автоматически |
| Логи | `journalctl -u autoklass42 -n 50 --no-pager` |

Git на сервере не настроен: код туда копируется вручную (шаг 2).

## Секреты

Пароли и токены в репозитории не хранятся. Они заданы на сервере в `/etc/systemd/system/autoklass42.service`, строки `Environment=`:

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — уведомления о заявках в Telegram-беседу;
- `EMAIL_PASSWORD` — пароль приложения от почты `autoklass@yandex.ru` (SMTP, отправка заявок на почту).

После правки этого файла выполните:

```bash
systemctl daemon-reload && systemctl restart autoklass42
```

## Шаг 1. Правка кода

```bash
git pull origin main        # сначала забрать чужие правки
# ...правки...
git add -A
git commit -m "что изменили"
git push origin main
```

Где править типичное:

| Что менять | Файл |
|---|---|
| Телефоны, адреса, почта, сумма первого взноса, цены, инструкторы, FAQ, отзывы | `src/lib/data.js` |
| Страница «Сведения об организации» (директор, педсостав, ссылки на документы) | `src/components/DocumentsExplorer.jsx` |
| PDF-документы (политики, соглашение) | `public/docs/*.pdf`, ссылки на них — в `src/app/documents/page.jsx` и `src/components/Footer.jsx` |
| Цвета (синий цвет кнопок, красный акцент) | `src/app/globals.css`: `--color-line` (кнопки), `--color-accent-red` |
| Приём заявок (почта, Telegram) | `src/app/api/leads/route.js` |
| Яндекс.Метрика | `src/components/YandexMetrika.jsx` |

## Шаг 2. Заливка на сервер

С вашего компьютера, из папки репозитория (если менялись зависимости — добавьте `package.json` и `package-lock.json`):

```bash
scp -r src public package.json package-lock.json root@201.51.31.143:/srv/autoklass42/app/
```

`scp` только добавляет и перезаписывает файлы. Если вы **удалили** файл в репозитории, удалите его вручную и на сервере.

## Шаг 3. Сборка и перезапуск (на сервере)

```bash
ssh root@201.51.31.143

# резервная копия на случай отката
cp -a /srv/autoklass42/app/src /root/backup-src-$(date +%F-%H%M)

chown -R autoklass:autoklass /srv/autoklass42/app/src /srv/autoklass42/app/public
cd /srv/autoklass42/app

sudo -u autoklass npm install        # только если менялся package.json
sudo -u autoklass npm run build
```

Сначала убедитесь, что сборка завершилась **без ошибок** (в конце список страниц `○ /`, `● /instruktory/...`). Перезапускайте сервис только после этого:

```bash
systemctl restart autoklass42
systemctl is-active autoklass42      # должно быть: active
```

Если перезапустить сервис после упавшей сборки, он не поднимется (статус `activating`/`failed`) и сайт будет недоступен.

## Шаг 4. Проверка

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://autoklass42.ru/      # 200
journalctl -u autoklass42 -n 30 --no-pager                            # без ошибок
```

Если менялись формы или приём заявок, отправьте тестовую заявку через форму на сайте. Она должна прийти на `autoklass@yandex.ru`, а в Telegram-беседу должно прийти уведомление.

## Откат

Если после обновления что-то сломалось:

```bash
rm -rf /srv/autoklass42/app/src
cp -a /root/backup-src-<дата-время> /srv/autoklass42/app/src
chown -R autoklass:autoklass /srv/autoklass42/app/src
cd /srv/autoklass42/app && sudo -u autoklass npm run build && systemctl restart autoklass42
```

## Если перестали приходить заявки

1. `journalctl -u autoklass42 -n 50 --no-pager` — ищите строки `[leads] Ошибка ...`.
2. `Invalid login` / `535` — у почты `autoklass@yandex.ru` отозван или не включён доступ для почтовых клиентов. Включите его в настройках Яндекс.Почты и при необходимости создайте новый пароль приложения (см. «Секреты»).
3. `Connection timeout` при отправке почты — хостинг закрыл исходящие SMTP-порты (465/587); нужно писать в поддержку Timeweb.
4. Ошибки при отправке в Telegram — запросы идут через Cloudflare Worker-прокси (константа `TELEGRAM_API_BASE` в `route.js`), потому что напрямую `api.telegram.org` с этого сервера работает нестабильно. Проверьте, что воркер жив:
   `curl https://tg-proxy.parsikovevgenij470.workers.dev/bot<TOKEN>/getMe`.

## Особенности

- Сервер без IPv6, поэтому SMTP-соединение принудительно идёт по IPv4 (`family: 4` в `route.js`). Не убирайте эту настройку.
- Файлы, созданные на Windows, могут иметь окончания строк CRLF. На работу сайта это не влияет.
