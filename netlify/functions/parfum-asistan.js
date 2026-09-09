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

0. **ÖNCELİKLİ KURAL — KENDİ ÜRÜNLERİMİZ.**
   Katalogdaki "Voilà D'or" adlarının kendisi (KHAMSİN, CARAT, VELORA, NAXOR, SAVOR, DİGOR vb.)
   müşteri tarafından yazılabilir. Bu bir muadil ARAMA sorgusu DEĞİLDİR — sorulan ürün zaten bizimdir.
   Böyle bir durumda "Maalesef bu parfümün tam muadili kataloğumuzda bulunmuyor", "tanımıyorum",
   "kataloğumuzda yok" gibi ifadeler KESİNLİKLE YASAKTIR ve alternatif arama yapılmaz.
   Bunun yerine o ürünün kendi tanıtımı yapılır: koku ailesi, karakteri, nota piramidi,
   hangi parfümün muadili olduğu, kime uygun olduğu ve sonunda benzer karakterde 1–2 ürün önerisi.
   Bu durumda "%100" ve "✅" ifadeleri kullanılmaz; yüzde verilmez.

1. **SADECE Voilà D'or ürünlerini öner.** Başka hiçbir marka, parfüm adı, web sitesi veya mağaza söyleme. Kesinlikle yasak.
   Tek istisna: 0. kural gereği kendi ürünümüz tanıtılırken, o ürünün hangi parfümün muadili olduğu belirtilebilir.

2. **Tam muadil sorgusu — %100 KURALI ÇOK KATI:**
   "✅ %100 Uyum" SADECE ve SADECE, müşterinin yazdığı parfümün TAM ADI kataloğun "Orijinal" alanında
   birebir geçiyorsa kullanılır.

   ⛔ **MARKA AYNI DİYE %100 DEME.** Bu en tehlikeli hatadır.
   Örnek: Müşteri "Hermes Tutti Twilly" sordu. Katalogda "TERRE D'HERMES" var.
   Marka aynı (Hermès) ama PARFÜM FARKLI. Bu %100 DEĞİLDİR. Tutti Twilly katalogda YOKTUR.

   Kontrol yöntemi: Markayı sil, sadece parfümün kendi adına bak.
   "Tutti Twilly" ile "Terre d'Hermes" aynı mı? HAYIR → %100 verme, benzer ürün öner.
   "Sauvage" ile "Sauvage" aynı mı? EVET → %100 ver.

   Emin değilsen ASLA %100 deme; %85 veya altını kullan ve "tam muadili yok" de.

3. **Benzer ürün önerisi:** Tam muadil yoksa, koku notalarını analiz ederek en yakın 2–3 ürünü öner. Gerçekçi benzerlik yüzdesi ver (%60–%95 arası).

4. **Nota / tarif bazlı sorgu:** "Portakal çiçeği seviyorum", "narenciyeli ferah kokular öner",
   "oud içeren bir şey istiyorum" gibi mesajlarda ortada aranan bir parfüm ADI yoktur.
   Bu tür mesajlarda "Maalesef bu parfümün tam muadili kataloğumuzda bulunmuyor" veya benzeri
   bir cümle KURMA — saçma durur. Yüzde de verme; yüzde sadece belirli bir parfümle
   karşılaştırma yapılırken anlamlıdır. Müşterinin tarifini kısaca tekrar edip kataloğumuzdan
   o tarife uyan 2–3 ürünü öner.

2a. **Versiyon farkı.** "Libre" ile "Libre Intense", "Sauvage" ile "Sauvage Elixir",
   "1 Million" ile "1 Million Lucky" AYNI parfüm değildir. Aynı ürüne iki farklı versiyon
   için aynı oranı verme; %100 sadece sorulan versiyonun tam karşılığı katalogda varsa kullanılır.
   Hangi versiyonun muadili olduğunu cevapta net biçimde belirt.

4a. **Her zaman mesajı önce anla.** Cevabın açılış cümlesi, müşterinin ne sorduğuna uymalı:
   parfüm adı sorusu, koku tarifi, karşılaştırma, sohbet veya genel bir soru olabilir.
   Ezbere kalıp cümleyle başlama.

