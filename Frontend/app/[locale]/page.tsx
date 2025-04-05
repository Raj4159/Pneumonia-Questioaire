// app/[locale]/page.tsx
import { redirect } from "next/navigation";

export default async function HomeRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/login`);
}

// // app/[locale]/page.tsx
// import { redirect } from "next/navigation";

// export default function HomeRedirect({ params }: { params: { locale: string } }) {
//   redirect(`/${params.locale}/login`);
// }
