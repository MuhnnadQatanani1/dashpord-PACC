import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Globe } from "lucide-react";


export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex rounded-xl bg-white p-3 shadow-elevated">
              <img
                src="/observatory-logo.png"
                alt="شعار المرصد الوطني لمؤشرات النزاهة ومكافحة الفساد"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-8 text-primary-foreground md:text-base">
              منصة وطنية لرصد وتحليل مؤشرات الفساد والنزاهة والحوكمة اعتماداً على بيانات إحصائية رسمية ودقيقة،
              دعماً لصنّاع القرار وتعزيزاً للشفافية والمساءلة في فلسطين.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">روابط سريعة</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-85">
              <li><Link to="/about" className="hover:opacity-100">عن المرصد</Link></li>
              <li><Link to="/dashboard" className="hover:opacity-100">لوحة البيانات التفاعلية</Link></li>
              <li><Link to="/concepts" className="hover:opacity-100">المفاهيم والمصطلحات</Link></li>
              <li><Link to="/methodology" className="hover:opacity-100">المنهجية</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">التواصل</h4>
            <ul className="mt-4 space-y-3 text-sm opacity-85">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> رام الله - فلسطين</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1800-000-100</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@pacc.pna.ps</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> pacc.pna.ps</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-75 md:flex-row">
          <div>© {new Date().getFullYear()} هيئة مكافحة الفساد الفلسطينية - جميع الحقوق محفوظة.</div>
          <div>البيانات المنشورة إحصائية ومجمّعة وفق قانون مكافحة الفساد رقم 1 لسنة 2005 وتعديلاته.</div>
        </div>
      </div>
    </footer>
  );
}