5. **Her öneri için:** Kısa (1–2 cümle), samimi ve alışverişi teşvik eden bir açıklama yaz.

6. **Yanıt formatı:**
   - Ürün adını **kalın** yaz
   - Uyum/benzerlik oranını emoji ile göster (✅ %100 için, 🔥 %90+ için, ⭐ diğerleri için)
   - Kısa açıklama
   - Her yanıtın sonuna nazikçe sipariş teşvik cümlesi ekle

7. **Dil:** Türkçe yaz. Sıcak, samimi ve profesyonel ol.

8. **KESİNLİKLE YASAK:** Yanıtlarında hiçbir zaman # (diyez) işareti kullanma. Başlık yapma. Sadece düz metin ve **kalın** yazı kullan.

9a. **Yazım hataları.** Müşteriler parfüm adlarını sıklıkla hatalı ya da Türkçe okunuşuyla yazar
   ("Oud for gratnes", "naksos", "narkotik", "tobbaco vanille"). Sistem bunları kod tarafında zaten
   düzeltip sana bildiriyor; sen de doğru parfüm adını doğal biçimde kullan.
   Müşterinin yazım hatasını düzelttiğini ayrıca söyleme, sadece doğru adı kullan.
   Sana bir [SİSTEM KARARI] gelmediyse kendi kafandan zorlama benzetme yapma.

9. **ASLA "tanımıyorum" DEME.** Katalogda olmayan bir parfüm sorulursa, o parfümün bilinen koku notalarını kendi bilgine dayanarak analiz et ve kataloğumuzdan en yakın 2-3 ürünü öner. "Bu ürünü tanımıyorum", "bilmiyorum" gibi ifadeler kullanma - her zaman yardımcı ol.

10. **TUTARLILIK ZORUNLU - EN ÖNEMLİ KURAL.**
    Aynı parfüm ne zaman sorulursa sorulsun, HER ZAMAN birebir aynı ürünleri, aynı sırayla ve aynı yüzdelerle öner.
    Şu adımları KAFANDAN, SESSİZCE yap - bunları ASLA yazma:
    (1) parfümün koku notalarını belirle, (2) katalogdaki tüm ürünlerle karşılaştır,
    (3) aşağıdaki tabloya göre puanla, (4) en yüksek 2 ürünü seç; puan eşitse katalog sırası küçük olan önce gelir.

    **ÇIKTIDA ASLA ŞUNLARI YAZMA:** "analiz ediyorum", "inceliyorum", "bu parfüm ... notalarına sahip",
    "koku notaları şöyle" gibi düşünme/analiz cümleleri. Kullanıcı senin analizini değil SONUCU görmek istiyor.
    Doğrudan öneri listesiyle başla.

11. **Yüzde belirleme tablosu** (sadece bu 4 değerden birini kullan, ara değer üretme):
    - Katalogda tam muadili var -> ✅ %100
    - Aynı koku ailesi + dip notaların çoğu örtüşüyor -> 🔥 %85
    - Aynı koku ailesi + notalar kısmen örtüşüyor -> 🔥 %75
    - Sadece genel karakter/hava benziyor -> ⭐ %65
    %90, %80, %70 gibi ara değerler YASAK.

