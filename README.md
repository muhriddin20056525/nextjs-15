# **Nextjs 15**

```bash
npx create-next-app@latest
```

- `Next js 15` ni o'rnatish

## **📌 1-dars Routing**

Next.js 15'da `routing (yo'naltirish)` bu foydalanuvchi qaysi URL manziliga ketsa, unga mos sahifani ko'rsatish jarayonidir. Routing Next.js-da avtomatik ishlaydi, ya'ni `/app` papkasidagi fayllarga qarab sahifalar hosil bo'ladi.

- Statik yo‘nalishlar `app` papkasida `.tsx` yoki `.jsx` fayl ochish orqali yaratiladi.

```
/app
├── page.tsx      # Asosiy sahifa ("/")
├── about
│   ├── page.tsx  # "/about" sahifasi
├── contact
│   ├── page.tsx  # "/contact" sahifasi
```

---

## **📌 2-dars Nested Routes**

**Nested Routes** – bu Next.js-da ichma-ich sahifalar tuzish usuli. Ya'ni, bir asosiy sahifa (parent route) va uning ichida kichik sahifalar (child routes) bo‘ladi.

- `/blog` → Asosiy blog sahifasi
- `/blog/first` → "First" blog posti
- `/blog/second` → "Second" blog posti

**app papkasida ichma-ich papkalar orqali nested routes yaratamiz:**

```
app
 ├── blog          → /blog (asosiy sahifa)
 │    ├── page.tsx
 │    ├── first    → /blog/first (nested sahifa)
 │    │    ├── page.tsx
 │    ├── second   → /blog/second (nested sahifa)
 │         ├── page.tsx
```

- `first blog` ga kirish uchun `http://localhost:3000/blog/first` ga murojaat qilish kerak
- `second blog` ga kirish uchun `http://localhost:3000/blog/second` ga murojaat qilish kerak

---

## **📌 3-dars Dynamic Routes**

`dynamic routes` dinamik URL'lar yaratish imkonini beradi. Masalan, agar sening e-commerce saytida har bir mahsulotning alohida sahifasi bo‘lsa, `product/[id]` kabi dynamic route yaratish mumkin.

```
app/
 ├── product/
 │    ├── [id]/
 │    │    ├── page.tsx
```

**Dynamic URL qanday ishlaydi?**

Agar user quyidagi URL'larni ochsa:

- /product/1 → id = 1
- /product/iphone → id = iphone
- /product/macbook → id = macbook

Bu bilan har xil mahsulotlar uchun bitta sahifadan foydalanish mumkin.

```tsx
import React from "react";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  return <div>ProductDetails {productId}</div>;
}
```

- dynamic ochilgan productDetail pageida paramsdagi id ni olish
- ushbu id orqali shu mahsulot haqidagi malumotlarni olish mumkin

---

## **📌 4-dars Nested Dynamic Routes**

Next.js 15 App Router’da nested dynamic routes (ichma-ich dinamik marshrutlar) qanday ishlashini tushuntirib beraman.

Misol uchun, bizda Product sahifasi va har bir product uchun Reviews sahifasi bo‘lsin:

1. **/products** – barcha mahsulotlarni ko‘rsatadi.
2. **/products/[productId]** – bitta mahsulotning sahifasi.
3. **/products/[productId]/reviews** – mahsulotga tegishli barcha sharhlar.
4. **/products/[productId]/reviews/[reviewId]** – mahsulot sharhining aniq bir sahifasi.

```
app
 ├── products
 │   ├── page.tsx                  (Barcha mahsulotlarni ko'rsatadi)
 │   ├── [productId]
 │   │   ├── page.tsx               (Bitta mahsulot sahifasi)
 │   │   ├── reviews
 │   │   │   ├── page.tsx           (Mahsulotning barcha sharhlari)
 │   │   │   ├── [reviewId]
 │   │   │   │   ├── page.tsx       (Aniq bir sharh sahifasi)

```

```tsx
import React from "react";

export default function ProductList() {
  return (
    <div>
      <h1>Product List</h1>
      <h2>Product 1</h2>
      <h2>Product 2</h2>
      <h2>Product 3</h2>
    </div>
  );
}
```

- `product` page

```tsx
import React from "react";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  return <div>ProductDetails {productId}</div>;
}
```

- `Product Detail` page yani bu pageda id orqali bir mahsulotning malumotlarini olish mumkin

