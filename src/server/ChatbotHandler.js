const natural = require('natural');

class ChatbotHandler {
  constructor() {
    this.vectorizer = new natural.TfIdf();
    this.data = {
      indonesia: [
        {
            "question": "Tentang D'SNAP! ?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Apa yang dimaksud dengan D'SNAP! ?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Apa fokus utama dari D'SNAP?",
            "answer": "D'SNAP adalah Event Organizer yang berfokus pada penyediaan layanan aktivasi acara dan strategi branding untuk klien. Perusahaan ini berdedikasi untuk memberikan hasil berkualitas tinggi dengan menyeimbangkan kreativitas, inovasi, dan kepuasan klien."
        },
        {
            "question": "Dimana lokasi kantor D'SNAP?",
            "answer": "Kantor D'SNAP berlokasi di @ Radio Dalam, Jakarta. Perusahaan ini telah beroperasi sejak Mei 2010 dengan tim yang terdiri dari 20 karyawan dari berbagai divisi seperti Akun, Produksi, Konsep, dan Kreatif."
        },
        {
            "question": "Apa saja nilai-nilai inti dari D'SNAP?",
            "answer": "Nilai-nilai inti D'SNAP mencakup kreativitas, inovasi, kepuasan klien, serta dedikasi untuk menghasilkan karya berkualitas tinggi yang melampaui harapan klien."
        },
        {
            "question": "Layanan apa yang ditawarkan oleh D'SNAP?",
            "answer": "D'SNAP menawarkan berbagai layanan aktivasi acara seperti peluncuran produk, konser musik, acara olahraga, perayaan komunitas, dan acara kuliner. Mereka juga menyediakan layanan pendukung seperti desain grafis, teknologi audiovisual, dan dokumentasi acara."
        },
        {
            "question": "Apa saja acara yang bisa dikelola oleh D'SNAP?",
            "answer": "D'SNAP berpengalaman dalam mengelola berbagai jenis acara seperti peluncuran produk, konser, perayaan komunitas, acara olahraga, dan acara kuliner, dengan memastikan setiap detail acara terencana dengan baik."
        },
        {
            "question": "Apakah D'SNAP memiliki pengalaman dengan acara di luar Jakarta?",
            "answer": "Ya, D'SNAP memiliki pengalaman mengelola acara di berbagai kota di Indonesia, termasuk Jakarta, Bandung, Surabaya, Medan, dan kota-kota lainnya, dengan adaptasi terhadap budaya dan kebutuhan lokal."
        },
        {
            "question": "Bagaimana cara menghubungi D'SNAP untuk konsultasi acara?",
            "answer": "Anda dapat menghubungi D'SNAP melalui kontak yang tersedia di website atau halaman reservasi untuk konsultasi lebih lanjut mengenai perencanaan acara."
        },
        {
            "question": "Apa yang membuat D'SNAP unggul dibandingkan Event Organizer lainnya?",
            "answer": "D'SNAP unggul dengan pendekatan berbasis tim yang solid, pemahaman mendalam terhadap kebutuhan klien, serta perencanaan strategis yang fleksibel untuk memastikan hasil yang optimal."
        },
        {
            "question": "Apakah D'SNAP menawarkan layanan untuk acara hibrid?",
            "answer": "Ya, D'SNAP memiliki pengalaman dalam menyelenggarakan acara virtual dan hibrid, menyediakan teknologi seperti live streaming, platform interaktif, dan integrasi media sosial untuk mendukung acara tersebut."
        },
        {
            "question": "Perusahaan apa ini?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
          "question": "Apa itu D'SNAP! ?",
          "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Kelebihan D'SNAP! ?",
            "answer": "Kami percaya bahwa kesuksesan berasal dari kerja tim yang kuat, di mana setiap divisi dalam tim kami berkomitmen untuk pertumbuhan dan kolaborasi, baik secara internal maupun dengan klien kami sebagai mitra. Dengan memahami secara mendalam kebutuhan klien, produk, target pasar, dan tujuan mereka, kami memberikan strategi praktis yang terarah untuk melampaui harapan. Dengan profesionalisme, energi, dan efisiensi, kami merancang solusi komunikasi yang berdampak yang menyeimbangkan efektivitas biaya dan hasil. Dipandu oleh perencanaan yang teliti dan kelincahan, kami tetap fleksibel dan adaptif untuk mengatasi tantangan dan meraih peluang, memastikan hasil terbaik untuk klien kami."
        },
        {
          "question": "Layanan Event apa saja yang diselenggarakan oleh D'SNAP! ?",
          "answer": "Kami berpengalaman dalam mengadakan acara besar seperti peluncuran produk, perayaan komunitas, konser, acara olahraga, dan kuliner😊."
        },
        {
            "question": "Benefit apa saja yang didapatkan?",
            "answer": "Booth, Perencanaan & Manajemen Acara, Dekorasi & Desain Set, Dukungan Teknologi & AV, Talent & Hiburan, Promosi & Pemasaran Acara, Layanan Katering & Makanan, Pendaftaran & Tiket, dan Fotografi & Videografi Acara."
        },
        {
            "question": "Berapa biaya untuk mengadakan acara?",
            "answer": "Saat ini, kami hanya menyediakan acara untuk Perayaan Komunitas, Peluncuran Produk, Konferensi, Konser Musik, Acara Olahraga, dan Acara Kuliner. Untuk rincian biaya penyelenggaraan bisakah anda beritahu acara apa yang ingin anda ketahui biayanya?"
        },
        {
            "question": "Apakah layanan tersedia di seluruh Indonesia?",
            "answer": "Tentu saja, kami telah berhasil menyelenggarakan dan mengelola acara di berbagai kota di Indonesia, menunjukkan kemampuan kami untuk beradaptasi dengan berbagai budaya lokal dan lingkungan bisnis. Pengalaman kami mencakup area metropolitan besar seperti Jakarta, Bandung, Surabaya, Malang, Lampung, dan Medan, serta banyak kota lainnya. Setiap acara dilaksanakan dengan tingkat dedikasi dan perhatian terhadap detail yang sama, memastikan bahwa tujuan klien kami tercapai, tidak peduli lokasi acara. Jangkauan kami yang luas di seluruh Indonesia memungkinkan kami untuk membawa layanan kami kepada berbagai klien, menciptakan pengalaman yang berkesan dan berdampak, disesuaikan dengan karakteristik dan audiens unik di setiap daerah."
        },
        {
            "question": "Keunggulan D'SNAP! ?",
            "answer": "Kami percaya bahwa kesuksesan datang dari kerja tim yang kuat, di mana setiap divisi dalam tim kami berkomitmen untuk pertumbuhan dan kolaborasi, baik secara internal maupun dengan klien kami sebagai mitra. Dengan memahami secara mendalam kebutuhan klien, produk, pasar sasaran, dan tujuan mereka, kami memberikan strategi praktis yang berfokus pada target untuk melebihi harapan. Dengan profesionalisme, energi, dan efisiensi, kami menciptakan solusi komunikasi yang berdampak yang menyeimbangkan efektivitas biaya dan hasil. Dipandu oleh perencanaan yang cermat dan kelincahan, kami tetap fleksibel dan adaptif untuk mengatasi tantangan dan meraih peluang, memastikan hasil terbaik bagi klien kami."
        },
        // estimasi biaya
        {
            "question": "Perayaan Komunitas",
            "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan perayaan komunitas ?",
          "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Peluncuran Produk",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan peluncuran produk ?",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Konferensi",
          "answer": "Untuk menyelenggarakan konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan konferensi ?",
          "answer": "Untuk menyelenggarakan konferensi konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Olahraga",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Olahraga ?",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Bagaimana cara booking event ?",
          "answer": "Anda bisa ke halaman reservasi untuk informasi lebih lengkap atau juga bisa menghubungi kontak yang tertera."
        },
        {
          "question": "Bagaimana cara memesan jasa ?",
          "answer": "Anda bisa ke halaman reservasi untuk informasi lebih lengkap atau juga bisa menghubungi kontak yang tertera."
        },
        {
          "question": "Apakah D'SNAP menyediakan layanan konsultasi sebelum acara?",
          "answer": "Tentu saja, kami selalu melayani konsultasi seputar event baik sebelum maupun sesudah acara!. Jika ingin konsultasi lebih lanjut terkait event, silahkan hubungi kontak yang tertera!"
        },
        {
          "question": "Apakah D'SNAP menyediakan layanan dokumentasi acara?",
          "answer": "Tentu saja, kami menyediakan layanan dokumentasi acara seperti fotografi dan videografi profesional untuk memastikan momen penting Anda terdokumentasi dengan baik."
        },
        {
          "question": "Apakah D'SNAP menawarkan layanan desain grafis untuk acara?",
          "answer": "Ya, kami menawarkan layanan desain grafis untuk mendukung materi promosi dan visual acara, seperti undangan, poster, backdrop, dan materi lainnya."
        },
        {
          "question": "Apakah D'SNAP dapat menangani acara virtual atau hybrid?",
          "answer": "Ya, D'SNAP memiliki pengalaman dalam menyelenggarakan acara virtual dan hybrid, menyediakan teknologi seperti live streaming, platform interaktif, dan integrasi media sosial untuk mendukung acara tersebut."
        },
        {
          "question": "Apakah D'SNAP memiliki jaringan vendor pendukung acara?",
          "answer": "Ya, kami memiliki jaringan vendor terpercaya untuk berbagai kebutuhan acara, seperti katering, dekorasi, perlengkapan audiovisual, dan lain-lain."
        },
        {
          "question": "Berapa lama waktu yang dibutuhkan untuk persiapan acara?",
          "answer": "Waktu persiapan bergantung pada skala dan kompleksitas acara. Untuk acara kecil hingga menengah, biasanya memerlukan waktu 2-4 minggu. Sedangkan acara besar dapat memerlukan waktu 1-3 bulan."
        },
        {
          "question": "Apakah saya bisa custom paket acara di D'SNAP?",
          "answer": "Tentu saja! Anda dapat berkonsultasi dengan tim kami untuk merancang paket acara yang sesuai dengan kebutuhan dan anggaran Anda. Untuk detail lebih lengkap silahkan hubungi kontak kami!"
        },
        {
          "question": "Bagaimana D'SNAP menangani tantangan atau perubahan mendadak selama acara?",
          "answer": "Kami memiliki tim yang berpengalaman dan responsif untuk menangani setiap tantangan atau perubahan mendadak dengan solusi cepat dan efektif demi keberhasilan acara Anda."
        },
        {
          "question": "Apa yang membedakan D'SNAP dari event organizer lainnya?",
          "answer": "Keunggulan kami terletak pada kreativitas, dedikasi, dan pengalaman dalam mengelola berbagai jenis acara. Kami selalu mengutamakan kepuasan klien dengan memberikan solusi acara yang inovatif dan hasil yang melampaui harapan."
        },
        {
          "question": "Berapa dana yg dibutuhkan untuk menyewa jasa",
          "answer": "Saat ini, kami hanya menyediakan acara untuk Perayaan Komunitas, Peluncuran Produk, Konferensi, Konser Musik, Acara Olahraga, dan Acara Kuliner. Untuk rincian biaya penyelenggaraan bisakah anda beritahu acara apa yang ingin anda ketahui biayanya?"
        },
        {
          "question": "Apa saja proyek besar yang pernah ditangani oleh D'SNAP?",
          "answer": "D'SNAP menyediakan layanan untuk berbagai jenis acara, termasuk Perayaan Komunitas, Peluncuran Produk, Konferensi, Konser Musik, Acara Olahraga, dan Acara Kuliner. Untuk melihat proyek besar yang sudah kami tangani silahkan buka halaman Projects!"
        },
        {
          "question": "Udah pernah handle acara kayak gini sebelumnya, belum?",
          "answer": "Untuk saat ini, kami hanya menyediakan acara untuk Perayaan Komunitas, Peluncuran Produk, Konferensi, Konser Musik, Acara Olahraga, dan Acara Kuliner. Untuk rincian biaya penyelenggaraan bisakah anda beritahu acara apa yang ingin anda ketahui biayanya? Jika ingin informasi lebih lengkap silahkan hubungi kontak kami"
        },
        {
          "question": "Bisa lihat contoh acara yang pernah kalian kerjain, nggak?",
          "answer": "Anda bisa coba untuk ke halaman projects untuk event-event yang sudah pernah kami kerjakan!"
        },
        {
          "question": "Kalian biasanya nyediain apa aja? Dekor, makanan, hiburan, atau semua lengkap?",
          "answer": "Kami menyediakan Booth, Perencanaan & Manajemen Acara, Dekorasi & Desain Set, Dukungan Teknologi & AV, Talent & Hiburan, Promosi & Pemasaran Acara, Layanan Katering & Makanan, Pendaftaran & Tiket, dan Fotografi & Videografi Acara."
        },
        {
          "question": "Kalau mau pilih vendor sendiri, boleh nggak?",
          "answer": "Maaf sekali, untuk pilih vendor sendiri tidak bisa"
        },
        {
          "question": "Ada paket harga yang bisa disesuaikan sama budget nggak?",
          "answer": "Kami menyediakan Paket Small, Medium, dan Big, untuk budgeting silahkan hubungi pada kontak kami ya!"
        },
        {
          "question": "Biayanya udah all-in, atau ada tambahan lagi?",
          "answer": "Biaya pada setiap paket itu mulai dari Paket Small, Medium, dan Big, jika ingin lebih rinci silahkan hubungi kontak kami!"
        },
        {
          "question": "Sistem pembayarannya gimana? DP dulu atau bayar full belakangan?",
          "answer": "Untuk sistem pembayaran bisa DP terlebih dahulu ya!"
        },
        {
          "question": "Kalau ada perubahan mendadak, gampang nggak hubungi kalian?",
          "answer": "Tentu saja, kami sangat cepat tanggap jika ada kendala dalam event!"
        },
        {
          "question": "Tim yang turun di hari H berapa orang?",
          "answer": "Kami menyediakan Team Leader dan Crew yang akan selalu siap membantu, crew yang akan turun menyesuaikan dengan event yang sudah di pesan ya!"
        },
        {
          "question": "Kalau ada masalah di acara, kalian ada plan cadangan, kan?",
          "answer": "Tentu saja, kami selalu menyediakan rencana-rencanan cadangan jika terjadi suatu kendala dalam event!"
        },
        {
          "question": "Apa saja review atau testimoni dari klien terdahulu terkait layanan yang telah diberikan?",
          "answer": "Untuk hasil event yang sudah di kerjakan bisa dilihat di laman projects, namun untuk testimoni bisa hubungi kontak kami lebih lanjut"
        },
        {
          "question": "Apakah Anda terbuka untuk menerima ide kreatif kami selama perencanaan?",
          "answer": "Ya, tentu saja kamu selalu terbuka untuk menerima ide kreatif dalam bentuk apapun"
        },
        {
          "question": "Apakah Anda bisa membantu merancang tema atau konsep acara yang unik?",
          "answer": "Tentu saja, semua konsep dan tema akan di handle oleh creative dan produksi dari perusahaan kami!"
        },
        {
          "question": "Apakah ada paket atau layanan yang bisa kami pilih sesuai kebutuhan?",
          "answer": "Kami menyediakan Paket Small, Medium, dan Big, untuk budgeting silahkan hubungi pada kontak kami ya!"
        },
        {
          "question": "Apakah Anda bekerja sama dengan vendor lain seperti catering, dekorasi, atau fotografer?",
          "answer": "Ya, kami memiliki jaringan vendor terpercaya untuk berbagai kebutuhan acara, seperti katering, dekorasi, perlengkapan audiovisual, dan lain-lain."
        },
        {
          "question": "Bagaimana cara Anda menangani masalah tak terduga selama acara?",
          "answer": "Kami memiliki tim yang berpengalaman dan responsif untuk menangani setiap tantangan atau perubahan mendadak dengan solusi cepat dan efektif demi keberhasilan acara Anda."
        },
        {
          "question": "Seberapa fleksibel tim Anda dalam menyesuaikan dekorasi dengan keinginan kami?",
          "answer": "Tim kami sangat fleksibel, jika ada desain yang kurang sesuai maka akan kami buat hingga sesuai keinginan anda."
        },
        {
          "question": "Apa benefit-nya jika kita memesan layanan EO?",
          "answer": "Booth, Event Planning & Management, Set Decoration & Design, Technology & AV Support, Talent & Entertainment, Event Promotion & Marketing, Catering & Food Services, Registration & Tickets, and Event Photography & Videography."
        },
        {
          "question": "Bagaimana EO menangani masalah saat acara berlangsung?",
          "answer": "Kami mempunyai team leader yang kompeten dan berpengelaman sehingga dapat menangani masalah yang terjadi!"
        },
        {
          "question": "Apakah EO menjamin keamanan saat acara berlangsung?",
          "answer": "Tentu saja, karena keamanan salah satu prioritas utama kami sebagai event organizier"
        },
        {
          "question": "Bisa buat jalanin semua yang diminta, dengan dana berapa?",
          "answer": "Kami menyediakan Paket Small, Medium, dan Big, untuk budgeting silahkan hubungi pada kontak kami ya!"
        },
        {
          "question": "Halo saya ingin memakai jasa event organizer,kira kira untuk event yang dapat di hadiri kurang lebih 1000 pengunjung dapat fasilitas apa saja Dan biaya pasny berapa?",
          "answer": "Kami menyediakan Paket Small, Medium, dan Big. Untuk informasi lebih lanjut anda bisa ke halaman Reservation atau silahkan hubungi pada kontak kami ya!"
        }
      ], 
      
      english: [
        {
          "question": "About D'SNAP! ?",
          "answer": "D'SNAP is an Event Organizer that provides various services in strategic event/brand activation for clients. D'SNAP started operating in May 2010 and is now located at @ Radio Dalam, Jakarta, with 20 employees (Account, Production, Concept, & Creative Division). Each team member is committed to providing high-quality work that reflects the company's core values: creativity, innovation, and client satisfaction😊"
        },
        {
          "question": "What is D'SNAP! ?",
          "answer": "D'SNAP is an Event Organizer that provides various services in strategic event/brand activation for clients. D'SNAP started operating in May 2010 and is now located at @ Radio Dalam, Jakarta, with 20 employees (Account, Production, Concept, & Creative Division). Each team member is committed to providing high-quality work that reflects the company's core values: creativity, innovation, and client satisfaction😊"
        },
        {
          "question": "What is the main focus of D'SNAP?",
          "answer": "D'SNAP is an Event Organizer that focuses on providing event activation services and branding strategies for clients. The company is dedicated to delivering high-quality results by balancing creativity, innovation, and client satisfaction."
        },
        {
        "question": "Where is the location of D'SNAP's office?",
        "answer": "D'SNAP's office is located at @ Radio Dalam, Jakarta. The company has been operating since May 2010 with a team of 20 employees from various divisions such as Account, Production, Concept, and Creative."
        },
        {
        "question": "What are the core values ​​of D'SNAP?",
        "answer": "D'SNAP's core values ​​include creativity, innovation, client satisfaction, and dedication to producing high-quality work that exceeds client expectations."
        },
        {
        "question": "What services does D'SNAP offer?",
        "answer": "D'SNAP offers a variety of event activation services such as product launches, music concerts, sporting events, community celebrations, and culinary events. They also provide supporting services such as graphic design, audiovisual technology, and event documentation."
        },
        {
        "question": "What events can D'SNAP manage?",
        "answer": "D'SNAP is experienced in managing various types of events such as product launches, concerts, community celebrations, sporting events, and culinary events, ensuring that every detail of the event is well planned."
        },
        {
        "question": "Does D'SNAP have experience with events outside Jakarta?",
        "answer": "Yes, D'SNAP has experience managing events in various cities in Indonesia, including Jakarta, Bandung, Surabaya, Medan, and other cities, with adaptation to local culture and needs."
        },
        {
        "question": "How do I contact D'SNAP for event consultation?",
        "answer": "You can contact D'SNAP through the contacts available on the website or the reservation page for further consultation regarding event planning."
        },
        {
        "question": "What makes D'SNAP superior to other Event Organizers?",
        "answer": "D'SNAP excels with a solid team-based approach, deep understanding of client needs, and flexible strategic planning to ensure optimal results."
        },
        {
        "question": "Does D'SNAP offer services for hybrid events?",
        "answer": "Yes, D'SNAP has experience in organizing virtual and hybrid events, providing technology such as live streaming, interactive platforms, and social media integration to support the event."
        },
        {
        "question": "What company is this?",
        "answer": "D'SNAP is an Event Organizer that provides various services in strategic event/brand activation for clients. D'SNAP started operating in May 2010 and is now located at @ Radio Dalam, Jakarta, with 20 employees (Account, Production, Concept, & Creative Divisions). Each team member is committed to delivering high-quality work that reflects the company's core values: creativity, innovation, and client satisfaction😊"
        },
                {
        "question": "What is D'SNAP! ?",
        "answer": "D'SNAP is an Event Organizer that provides various services in strategic event/brand activation for clients. D'SNAP started operating in May 2010 and is now located at @ Radio Dalam, Jakarta, with 20 employees (Account, Production, Concept, & Creative Divisions). Each team member is committed to providing high-quality work that reflects the company's core values: creativity, innovation, and client satisfaction😊"
        },
        {
        "question": "Advantages of D'SNAP! ?",
        "answer": "We believe that success comes from strong teamwork, where every division in our team is committed to growth and collaboration, both internally and with our clients as partners. By deeply understanding our clients' needs, products, target markets, and goals, we provide practical, targeted strategies to exceed expectations. With professionalism, energy, and efficiency, we design impactful communication solutions that balance cost-effectiveness and results. Guided by careful planning and agility, we remain flexible and adaptive to overcome challenges and seize opportunities, ensuring the best results for our clients."
        },
        {
        "question": "What Event Services does D'SNAP! provide?",
        "answer": "We are experienced in organizing large events such as product launches, community celebrations, concerts, sports events, and culinary events😊."
        },
        {
        "question": "What are the benefits?",
        "answer": "Booth, Event Planning & Management, Decoration & Set Design, Technology & AV Support, Talent & Entertainment, Event Promotion & Marketing, Catering & Food Services, Registration & Ticketing, and Event Photography & Videography."
        },
        {
        "question": "How much does it cost to hold an event?",
        "answer": "Currently, we only provide events for Community Celebrations, Product Launches, Conferences, Music Concerts, Sports Events, and Culinary Events. For details of the cost of organizing can you tell us what event you want to know the cost of?"
        },
        {
        "question": "Are services available throughout Indonesia?",
        "answer": "Of course, we have successfully organized and managed events in various cities in Indonesia, demonstrating our ability to adapt to various local cultures and business environments. Our experience covers major metropolitan areas such as Jakarta, Bandung, Surabaya, Malang, Lampung, and Medan, as well as many other cities. Every event is executed with the same level of dedication and attention to detail, ensuring that our clients' goals are achieved, no matter the location of the event. Our extensive reach throughout Indonesia allows us to bring our services to a variety of clients, creating memorable and impactful experiences, tailored to the unique characteristics and audiences in each region."
        },
        {
        "question": "D'SNAP's Advantages! ?",
        "answer": "We believe that success comes from strong teamwork, where every division within our team is committed to growth and collaboration, both internally and with our clients as partners. By deeply understanding our clients’ needs, products, target markets, and goals, we deliver practical, target-focused strategies to exceed expectations. With professionalism, energy, and efficiency, we create impactful communication solutions that balance cost-effectiveness and results. Guided by careful planning and agility, we remain flexible and adaptive to overcome challenges and seize opportunities, ensuring the best possible outcomes for our clients."
        },
        // cost estimate
        {
        "question": "Community Celebration",
        "answer": "To host a community celebration, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information, please contact us."
        },
        {
        "question": "How much does it cost to host a community celebration?",
        "answer": "To host a community celebration, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information please contact us."
        },
        {
        "question": "Product Launch",
        "answer": "To organize a product launch, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00. For more information please contact us."
        },
        {
          "question": "How much does it cost to hold a product launch?",
        "answer": "To hold a product launch, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00. For more information, please contact us."
        },
        {
        "question": "Conference",
        "answer": "To hold a conference, you can choose the small event option on the Reservation page, with prices starting from IDR 10,000,000.00. For more information, please contact us."
        },
        {
        "question": "How much does it cost to hold a conference?",
        "answer": "To hold a conference, you can choose the small event option on the Reservation page, with prices starting from IDR 10,000,000.00. For more information, please contact us."
        },
        {
        "question": "Music Concert Event",
        "answer": "To organize a music concert event, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00. For more information, please contact us."
        },
        {
        "question": "How much does it cost to organize a Music Concert Event",
        "answer": "To organize a music concert event, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00. For more information, please contact us."
        },
        {
        "question": "Sports Event",
        "answer": "To organize a sports event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information, please contact us."
        },
        {
        "question": "How much does it cost to hold a Sports Event?",
        "answer": "To hold a sports event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information, please contact us."
        },
        {
        "question": "Culinary Event",
        "answer": "To hold a culinary event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information, please contact us."
        },
        {
        "question": "How much does it cost to hold a Culinary Event",
        "answer": "To hold a culinary event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00. For more information, please contact us."
        },
        {
        "question": "How do I book an event?",
        "answer": "You can go to the reservation page for more complete information or you can also contact the listed contact."
        },
        {
        "question": "How do I order services?",
        "answer": "You can go to the reservation page for more complete information or you can also contact the listed contact."
        },
        {
          "question": "Does D'SNAP provide pre-event consultation services?",
          "answer": "Yes, D'SNAP provides consultation services, please contact the contact listed. Our team will help design an event concept that suits your vision."
        },
        {
          "question": "Does D'SNAP provide event documentation services?",
          "answer": "Of course, we provide event documentation services such as professional photography and videography to ensure your important moments are well documented."
        },
        {
          "question": "Does D'SNAP offer graphic design services for events?",
          "answer": "Yes, we offer graphic design services to support promotional materials and event visuals, such as invitations, posters, backdrops, and other materials."
        },
        {
          "question": "Can D'SNAP handle virtual or hybrid events?",
          "answer": "Yes, D'SNAP has experience in managing virtual and hybrid events. We provide appropriate technology solutions, including live streaming, interactive platforms, and social media integration."
        },
        {
          "question": "Does D'SNAP have a network of event support vendors?",
          "answer": "Yes, we have a network of trusted vendors for various event needs, such as catering, decoration, audiovisual equipment, and others."
        },
        {
          "question": "How long does it take to prepare an event?",
          "answer": "The preparation time depends on the scale and complexity of the event. For small to medium events, it usually takes 2-4 weeks. While large events can take 1-3 months."
        },
        {
          "question": "Does D'SNAP offer ready-made event packages?",
          "answer": "Yes, we provide pre-designed event packages to make it easier for you, such as product launch packages, community parties, and music concerts. You can find the details on the reservation page."
        },
        {
          "question": "Can I customize an event package at D'SNAP?",
          "answer": "Of course! You can consult with our team to design an event package that suits your needs and budget."
        },
        {
          "question": "How does D'SNAP handle challenges or sudden changes during an event?",
          "answer": "We have an experienced and responsive team to handle any challenges or sudden changes with quick and effective solutions for the success of your event."
        },
        {
          "question": "What sets D'SNAP apart from other event organizers?",
          "answer": "Our strength lies in our creativity, dedication, and experience in managing various types of events. We always prioritize client satisfaction by providing innovative event solutions and results that exceed expectations."
        },
        {
          "question": "How much does it cost to hire a service",
          "answer": "Currently, we only provide events for Community Celebrations, Product Launches, Conferences, Music Concerts, Sports Events, and Culinary Events. For details on the cost of organizing, can you tell us what event you want to know the cost of?"
        },
        {
          "question": "What are the major projects that D'SNAP has handled?",
          "answer": "D'SNAP provides services for various types of events, including Community Celebrations, Product Launches, Conferences, Music Concerts, Sports Events, and Culinary Events. To see the major projects that we have handled, please visit the Projects page!"
        },
        {
          "question": "Have you ever handled an event like this before?",
          "answer": "For now, we only provide events for Community Celebrations, Product Launches, Conferences, Music Concerts, Sports Events, and Culinary Events. For details on the cost of organizing, can you tell us what event you want to know the cost of? If you want more complete information, please contact us"
        },
        {
          "question": "Can I see examples of events that you have worked on?",
          "answer": "You can try to go to the projects page for events that we have worked on!"
        },
        {
          "question": "What do you usually provide? Decorations, food, entertainment, or all complete?",
          "answer": "We provide Booths, Event Planning & Management, Decoration & Set Design, Technology & AV Support, Talent & Entertainment, Event Promotion & Marketing, Catering & Food Services, Registration & Ticketing, and Event Photography & Videography."
        },
        {
          "question": "Can I choose my own vendor?",
          "answer": "I'm sorry, I can't choose my own vendor"
        },
        {
          "question": "Is there a price package that can be adjusted to your budget?",
          "answer": "We provide Small, Medium, and Big Packages, for budgeting please contact us!"
        },
        {
          "question": "Is the cost all-in, or are there any additional costs?",
          "answer": "The cost of each package starts from the Small, Medium, and Big Packages, if you want more details please contact us!"
        },
        {
          "question": "What is the payment system? Down payment first or pay in full later?",
          "answer": "For the payment system, can I pay the down payment first!"
        },
        {
          "question": "If there are sudden changes, is it easy to contact you?",
          "answer": "Of course, we are very responsive if there are obstacles in the event!" },
        {
          "question": "How many people will be on the team on the day?",
          "answer": "We provide a Team Leader and Crew who will always be ready to help, the crew who will be there will adjust to the event that has been ordered!"
        },
        {
          "question": "If there is a problem at the event, you have a backup plan, right?",
          "answer": "Of course, we always provide backup plans if there is a problem at the event!"
        },
        {
          "question": "What are the reviews or testimonials from previous clients regarding the services provided?",
          "answer": "For the results of events that have been worked on, you can see them on the projects page, but for testimonials, you can contact us for further contact"
        },
        {
          "question": "Are you open to receiving our creative ideas during planning?",
          "answer": "Yes, of course you are always open to receiving creative ideas in any form"
        },
        {
          "question": "Can you help design a unique event theme or concept?",
          "answer": "Of course, all concepts and themes will be handled by our company's creative and production!"
        },
        {
          "question": "Are there any packages or services that we can choose according to our needs?",
          "answer": "We provide Small, Medium, and Big Packages, for budgeting please contact us!"
        },
        {
          "question": "Do you work with other vendors such as catering, decoration, or photographers?",
          "answer": "Yes, we have a network of trusted vendors for various event needs, such as catering, decoration, audiovisual equipment, and others."
        },
        {
          "question": "How do you handle unexpected problems during an event?",
          "answer": "We have an experienced and responsive team to handle any challenges or sudden changes with quick and effective solutions for the success of your event."
        },
        {
          "question": "How flexible is your team in adjusting the decoration to our wishes?",
          "answer": "Our team is very flexible, if there is a design that is not suitable then we will make it according to your wishes."
        },
        {
          "question": "What are the benefits if we order EO services?",
          "answer": "Booth, Event Planning & Management, Set Decoration & Design, Technology & AV Support, Talent & Entertainment, Event Promotion & Marketing, Catering & Food Services, Registration & Tickets, and Event Photography & Videography."
        },
        {
          "question": "How does EO handle problems during the event?",
          "answer": "We have a competent and experienced team leader who can handle any problems that occur!"
        },
        {
          "question": "Does EO guarantee security during the event?",
          "answer": "Of course, because security is one of our top priorities as an event organizer"
        },
        {
          "question": "Can you do everything that is requested, with how much money?",
          "answer": "We provide Small, Medium, and Big Packages, for budgeting please contact us!"
        },
        {
          "question": "Hello, I want to use the services of an event organizer, what facilities are available for an event that can be attended by approximately 1000 visitors and how much is the exact cost?",
          "answer": "We provide Small, Medium, and Big Packages. For more information, you can go to the Reservation page or please contact us!"
        }
      ]
    };
    this.eventCosts = {
        indonesia: {
          "Community Celebration": "Untuk menyelenggarakan Community Celebration, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00.",
          "Product Launch": "Untuk menyelenggarakan Product Launch, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00.",
          "Corporate Conference": "Untuk menyelenggarakan Corporate Conference, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00.",
          "Musical Event": "Untuk menyelenggarakan Musical Event, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00.",
          "Sports Event": "Untuk menyelenggarakan Sports Event, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        english: {
          "Community Celebration": "To organize a Community Celebration, you can select the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00.",
          "Product Launch": "To organize a Product Launch, you can select the Big Event option on the Reservation page, with prices starting from IDR 50,000,000.00.",
          "Corporate Conference": "To organize a Corporate Conference, you can select the Small Event option on the Reservation page, with prices starting from IDR 10,000,000.00.",
          "Musical Event": "To organize a Musical Event, you can select the Big Event option on the Reservation page, with prices starting from IDR 50,000,000.00.",
          "Sports Event": "To organize a Sports Event, you can select the Medium Event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        }
      };
    this.language = "indonesia"; 
    this.questions = [];
    this.answers = [];
    this.tfidfMatrix = null;
    this._prepareData();
  }

  _prepareData() {
    this.questions = this.data[this.language].map(qa => qa.question);
    this.answers = this.data[this.language].map(qa => qa.answer);

    // Reset and rebuild the TF-IDF vectorizer
    this.vectorizer = new natural.TfIdf();
    this.questions.forEach((question, index) => {
      this.vectorizer.addDocument(question);
    });
  }

  setLanguage(lang) {
    if (this.data[lang]) {
      this.language = lang;
      this._prepareData();
    }
  }

  _getCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (norm1 * norm2) || 0;
  }