12. **Yanıt uzunluğu:** Kısa tut. Her ürün için en fazla 2 cümle. Toplam yanıt 150 kelimeyi geçmesin.`;

// ── TAM MUADİL TESPİTİ (kod tarafı, deterministik) ─────────
// Modelin "katalogda var mı" kararına güvenilmiyor; marka benzerliğine
// bakıp uydurma %100 eşleşme veriyordu. Bu kararı artık kod veriyor.

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/İ/g, 'i').replace(/i̇/g, 'i')
    .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[îï]/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Marka/dolgu kelimeleri: eşleşmede sayılmaz.
// 'intense' BİLEREK yok: "Oud Wood" ile "Oud Wood Intense" farklı parfümlerdir.
const DOLGU = new Set(['by','for','men','women','unisex','edp','edt','eau','de','du','la','le','the','parfum','parfums','toilette']);

// Orijinal marka adının cevapta geçmesini istemiyorsanız false yapın.
const ORIJINAL_ADI_GOSTER = true;

// Soru kalıbı / sohbet kelimeleri: eşleşmede anlamlı sayılmaz
const SORU_DOLGUSU = new Set([
  'voila', 'dor', 'vd', 'paris',
  'ne', 'nedir', 'nasil', 'bir', 'bu', 'su', 'o', 'da', 'de', 'ki',
  'koku', 'kokusu', 'kokan', 'kokuyor', 'parfum', 'parfumu', 'parfumun',
  'hakkinda', 'anlat', 'anlatir', 'misin', 'bilgi', 'ver', 'verir', 'bana',
  'muadil', 'muadili', 'muadilin', 'karsiligi', 'esdegeri', 'benzer', 'benzeri',
  'var', 'mi', 'mu', 'hangi', 'kimin', 'icin', 'kime', 'uygun', 'olan', 'olsun',
  'urun', 'urunu', 'stokta', 'fiyat', 'fiyati', 'notalari', 'nota',
  'gibi', 'tarzi', 'tarzinda', 'istiyorum', 'ariyorum', 'arayan', 'lazim',
  'seviyorum', 'tavsiye', 'oneri', 'onerir', 'sey', 'birsey', 'acaba', 'lutfen',
  'yok', 'yokmu', 'varmi', 'varmu', 'satiyor', 'satiyormusunuz', 'bulunuyor',
]);

// "varmı", "yokmu" gibi soru eki bitişik yazılmış kelimeleri de dolgu say.
// Aksi halde "libre intense varmı" sorgusunda "varmi" fazladan kelime sayılıp
// tam muadil %85'e düşüyordu.
function dolguKelimeMi(w) {
  if (!w) return true;
  if (DOLGU.has(w) || SORU_DOLGUSU.has(w) || MARKALAR.has(w)) return true;
  if (/^[0-9]+$/.test(w)) return true;
  if (w.length <= 2) return true;
  const m = w.match(/^(.+?)(mi|mu|mis|mus)$/);
  if (m && m[1].length >= 2 && (SORU_DOLGUSU.has(m[1]) || DOLGU.has(m[1]))) return true;
  return false;
}

// Katalogdaki orijinal parfümlerin markaları ("... BY TOM FORD" -> tom, ford).
// Sorguda marka adı geçmesi normaldir, "fazladan kelime" sayılmaz.
const MARKALAR = new Set();
for (const u of URUNLER) {
  const markaKismi = String(u.original).split(/\s+BY\s+/i)[1];
  if (markaKismi) {
    for (const w of normalize(markaKismi).split(' ')) if (w) MARKALAR.add(w);
  }
}
for (const w of ['tom','ford','ysl','yves','saint','laurent','jpg','jean','paul','gaultier','giorgio','armani','maison','francis','kurkdjian','mfk','victorias','secret','vs','carolina','herrera','ch','roberto','cavalli','louis','vuitton','lv','marc','antoine','barrois','tiziana','terenzi','essential','ex','nihilo','bdk','orto','parisi','de','marly','pdm','clive','christian','paco','rabanne','bvlgari','burberry','lancome','versace','prada','chanel','dior','creed','xerjoff','initio','montale','mancera','nishane','amouage','memo','crivelli','hermes']) MARKALAR.add(w);

// Sorguda ürün adına ait olmayan, marka/dolgu da olmayan kelime var mı?
// ("Eros Flame" -> 'flame' fazladan => bu, Eros'un bir varyantıdır, birebir aynısı değil)
function fazladanKelimeVar(sorguKelimeleri, kullanilanlar) {
  for (const w of sorguKelimeleri) {
    if (kullanilanlar.has(w)) continue;
    if (dolguKelimeMi(w)) continue;
    return true;
  }
  return false;
}

// "BLACK ORCHID BY TOM FORD" -> ['black','orchid']
// Tek harfli, sadece rakamdan oluşan ve dolgu kelimeleri zorunlu sayılmaz
// ("Ombre Leather 2018" -> ombre + leather).
function urunAdiKelimeleri(original) {
  const adKismi = String(original).split(/\s+BY\s+/i)[0];
  return normalize(adKismi)
    .split(' ')
    .filter((w) => w && w.length > 1 && !/^[0-9]+$/.test(w) && !DOLGU.has(w));
}

// Ürün adı eşleşme için yeterince ayırt edici mi?
function adYeterliMi(kelimeler) {
  if (!kelimeler.length) return false;
  return kelimeler.some((k) => k.length >= 4) || kelimeler.join('').length >= 5;
}

// ── YAZIM TOLERANSI ────────────────────────────────────────
// Müşteri "Oud for gratnes" yazdığında "Oud For Greatness"ı bulabilmeli;
// ama alakasız kelimeler alakasız parfümlerle EŞLEŞMEMELİ.
// Bu yüzden tolerans kelime uzunluğuna göre dar tutulur.

// Türk müşteriler yabancı adları duydukları gibi yazıyor:
// "naksos" = Naxos, "narkotik" = Narcotique, "tobbaco" = Tobacco.
// Bu ses karşılıklarını her iki tarafta da aynı şekilde sadeleştiriyoruz.
function fonetik(w) {
  return String(w)
    .replace(/ph/g, 'f')
    .replace(/x/g, 'ks')
    .replace(/q/g, 'k')
    .replace(/w/g, 'v')
    .replace(/c/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/ou/g, 'u')
    .replace(/y/g, 'i')
    .replace(/(.)\1+/g, '$1')
    .replace(/e$/, '');
}

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let onceki = new Array(n + 1);
  let simdiki = new Array(n + 1);
  for (let j = 0; j <= n; j++) onceki[j] = j;
  for (let i = 1; i <= m; i++) {
    simdiki[0] = i;
    for (let j = 1; j <= n; j++) {
      const bedel = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      simdiki[j] = Math.min(simdiki[j - 1] + 1, onceki[j] + 1, onceki[j - 1] + bedel);
    }
    const t = onceki; onceki = simdiki; simdiki = t;
  }
  return onceki[n];
}

// Kısa kelimelerde hata payı yok; uzadıkça biraz açılır.
function tolerans(kelime) {
  const L = kelime.length;
  if (L <= 4) return 0;   // "eros", "oud", "wood" -> birebir olmalı
  if (L <= 7) return 1;   // "sauvage" -> "savage"
  if (L <= 11) return 2;  // "greatness" -> "gratnes"
  return 3;
}

// Katalog kelimesi, sorgu kelimelerinden hangisine ne kadar yakın?
// Eşleşme yoksa null.
function kelimeEslesmesi(katalogKelime, sorguKelimeleri) {
  const kf = fonetik(katalogKelime);
  const tol = tolerans(kf);
  let enIyi = null;
  for (const s of sorguKelimeleri) {
    if (s === katalogKelime) return { mesafe: 0, kelime: s };
    const sf = fonetik(s);
    if (sf === kf) { if (!enIyi || enIyi.mesafe > 0) enIyi = { mesafe: 0, kelime: s }; continue; }
    if (tol === 0) continue;
    if (Math.abs(sf.length - kf.length) > tol) continue;
    const d = levenshtein(kf, sf);
    if (d <= tol && (enIyi === null || d < enIyi.mesafe)) enIyi = { mesafe: d, kelime: s };
  }
  return enIyi;
}

// Ürünün TÜM kelimeleri sorguda (yazım toleransıyla) geçiyor mu?
// Güvenlik: çok kelimeli adlarda en az bir kelime birebir tutmalı.
function adEslesmesi(adKelimeleri, sorguKelimeleri) {
  let toplam = 0;
  let birebirVar = false;
  const kullanilan = new Set();
  for (const k of adKelimeleri) {
    const e = kelimeEslesmesi(k, sorguKelimeleri);
    if (!e) return null;
    if (e.mesafe === 0) birebirVar = true;
    toplam += e.mesafe;
    kullanilan.add(e.kelime);
  }
  if (adKelimeleri.length > 1 && !birebirVar) return null;
  if (toplam > 3) return null;
  return { mesafe: toplam, kullanilan };
}

// Müşterinin sorduğu parfüm katalogda var mı?
// Sıralama: önce en çok kelimesi tutan (en spesifik) ürün, sonra en az yazım hatası.
// Dönüş: { urun, mesafe, varyant } | null
//   mesafe > 0  -> yazım hatası toleransıyla bulundu
//   varyant     -> sorguda ada ait olmayan kelime var (ör. "Eros Flame")
function tamMuadilBul(mesaj) {
  const sorguKelimeleri = normalize(mesaj).split(' ').filter(Boolean);
  if (!sorguKelimeleri.length) return null;

  let enIyi = null;
  for (const u of URUNLER) {
    const kelimeler = urunAdiKelimeleri(u.original);
    if (!adYeterliMi(kelimeler)) continue;
    const e = adEslesmesi(kelimeler, sorguKelimeleri);
    if (!e) continue;
    const puan = kelimeler.join('').length;
    const daha =
      !enIyi ||
      puan > enIyi.puan ||
      (puan === enIyi.puan && e.mesafe < enIyi.mesafe);
    if (daha) enIyi = { urun: u, mesafe: e.mesafe, puan, kullanilan: e.kullanilan };
  }
  if (!enIyi) return null;
  return {
    urun: enIyi.urun,
    mesafe: enIyi.mesafe,
    varyant: fazladanKelimeVar(sorguKelimeleri, enIyi.kullanilan),
  };
}

// ── ANA VERSİYON SORGUSU ───────────────────────────────────
// "Libre var mı?" sorulduğunda kataloğumuzda "Libre Intense" muadili (LİBERA)
// var ama ikisi AYNI PARFÜM DEĞİL. Bu durumda %100 denmemeli.
// Sadece eksik kalan kelime bir varyant eki ise (intense, elixir, lucky...)
// bu tespit çalışır; "black" -> "Black Orchid" gibi durumlarda çalışmaz.
const VARYANT_KELIMELERI = new Set([
  'intense','intensely','intensive','extreme','extrait','elixir','absolu','absolute',
  'extract','lucky','noir','blanc','aura','flame','spirit','sport','ocean','oceanic',
  'profondo','fraiche','legere','limited','edition','exclusif','exclusive','privee','prive',
]);

function anaVersiyonBul(mesaj) {
  const kelimeler = normalize(mesaj).split(' ').filter(Boolean);
  const anlamli = kelimeler.filter((w) => !dolguKelimeMi(w));
  if (!anlamli.length) return null;
  if (!anlamli.some((w) => w.length >= 5)) return null;

  const adaylar = [];
  for (const u of URUNLER) {
    const ad = urunAdiKelimeleri(u.original);
    if (ad.length < 2 || anlamli.length >= ad.length) continue;
    let tut = true;
    for (let i = 0; i < anlamli.length; i++) {
      if (!kelimeEslesmesi(ad[i], [anlamli[i]])) { tut = false; break; }
    }
    if (!tut) continue;
    const eksik = ad.slice(anlamli.length);
    if (!eksik.every((w) => VARYANT_KELIMELERI.has(w))) continue;
    adaylar.push(u);
  }
  // Birden fazla aday varsa hangisi olduğu belirsizdir; iddiada bulunma.
  return adaylar.length === 1 ? adaylar[0] : null;
}

// ── SORGU TİPİ TESPİTİ ─────────────────────────────────────
// "narenciyeli ferah kokular öner" bir parfüm ADI sorgusu değildir;
// bu tür mesajlara "Maalesef bu parfümün tam muadili bulunmuyor" diye
// başlamak saçma oluyordu. Tarif/nota sorgularını ayırıyoruz.

const NOTA_KOKLERI = [
  'narenci','portakal','mandalina','bergamot','limon','greyfurt','misket',
  'vanily','oud','misk','gul','yasemin','cicek','deri','tutun','odun',
  'baharat','tarcin','kakule','safran','amber','kehribar','sandal','pacul',
  'vetiver','tonka','kahve','kakao','cikolata','karamel','pralin','bal',
  'seker','tatli','meyve','seftali','armut','elma','ananas','cilek','ahududu',
  'frenk','hindistan','lavanta','nane','ferah','taze','serin','temiz','sabun',
  'pudra','aldehit','deniz','ozon','yosun','sedir','fistik','badem','incir',
  'tuberoz','iris','menekse','lotus','orkide','sakayik','neroli','oryantal',
  'fujer','akuatik','duman','tutsu','olibanum','benzoin','labdanum','opoponaks',
  'agir','yogun','hafif','kalici','sillage','feminen','maskulen',
];

const TALEP_KOKLERI = [
  'oner','tavsiye','ariyor','istiyor','sever','sevdig','begen','bakiyor',
  'lazim','kokan','kokulu','kokular','kadin','erkek','unisex','yaz','kis',
  'bahar','sonbahar','gunduz','gece','aksam','ofis','gunluk','hediye','spor',
  'romantik','davet','dugun','genc','olgun','populer','satan',
];

function kokEslesme(kelimeler, kokler) {
  let n = 0;
  for (const k of kelimeler) {
    for (const kok of kokler) {
      if (k.length >= 3 && k.startsWith(kok)) { n++; break; }
    }
  }
  return n;
}

// Mesaj, belirli bir parfüm adı değil; koku tarifi / nota isteği mi?
// Marka adı geçiyorsa tarif sorgusu SAYILMAZ (ör. "vanilyalı bir Tom Ford").
function notaSorgusuMu(mesaj) {
  const kelimeler = normalize(mesaj).split(' ').filter(Boolean);
  if (!kelimeler.length) return false;
  if (kelimeler.some((w) => MARKALAR.has(w))) return false;
  const nota = kokEslesme(kelimeler, NOTA_KOKLERI);
  const talep = kokEslesme(kelimeler, TALEP_KOKLERI);
  return nota >= 1 || talep >= 2;
}

// ── KENDİ ÜRÜNÜMÜZ TESPİTİ ─────────────────────────────────
// Müşteri "KHAMSİN" gibi kendi ürün adımızı yazdığında sistem bunu
// aranan bir orijinal parfüm sanıp "muadili yok" diyordu.
// Burada tolerans BİLEREK çok dar: kendi adlarımız kısa ve uydurma
// olduğu için gerçek parfümlere yakın düşebiliyor
// (Delina/CELİNA, Gabrielle/GABRİEL, Hypnose/HYPNO) — bunlar eşleşmemeli.
function kendiUrunBul(mesaj) {
  const kelimeler = normalize(mesaj).split(' ').filter(Boolean);
  // Rakamlar BİLEREK elenmiyor: "Santal 33" başka bir parfümdür,
  // kendi SANTAL ürünümüzle karıştırılmamalı.
  const soruDolgusu = (w) => {
    if (SORU_DOLGUSU.has(w) || DOLGU.has(w)) return true;
    const m = w.match(/^(.+?)(mi|mu|mis|mus)$/);
    return !!(m && m[1].length >= 2 && (SORU_DOLGUSU.has(m[1]) || DOLGU.has(m[1])));
  };
  const anlamli = kelimeler.filter((w) => !soruDolgusu(w));
  if (!anlamli.length) return null;

  for (const u of URUNLER) {
    const ad = normalize(u.voila).split(' ').filter((w) => w && w.length > 1 && !DOLGU.has(w));
    if (!adYeterliMi(ad)) continue;
    // Sorgu, ürün adının DIŞINDA anlamlı kelime içermemeli
    // ("Santal 33" burada tetiklenmez, normal muadil aramasına gider).
    if (ad.length !== anlamli.length) continue;

    let tut = true;
    for (let i = 0; i < ad.length; i++) {
      const a = ad[i];
      const b = anlamli[i];
      if (a === b) continue;
      // Sadece 7+ harfli adlarda tek harflik yazım hatası affedilir
      if (a.length >= 7 && Math.abs(a.length - b.length) <= 1 && levenshtein(a, b) <= 1) continue;
      tut = false;
      break;
    }
    if (tut) return u;
  }
  return null;
}

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

  // ── Önce: sorulan şey KENDİ ürünümüz mü? ───────────────────
  const kendiUrun = kendiUrunBul(mesaj);

  // ── Kod tarafı tam-muadil kararı (model bunu DEĞİŞTİREMEZ) ──
  const eslesme = kendiUrun ? null : tamMuadilBul(mesaj);
  const bulunan = eslesme ? eslesme.urun : null;
  const yazimHatasi = !!(eslesme && eslesme.mesafe > 0);
  const varyant = !!(eslesme && eslesme.varyant);
  const anaVersiyon = !kendiUrun && !eslesme ? anaVersiyonBul(mesaj) : null;
  const notaSorgusu = !kendiUrun && !eslesme && !anaVersiyon && notaSorgusuMu(mesaj);
  const kilavuz = kendiUrun
    ? `[SİSTEM KARARI — KOŞULSUZ UY]
