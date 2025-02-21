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
