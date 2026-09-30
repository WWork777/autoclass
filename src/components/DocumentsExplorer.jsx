"use client";

import { useState } from "react";

const TABS = [
  { id: "structure", label: "Структура и органы управления" },
  { id: "basic", label: "Основные сведения" },
  { id: "places", label: "Места осуществления деятельности" },
  { id: "docs", label: "Локальные нормативные акты" },
  { id: "education", label: "Образование" },
  { id: "management", label: "Руководство" },
  { id: "staff", label: "Педагогический состав" },
  { id: "material", label: "Материально-техническое обеспечение" },
  { id: "paid", label: "Платные образовательные услуги" },
  { id: "finance", label: "Финансово-хозяйственная деятельность" },
  { id: "vacant", label: "Вакантные места" },
  { id: "support", label: "Стипендии и меры поддержки" },
  { id: "intl", label: "Международное сотрудничество" },
  { id: "food", label: "Организация питания" },
  { id: "standards", label: "Образовательные стандарты" },
];

const LICENSE_DOCS = [
  { title: "Лицензия на осуществление образовательной деятельности", link: "https://disk.yandex.ru/i/RwzJxI2mSF93hA", date: "29.08.2016", size: "0.95 МБ" },
];

const LOCAL_ACTS = [
  { title: "Устав", link: "https://disk.yandex.ru/i/cHcN9Cb1Ks506g", date: "29.08.2016", size: "7.16 МБ" },
  { title: "Свидетельство о регистрации юридического лица", link: "https://disk.yandex.ru/i/ewXRUuaEeo6FTA", date: "29.08.2016", size: "0.13 МБ" },
  { title: "Свидетельство о постановке на учёт в налоговом органе", link: "https://disk.yandex.ru/i/hVrw10dkjWWiAQ", date: "29.08.2016", size: "0.13 МБ" },
  { title: "Лицензия на осуществление образовательной деятельности", link: "https://disk.yandex.ru/i/RwzJxI2mSF93hA", date: "29.08.2016", size: "0.95 МБ" },
  { title: "Отчет по итогам самообследования", link: "https://disk.yandex.ru/i/ZbNF4OuLho0EKw", date: "01.01.2025", size: "1.34 МБ" },
  { title: "Заключение ГИБДД", link: "https://disk.yandex.ru/i/7OZr5l6qMP4Olw", date: "01.01.2025", size: "5.20 МБ" },
  { title: "Правила внутреннего трудового распорядка", link: "https://disk.yandex.ru/i/UEhBmYJKEZU34A", date: "21.11.2016", size: "3.72 МБ" },
  { title: "Правила внутреннего распорядка обучающихся", link: "https://disk.yandex.ru/i/kr_yJzWI9zYHYA", date: "21.11.2016", size: "0.56 МБ" },
  { title: "Договор об оказании образовательных услуг", link: "https://disk.yandex.ru/i/ZayV_Hm81RBFWg", date: "29.11.2016", size: "0.18 МБ" },
  { title: "Правила организации учебного процесса", link: "https://disk.yandex.ru/i/ujKq5RJx1QdEqA", date: "29.11.2016", size: "4.31 МБ" },
  { title: "Положение о режиме занятий", link: "https://disk.yandex.ru/i/F7kXk1-ShHRsKQ", date: "29.11.2016", size: "1.19 МБ" },
  { title: "Правила оказания услуг по вождению", link: "https://disk.yandex.ru/i/XMlB8w6vipLjjw", date: "29.11.2016", size: "0.61 МБ" },
  { title: "Положение о порядке приема", link: "https://disk.yandex.ru/i/QVkE2TO99bpz4A", date: "29.11.2016", size: "1.83 МБ" },
  { title: "Положение о периодичности и порядке проведения текущего контроля успеваемости, промежуточной и итоговой аттестации", link: "https://disk.yandex.ru/i/VHFa_0r8tWVLpw", date: "29.11.2016", size: "2.31 МБ" },
];