Müşteri KENDİ ÜRÜNÜMÜZ olan "${kendiUrun.voila}" hakkında soruyor. Bu bir muadil ARAMA sorgusu DEĞİLDİR.
"Maalesef", "tam muadili yok", "kataloğumuzda bulunmuyor", "tanımıyorum", "%100" ve "✅" ifadelerini KULLANMA.
Alternatif ürün ARAMA, yüzde VERME. Aşağıdaki ürünün tanıtımını yap:

Ürün: ${kendiUrun.voila}
Orijinali: ${kendiUrun.original}
Katalog açıklaması: ${kendiUrun.aciklama}

Yanıt sırası (kısa tut, toplam 150 kelimeyi geçme):
1) **${kendiUrun.voila}** ve koku ailesi
2) İki cümlelik karakter tarifi
3) Üst / Kalp / Dip notaları (açıklamadaki notaları kullan)
${ORIJINAL_ADI_GOSTER ? `4) "${kendiUrun.original}" parfümünün muadili olduğunu belirt` : '4) Bu adımı atla'}
5) Kime ve hangi kullanıma uygun olduğu (1 cümle)
6) Katalogdan benzer karakterde 1–2 ürün önerisi ve nazik bir sipariş teşviki
[/SİSTEM KARARI]

Müşteri mesajı: `
    : bulunan
    ? varyant
    ? `[SİSTEM KARARI — KOŞULSUZ UY]
