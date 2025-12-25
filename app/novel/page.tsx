'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Coffee, Sparkles, MousePointer2, PenTool } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Link from 'next/link';

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Playfair+Display:wght@400;700&display=swap');
  .font-novel-title { font-family: 'Playfair Display', serif; }
  .font-novel-body { font-family: 'Lora', serif; }
`;

// --- DATA CERITA (UPDATED: Added "HARI ITU") ---
const novels = [
  {
    id: 1,
    title: "Aku dan Bandung",
    genre: "Travelogue / Memoir",
    readTime: "8 min read",
    desc: "Sebuah pelarian impulsif ke Kota Kembang untuk merayakan kesepian, bertemu manusia asing, dan berdamai dengan isi kepala.",
    date: "Dec 2025",
    content: [
      "Prolog: Algoritma dan Pelarian",
      "Namaku Fatih. Di tengah liburan semester yang seharusnya tenang, kepalaku justru berisik. Entah apa yang terjadi pada semesta digital hari ini, beranda TikTok dan Instagram-ku mendadak bersekongkol. Mereka membanjiriku dengan visual kota Bandung yang sendu namun memikat.",
      "Apakah ini kebetulan? Atau algoritma Tuhan sedang bekerja melalui layar kacaku? \"Apa aku lari ke Bandung saja, ya? Sendiri?\" gumamku pada dinding kamar.",
      "Ya, aku punya hobi yang mungkin bagi sebagian orang terdengar menyedihkan: merayakan kesepian. Menonton bioskop, menyusuri pameran seni, hingga membiarkan Jakarta menelanku bulat-bulat sambil ditemani playlist favorit. Orang tuaku mungkin cemas, menganggap anaknya aneh. Tapi bagiku, solo traveling adalah cara paling purba untuk berdamai dengan diri sendiri.",
      "Malam itu, keputusan telah bulat. Tiket kereta dan kamar hotel sudah di tangan. Tak ada opsi refund, tak ada jalan kembali. Meski wajah Ayah dan Ibu menyiratkan kekhawatiran—takut putra mereka tak bisa survive di tanah orang—restu itu akhirnya turun juga.",
      "Bagian I: Kereta dan Manusia-Manusia Asing",
      "Perjalanan ini bukan sekadar memindahkan raga dari Depok ke Bandung, melainkan sebuah ziarah kecil. Dimulai dari KRL rute Depok menuju Cikarang pukul sepuluh pagi, aku mengejar waktu. Stasiun Cikarang menyambutku dengan terik matahari tepat saat azan Zuhur berkumandang.",
      "Di tengah kebingungan mencari musala, seorang satpam menyapaku. \"Mau ke musala, Mas? Ayo bareng, saya juga mau sholat.\" Sebuah kebetulan manis. Di kota yang asing, kebaikan seringkali muncul dari wajah-wajah yang tak terduga.",
      "Pukul 13.30, Walahar Express tiba. Suara announcer stasiun menggema, memanggil para pejalan untuk segera naik. Aku melangkah masuk, menyusuri gerbong demi gerbong, berharap pada satu kursi kosong agar tak perlu berdiri mematung selama dua jam.",
      "Doaku terjawab di ujung gerbong depan. Ada satu kursi kosong di sebelah seorang bapak paruh baya. \"Permisi, Pak. Kosong?\" tanyaku. \"Iya, kosong,\" jawabnya dengan senyum hangat. Ah, semesta sedang berbaik hati hari ini.",
      "Dua jam berlalu, Purwakarta menyapaku. Transit satu jam kuhabiskan dengan mengunyah jajanan stasiun, mengamati hiruk-pikuk manusia yang datang dan pergi. Pukul 15.30, kereta tujuan Bandung telah menanti di peron tiga.",
      "Kali ini, teman dudukku bukan bapak-bapak, melainkan seorang pemuda bernama Rehan. Asli Medan, bekerja di Bandung, dan punya segudang cerita. Kami bertukar kisah seperti dua sahabat lama yang baru bertemu kembali. Tentang pekerjaan, tentang masa kuliah, tentang gunung-gunung yang pernah didaki.",
      "Percakapan kami begitu cair hingga tak terasa Stasiun Bandung sudah di depan mata. Pukul 19.30, udara dingin Kota Kembang menyambutku. Aku dan Kak Rehan berpisah di pintu keluar, bertukar akun Instagram sebagai tanda bahwa pertemuan singkat ini pernah ada.",
      "Bagian II: NuArt dan Dialog Tanpa Suara",
      "Pagi di Bandung terasa berbeda. Setelah membersihkan diri di Tokyo Cubo—hotel kapsul yang estetik di Jalan Paskal—aku bersiap menyapa seni. Hotel ini unik, dipenuhi turis mancanegara. Sempat aku membantu seorang turis Tiongkok yang kebingungan dengan dispenser air panas. Bahasa Inggris-ku yang pas-pasan ternyata cukup untuk mencairkan suasana.",
      "Tujuanku hari ini: NuArt Sculpture Park. Galeri milik Nyoman Nuarta ini bukan sekadar tempat pameran, melainkan labirin sunyi yang menenangkan. Tiket lima puluh ribu rupiah terasa sepadan saat langkah kakiku disambut patung-patung megah setinggi empat meter.",
      "Replika Garuda Wisnu Kencana berdiri gagah, seolah menceritakan mimpi besar sang seniman. Aku menapaki tangga spiral yang meliuk indah—sangat instagramable, kalau kata anak zaman sekarang. Setiap lantai menyuguhkan kejutan. Dari proses pembangunan GWK hingga patung marinir yang berdiri kokoh.",
      "Namun, area keempatlah yang paling menyedot perhatian. Patung Justitia setinggi lima meter tampak menghukum seseorang, sebuah simbol keadilan yang seringkali bisu. Di lantai atas, karyanya semakin abstrak. Ada hiu yang seolah berenang di lantai, ada pose-pose manusia yang membeku dalam tembaga.",
      "Hingga akhirnya kakiku melangkah ke area outdoor. Suasana Bali menyeruak. Angin sepoi-sepoi membelai wajah, pohon rindang menaungi patung paus yang seakan menyembul dari permukaan air.",
      "Di tengah keasyikan memotret, mataku menangkap sosok perempuan. Seumuran. Sedang berswafoto sendirian. \"Permisi, Kak. Mau dibantu fotoin?\" tawarku. \"Eh, boleh banget, Kak!\"",
      "Namanya Dera. Perempuan Jakarta yang juga sedang 'melarikan diri' ke Bandung. Kami mengobrol panjang lebar hingga azan Zuhur kembali mengingatkan waktu. Sayangnya, pertemuan kami harus berakhir di sana.",
      "Bodohnya, aku lupa meminta akun Instagram-nya.",
      "Bagian III: Alun-Alun dan Pulang",
      "Siang semakin terik saat aku tiba di Alun-Alun Bandung. Tulisan \"Bumi Pasundan\" berdiri ikonik, menjadi latar wajib bagi para pelancong. Ramai. Riuh. Fotografer jalanan, pedagang asongan, dan tawa wisatawan berbaur menjadi satu. Aku menyempatkan diri salat di Masjid Raya, lalu menikmati sepiring siomay sebagai bekal energi.",
      "Jujur saja, Alun-Alun terlalu bising untuk jiwaku yang mencari jeda. Pukul 15.00, aku memutuskan menuju stasiun. Kereta pulang sudah menanti.",
      "Perjalanan pulang lebih brutal. Orang-orang berebut masuk gerbong seperti takut ditinggal takdir. Aku beruntung mendapat kursi lebih awal. Di depanku, duduk sekumpulan anak muda dari Purwakarta. Mereka menyebut diri mereka \"Satu Paket\". Jika satu pergi, semua ikut.",
      "Persahabatan mereka terasa hangat, kontras dengan aku yang duduk sendirian. Kali ini, aku tak mau mengulang kesalahan dengan Dera. Aku meminta Instagram mereka sebelum kami berpisah di Purwakarta. \"Kalo ke Bandung lagi, ajak-ajak gua lah!\" candaku. \"Okeeyyy!\" jawab mereka serempak.",
      "Epilog: Kembali pada Realitas",
      "Di Stasiun Purwakarta, aku berlari. Waktu transit hanya tiga puluh menit, sementara letak musala dan peron kereta selanjutnya berada di ujung yang berlawanan. Napasku memburu, tapi hatiku penuh.",
      "Perjalanan Purwakarta menuju Cikarang kuhabiskan dengan mengedit foto. Memilah kenangan mana yang layak dipamerkan ke dunia maya, dan mana yang cukup disimpan dalam memori kepala.",
      "Saat KRL kembali membawaku ke Depok, aku sadar liburan singkat ini telah usai. Bandung telah memberikan jeda yang kubutuhkan. Sebuah validasi bahwa sendirian bukan berarti kesepian.",
      "Tunggu aku di perjalanan nekat selanjutnya. Mungkin Jogja... Siapa tahu."
    ]
  },
  {
    id: 2,
    title: "Hari Itu",
    genre: "Romance / Slice of Life",
    readTime: "12 min read",
    desc: "Pertemuan tak terduga dengan sesama volunteer di Kota Tua yang berujung pada perjalanan pulang penuh makna—dan sebuah penerimaan yang tenang.",
    date: "Dec 2025",
    content: [
      "PROLOG",
      "Pagi itu, matahari tidak sekadar terbit, ia tumpah ruah. Cahayanya yang keemasan menyusup paksa melewati celah-celah atap peron, menghapus sisa-sisa embun yang masih memeluk tiang-tiang besi stasiun.",
      "Namaku Fatih. Jika kau melihat sekeliling, stasiun ini dipenuhi warna-warni jersey orang-orang yang hendak berburu endorfin di Senayan atau pakaian rapi keluarga yang mengejar ibadah Minggu. Di tengah palet warna yang cerah itu, aku adalah anomali.",
      "Berdiri dengan pakaian serba hitam, aku merasa seperti satu titik tinta di atas kanvas yang terlalu ramai. Sejatinya, aku hanyalah seorang mahasiswa yang sedang mencoba berdamai dengan hiruk-pikuk perkuliahan. Dunia visual—desain dan fotografi—adalah tempatku melarikan diri dari realitas akademik yang seringkali kaku. Itulah sebabnya aku sering menghabiskan akhir pekanku dengan menjadi relawan di berbagai acara seperti ini.",
      "Bukan, aku bukan tipe orang yang berharap menemukan kisah romansa murahan di setiap kepanitiaan. Bagiku, berdiri di sini adalah tentang memperluas cakrawala, menambah jejaring pertemanan, dan memanen pengalaman mahal yang tak diajarkan di ruang kelas. Aku tidak pernah datang dengan ekspektasi pulang membawa gandengan. Namun, jika hari ini menyuguhkan cerita yang berbeda, anggap saja itu bonus dari semesta yang sedang iseng.",
      "Aku berada di Stasiun Depok Lama, tempat di mana Dipo KRL terbesar di Asia Tenggara bersemayam. Di hadapanku, rel membentang seperti urat nadi kota yang tak pernah tidur. Jalur 1 dan 2 bersiap mengirim ribuan mimpi ke Jakarta, sementara Jalur 3 dan 4 menyambut mereka yang ingin lari ke kesejukan Bogor.",
      "BAGIAN I: Kota Tua",
      "Satu jam berlalu, kereta memuntahkanku di Stasiun Jakarta Kota. Tujuanku adalah Museum Bank Mandiri, hanya lima menit jalan kaki—secara teori. Namun, karena absen saat briefing sebelumnya, aku berakhir memutari labirin Kota Tua yang panas.",
      "Gedung-gedung kolonial dengan pilar raksasa menatapku angkuh. Aku sempat bertanya pada teman via WhatsApp, dan untungnya, arahannya menyelamatkanku. Lima belas menit kemudian, aku berdiri di depan gedung tua itu. Museum Bank Mandiri.",
      "Bangunan kokoh dengan vibes Belanda yang kental, lorong-lorongnya gelap dan beraroma sejarah—campuran antara bau kertas tua, debu, dan dingin yang lembap. Aku melangkah masuk ke ruang kru. Di sana, di sebuah meja kayu jati besar, temanku sudah menunggu.",
      "\"Woy, nyasar lu?\" sapanya. Aku hanya tertawa kecil, lalu bersalaman dengan kru lain agar tidak canggung. Aku mengambil ID Card bertuliskan Volunteer - Crowd Control. Kartu sakti yang memberiku akses ke mana saja hari ini.",
      "Aku duduk di salah satu kursi, menghadap langsung ke pintu masuk ruangan. Ruangan ini nyaman. Tidak terlalu luas, tapi cukup dingin untuk mengusir gerah Jakarta. Mataku mulai melakukan tugasnya: memindai.",
      "Satu per satu orang yang masuk kuperhatikan. Hingga mataku terkunci pada satu sosok. Seorang perempuan masuk. Dia mengenakan kacamata berbingkai tipis, rambutnya sebahu, dan gayanya... astaga, dia mirip sekali dengan Rhea, streamer favoritku.",
      "Dari postur tubuh hingga cara dia membenarkan letak kacamatanya, semuanya identik. Aku terpaku. Mungkin terlalu lama menatap, sampai dia menyadari eksistensiku. Dia menoleh, matanya bertemu dengan mataku. Sial. Panik, aku langsung membuang muka, berpura-pura sibuk scroll TikTok yang isinya entah apa. Jantungku berdetak satu tempo lebih cepat.",
      "BAGIAN II: Area Ticketing",
      "Area ticketing adalah benteng terdepan. Kayu-kayu pemisah loket yang berwarna cokelat gelap dan papan penunjuk berbahasa Belanda membuatku merasa terjebak di masa lalu. Aku menyempatkan diri mempelajari denah museum—jaga-jaga kalau ada pengunjung bertanya toilet di mana, aku tidak perlu planga-plongo.",
      "Saat aku sedang serius membaca denah, suara itu memanggilku. \"Eh, minta tolong dong pasangin tiket buat pengunjung ini.\"",
      "Aku menoleh. Itu dia. Perempuan yang mirip Rhea tadi. Ternyata dia PIC (Penanggung Jawab) divisi ticketing. Apakah ini kebetulan? Kuharap bukan. \"Boleh, Kak,\" jawabku, berusaha terdengar santai.",
      "Aku membantu memasangkan gelang tiket ke pergelangan tangan pengunjung. Prosedurnya memang begitu, untuk mencegah tiket berpindah tangan. Setelah pengunjung itu pergi, dia kembali menatapku.",
      "\"Makasih ya. By the way, nama lu siapa?\" tanyanya. \"Fatih, Kak,\" jawabku singkat. \"Oke Fatih, nanti tolong pasangin lagi ya kalau rame.\" \"Siap, Kak. Aman. Kalau nama lu siapa?\"",
      "Dia tersenyum tipis. \"Gue Kirei. Lu bisa panggil gue Rei.\" Kirei. Cantik. Sebuah nama Jepang yang jarang terdengar di lidah lokal, tapi entah kenapa sangat pas untuknya.",
      "Siang itu, matahari semakin tinggi dan pengunjung semakin ramai. Kami sibuk. Namun di sela-sela menyobek tiket dan melayani pengunjung, obrolan kami tumbuh. Bukan lagi soal pekerjaan, tapi hal-hal kecil.",
      "BAGIAN III: Sore Hari",
      "Menjelang sore, loket tiket mulai sepi. Hanya satu-dua orang yang datang. Aku dipindahkan tugas ke depan panggung utama untuk pengecekan ulang tiket. Tugas di sini lebih santai. Angin sore berhembus sepoi-sepoi, membawa serta suara musik dari panggung.",
      "Saat loket depan resmi ditutup, aku melihat Kirei berjalan menuju ruang kru. \"Eh, curang lu, udah selesai duluan,\" ledekku saat dia lewat. Dia tertawa, matanya menyipit. \"Ahaha kasian deh,\" balasnya renyah.",
      "Dia berhenti sejenak di posisiku, ikut menonton idol yang sedang tampil di panggung. Kami berdiri bersebelahan, melempar candaan seolah kami sudah kenal bertahun-tahun. Tak lama, dia pamit ke ruang kru untuk istirahat.",
      "Aku menyusul tak lama kemudian setelah menunaikan salat. Sesampainya di ruang kru, aku melihat Kirei duduk di bangku kayu jati tempatku tadi pagi. Dia tampak sedang mengobrol, jadi aku memilih tidak mengganggu dan bergabung dengan kru lain yang sedang membahas kehidupan kampus.",
      "Tapi entah ada angin apa, Kirei justru mendekat ke arahku. Dia duduk di dekatku. Awalnya aku cuek, pura-pura sibuk main ponsel karena bingung harus bereaksi apa. Tapi keheningan itu canggung.",
      "Akhirnya aku memberanikan diri bertanya. \"Lu kuliah di mana, Rei?\" Dari satu pertanyaan itu, bendungan percakapan pecah. Ternyata kami satu frekuensi. Dia kuliah di kampus swasta, jurusan yang dulu sangat ingin kumasuki. Kami seumuran. Rumah kami satu arah jalur kereta.",
      "Obrolan mengalir deras, sampai tiba-tiba... Suasana ruang kru berubah tegang. Ada kabar seorang pengunjung kehilangan ponselnya. Wajah Kirei berubah prihatin. \"Kasihan banget...\" gumamnya. Lalu dia menceritakan sesuatu tentang kejadian serupa.",
      "Aku mendengarkan dengan seksama, mencerna setiap katanya, namun aku menyimpannya sendiri dalam diam. Aku tidak ingin merusak suasana dengan reaksiku.",
      "BAGIAN IV: Balkon",
      "Malam telah turun sempurna. Matahari digantikan bulan yang bersinar terang. Aku baru saja selesai membantu mengangkat peralatan sound system ke lapangan bawah untuk lomba dance cover.",
      "Setelah salat, aku kembali ke ruang kru dan berdiri di balkon. Dari sini, lapangan terlihat jelas. Kirei berdiri di sampingku. Kami menonton perlombaan itu berdua.",
      "\"Lu anak desain ya?\" tanyaku, mendengar dari cerita dia. \"Iya. Lu fotografer kan? Liat dong hasil foto lu,\" pintanya.",
      "Kami bertukar portofolio. Aku memperlihatkan hasil jepretanku yang tak seberapa, sementara dia menunjukkan karya desainnya. \"Gila, rapi banget desain lu,\" pujiku tulus. \"Ini lu lagi kerja?\" \"Gue magang,\" jawabnya singkat.",
      "Aku tertegun. Magang dari pagi, kuliah sore, pulang malam, dan weekend jadi volunteer. Dia perempuan yang keren. Di bawah sinar bulan dan dentum musik dance cover, kami bicara tentang lagu kesukaan, hobi, passion, hingga jokes internal yang hanya kami yang paham.",
      "BAGIAN V: Last Briefing",
      "Perlombaan selesai. Aku membereskan peralatan, lalu semua kru dikumpulkan di ruang kru untuk briefing terakhir sebelum pulang. Aku duduk di sebelah kanan Kirei di meja kayu jati itu. Di sebelah kirinya ada beberapa kru lain.",
      "Tiba-tiba, di tengah obrolan seru dengan kru lain, aku merasakan sesuatu. Kirei terdiam. Dia menunduk, rambutnya menutupi wajah. Dia tertidur. Posisinya menghadap ke arahku.",
      "Hanya aku yang melihat wajah lelahnya yang damai. Aku membiarkannya, sengaja tidak mengajaknya bicara agar dia bisa mencuri waktu istirahat barang lima menit.",
      "\"Oke, semuanya kumpul di balkon luar ya buat penutupan!\" suara ketua pelaksana membangunkan lamunannya. Kirei tersentak bangun, wajahnya bingung lucu. Kami semua bergerak keluar.",
      "Aku tidak sadar kalau briefing sudah mau mulai. Tiba-tiba, ada tangan yang menarikku. Kirei. Dia tidak menarik lengan bajuku. Dia menggenggam pergelangan tanganku, kulit bertemu kulit, menarikku mendekat ke lingkaran kru. \"Ayo Tih, udah mao mulai tuh,\" katanya pelan.",
      "Aku terkejut. Ada desiran aneh yang merambat dari pergelangan tangan ke dada. Tapi aku menahan ekspresiku, berusaha tetap tenang seolah itu hal biasa.",
      "BAGIAN VI: Jalan Pulang",
      "Briefing selesai cepat. Kami diperbolehkan pulang. Museum tua ini terasa lebih horor di malam hari, tapi keramaian kru membuat takut itu hilang. Aku, Kirei, dan beberapa kru lain berjalan kaki menyusuri Kota Tua menuju stasiun.",
      "Entah bagaimana awalnya, aku dan Kirei berjalan bersisian. Jalanan Kota Tua malam itu luas dan lega, nyaris kosong. Tapi anehnya, bahu kami sering bersentuhan. Seakan-akan jalan selebar itu menyempit, memaksa kami untuk berjalan rapat. Irama langkah kami sama.",
      "Sesampainya di stasiun, kami tap-in. Sial. Lampu gate menyala merah. Saldo tidak cukup. Aku panik, merogoh dompet mencari kartu lain. Teman-teman kru lain sudah jalan duluan.",
      "\"Woy, tungguin!\" teriakku pelan. Tidak ada yang menoleh. Kecuali satu orang. Kirei. Dia berhenti beberapa langkah di depan, menungguku dengan sabar sampai aku berhasil tap-in. \"Yuk,\" ajaknya saat aku menyusul.",
      "BAGIAN VII: Kereta",
      "Kereta berangkat. Awalnya aku duduk di seberang Kirei karena terhalang kru perempuan lain. Tapi selepas Stasiun Manggarai—medan pertempuran para \"zombie\"—gerbong mulai sepi. Aku pindah duduk di sebelahnya.",
      "Kirei menoleh, matanya merah menahan kantuk. Kepalanya terombang-ambing mengikuti goncangan kereta. \"Pelor bngt lu Rei, baru juga sampe Manggarai,\" candaku.",
      "\"Ngantuk parah...\" gumamnya. Tanpa pikir panjang, dengan kepercayaan diri yang entah datang dari mana, aku menepuk bahu kiriku. \"Senderan aja sini.\"",
      "Dia tidak berpikir dua kali. Detik itu juga, kepalanya jatuh di bahuku. Deg. Dia benar-benar menyender. Dan dalam hitungan detik, dia tertidur pulas. Aku mematung. Tubuhku kaku. Aku tidak pernah melakukan ini sebelumnya—aku bahkan tidak punya pacar.",
      "Kereta terus melaju. Depok Lama, stasiun tujuanku, tinggal beberapa menit lagi. Kirei masih terlelap. Dia turun di Bojong Gede, dua stasiun setelah Depok Lama. Aku bimbang. Kalau aku turun, siapa yang bangunin dia? Gimana kalau dia kebablasan sampai Bogor sendirian malam-malam begini?",
      "\"Ah, sudahlah,\" bisikku dalam hati. Aku memutuskan untuk melewatkan stasiunku. Biarlah aku pulang lebih malam, asal dia aman.",
      "Tiga stasiun sebelum Depok Lama, Kirei terbangun sebentar, bergerak gelisah. Posisinya sepertinya bikin leher pegal. Aku berinisiatif. Perlahan, aku merangkul bahunya, menariknya sedikit agar posisi kepalanya lebih pas di ceruk leherku. Dia tidak menolak. Dia justru mendesah nyaman dan kembali tidur.",
      "Melihat dia senyaman itu dalam rangkulanku, rasa lelahku yang tadi sempat muncul tiba-tiba hilang. Lenyap begitu saja, larut dalam kedekatan ini. Karena tinggi badanku dan dia berbeda sekitar sepuluh senti, aku menyandarkan kepalaku di atas kepalanya yang tertidur.",
      "Wangi rambutnya, dinginnya AC kereta, dan keheningan malam... rasanya aku ingin waktu berhenti di sini. Aku merasa... nyaman.",
      "\"Stasiun Depok Lama...\" Pintu terbuka. Kirei terbangun kaget. \"Eh? Di mana ini?\" \"Depok Lama. Selamat pagi, Putri Tidur,\" ledekku. \"Lho? Lu kok nggak turun?\" tanyanya bingung. \"Masih ada kereta balik kok. Gue anterin lu dulu sampe Bojong,\" jawabku tenang.",
      "BAGIAN VIII: Pisah",
      "Lima belas menit kemudian, kami sampai di Bojong Gede. Angin malam menyambut kami di peron. Dingin, tapi hangat di hati. \"Makasih banget ya buat hari ini. Seru parah,\" katanya. \"Sama-sama, Rei. Hati-hati pulangnya.\"",
      "Kami high-five. Bunyi \"plak\" yang renyah menjadi penutup pertemuan kami. Dia berjalan ke kanan menuju pintu keluar, aku berjalan ke kiri menuju peron seberang untuk kembali ke Depok. Cepat sekali rasanya. Seperti kereta yang langsung melaju lagi meninggalkan peron.",
      "EPILOG",
      "Sepuluh hari berlalu sejak hari itu. Aku tidak lagi menghubunginya secara intens. Tidak ada pesan \"selamat pagi\" atau \"jangan lupa makan\". Aku menarik diri perlahan, kembali fokus pada akademikku, membiarkan kenangan hari itu mengendap menjadi cerita.",
      "Mungkin kalian bertanya-tanya, kenapa? Kenapa aku tidak mengejarnya setelah momen \"drama korea\" di kereta itu? Jawabannya ada di satu kalimat yang diucapkannya sore itu. Saat kejadian ponsel hilang di ruang kru, ketika wajahnya panik dan kesal, dia sempat bergumam pelan di sela-sela ceritanya.",
      "\"Sumpah jahat banget. Cowok gue juga baru ilang HP-nya kemaren di KRL...\" Cowok gue. Ya, aku mendengarnya. Jelas sekali.",
      "Jadi, saat aku menawarkan bahuku di kereta, saat aku merangkulnya, dan saat aku memutuskan melebihkan stasiun tujuanku demi mengantarnya... aku melakukannya dengan kesadaran penuh bahwa dia bukan milikku. Dan tidak akan pernah menjadi milikku.",
      "Aku tidak sedang berusaha merebut hati seseorang. Aku hanya ingin menjadi teman yang baik di hari yang melelahkan itu. Dia butuh sandaran, dan kebetulan bahuku ada di sana. That's it.",
      "Aku hanyalah stasiun transit yang nyaman, tempat dia beristirahat sejenak meluruskan kaki dan memejamkan mata, sebelum dia kembali melanjutkan perjalanan panjangnya menuju tujuan utamanya—yang jelas bukan aku.",
      "Dan bagiku, mengetahui aku bisa membuat harinya sedikit lebih mudah, itu sudah cukup. Tidak ada plot twist yang dramatis, hanya penerimaan yang tenang. Begitulah cerita hari itu selesai."
    ]
  },
];

// === MAIN PAGE ===
export default function NovelPage() {
  const [activeStory, setActiveStory] = useState<any>(null);

  return (
    <ReactLenis root>
      <style>{fontStyles}</style>
      <main className="min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-purple-900 selection:text-white overflow-x-hidden">
        
        <AnimatePresence mode='wait'>
          {activeStory ? (
            <ReaderView 
              key="reader" 
              story={activeStory} 
              onBack={() => setActiveStory(null)} 
            />
          ) : (
            <LibraryView 
              key="library" 
              onSelect={(story: any) => setActiveStory(story)} 
            />
          )}
        </AnimatePresence>

      </main>
    </ReactLenis>
  );
}

// === 1. LIBRARY VIEW (INTERACTIVE) ===
function LibraryView({ onSelect }: { onSelect: (s: any) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen px-6 py-20 md:p-24 z-10"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MagneticGrid />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto mb-20 flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="text-zinc-500 hover:text-white text-sm tracking-widest uppercase mb-4 block transition-colors">
              &larr; Back to Portfolio
            </Link>
            
            <h1 className="font-novel-title text-5xl md:text-8xl text-white tracking-tight cursor-default">
              <ScrambleText text="The Anthology." />
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-zinc-500 font-mono text-xs animate-pulse">
              SHORT STORIES & ESSAYS<br/>WRITTEN BY FATIH ADRIANSYAH
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {novels.map((novel, i) => (
            <TiltCard key={novel.id} index={i} onClick={() => onSelect(novel)}>
              <span className="inline-block px-3 py-1 rounded-full border border-white/10 text-[10px] tracking-widest uppercase text-zinc-400 mb-6 bg-black/50 backdrop-blur-sm">
                {novel.genre}
              </span>
              <h2 className="font-novel-title text-3xl text-white mb-4 group-hover:text-purple-400 transition-colors">
                {novel.title}
              </h2>
              <p className="font-novel-body text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {novel.desc}
              </p>
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-white/5 pt-4">
                <span className="flex items-center gap-2"><Clock size={12}/> {novel.readTime}</span>
                <span>{novel.date}</span>
              </div>
            </TiltCard>
          ))}
          <div className="md:col-span-2 lg:col-span-1 border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-zinc-600 gap-4 group hover:border-white/30 transition-colors">
             <PenTool size={32} className="animate-bounce text-purple-900"/>
             <p className="text-xs uppercase tracking-widest">More stories in progress</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// === COMPONENT: 3D TILT CARD ===
function TiltCard({ children, onClick, index }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct); y.set(yPct);
  }

  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}
      className="group relative h-full w-full cursor-pointer rounded-xl bg-zinc-900/40 border border-white/5 p-8 transition-colors hover:bg-zinc-900/80 hover:border-purple-500/30"
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
      <motion.div
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${useTransform(x, v => v * 100 + 50)}% ${useTransform(y, v => v * 100 + 50)}%, rgba(168, 85, 247, 0.15), transparent 80%)` }}
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </motion.div>
  );
}

