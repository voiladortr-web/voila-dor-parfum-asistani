// ============================================================
//  Voilà D'or – Parfüm Asistanı  |  Netlify Serverless Function
//  Bu dosyayı netlify/functions/parfum-asistan.js olarak deploy edin
// ============================================================

// ── Ürün kataloğu ──────────────────────────────────────────
const URUNLER = [
  { original: "BLACK ORCHID BY TOM FORD", voila: "ORCHİDÉE NOİRE", aciklama: "Orchidée Noire, sıcak baharatların topraksı ve odunsu bir derinlikle buluştuğu gizemli ve büyüleyici bir koku. Amberin tatlı ışıltısı, yoğun paçuli ile harmanlanarak karanlık ve kadifemsi bir çiçeksi kalbi ortaya çıkarıyor. Çikolata ve pudra notaları, iştah açıcı bir duygusallık katarken, balzamik baz notaları teni zengin, sofistike ve çekici bir koku iziyle sarıyor. Üst Nota: Trüf, Gardenya, Siyah Frenk Üzümü, Ylang-Ylang, Yasemin, Bergamot, Mandalina, Amalfi Limonu Kalp Nota: Orkide, Baharatlar, Gardenya, Meyveli Notalar, Ylang-Ylang, Yasemin, Lotus Dip Nota: Meksika çikolatası, Paçuli, Vanilya, Tütsü, Amber, Sandal ağacı, Vetiver, Beyaz Misk" },
  { original: "NAXOS BY XERJOFF", voila: "NAXOR", aciklama: "Naxor, yoğun bir yumuşaklığın altın rengi ve baştan çıkarıcı bal ile birleştiği, zengin ve saran bir koku. Kremsi vanilya, zarif tütünü daha da güzelleştirirken, aromatik lavanta ise rafine bir ferahlık katıyor. Parlak narenciye notaları kompozisyonu açar ve ardından yerini çiçeksi ve pudra kokulu bir kalbe bırakır. Üst Nota: Lavanta, Bergamot, Limon Kalp Nota: Bal, Tarçın, Kaşmeran, Sambac Yasemin Dip Nota: Tütün Yaprağı, Vanilya, Tonka Çekirdeği" },
  { original: "OMBRE LEATHER 2018 BY TOM FORD", voila: "LEATHOR", aciklama: "Leathor, güçlü deri notalarının ham ve zarif bir duygusallıkla hakim olduğu, yoğun ve kendine özgü bir kokudur. Hayvansal ve sıcak baharatlı nüanslar, narin beyaz çiçek notalarıyla iç içe geçerek, güç ve yumuşaklık arasında zarif bir kontrast yaratır. Üst Nota: Kakule Kalp Nota: Deri, Sambak Yasemin Dip Nota: Amber, Yosun, Paçuli" },
  { original: "ARABIANS TONKA BY MONTALE", voila: "DARK TONKA", aciklama: "Dark Tonka, kremsi ve bağımlılık yaratan vanilya ile tatlı bir lezzetin hakim olduğu, zengin ve büyüleyici bir koku. Sıcak amber ve derin oud, sıcak baharatlarla birleşerek zengin bir oryantal yoğunluk yaratır. Üst Nota: Safran, Bergamot Kalp Nota: Agar Ağacı (Oud), Bulgar Gülü Dip Nota: Tonka Fasulyesi, Şeker Kamışı, Amber, Beyaz Misk, Meşe Yosunu" },
  { original: "OMBRE NOMADE BY LOUIS VUITTON FOR UNISEX", voila: "NOMARA", aciklama: "Nomara, parlak kehribarın udun mistik derinliğiyle buluştuğu, ihtişamlı bir doğu esintisi sunuyor. Kadifemsi gül, sıcak baharatlar ve dumanlı nüanslarla birleşerek, hafif meyveli ve deri notalarıyla zengin ve saran bir hava yaratıyor. Üst Nota: Safran, Sıcak baharatlar, Ahududu, Sardunya, Tütsü Kalp Nota: Oud, Gül, Deri Dip Nota: Amber, Benzoi, Odunsu Notalar, Balsamik, Huş" },
  { original: "OUD FOR GREATNESS BY INITIO FOR UNISEX", voila: "SACRE OUD", aciklama: "Sacre Oud, taze ve canlı baharatların oud ağacının mistik asaletiyle buluştuğu görkemli bir atmosfer yaratır. Üst Nota: Safran, Hindistan cevizi, Lavanta Kalp Nota: Agar ağacı (Oud) Dip Nota: Paçuli, Misk" },
  { original: "SIDE EFFECT BY INITIO FOR UNISEX", voila: "IVRESSE", aciklama: "Ivresse, romun şurup gibi yoğunluğunun tütünün şehvetli derinliğiyle birleştiği büyüleyici bir koku. Üst Nota: Vanilya, Tütün Kalp Nota: Rom Dip Nota: Tarçın" },
  { original: "TOBACCO VANILLE BY TOM FORD FOR MEN", voila: "OR NOİR", aciklama: "Or Noir, kremsi ve bağımlılık yaratan vanilyanın sarı tütünün asil yoğunluğuyla iç içe geçtiği zengin bir kompozisyon sunuyor. Üst Nota: Tütün Yaprağı, Baharatlı Notalar Kalp Nota: Vanilya, Kakao, Tonka Fasulyesi, Tütün Çiçeği Dip Nota: Kuru Meyveler, Odunsu Notalar" },
  { original: "AVENTUS BY CREED", voila: "AVENTOR", aciklama: "Aventor, canlı meyve notalarının incelikli ve ışıltılı bir yumuşaklıkla iç içe geçtiği, karizmatik ve kendine özgü bir parfüm. Üst Nota: Bergamot, Siyah Frenk Üzümü, Elma, Limon, Pembe Biber Kalp Nota: Ananas, Paçuli, Fas Yasemin Dip Nota: Huş Ağacı, Misk, Meşe Yosunu, Sedir Ağacı, Ambroksan" },
  { original: "KİRKE BY TİZİANA TERENZİ", voila: "KİRANA", aciklama: "Kirana, sulu tropikal meyvelerin parlak ve baştan çıkarıcı bir tatlılıkla ön plana çıktığı, göz alıcı ve bağımlılık yaratan bir koku. Üst Nota: Çarkıfelek meyvesi, Şeftali, Armut, Ahududu, Siyah frenk üzümü Kalp Nota: Müge çiçeği Dip Nota: Misk, Sandal ağacı, Vanilya, Paçuli, Heliotrop" },
  { original: "GANYMEDE BY MARC ANTOINE BARROIS", voila: "GALOR", aciklama: "Galor, mineral notaların soğuk ve ışıltılı bir zarafetle ön plana çıktığı, fütüristik ve çekici bir parfüm. Üst Nota: Safran, İtalyan Mandalina Kalp Nota: Çin Osmanthus, Menekşe Yaprağı, Ölmezotu Dip Nota: Mineral notalar, Süet, Akigalawood, Sedir, Misk, Paçuli" },
  { original: "BOIS IMPERIAL BY ESSENTIAL PARFUMS FOR UNISEX", voila: "BOİSAR", aciklama: "Boisar, taze baharatların zarif bir aromatik yapıyı canlandırdığı, modern ve canlı bir odunsu koku. Üst Nota: Fesleğen, Paçuli, Ferah baharatlar Kalp Nota: Oud, Odunsu notalar, Topraksı nüanslar Dip Nota: Amber, Sıcak baharatlar, Vetiver, Ambroksan" },
  { original: "CEDRAT BOİSE BY MANCERA FOR UNISEX", voila: "CEDRAL", aciklama: "Cedral, narenciyenin ışıltısının parlak meyve notalarıyla harmanlandığı ve belirgin bir odunsu tabanın üzerinde yükselen zarif ve dinamik bir kokudur. Üst Nota: Sicilya Limonu, Bergamot, Siyah Frenk Üzümü Kalp Nota: Meyveli Notalar, Paçuli Yaprağı, Su Yasemini Dip Nota: Sedir, Deri, Sandal Ağacı, Vanilya, Beyaz Misk, Yosun" },
  { original: "FLEUR NARCOTIQUE BY EX NIHILO FOR UNISEX", voila: "HYPNO", aciklama: "Hypno, parlak ve büyüleyici bir koku olup, beyaz çiçeklerden oluşan ışıltılı bir buketle öne çıkıyor. Üst Nota: Litsi, Bergamot, Şeftali Kalp Nota: Şakayık, Portakal Çiçeği, Yasemin, Petalia Dip Nota: Misk, Yosun, Odunsu Notalar" },
  { original: "HACIVAT BY NISHANE FOR UNISEX", voila: "ASPENDOS", aciklama: "Aspendos, parlak ve karizmatik bir koku; canlı narenciye notaları, sofistike odunsu bir zemin üzerinde tropikal meyve notalarıyla buluşuyor. Üst Nota: Ananas, Greyfurt, Bergamot Kalp Nota: Sedir, Paçuli, Yasemin Dip Nota: Meşe yosunu, Odunsu notalar" },
  { original: "OUD WOOD BY TOM FORD FOR UNISEX", voila: "SANTAL", aciklama: "Santal, değerli ağaçların zarif ve saran bir yorumu olup, sandal ağacının sıcaklığı, udun rafine yoğunluğuyla harmanlanıyor. Üst Nota: Brezilya Gül Ağacı, Sandal Ağacı, Kakule, Tonka Fasülyesi Kalp Nota: Agar Ağacı (Ud), Sichuan Biberi Dip Nota: Amber, Vetiver, Vanilya" },
  { original: "HIBISCUS MAHAJAD BY MAISON CRIVELLI FOR UNISEX", voila: "VELOURS", aciklama: "Velours, görkemli hibiskus çiçeğinin kadifemsi gülün şehvetiyle ve vanilyanın bağımlılık yaratan yumuşaklığıyla buluştuğu, yoğun ve dokulu bir çiçeksi koku. Üst Nota: Hibiskus, Frenk Üzümü Yaprağı, Baharatlı Nane Kalp Nota: Gül, Hibiskus, Çiçeksi Notalar Dip Nota: Vanilya, Deri, Misk" },
  { original: "VELVET ORCHID BY TOM FORD", voila: "VELORA", aciklama: "Velora, yoğun ve kadifemsi bir çiçek buketinin hakim olduğu, zengin ve feminen bir parfüm. Üst Nota: Rom, Bal, Mandalina, Bergamot Kalp Nota: Siyah Orkide, Orkide, Yasemin, Heliotrop, Sümbül, Gül Yağı, Portakal Çiçeği Dip Nota: Vanilya, Mür, Süet, Sandal Ağacı, Peru Balsamı, Labdanum" },
  { original: "BACCARAT ROUGE 540 BY MAİSON FRANCIS KURKDJIAN", voila: "CARAT", aciklama: "Carat, zarif odunsu notaların berrak ve ışıltılı bir kehribarla sarıldığı, parlak ve bağımlılık yaratan bir parfüm. Üst Nota: Safran, Yasemin Kalp Nota: Amber ağacı, Gri Amber, Hedion Dip Nota: Köknar reçinesi, Sedir, Şeker, Ambroksan, Meşe yosunu" },
  { original: "GUIDANCE BY AMOUAGE FOR UNISEX", voila: "GUİDER", aciklama: "Guider, asil odunsu notaların sıcak ve baştan çıkarıcı bir kehribarla harmanlandığı, derin ve saran bir koku. Üst Nota: Armut, Fındık, Olibanum Kalp Nota: Osmanthus, Gül, Safran, Sambac Yasemin Dip Nota: Sandal Ağacı, Vanilya, Akigala Odunu, Gri Amber, Labdanum" },
  { original: "VALAYA BY PARFUMS DE MARLY FOR WOMEN", voila: "KHAMSİN", aciklama: "Khamsin, temiz ve zarif bir misk notasının hakim olduğu zarif ve ışıltılı bir koku. Üst Nota: Aldehitler, Beyaz Şeftali, Bergamot, Mandalina Kalp Nota: Portakal Çiçeği, Müge Çiçeği, Petalia, Vetiver Dip Nota: Misk, Ambroksan, Odunsu, Vanilya" },
  { original: "MORE THAN WORDS BY XERJOFF FOR UNISEX", voila: "L'ART MUET", aciklama: "L'art Muet, her notanın kelimelerin ötesinde derin bir duygu uyandırdığı, yoğun ve etkileyici bir yaratımdır. Üst Nota: Tatlı meyveler, Meyvemsi notalar Kalp Nota: Ud, Çiçeksi notalar, Gri Amber Dip Nota: Amber, Odunsu Notalar, Oryantal Notalar, Labdanyum" },
  { original: "SAUVAGE ELIXIR BY DIOR FOR MEN", voila: "SAVOR", aciklama: "Savor, sıcak ve canlı baharatların hakim olduğu yoğun ve karizmatik bir kokudur. Üst Nota: Küçük Hindistan Cevizi, Tarçın, Kakule, Greyfurt Kalp Nota: Lavanta Dip Nota: Meyan Kökü, Sandal Ağacı, Amber, Paçuli, Haiti Vetiveri" },
  { original: "MEGAMARE BY ORTO PARISI", voila: "MARİON", aciklama: "Marion, güçlü ve saran bir misk kokusunun hakim olduğu yoğun ve büyüleyici bir parfüm. Üst Nota: Bergamot, Limon Kalp Nota: Deniz yosunu, Calone, Hedione Dip Nota: Misk, Ambroxan, Sedir" },
  { original: "TYGAR BY BVLGARI FOR MEN", voila: "LOUVRE", aciklama: "Louvre, parlak ve zarif bir koku olup, canlı ve sofistike bir ferahlıkla ön plana çıkan ışıltılı narenciye notalarıyla dikkat çeker. Üst Nota: Greyfurt Kalp Nota: Zencefil, Ambrette Dip Nota: Ambroksan, Misk, Vetiver, Paçuli" },
  { original: "GRIS CHARNEL BY BDK PARFUMS FOR UNISEX", voila: "LORE", aciklama: "Lore, sıcak baharatların narin pudra kokulu aromatik bir kalp notasıyla buluştuğu, şehvetli ve zarif odunsu bir parfüm. Üst Nota: Kakule, İncir, Siyah Çay Kalp Nota: İris, Bourbon Vetiver Dip Nota: Sandal Ağacı, Tonka Fasulyesi" },
  { original: "JUBILATION 40 BY AMOUAGE FOR MEN", voila: "GRASSE", aciklama: "Grasse, zengin amberin asil odunsu notalarla harmanlandığı, görkemli bir kompozisyondur. Üst Nota: Böğürtlen, Labdanum, Siyah Frenk Üzümü, Portakal, Biberiye Kalp Nota: Tütsü, Defne Yaprağı, Tarçın, Karanfil, Gül Dip Nota: Agarwood (Ud), Opoponaks, Paçuli, Mür, Yosun, Misk, Sedir, Gri Amber" },
  { original: "JUMP UP&KISS ME HEDONISTIC BY CLIVE CHRISTIAN", voila: "HEDONA", aciklama: "Hedona, değerli ağaç kokuları ve sıcak kehribarın lüks ve saran bir hava yarattığı, zengin ve baştan çıkarıcı bir parfüm. Üst Nota: Kara Kiraz, Menekşe Yaprağı, Bergamot, Neroli, Mandalina, Greyfurt, Limon Kalp Nota: Tütün, İris, Papirüs, Yasemin Dip Nota: Amber, Deri, Tonka Fasulyesi, Vanilya, Sandal Ağacı, Misk, Labdanum, Vetiver, Yosun, Paçuli" },
  { original: "AFRICAN LEATHER BY MEMO FOR UNISEX", voila: "WİLD LEATHER", aciklama: "Wild Leather, taze ve canlı baharatların derin ve çekici bir sıcaklığa yol açtığı vahşi bir zarafeti yansıtıyor. Üst Nota: Sardunya, Kimyon, Safran, Kakule, Bergamot Kalp Nota: Paçuli, Gül Dip Nota: Deri, Ud, Misk, Vetiver" },
  { original: "OUD MARACUJA BY MAISON CRIVELLI FOR UNISEX", voila: "MARGA", aciklama: "Marga, safranın baharatlı zarafeti ve Türk gülünün narinliği ile zenginleştirilmiş, tutku meyvesinin canlılığıyla sulu meyve notalarının harmanlandığı çarpıcı bir açılış sunuyor. Üst Nota: Çarkıfelek, Meyvemsi Notalar, Gül, Safran Kalp Nota: Agar Ağacı, Benzoi, Endonezya Paçuli Yaprağı Dip Nota: Deri, Amber, Vanilya, Labdanum" },
  { original: "REFLECTION BY AMOUAGE FOR MEN", voila: "RİVOR", aciklama: "Rivor, zarif odunsu notaların hakim olduğu şık ve ışıltılı bir parfüm. Üst Nota: Biberiye, Pembe Biber, Turunç Yaprağı Kalp Nota: Yasemin, Neroli, İris Kökü, Ylang-Ylang Dip Nota: Sandal Ağacı, Sedir, Vetiver, Paçuli" },
  { original: "CHANEL BLUE BY CHANEL", voila: "CLAİR", aciklama: "Clair, ilk saniyelerden itibaren zarif bir ferahlık katan canlı ve parlak narenciye notalarıyla açılır. Üst Nota: Greyfurt, Limon, Nane, Pembe Biber Kalp Nota: Zencefil, Hindistan Cevizi, Yasemin Dip Nota: Tütsü, Sedir, Vetiver, Sandal Ağacı, Paçuli, Labdanum, Beyaz Misk" },
  { original: "STRONGER WITH YOU INTENSELY BY GIORGIO ARMANI", voila: "INTENSO", aciklama: "Intenso, yoğun ve kremsi vanilya notalarının hakim olduğu, sıcak ve bağımlılık yaratan bir koku. Üst Nota: Pembe Biber, Ardıç, Menekşe Kalp Nota: Karamel, Tarçın, Lavanta, Adaçayı Dip Nota: Vanilya, Amber, Tonka Fasulyesi, Süet" },
  { original: "NUIT DE L'HOMME BY YVES SAINT LAURENT", voila: "NOCTEM", aciklama: "Noctem, zarif ve gizemli bir parfüm olup, rafine aromatik notalarla öne çıkıyor. Üst Nota: Kakule Kalp Nota: Lavanta, Virginia Sedir, Bergamot Dip Nota: Vetiver, Kimyon" },
  { original: "MYSLF EDP BY YSL FOR MEN", voila: "MYRON", aciklama: "Myron, canlı narenciye notalarının hakim olduğu, parlak ve çağdaş bir koku. Üst Nota: Kalabriya bergamotu, Bergamot Kalp Nota: Tunus portakal çiçeği Dip Nota: Ambrofix, Paçuli" },
  { original: "EROS BY VERSACE FOR MEN", voila: "AMOURİX", aciklama: "Amourix, ilk koku izleniminden itibaren kompozisyona hakim olan yoğun ve baştan çıkarıcı bir vanilya kokusu sunuyor. Üst Nota: Nane, Yeşil Elma, Limon Kalp Nota: Tonka Fasulyesi, Ambroksan, Sardunya Dip Nota: Madagaskar Vanilyası, Virginia Sedir Ağacı, Atlas Sedir Ağacı, Vetiver, Meşe Yosunu" },
  { original: "SCANDAL POUR HOMME LE PARFUM BY JPG", voila: "DESİR", aciklama: "Desir, aromatik akorların yoğun bir şekilde hakim olduğu cesur ve sofistike bir koku. Üst Nota: Sardunya Kalp Nota: Tonka Fasulyesi Dip Nota: Sandal Ağacı" },
  { original: "SAUVAGE BY DIOR FOR MEN", voila: "DİGOR", aciklama: "Digor, taze ve dinamik baharatların hakim olduğu canlı ve çekici bir koku. Üst Nota: Kalabriya bergamotu, Biber Kalp Nota: Sichuan biberi, Lavanta, Pembe biber, Vetiver, Paçuli, Sardunya, Elemi Dip Nota: Ambroksan, Sedir, Labdanum" },
  { original: "INVICTUS BY PACO RABANNE FOR MEN", voila: "INVİCTOR", aciklama: "Invictor, okyanusun gücünü ve enerjisini çağrıştıran, canlı narenciye notalarının ferahlatıcı deniz akorlarıyla harmanlandığı bir patlamayla açılır. Üst Nota: Deniz Notaları, Greyfurt, Mandalina Kalp Nota: Defne Yaprağı, Yasemin Dip Nota: Gri Amber, Guaiac Ağacı, Meşe Yosunu, Paçuli" },
  { original: "1 MILLION LUCKY BY PACO RABANNE FOR MEN", voila: "FORTUN", aciklama: "Fortun, odunsu notaların zarafetle hakim olduğu, cesur ve bağımlılık yaratan bir parfüm. Üst Nota: Erik, Ozonik notalar, Greyfurt, Bergamot Kalp Nota: Fındık, Bal, Sedir, Portakal Çiçeği, Yasemin Dip Nota: Amber, Paçuli, Vetiver, Meşe yosunu" },
  { original: "MAN IN BLACK BY BVLGARI FOR MEN", voila: "NOCTAR", aciklama: "Noctar, sıcak ve büyüleyici baharatların hakim olduğu yoğun ve çekici bir kokudur. Üst Nota: Baharatlar, Rom, Tütün Kalp Nota: Deri, İris, Tüberoz Dip Nota: Tonka Fasulyesi, Guaiac Ağacı, Benzoin" },
  { original: "TERRE D'HERMES BY HERMES FOR MEN", voila: "TERROS", aciklama: "Terros, enerji ve zarafet katan canlı ve parlak narenciye notalarıyla açılır. Üst Nota: Portakal, Greyfurt Kalp Nota: Biber, Pelargonium, Çakmaktaşı Dip Nota: Vetiver, Sedir, Paçuli, Benzoin" },
  { original: "DYLAN BLUE BY VERSACE FOR MEN", voila: "DARİAN", aciklama: "Darian, yoğun amberin canlı narenciye notalarıyla birleştiği modern ve baştan çıkarıcı bir parfüm. Üst Nota: Kalabriya bergamotu, Su Notaları, Greyfurt, İncir Yaprağı Kalp Nota: Ambroksan, Karabiber, Paçuli, Menekşe Yaprağı, Papirüs Dip Nota: Tütsü, Misk, Tonka Fasulyesi, Safran" },
  { original: "COCO MADEMOISELLE BY CHANEL", voila: "COLETTE", aciklama: "Colette, ilk notalardan itibaren ferahlık ve zarafet katan canlı bir narenciye patlamasıyla açılır. Üst Nota: Portakal, Mandalina, Bergamot, Portakal Çiçeği Kalp Nota: Türk Gülü, Yasemin, Mimoza, Ylang-Ylang Dip Nota: Paçuli, Beyaz Misk, Vanilya, Vetiver, Tonka Fasulyesi, Opoponaks" },
  { original: "ROBERTO CAVALLI EAU DE PARFUM BY ROBERTO CAVALLI", voila: "CAVELA", aciklama: "Cavela, zengin ve bağımlılık yaratan vanilya notalarının hakim olduğu, duyusal ve güneşli bir parfüm. Üst Nota: Pembe Biber Kalp Nota: Afrika Portakal Çiçeği Dip Nota: Vanilya, Benzoin, Tonka Fasulyesi" },
  { original: "LA VIE EST BELLE BY LANCOME", voila: "LA BELL", aciklama: "La Bell, yoğun ve bağımlılık yaratan bir yumuşaklığın hakim olduğu, lezzetli ve zarif bir parfüm. Üst Nota: Siyah Frenk Üzümü, Armut Kalp Nota: İris, Yasemin, Portakal Çiçeği Dip Nota: Pralin, Vanilya, Paçuli, Tonka Fasulyesi" },
  { original: "PARADOXE BY PRADA FOR WOMEN", voila: "PARİXA", aciklama: "Parixa, parlak beyaz çiçek buketinin hakim olduğu modern ve ışıltılı bir parfüm. Üst Nota: Armut, Mandalina, Bergamot Kalp Nota: Portakal Çiçeği, Neroli Esansı, Sambac Yasemini Dip Nota: Bourbon Vanilya, Amber, Beyaz Misk, Benzoin" },
  { original: "CRYSTAL NOIR BY VERSACE", voila: "CRİSTA", aciklama: "Crista, ilk kokladığınız anda sizi büyüleyen taze ve sıcak baharatların hakim olduğu, şehvetli ve gizemli bir parfüm. Üst Nota: Biber, Zencefil, Kakule Kalp Nota: Hindistan cevizi, Gardenya, Portakal çiçeği, Şakayık Dip Nota: Sandal ağacı, Misk, Amber" },
  { original: "IDOLE BY LANCOME FOR WOMEN", voila: "IDORA", aciklama: "Idora, parlak ve modern bir gül kokusunun hakim olduğu, ışıltılı ve narin bir parfüm. Üst Nota: Armut, Bergamot, Pembe Biber Kalp Nota: Gül, Yasemin Dip Nota: Beyaz Misk, Vanilya, Paçuli, Sedir" },
  { original: "VALENTINO DONNA BORN IN ROMA FOR WOMEN", voila: "ROSELLA", aciklama: "Rosella, zarif odunsu notaların hakim olduğu şık ve modern bir parfüm. Üst Nota: Siyah Frenk Üzümü, Pembe Biber, Bergamot Kalp Nota: Yasemin, Sambac Yasemin, Yasemin Çayı Dip Nota: Bourbon Vanilya, Kaşmiren, Guaiac Ağacı" },
  { original: "LIBRE INTENSE BY YSL FOR WOMEN", voila: "LİBERA", aciklama: "Libera, yoğun ve baştan çıkarıcı vanilya notalarının hakim olduğu cesur ve ışıltılı bir parfüm. Üst Nota: Lavanta, Mandalina, Bergamot Kalp Nota: Lavanta, Tunus Portakal Çiçeği, Sambac Yasemini, Orkide Dip Nota: Madagaskar Vanilyası, Tonka Fasulyesi, Gri Amber, Vetiver" },
  { original: "BOMBSHELL BY VICTORIA'S SECRET FOR WOMEN", voila: "BELLORA", aciklama: "Bellora, canlı meyve notalarının hakim olduğu, ışıltılı ve neşeli bir parfüm. Üst Nota: Çarkıfelek meyvesi, Greyfurt, Ananas, Mandalina, Büyük Çilek Kalp Nota: Şakayık, Vanilya Orkide, Kırmızı Meyveler, Yasemin, Müge Dip Nota: Misk, Odunsu Notalar, Meşe Yosunu" },
  { original: "CHANCE BY CHANEL FOR WOMEN", voila: "CELİNA", aciklama: "Celina, narin ve saran bir misk kokusunun hakim olduğu zarif ve sofistike bir parfüm. Üst Nota: Pembe Biber Kalp Nota: Yasemin, İris Dip Nota: Paçuli, Misk, Vanilya" },
  { original: "GOOD GIRL BY CAROLINA HERRERA FOR WOMEN", voila: "GABRİEL", aciklama: "Gabriel, tatlı bir yumuşaklığın yoğun beyaz çiçek buketiyle birleştiği baştan çıkarıcı ve cesur bir parfüm. Üst Nota: Badem, Kahve, Bergamot, Limon Kalp Nota: Tüberoz, Sambac Yasemin, Portakal Çiçeği, Bulgar Gülü, İris Dip Nota: Tonka Fasulyesi, Kakao, Vanilya, Pralin, Sandal Ağacı, Misk, Amber, Paçuli, Tarçın, Sedir" },
  { original: "GODDESS BY BURBERRY FOR WOMEN", voila: "GİSELLE", aciklama: "Giselle, kremsi ve bağımlılık yaratan vanilya notalarının hakim olduğu, ışıltılı ve saran bir kokudur. Üst Nota: Vanilya, Lavanta, Kakao, Zencefil Kalp Nota: Vanilya Kaviar Dip Nota: Vanilya Absolü" },
  { original: "MY WAY BY GIORGIO ARMANI FOR WOMEN", voila: "MONİA", aciklama: "Monia, parlak beyaz çiçeklerin oluşturduğu bir buketle öne çıkan, parlak ve feminen bir parfüm. Üst Nota: Portakal Çiçeği, Bergamot Kalp Nota: Tüberoz, Hint Yasemin Dip Nota: Madagaskar Vanilyası, Beyaz Misk, Virginia Sedir" },
  { original: "MIDNIGHT POISON BY DIOR FOR WOMEN", voila: "MİDORA", aciklama: "Midora, derin ve büyüleyici paçuli notalarının hakim olduğu gizemli ve büyüleyici bir parfüm. Üst Nota: Bergamot, Mandalina Kalp Nota: Gül Dip Nota: Paçuli, Amber, Vanilya" },
  { original: "ADDICT BY DIOR FOR WOMEN", voila: "ADDORA", aciklama: "Addora, anında baştan çıkarıcı ve bağımlılık yaratan bir his uyandıran yoğun ve saran bir vanilya notasıyla açılır. Üst Nota: Böğürtlen, Mandalina Yaprağı, İpek Ağacı Çiçeği Kalp Nota: Yasemin, Portakal Çiçeği, Gece Çiçek Açan Kaktüs, Gül Dip Nota: Vanilya, Tonka Çekirdeği, Mysore Sandal Ağacı" }
];