Müşterinin sorduğu parfüm, "${bulunan.original}" parfümünün bir varyantı (flanker) görünüyor —
sorguda ana ada ait olmayan kelimeler var. Bu, birebir aynı parfüm DEĞİLDİR.
Kataloğumuzda ANA versiyonun muadili var: "${bulunan.voila}".
"✅" işaretini ve "%100" ifadesini KESİNLİKLE KULLANMA.
Yanıtına "🔥 %85 — **${bulunan.voila}**" ile başla; bunun aradığı parfümün ana versiyonunun
muadili olduğunu ve en yakın alternatif olduğunu kısaca belirt, sonra ürünü tanıt.
[/SİSTEM KARARI]

Müşteri mesajı: `
    : `[SİSTEM KARARI — KOŞULSUZ UY]
Bu parfümün kataloğumuzda TAM MUADİLİ VAR: "${bulunan.voila}" (orijinali: "${bulunan.original}").
${yazimHatasi ? `Müşteri parfüm adını hatalı yazmış; doğru parfüm "${bulunan.original}". Doğru yazımı doğal biçimde kullan, yazım hatasını düzelttiğini ayrıca belirtme.` : ''}
Yanıtına "✅ %100 Uyum — **${bulunan.voila}**" ile başla ve bu ürünü tanıt.
[/SİSTEM KARARI]