  getEventCost(eventName) {
    const normalizedEvent = Object.keys(this.eventCosts[this.language]).find(
      key => key.toLowerCase().includes(eventName.toLowerCase())
    );

    if (normalizedEvent) {
      return {
        response: this.eventCosts[this.language][normalizedEvent],
        eventFound: true
      };
    }

    return {
      response: this.language === 'indonesia' 
        ? "Maaf, informasi tentang acara tersebut tidak tersedia."
        : "Sorry, information about that event is not available.",
      eventFound: false
    };
  }

  async getResponse(userInput) {
    try {
      // Get TF-IDF vectors for the user input
      const userVector = [];
      this.vectorizer.tfidfs(userInput, (i, measure) => {
        userVector[i] = measure;
      });

      // Calculate similarities with all questions
      const similarities = this.questions.map((_, index) => {
        const questionVector = [];
        this.vectorizer.tfidfs(this.questions[index], (i, measure) => {
          questionVector[i] = measure;
        });
        return this._getCosineSimilarity(userVector, questionVector);
      });

      // Find the best match
      const bestMatchIndex = similarities.indexOf(Math.max(...similarities));
      
      // Check if the similarity is too low
      if (similarities[bestMatchIndex] < 0.1) {
        return {
          response: this.language === 'indonesia'
            ? "Maaf, saya tidak dapat memahami pertanyaan Anda. Mohon berikan pertanyaan yang spesifik sesuai opsi yang kami berikan...😊"
            : "Sorry, I am unable to understand your question. Please provide a specific question according to the options we have provided...😊"
        };
      }

      return {
        response: this.answers[bestMatchIndex]
      };
    } catch (error) {
      console.error('Error getting response:', error);
      throw error;
    }
  }
}

module.exports = ChatbotHandler;