// ── Sistem Promptu ─────────────────────────────────────────
const SISTEM_PROMPTU = `Sen Voilà D'or parfüm mağazasının yapay zeka parfüm asistanısın. Müşterilerin istediği kokuları sadece Voilà D'or koleksiyonundan karşılıyorsun.

## ÜRÜN KATALOĞU
${URUNLER.map((u, i) => `${i + 1}. Orijinal: "${u.original}" → Voilà D'or: "${u.voila}"\n   ${u.aciklama}`).join('\n\n')}

## GÖREVLER VE KURALLAR

1. **SADECE Voilà D'or ürünlerini öner.** Başka hiçbir marka, parfüm adı, web sitesi veya mağaza söyleme. Kesinlikle yasak.

2. **Tam muadil sorgusu:** Müşteri bir orijinal parfüm adı sorarsa ve kataloğumuzda tam muadili varsa:
   → "✅ %100 Uyum — **[VOILA D'OR ÜRÜN ADI]**" şeklinde belirt.

3. **Benzer ürün önerisi:** Tam muadil yoksa, koku notalarını analiz ederek en yakın 2–3 ürünü öner. Gerçekçi benzerlik yüzdesi ver (%60–%95 arası).

4. **Nota bazlı sorgu:** "Portakal çiçeği seviyorum", "oud içeren bir şey istiyorum" gibi sorularda kataloğumuzdan o notayı içeren ürünleri listele.