Müşteri mesajı: `
    : anaVersiyon
    ? `[SİSTEM KARARI — KOŞULSUZ UY]
Müşterinin sorduğu parfümün KENDİSİNİN muadili kataloğumuzda YOK.
Kataloğumuzdaki "${anaVersiyon.voila}", o parfümün "${anaVersiyon.original}" versiyonunun muadilidir.
Bu iki parfüm AYNI DEĞİLDİR — "✅" işaretini ve "%100" ifadesini KESİNLİKLE KULLANMA.
"${anaVersiyon.voila}" ürününün hangi versiyonun muadili olduğunu açıkça söyle,
sorulan versiyona da en yakın seçenek olduğunu belirt.
Yanıtına "🔥 %85 — **${anaVersiyon.voila}**" ile başla, sonra ürünü kısaca tanıt.
[/SİSTEM KARARI]

Müşteri mesajı: `
    : notaSorgusu
    ? `[SİSTEM KARARI — KOŞULSUZ UY]
Bu mesaj belirli bir parfüm ADI sorgusu DEĞİLDİR; müşteri koku tarifi / nota isteği yazmış.
Bu yüzden "Maalesef bu parfümün tam muadili kataloğumuzda bulunmuyor", "muadili yok",
"tanımıyorum" gibi cümleler KESİNLİKLE YASAKTIR — ortada aranan bir parfüm adı yok.
"✅", "%100" ve yüzde ifadelerinin hiçbirini KULLANMA; burada yüzde anlamsızdır.