const EDUCATION_DOCS = [
  { title: 'Программа профессиональной подготовки водителей транспортных средств категории "А"', link: "https://disk.yandex.ru/i/Rqk-QHonzsYfZA", date: "19.02.2026", size: "1.63 МБ" },
  { title: 'Программа профессиональной подготовки водителей транспортных средств категории "А1"', link: "https://disk.yandex.ru/i/yK0w_9JyNkO2Pw", date: "19.02.2026", size: "1.66 МБ" },
  { title: 'Программа профессиональной подготовки водителей транспортных средств категории "В"', link: "https://disk.yandex.ru/i/Q6znygur2dOPEw", date: "19.02.2026", size: "1.60 МБ" },
  { title: 'Программа профессиональной подготовки водителей транспортных средств с категорий "В", "C", "D", подкатегорий "В1", "C1", "D1" на категорию "A"', link: "https://disk.yandex.ru/i/FVDH8zrZRzCy0g", date: "19.02.2026", size: "1.56 МБ" },
  { title: 'Программа профессиональной подготовки водителей транспортных средств категории "M"', link: "https://disk.yandex.ru/i/UyrtnP1hKmb-8g", date: "19.02.2026", size: "1.67 МБ" },
  { title: 'Программа профессиональной подготовки водителей транспортных средств категории "C", подкатегории "C1" на категорию "B"', link: "https://disk.yandex.ru/i/3Au6RBx5tQW3Jw", date: "19.02.2026", size: "1.56 МБ" },
  { title: "Положение о итоговой аттестации", link: "https://disk.yandex.ru/i/9xb8zPF_6fVhUQ", date: "27.08.2022", size: "0.74 МБ" },
  { title: "Положение о конфликтной комиссии", link: "https://disk.yandex.ru/i/C03C52YGIo2hjA", date: "27.08.2022", size: "0.34 МБ" },
];

const MATERIAL_DOCS = [
  { title: "Справка о материально-техническом обеспечении", link: "https://disk.yandex.ru/i/fmFiDvolFuTHyQ", date: "29.08.2016", size: "0.26 МБ" },
  { title: "Сведения о наличии в собственности или на ином законном основании оборудованных учебных транспортных средств", link: "https://disk.yandex.ru/i/4mGJc5MlkOMybg", date: "29.08.2024", size: "0.35 МБ" },
];

const PAID_SERVICE_DOCS = [
  { title: "Положение о порядке оказания платных образовательных услуг", link: "https://disk.yandex.ru/i/09CPATWgM-XjIg", date: "29.08.2016", size: "0.47 МБ" },
  { title: "Документ об утверждении стоимости обучения по каждой образовательной программе", link: "https://disk.yandex.ru/i/Vby6JqQvhN8RSg", date: "12.01.2026", size: "0.68 МБ" },
  { title: "Договор об оказании образовательных услуг", link: "https://disk.yandex.ru/i/ZayV_Hm81RBFWg", date: "29.11.2016", size: "0.18 МБ" },
];

const FINANCE_DOCS = [
  { title: "Финансово-хозяйственная деятельность", link: "https://disk.yandex.ru/i/-X2kKbH9C6eCkA", date: "29.08.2022", size: "0.25 МБ" },
];

const BUILDINGS = [
  "Россия, Кемеровская обл., г. Кемерово, ул. Красноармейская, 130",
  "Россия, Кемеровская обл., г. Кемерово, пр-кт Ленина, 52",
  "Россия, Кемеровская обл., г. Кемерово, ул. Волгоградская, 1",
];