```tsx
import React from "react";

export default function ProductReview({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  const { productId, reviewId } = params;
  return (
    <div>
      <h1>ProductId {productId}</h1>
      <h1>RewievId {reviewId}</h1>
    </div>
  );
}
```

- `ProductReview` page

---

## **📌 5-dars Catch all segments**

**Catch-All Segments** — Next.js'ning dinamik routing (yo‘nalish) funksiyasidir. U `[...param]` sintaksisi orqali ishlaydi va URL ichidagi bir yoki bir nechta segmentlarni array shaklida qo‘lga olishga imkon beradi.

⏩ Oddiy dinamik routing `([param])` faqat bitta segmentni qo‘lga oladi, catch-all routing esa bir nechta segmentlarni qabul qilishi bilan farq qiladi.

```
📁 /app
 ├── 📂 docs
 │   ├── 📄 [...slug]/page.tsx → `/docs/*`

```

- `catch all segment` dan foydalanish uchun papka strukturasi `docs` misolida
- Bu papka tuzilishida har qanday URL `/docs/...` shaklida bo‘lishi shart.

```tsx
// app/docs/[...slug].page.tsx

import React from "react";

export default async function Docs({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug?.length === 2) {
    return (
      <h1>
        Viewing docs for feature {slug[0]} and concept {slug[0]}
      </h1>
    );
  } else if (slug?.length === 1) {
    return <h1>Viewing docs for feature {slug[0]}</h1>;
  }
  return <h1>Docs home page</h1>;
}
```

- Bu kod Next.js 15 da dinamik marshrutlash bilan ishlaydi va URL'dagi segmentlarni params orqali oladi. Catch-all segments ([...slug]) yordamida /docs/... yo‘nalishlari boshqariladi. URL'dagi segmentlar soniga qarab turli natijalar qaytariladi: 1 ta segment bo‘lsa faqat feature nomi, 2 ta bo‘lsa feature va concept ko‘rsatiladi.

```
📁 /app
├── 📂 docs/
│ ├── 📄 [[...slug]]/page.tsx → /docs, /docs/feature1, /docs/feature1/concept1
```

- `[[...slug]]` optional catch-all segments bo‘lib, `/docs` sahifasi bo‘sh `slug` bilan ham ishlaydi. Agar URL `/docs/feature1` yoki `/docs/feature1/concept1` bo‘lsa, `params.slug` massiv sifatida keladi. Agar `slug` bo‘sh bo‘lsa `(/docs)`, u default sahifa sifatida ishlaydi.

---

## **📌 6-dars Not Found Page**

Next.js'da not-found.tsx sahifasi 404 xatolik sahifasini yaratish uchun ishlatiladi. Agar foydalanuvchi mavjud bo'lmagan sahifaga o'tsa yoki notFound() funksiyasi chaqirilsa, ushbu sahifa avtomatik ravishda ko'rsatiladi. Bu foydalanuvchilarga yo'q sahifalarni aniq tushunishga yordam beradi.

```tsx
/my-next-app
│── /app
│   ├── /(routes)
│   │   ├── /dashboard
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   ├── page.tsx
│   ├── not-found.tsx
│── /public
│── /styles
│── /components
│── /lib
│── next.config.js
│── package.json
│── tsconfig.json

```

- `app/not-found.tsx` butun loyiha uchun global 404 sahifani anglatadi,` dashboard/not-found.tsx` esa faqat shu route uchun alohida 404 sahifani ifodalaydi.

```tsx
import { notFound } from "next/navigation";

if (parseInt(reviewId) > 1000) {
  notFound();
}
```

- `not found 404` sahifasini `notFound` funksiyasi orqali kerakli joyda ochish

---

## **📌 7-dars File Colocation**

**File Colocation** — Next.js 15 da komponent yoki sahifa bilan bog‘liq fayllarni (stil, test, util funksiyalar) o‘sha komponent/sahifa joylashgan papkada saqlash prinsipidir. Bu kodning tartibli bo‘lishiga va har bir komponentning alohida ishlashiga yordam beradi. Masalan, app/dashboard/page.tsx sahifasi uchun stil va util funksiyalarini app/dashboard/ ichida saqlash mumkin.

```tsx
import React from "react";

export default function LineChart() {
  return <h1>LineChart</h1>;
}
```

- `dashboard/line-chart.tsx` fayli page sifatida ishlamaydi u dashboard papkasi ichida ochilsa ham boshqa nom bilan nomlandi

```tsx
import React from "react";

function BarChart() {
  return <div>BarChart</div>;
}
```

`dashboard/page.tsx` - fayli page uchun ochilsa ham u ishlamaydi sababi u export qilinmadi

```tsx
import React from "react";

export default function BarChart() {
  return <div>BarChart</div>;
}
```

- `dashboard/page.tsx` page sifatida ishlaydi

---

## **📌 8-dars Private Folder**

Next.js'da pastki chiziq `(\_)` bilan boshlangan papkalar `(\_lib, \_utils, \_services)` private folder sifatida ishlatilishi mumkin, chunki ular marshrut sifatida aniqlanmaydi va faqat ichki kod uchun mo‘ljallangan.

- `/app/_lib/format-date.ts` - ushbu fayl vaqtni formatlash uchun bu ishlaydi
- `/app/_lib/page.tsx` - ushbu `page` `app` papkasi ichida bolsa ham undan oldingi papka `(\_)` belgi bilan boshlab nomlangani uchun `page` sifatida ishlamaydi

---

## **📌 9-dars Route Group**

**Route Group** – bu ma’lum bir jarayon uchun kerak bo‘lgan bir nechta sahifalarni bitta asosiy papkada jamlash usuli. Bu usul kodni tartibli saqlashga yordam beradi, lekin URL tarkibiga ta’sir qilmaydi.

**Misol:**
`Autentifikatsiya` jarayonida `Login` va `Register` sahifalariga ehtiyoj bo‘ladi. Biz ularni `auth` papkasida quyidagicha joylashtiramiz:

```
app/
├── auth/
│   ├── login/
│   │   ├── page.tsx
│   ├── register/
│   │   ├── page.tsx
```

- **URL qanday bo‘ladi?**

  - http://localhost:3000/auth/login
  - http://localhost:3000/auth/register

Bu URL'lar ortiqcha auth segmentini o‘z ichiga oladi. Buni soddalashtirish uchun Route Group dan foydalanamiz.

**Agar auth papkasini quyidagicha yaratsak:**

```
app/
├── (auth)/
│   ├── login/
│   │   ├── page.tsx
│   ├── register/
│   │   ├── page.tsx
```

- **Endi URL qanday bo‘ladi?**

  - `http://localhost:3000/login`
  - `http://localhost:3000/register`

Bu usulda (auth) papkasi faqat kod tuzilmasini tartibga soladi, lekin URL'ga ta’sir qilmaydi. Natijada, foydalanuvchilar uchun ancha soddaroq va qulay manzillar hosil bo‘ladi.

- `()` ichida ochilgan papkalar URL'ga ta'sir qilmaydi, faqat kod strukturasini tartibga solish uchun ishlatiladi.
- Route Group yordamida loyihani tartibli saqlash va muayyan sahifalarni guruhlash mumkin.
- Har bir Route Group o‘zining `layout.tsx` fayliga ega bo‘lishi mumkin, bu esa guruh ichidagi sahifalar uchun umumiy UI yaratishga yordam beradi.
- Masalan, `app/(auth)/login/page.tsx` fayli `/login` sifatida ishlaydi, ya’ni `(auth)` papkasi URL'da ko‘rinmaydi.

---

## **📌 10-dars Layouts**

Next.js 15-da layout global komponent bo‘lib, u sahifalar orasida umumiy tuzilmani (masalan, navbar, footer) saqlash uchun ishlatiladi. U app/layout.tsx faylida joylashadi va barcha sahifalar uchun yagona konteyner vazifasini bajaradi.

```tsx
import React, { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <header>
          <p>Header</p>
        </header>
        {children}
        <footer>
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
```

- `layout.tsx` fayli foydalanuvchi istalgan routega o'tsa ham `navbar` va `footer` unga ko'rinadi
- `layout.tsx` faylida `{children}` sahifa tarkibini ko‘rsatish uchun ishlatiladi.

---

## **📌 11-dars Nested Layouts**

**Nested Layouts** – bu bir nechta ichma-ich joylashgan layoutlarni ishlatish imkonini beradigan Next.js App Router xususiyati. Bu yondashuv katta loyihalarda tartibni saqlash va kodni qayta ishlatish uchun juda foydali. Har bir route o‘zining layout.tsx fayliga ega bo‘lishi mumkin va ular bir-birining ichida joylashishi mumkin.

```
app
 ├── layout.tsx              # 🔹 Global (Root) Layout – Barcha sahifalar uchun
 ├── page.tsx                # 🔹 Asosiy sahifa
 ├── products
 │   ├── page.tsx            # 🔹 `/products` sahifasi
 │   ├── [productId]
 │   │   ├── layout.tsx      # 🔹 Har bir mahsulot uchun Layout
 │   │   ├── page.tsx        # 🔹 Mahsulot sahifasi

```

`app/layout.tsx`

```tsx
import React, { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <header className="w-full p-10 bg-blue-600 text-white">
          <p>Header</p>
        </header>
        {children}
        <footer className="w-full p-10 bg-green-600 text-white">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
```

- Bu barcha sahifalar uchun umumiy `layout` bo‘lib, `Header` va `Footer` ni o‘z ichiga oladi.
- Barcha sahifalar `Header` va `Footer` bilan chiqadi.

`app/products/[productId]/layout.tsx`

```tsx
import React, { ReactNode } from "react";

export default function ProductDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <h2>Featured Products</h2>
    </>
  );
}
```

- har bir `product` oxiriga `<h2>Featured Products</h2>` matni chiqadi

---

## **📌 12-dars Routing Metadata**

Next.js 15 versiyasida `Routing Metadata` (yo'naltirish metama'lumotlari) `App Router` bilan ishlashda `SEO` va `Open Graph` uchun sahifa darajasida metama'lumotlarni boshqarish imkoniyatini beradi.

**Routing Metadata nima?**
Bu Next.js 15 da har bir sahifa yoki layout uchun SEO va boshqa meta ma'lumotlarni dinamik yoki statik ravishda ta'minlash usulidir.

**Routing Metadata qanday ishlaydi?**
Next.js 15 da har bir sahifa (page.tsx) yoki layout (layout.tsx) ichida metadata nomli o'zgaruvchidan yoki generateMetadata funksiyasidan foydalanib, meta-ma'lumotlarni belgilash mumkin.

`app/layout.tsx`

```tsx
import React, { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generate by Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <header className="w-full p-10 bg-blue-600 text-white">
          <p>Header</p>
        </header>
        {children}
        <footer className="w-full p-10 bg-green-600 text-white">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
```

- Agar `layout.tsx` ichida `metadata` belgilansa, u shu `layout` ichidagi barcha sahifalar uchun qo‘llanadi.

`app/products/[productId]/page.tsx`

```tsx
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ productId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).productId;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`IPhone ${id}`);
    }, 100);
  });
  return {
    title: `Product ${title}`,
  };
};

export default async function ProductDetails({ params }: Props) {
  const productId = (await params).productId;
  return <div>ProductDetails {productId}</div>;
}
```

- `import { Metadata } from "next";` Bu Next.js da metadata turini olish uchun ishlatiladi.
- `params - Promise<{ productId: string }>` Bu params obyekt bo‘lib, unda `productId` mavjud.
- `Promise` sifatida yozilgani `params` ma’lumotlari `async` ishlashga mos kelishi uchun (yoki API dan kelishi mumkin).
- `generateMetadata` Next.js ning metadata'ni dinamik yaratish uchun ishlatiladigan asinxron funksiyasi.
- `params` ni kutib olish `const id = (await params).productId;`
  - `params` obyektidan `productId` ni oladi.
- `setTimeout` orqali `100ms` kechikib `IPhone {id}` sarlavhasini yaratadi.
  - Masalan, `/product/13` sahifasi bo‘lsa `"IPhone 13"` deb qaytaradi.
- `title: Product IPhone {id}` → `"Product IPhone 13"`
  - Bu metadata Next.js tomonidan `SEO` uchun `<title>` tegi sifatida ishlatiladi.

Metadata faqat `server` componentda ishlaydi. Agar agar `client` componentda ishlatish kerak bo'lsa shu `page` dagi malumotlarni boshqa `component` ga o'tkazib shu `page` ga `import` qilish kerak

`/app/counter/page.tsx`

```tsx
import Counter from "./counter";

export const metadata = {
  title: "Counter",
};

export default function CounterPage() {
  return <Counter />;
}
```

`/app/counter/counter.tsx`

```tsx
"use client";

import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- `counter` client componentga yaratildi
- `metadata` server componentga yaratildi

---

## **📌 13-dars Title Metadata**

`app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: {
    template: "Next js tutorial codevolution",
    default: "%s | Codevolution",
  },
  description: "Generate by Next.js",
};
```

Bu metadata nomli konstantani eksport qiladi va unga Metadata turini beradi.
Bu TypeScriptda ishlatilgan bo‘lib, metadata Next.js tomonidan avtomatik ravishda tan olinadigan maxsus obyekt hisoblanadi.

- `template`
  - Sahifa sarlavhasi `(title)` uchun asosiy formatni belgilaydi.
- `default`
  - Agar `title` berilmagan bo‘lsa, sahifaning default sarlavhasi bo‘ladi.
  - `%s` dinamik sarlavha joyiga qo‘yiladi. Masalan, agar `title: "Home"` berilsa, u `Home | Codevolution` shaklida chiqadi.
- `description`
  - Bu meta description bo‘lib, sahifa haqida qisqacha ma’lumot beradi.
  - SEO (Search Engine Optimization) uchun muhim.

```tsx
export const metadata: Metadata = {
  title: {
    absolute: "Blog",
  },
};
```

- `absolute` - sahifaning mutlaq (to‘liq) sarlavhasi sifatida ishlaydi.
- Agar `absolute` ishlatilsa, boshqa metadata `title` sozlamalari `(masalan, template, default)` inobatga olinmaydi.
- Bu degani, sahifa sarlavhasi doimo `Blog` bo‘lib qoladi.

<!-- prettier-ignore-start -->

| Xususiyat  | Tavsif  | Misol  |
|------------|---------|--------|
| `absolute` | To‘liq, o‘zgarmas sarlavha | `"Blog"` |
| `template` | Dinamik format, `%s` bilan ishlaydi | `"%s | My Site"` |
| `default` | Agar `title` berilmasa, foydalaniladi | `"My Blog"` |

<!-- prettier-ignore-end -->

---

## **📌 14-dars Link component**

```tsx
import Link from "next/link";
<Link href={"/blog"}>Blog</Link>
<Link href={"/products"}>Products</Link>
```

- `import Link from "next/link";`

  - **Next.js**'ning **`Link`** komponenti import qilinmoqda.
  - Bu komponent **SPA (Single Page Application)** ilovalari uchun **tezkor navigatsiya** qilish imkonini beradi.

- `<Link href={"/blog"}>Blog</Link>`

  - **"/blog"** sahifasiga yo‘naltiruvchi link.
  - `href={"/blog"}` → foydalanuvchi bosganda `/blog` sahifasiga o'tadi.

- `<Link href={"/products"}>Products</Link>`
  - **"/products"** sahifasiga yo‘naltiruvchi link.
  - `href={"/products"}` → foydalanuvchi bosganda `/products` sahifasiga o'tadi.

### **Muhim jihatlar:**

- **`<a>` tegi ishlatilmagan**, chunki `Link` avtomatik ravishda `<a>` ichiga joylashtiriladi.
- **Next.js**'ning `Link` komponenti **tezkor sahifa yuklanishini** ta’minlaydi.
- **Brauzer sahifani qayta yuklamaydi**, chunki Next.js **client-side routing** ishlatadi.

### **Natija:**

- "Blog" tugmasi bosilganda `/blog` sahifasiga o'tadi.
- "Products" tugmasi bosilganda `/products` sahifasiga o'tadi.

```tsx
const productId = 100;
<Link href={`/products/${productId}`}>Product {productId}</Link>;
```

- `const productId = 100;`

  - **`productId` o'zgaruvchisi** yaratilgan va **100** qiymati berilgan.

- `<Link href={`/products/${productId}`}>Product {productId}</Link>`
  - `href={`/products/${productId}`}` → **dynamik URL** yaratish.
  - **Final natija:** `<Link href="/products/100">Product 100</Link>`
  - Tugma bosilganda `/products/100` sahifasiga yo‘naltiradi.
- Tugma bosilganda **"/products/100"** sahifasiga yo‘naltiriladi.
- **`productId` o‘zgaruvchisini o‘zgartirish** orqali boshqa mahsulot sahifasiga o'tish mumkin.

---

## **📌 15-dars Active Links**

```tsx
const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      {navLinks.map((link) => {
        const isActive =
          pathname == link.href ||
          (pathname.startsWith(link.href) && link.href !== "/");

        return (
          <Link
            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}

      {children}
    </div>
  );
}
```

- **`navLinks`** → Ro‘yxat (`array`), unda har bir navigatsiya elementi uchun **`name`** va **`href`** bor.
- **`usePathname()`** → Hozirgi sahifa yo‘nalishini (URL) olish uchun ishlatiladi.
- **`isActive`** → Agar `pathname` va `link.href` mos kelsa yoki `pathname` shu yo‘nalish bilan boshlansa, **aktiv link** deb belgilanadi.
- **`map()`** → `navLinks` ichidagi har bir elementni ekranga chiqarish uchun ishlatiladi.
- **`<Link>`** → `next/link` yordamida **tezkor yo‘naltirish** (client-side routing) amalga oshiriladi.
- **`{children}`** → `AuthLayout` ichiga boshqa komponentlar joylashtirish imkonini beradi.

---

## **📌 16-dars Params and SearchParams**

`params` – bu dinamik URL segmentlarini `(/product/123)` olish uchun ishlatiladi.
`searchParams` – bu URL query string `(/products?category=shoes)` orqali ma’lumot olish uchun ishlatiladi.
`params` odatda sahifa marshrutini aniqlaydi, `searchParams` esa `filtr` va `qidiruv` uchun qo‘llanadi.

```tsx
<Link href={"/articles/breaking-news-123?lang=en"}>Read in English</Link>
<Link href={"/articles/breaking-news-123?lang=fr"}>Read in French</Link>
```

- Bu yerda ikki xil til opsiyasi bilan bog‘langan `<Link>` komponentlari bor:
  - Inglizcha versiya: `href="/articles/breaking-news-123?lang=en"`
  - Fransuzcha versiya: `href="/articles/breaking-news-123?lang=fr"`
- `params.articleId` → Maqola nomini olish uchun `(breaking-news-123)`.
- `searchParams.lang` → Til opsiyalarini o‘zgartirish uchun `(en yoki fr)`.

```tsx
import Link from "next/link";
import React from "react";

export default function NewsArticle({
  params,
  searchParams,
}: {
  params: { articleId: string };
  searchParams: { lang?: "en" | "es" | "fr" };
}) {
  const { articleId } = params;
  const { lang = "en" } = searchParams;

  return (
    <div>
      <h1>News article id: {articleId}</h1>
      <p>Reading in language: {lang}</p>

      <div>
        <Link href={`/articles/${articleId}?lang=en`}>English</Link>
        <Link href={`/articles/${articleId}?lang=es`}>Spanish</Link>
        <Link href={`/articles/${articleId}?lang=fr`}>French</Link>
      </div>
    </div>
  );
}
```

- **`params`** → Dinamik URL parametrlarini o‘z ichiga oladi (`articleId`).
- **`searchParams`** → URL query string (`?lang=en`, `?lang=es`, `?lang=fr`) orqali keladigan qo‘shimcha parametrlar.

- **`params.articleId`** → URL orqali keladigan maqola identifikatori (`/articles/breaking-news-123` → `params.articleId = "breaking-news-123"`).
- **`searchParams.lang`** → Foydalanuvchi tanlagan til (`?lang=es` → `searchParams.lang = "es"`).
- **`const { lang = "en" } = searchParams;`** → Agar `lang` berilmagan bo‘lsa, **standart til `en` (inglizcha) bo‘ladi**.
- **`<Link href={`/articles/${articleId}?lang=en`}>English</Link>`**
  - Bosilganda **Inglizcha** versiyaga o‘tadi (`/articles/breaking-news-123?lang=en`).
- **`<Link href={`/articles/${articleId}?lang=es`}>Spanish</Link>`**
  - Bosilganda **Ispancha** versiyaga o‘tadi (`/articles/breaking-news-123?lang=es`).
- **`<Link href={`/articles/${articleId}?lang=fr`}>French</Link>`**
  - Bosilganda **Fransuzcha** versiyaga o‘tadi (`/articles/breaking-news-123?lang=fr`).

```tsx
"use client";

export default function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId } = use(params);
  const { lang = "en" } = use(searchParams);
}
```

- `client` komponentda `params` va `searchParams` `use` hooki orqali olinadi
- `params: Promise<{ articleId: string }>` `searchParams: Promise<{ lang?: "en" | "es" | "fr" }>` client komponentda `params` va `searchParams` ni olish uchun ushb u ko'rinishfa type ko'rsatish kerak