Müşterinin tarifini tekrar ederek kısa bir cümleyle başla
(ör. "Narenciyeli ve ferah kokular için koleksiyonumuzdan öneriler:"),
sonra bu tarife en uyan 2–3 ürünü listele. Her ürün için ürün adını kalın yaz ve
tarifin hangi notalarla karşılandığını 1–2 cümlede anlat. Sonunda nazik bir sipariş teşviki ekle.
[/SİSTEM KARARI]

Müşteri mesajı: `
    : `[SİSTEM KARARI — KOŞULSUZ UY]
Müşterinin mesajında kataloğumuzdaki bir orijinal parfüm adı BULUNAMADI.
"✅" işaretini ve "%100" ifadesini KESİNLİKLE KULLANMA. "tam muadili var" DEME.

Önce mesajın ne olduğunu anla, sonra ona göre cevapla:
- Belirli bir PARFÜM ADI sorulmuşsa: "Maalesef bu parfümün tam muadili kataloğumuzda bulunmuyor."
  cümlesiyle başla, ardından en yakın 2 alternatifi 🔥 %85 / 🔥 %75 / ⭐ %65 aralığında öner.
  Marka aynı diye eşleştirme yapma; sadece koku notalarına bak.
- KOKU TARİFİ / NOTA / ÖZELLİK isteniyorsa: "muadili bulunmuyor" DEME, yüzde de verme.
  Tarifi kısaca tekrar edip ona uyan 2–3 ürünü öner.
- SOHBET, teşekkür, kargo/fiyat gibi genel bir soruysa: doğal ve kısa cevapla, ürün listeleme.
[/SİSTEM KARARI]

Müşteri mesajı: `;

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
        // Haiku 4.5 bilinçli tercih: temperature: 0 destekliyor (tutarlılık garantisi)
        // ve Sonnet 5'ten çok daha hızlı. Sonnet 5 testinde 13-18 sn sürdü ve
        // temperature desteklemediği için aynı soruya farklı cevaplar verdi.
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
          { role: 'user', content: kilavuz + mesaj.trim() },
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
    // Yeni modeller content dizisinde önce 'thinking' bloğu döndürebiliyor.
    // Bu yüzden content[0] değil, type==='text' olan ilk bloğu alıyoruz.
    const yanit = Array.isArray(data.content)
      ? data.content.filter((b) => b && b.type === 'text' && b.text).map((b) => b.text).join('\n').trim()
      : '';

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