const STAFF = [
  { name: "Абозов Шамсудин Шамсудинович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "15 лет", qualification: "МП № 001 21.02.2026" },
  { name: "Артюшин Сергей Анатольевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "31 год", qualification: "МП № 002 21.02.2026" },
  { name: "Белоусов Михаил Юрьевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "31 год", qualification: "МП № 003 21.02.2026" },
  { name: "Вольский Александр Евгеньевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "25 лет", qualification: "МП № 004 21.02.2026" },
  { name: "Демуцкий Сергей Станиславович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "26 лет", qualification: "МП № 005 21.02.2026" },
  { name: "Колмогоров Константин Сергеевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "23 года", qualification: "МП № 006 21.02.2026" },
  { name: "Лисин Юрий Витальевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "16 лет", qualification: "МП № 007 21.02.2026" },
  { name: "Чуев Александр Николаевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "22 года", qualification: "МП № 008 21.02.2026" },
  { name: "Поздняков Олег Александрович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "28 лет", qualification: "МП № 009 21.02.2026" },
  { name: "Солошенко Виктор Владимирович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "19 лет", qualification: "МП № 010 21.02.2026" },
  { name: "Суворов Вячеслав Александрович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "22 года", qualification: "МП № 011 21.02.2026" },
  { name: "Суворов Николай Александрович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "19 лет", qualification: "МП № 012 21.02.2026" },
  { name: "Страдухина Татьяна Шамсудиновна", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "10 лет", qualification: "МП № 013 21.02.2026" },
  { name: "Тагильцев Сергей Николаевич", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "29 лет", qualification: "МП № 014 21.02.2026" },
  { name: "Петраков Алексей Владимирович", role: "Инструктор", disciplines: "обучение вождению автомобилем категории B", experience: "16 лет", qualification: "БД 005650 03.10.2025" },
  { name: "Казанина Екатерина Константиновна", role: "Педагог", disciplines: "Основы законодательства в сфере дорожного движения", experience: "", qualification: "Диплом 42ПД/003761-001 от 30.05.2025 г." },
  { name: "Александров Иван Александрович", role: "Педагог", disciplines: "Педагог ПДД", experience: "", qualification: "СП № 00022 от 21.07.2026" },
  { name: "Карпалева Анастасия Николаевна", role: "Педагог", disciplines: "Педагог психолог", experience: "", qualification: "СП № 00023 от 21.07.2026 г." },
  { name: "Гордеева Радмила Сергеевна", role: "Педагог", disciplines: "Первая помощь при дорожно-транспортном происшествии", experience: "", qualification: "Диплом АК 0464708 от 25.12.2002, удостоверение 542414448622 от 19.08.2025" },
];

function DocList({ items }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((doc) => (
        <a
          key={doc.title + doc.link}
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-asphalt-700 bg-asphalt-900 p-4 hover:border-line transition-colors"
        >
          <div className="text-fog font-medium">{doc.title}</div>
          <div className="mt-1 text-xs text-fog-dim font-mono">
            {doc.date} · PDF{doc.size ? ` · ${doc.size}` : ""}
          </div>
        </a>
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="border-l-2 border-asphalt-700 pl-4">
      <div className="text-xs uppercase tracking-wide text-fog-dim">{label}</div>
      <div className="mt-1 text-fog">{children}</div>
    </div>
  );
}

export default function DocumentsExplorer() {
  const [tab, setTab] = useState("structure");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-72 shrink-0">
        <nav className="lg:sticky lg:top-24 flex flex-col gap-1 rounded-lg border border-asphalt-700 bg-asphalt-900 p-2 max-h-[70vh] overflow-y-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`text-left rounded px-3 py-2 text-sm transition-colors ${
                tab === t.id ? "bg-line text-fog" : "text-fog-dim hover:bg-asphalt-800 hover:text-fog"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 space-y-6 text-fog-dim leading-relaxed">
        {tab === "structure" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Органы управления образовательной организации</h2>
            <Field label="Директор">
              Волошин Константин Викторович — ул. Красноармейская, 130,{" "}
              <a href="tel:+73842369555" className="text-blue hover:text-line">+7 (384-2) 369-555</a>,{" "}
              <a href="mailto:autoklass@yandex.ru" className="text-blue hover:text-line">autoklass@yandex.ru</a>
            </Field>
            <Field label="Заместитель директора">
              Казанин Константин Валерьевич — ул. Красноармейская, 130,{" "}
              <a href="tel:+73842369555" className="text-blue hover:text-line">+7 (384-2) 369-555</a>,{" "}
              <a href="mailto:autoklass@yandex.ru" className="text-blue hover:text-line">autoklass@yandex.ru</a>
            </Field>
            <h2 className="font-display uppercase text-xl text-fog pt-4">Структурные подразделения</h2>
            <p>Структурных подразделений АНО ДПО «Автокласс» не имеет.</p>
          </>
        )}

        {tab === "basic" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Основные сведения</h2>
            <Field label="Учредители">Нетц Станислав Алексеевич, Казанин Константин Валерьевич</Field>
            <Field label="Полное наименование">Автономная некоммерческая организация дополнительного профессионального образования «Автокласс»</Field>
            <Field label="Сокращённое наименование">АНО ДПО «Автокласс»</Field>
            <Field label="Дата создания">29 сентября 2016 года</Field>
            <Field label="Адрес места нахождения">г. Кемерово, ул. Красноармейская, 130 (ул. 50 лет Октября, 15, пом. 138)</Field>
            <Field label="Дополнительные места деятельности">г. Кемерово, ул. Волгоградская, 1; г. Кемерово, проспект Ленина, 52</Field>
            <Field label="Режим и график работы">Понедельник — пятница, с 10:00 до 18:00</Field>
            <Field label="Контактные телефоны">
              <a href="tel:+73842903601" className="text-blue hover:text-line">+7 (3842) 903-601</a>,{" "}
              <a href="tel:+73842369555" className="text-blue hover:text-line">+7 (3842) 369-555</a>,{" "}
              <a href="tel:+79049921377" className="text-blue hover:text-line">+7 904 992 13-77</a>
            </Field>
            <Field label="E-mail">autoklass@yandex.ru</Field>
            <h2 className="font-display uppercase text-xl text-fog pt-4">Лицензия</h2>
            <DocList items={LICENSE_DOCS} />
          </>
        )}

        {tab === "places" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Места осуществления образовательной деятельности</h2>
            {BUILDINGS.map((b, i) => (
              <Field key={b} label={`Учебный корпус №${i + 1}`}>{b}</Field>
            ))}
          </>
        )}

        {tab === "docs" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">
              Локальные нормативные акты по основным вопросам организации и осуществления образовательной деятельности
            </h2>
            <DocList items={LOCAL_ACTS} />
          </>
        )}

        {tab === "education" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Образование</h2>
            <Field label="Вид образования">Профессиональное образование</Field>
            <Field label="Уровень / подвид образования">Дополнительное профессиональное образование</Field>
            <Field label="Язык обучения">Русский</Field>
            <Field label="Общая численность обучающихся">100 человек</Field>
            <Field label="За счёт бюджетных ассигнований">Не предусмотрено</Field>
            <Field label="По договорам об оказании платных образовательных услуг">100 человек</Field>
            <h2 className="font-display uppercase text-xl text-fog pt-4">Образовательные программы и документы</h2>
            <DocList items={EDUCATION_DOCS} />
          </>
        )}

        {tab === "management" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Руководство</h2>
            <Field label="Волошин Константин Викторович — Директор">
              <a href="tel:+73842369555" className="text-blue hover:text-line">+7 (384-2) 369-555</a>{" · "}
              <a href="mailto:autoklass@yandex.ru" className="text-blue hover:text-line">autoklass@yandex.ru</a>
            </Field>
            <Field label="Казанин Константин Валерьевич — Заместитель директора">
              <a href="tel:+73842369555" className="text-blue hover:text-line">+7 (384-2) 369-555</a>{" · "}
              <a href="mailto:autoklass@yandex.ru" className="text-blue hover:text-line">autoklass@yandex.ru</a>
            </Field>
          </>
        )}

        {tab === "staff" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Педагогический состав</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {STAFF.map((s) => (
                <div key={s.name} className="rounded-lg border border-asphalt-700 bg-asphalt-900 p-4">
                  <div className="text-fog font-medium">{s.name}</div>
                  <div className="mt-1 text-xs text-fog-dim">Должность: {s.role}</div>
                  <div className="mt-1 text-xs text-fog-dim">Дисциплины: {s.disciplines}</div>
                  {s.experience && <div className="mt-1 text-xs text-fog-dim">Стаж: {s.experience}</div>}
                  <div className="mt-1 text-xs text-fog-dim">Квалификация: {s.qualification}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "material" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">
              Материально-техническое обеспечение и оснащённость образовательного процесса. Доступная среда
            </h2>
            <DocList items={MATERIAL_DOCS} />
            <h2 className="font-display uppercase text-xl text-fog pt-4">
              Условия для обучения инвалидов и лиц с ОВЗ
            </h2>
            <p>
              Специально оборудованные учебные кабинеты, объекты для практических занятий, библиотеки, объекты
              спорта, средства обучения и воспитания, беспрепятственный доступ в здания, специальные условия
              питания и охраны здоровья, доступ к информационным системам, электронные образовательные ресурсы,
              технические средства обучения, общежития — отсутствуют. На данный момент отсутствуют обучающиеся
              инвалиды и лица с ограниченными возможностями здоровья.
            </p>
          </>
        )}

        {tab === "paid" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Платные образовательные услуги</h2>
            <DocList items={PAID_SERVICE_DOCS} />
          </>
        )}

        {tab === "finance" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Финансово-хозяйственная деятельность</h2>
            <Field label="Объём образовательной деятельности, финансовое обеспечение">
              За счёт бюджетных ассигнований федерального бюджета — 0%; бюджетов субъектов РФ — 0%; местных
              бюджетов — 0%; по договорам об образовании за счёт средств физических и (или) юридических лиц — 100%.
            </Field>
            <Field label="Поступление финансовых и материальных средств">
              Денежные и материальные средства поступают от оказания платных образовательных услуг согласно
              уставным целям.
            </Field>
            <Field label="Расходование финансовых и материальных средств">
              Денежные и материальные средства расходуются согласно уставным целям.
            </Field>
            <Field label="План финансово-хозяйственной деятельности">
              Согласно пп. 6 п. 3.3 ст. 32 152-ФЗ «О некоммерческих организациях» публикация плана в обязательном
              порядке предусмотрена только для государственных (муниципальных) образовательных организаций.
            </Field>
            <DocList items={FINANCE_DOCS} />
          </>
        )}

        {tab === "vacant" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Вакантные места для приёма (перевода) обучающихся</h2>
            <p>
              За счёт бюджетных ассигнований — 0%; по договорам об образовании за счёт средств физических и (или)
              юридических лиц — 100%. На все образовательные программы набор ведётся на постоянной основе.
              Образовательные услуги оказываются круглогодично, обучение по каждой программе проводится по мере
              комплектования групп. Зачисление — без вступительных испытаний, по заявлениям от физических/юридических
              лиц с заключением договора об оказании образовательных услуг.
            </p>
          </>
        )}

        {tab === "support" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Стипендии и меры поддержки обучающихся</h2>
            <p>Не осуществляется.</p>
          </>
        )}

        {tab === "intl" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Международное сотрудничество</h2>
            <p>Не осуществляется.</p>
          </>
        )}

        {tab === "food" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Организация питания в образовательной организации</h2>
            <p>Не осуществляется.</p>
          </>
        )}

        {tab === "standards" && (
          <>
            <h2 className="font-display uppercase text-xl text-fog">Образовательные стандарты и требования</h2>
            <a
              href="https://base.garant.ru/403184430/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-asphalt-700 bg-asphalt-900 p-4 hover:border-line transition-colors text-blue hover:text-line"
            >
              Приказ Министерства просвещения РФ от 8 ноября 2021 г. № 808 «Об утверждении примерных программ
              профессионального обучения водителей транспортных средств соответствующих категорий и подкатегорий»
            </a>
          </>
        )}
      </div>
    </div>
  );
}