// === COMPONENT: MAGNETIC GRID ===
function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    const points: {x: number, y: number, originX: number, originY: number}[] = [];
    const gap = 40;
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        points.push({ x, y, originX: x, originY: y });
      }
    }
    const mouse = { x: -1000, y: -1000 };
    const handleMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', handleMove);
    function animate() {
      if(!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#333';
      points.forEach(p => {
        const dx = mouse.x - p.x; const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 100 - dist);
        const angle = Math.atan2(dy, dx);
        const targetX = p.originX - Math.cos(angle) * force * 2; 
        const targetY = p.originY - Math.sin(angle) * force * 2;
        p.x += (targetX - p.x) * 0.1; p.y += (targetY - p.y) * 0.1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
    return () => { window.removeEventListener('mousemove', handleMove); };
  }, []);
  return <canvas ref={canvasRef} className="opacity-30" />;
}

// === COMPONENT: SCRAMBLE TEXT ===
function ScrambleText({ text }: { text: string }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
  const [displayText, setDisplayText] = useState(text);
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return letters[Math.floor(Math.random() * 26)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <span onMouseEnter={scramble} className="inline-block">{displayText}</span>;
}

// === 2. READER VIEW ===
function ReaderView({ story, onBack }: { story: any, onBack: () => void }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen bg-[#050505]"
    >
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50" style={{ scaleX }} />
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/><span className="text-xs tracking-widest uppercase">Anthology</span>
        </button>
        <div className="pointer-events-auto flex items-center gap-4 text-zinc-500 text-xs tracking-widest uppercase bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
           <span className="hidden md:inline">{story.title}</span><span className="w-px h-3 bg-white/20"></span><span className="flex items-center gap-2 text-purple-400"><Coffee size={14}/> Zen Mode</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-40 pb-40">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-20">
          <span className="text-purple-500 text-xs tracking-[0.3em] uppercase mb-4 block">Short Story</span>
          <h1 className="font-novel-title text-5xl md:text-7xl text-white mb-6 leading-tight">{story.title}</h1>
          <div className="flex items-center justify-center gap-6 text-zinc-500 text-sm font-novel-body italic">
            <span>By Fatih Adriansyah</span><span>&bull;</span><span>{story.date}</span>
          </div>
        </motion.div>
        
        <div className="space-y-8">
          {story.content.map((paragraph: string, index: number) => <Paragraph key={index} text={paragraph} />)}
        </div>

        <div className="mt-32 pt-10 border-t border-white/10 text-center">
          <BookOpen size={32} className="mx-auto text-zinc-700 mb-4" />
          <p className="text-zinc-600 font-novel-title italic text-xl">The End.</p>
          <button onClick={onBack} className="mt-8 text-sm text-purple-400 hover:text-white transition-colors tracking-widest uppercase">Back to Anthology</button>
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </motion.div>
  );
}

function Paragraph({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [20, 0, 0, -20]);
  
  const isHeader = text.startsWith("BAGIAN") || text.startsWith("PROLOG") || text.startsWith("EPILOG");

  return (
    <motion.p 
      ref={ref} 
      style={{ opacity, y }} 
      className={`font-novel-body leading-relaxed text-zinc-200 ${isHeader ? 'text-2xl md:text-3xl font-bold mt-12 mb-6 text-white' : 'text-lg md:text-xl'}`}
    >
      {text}
    </motion.p>
  );
}