5. **Her öneri için:** Kısa (1–2 cümle), samimi ve alışverişi teşvik eden bir açıklama yaz.

6. **Yanıt formatı:**
   - Ürün adını **kalın** yaz
   - Uyum/benzerlik oranını emoji ile göster (✅ %100 için, 🔥 %90+ için, ⭐ diğerleri için)
   - Kısa açıklama
   - Her yanıtın sonuna nazikçe sipariş teşvik cümlesi ekle

7. **Dil:** Türkçe yaz. Sıcak, samimi ve profesyonel ol.

8. **KESİNLİKLE YASAK:** Yanıtlarında hiçbir zaman # (diyez) işareti kullanma. Başlık yapma. Sadece düz metin ve **kalın** yazı kullan.

9. **ASLA "tanımıyorum" DEME.** Katalogda olmayan bir parfüm sorulursa, o parfümün bilinen koku notalarını kendi bilgine dayanarak analiz et ve kataloğumuzdan en yakın 2-3 ürünü öner. "Bu ürünü tanımıyorum", "bilmiyorum" gibi ifadeler kullanma - her zaman yardımcı ol.

10. **TUTARLILIK ZORUNLU.** Aynı parfüm tekrar sorulursa HER ZAMAN aynı ürünleri, aynı sırayla ve aynı yüzdelerle öner. Yüzdeleri rastgele değiştirme.

11. **Yüzde belirleme kuralı** (harfiyen uygula):
    - Katalogda tam muadili varsa -> ✅ %100
    - Koku ailesi + ana notalar örtüşüyorsa -> 🔥 %85
    - Koku ailesi aynı, notalar kısmen örtüşüyorsa -> 🔥 %75
    - Sadece genel karakter benziyorsa -> ⭐ %65

12. **Yanıt uzunluğu:** Kısa tut. Her ürün için en fazla 2 cümle. Toplam yanıt 150 kelimeyi geçmesin.`;

// ── Basit Rate Limiter ─────────────────────────────────────
const rateLimitStore = {};
const MAKS_ISTEK_SAAT = 60;
const PENCERE_MS = 60 * 60 * 1000; // 1 saat

function rateLimitKontrol(ip) {
  const simdi = Date.now();
  if (!rateLimitStore[ip] || simdi > rateLimitStore[ip].resetTime) {
    rateLimitStore[ip] = { count: 0, resetTime: simdi + PENCERE_MS };
  }
  if (rateLimitStore[ip].count >= MAKS_ISTEK_SAAT) return false;
  rateLimitStore[ip].count++;
  return true;
}

// ── Handler ────────────────────────────────────────────────
exports.handler = async (event) => {
  // İzin verilen Shopify domain'i — ENV'den alınır
  const izinliOrigin = process.env.SHOPIFY_DOMAIN || '*';

  const headers = {
    'Access-Control-Allow-Origin': izinliOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Api-Secret',
    'Content-Type': 'application/json',
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Gizli token kontrolü (kaba bot koruması)
  const clientSecret = event.headers['x-api-secret'];
  if (!process.env.API_SECRET || clientSecret !== process.env.API_SECRET) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Yetkisiz erişim.' }) };
  }

  // Rate limiting
  const ip = (event.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  if (!rateLimitKontrol(ip)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Çok fazla istek gönderildi. Lütfen bir süre bekleyip tekrar deneyin.' }),
    };
  }

  // Body parse
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Geçersiz istek.' }) };
  }

  const { mesaj, gecmis = [] } = body;
  if (!mesaj || typeof mesaj !== 'string' || mesaj.trim().length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Mesaj boş olamaz.' }) };
  }

  // ── Konuşma geçmişini temizle ──────────────────────────────
  // Anthropic API kuralı: mesaj dizisi MUTLAKA 'user' rolüyle başlamalı.
  // Aksi halde 400 hatası döner ve asistan hiç cevap veremez.
  let temizGecmis = Array.isArray(gecmis) ? gecmis.slice(-6) : [];
  temizGecmis = temizGecmis.filter(
    (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()
  );
  while (temizGecmis.length && temizGecmis[0].role !== 'user') {
    temizGecmis.shift();
  }
  if (temizGecmis.length && temizGecmis[temizGecmis.length - 1].role === 'user') {
    temizGecmis.pop();
  }

  // ── Claude API çağrısı (timeout korumalı) ──────────────────
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const claudeYanit = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        // temperature 0 -> aynı soruya HER ZAMAN aynı cevap
        temperature: 0,
        // Sistem promptu her istekte aynı; önbelleğe alarak
        // hem hızlandırıyor hem maliyeti düşürüyoruz
        system: [
          {
            type: 'text',
            text: SISTEM_PROMPTU,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [
          ...temizGecmis,
          { role: 'user', content: mesaj.trim() },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!claudeYanit.ok) {
      const hataDetay = await claudeYanit.text().catch(() => '');
      console.error('Claude API hatası:', claudeYanit.status, hataDetay);
      throw new Error('Claude API hatası: ' + claudeYanit.status);
    }

    const data = await claudeYanit.json();
    const yanit = data.content?.[0]?.text;

    if (!yanit) {
      console.error('Boş yanıt:', JSON.stringify(data).slice(0, 500));
      throw new Error('Boş yanıt');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ yanit }),
    };
  } catch (err) {
    console.error('Hata:', err.name, err.message);
    const mesajMetni =
      err.name === 'AbortError'
        ? 'Yanıt biraz uzun sürdü. Lütfen tekrar deneyin.'
        : 'Sunucu hatası. Lütfen tekrar deneyin.';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: mesajMetni }),
    };
  }
};
